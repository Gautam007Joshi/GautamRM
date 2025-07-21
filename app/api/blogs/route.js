export const runtime = 'nodejs';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return { slug, ...data };
    });

    const sorted = posts
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // ✅ Newest first
      .slice(0, 5); // ✅ Get latest 5

    return Response.json(sorted);
  } catch (error) {
    console.error('❌ Error reading posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to read posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
