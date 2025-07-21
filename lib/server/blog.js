import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
  console.log('🔍 [getAllPosts] Reading from:', postsDirectory);

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    console.log('📄 [getAllPosts] Files found:', fileNames);

    const allPosts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data } = matter(fileContents);
      console.log(`✅ [getAllPosts] Parsed post: ${slug}`, data);

      return {
        slug,
        ...data,
      };
    });

    return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error('❌ [getAllPosts] Error:', err);
    return [];
  }
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  console.log(`🔍 [getPostData] Reading post: ${fullPath}`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    console.log(`✅ [getPostData] Processed post: ${slug}`);

    return {
      slug,
      contentHtml,
      ...data,
    };
  } catch (err) {
    console.error(`❌ [getPostData] Error processing ${slug}:`, err);
    return null;
  }
}
