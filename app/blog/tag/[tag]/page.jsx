import { getAllPosts } from '@/lib/server/blog';
import styles from '@/styles/blog/blogPage.module.css';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag.toLowerCase()));
  });

  return [...tags].map((tag) => ({ tag }));
}

export const generateMetadata = ({ params }) => {
  return {
    title: `#${params.tag} Blogs | Gautam Joshi`,
    description: `Explore articles related to ${params.tag}.`,
  };
};

export default function TagPage({ params }) {
  const posts = getAllPosts();
  const filtered = posts.filter((post) =>
    post.tags?.map((t) => t.toLowerCase()).includes(params.tag.toLowerCase())
  );

  if (filtered.length === 0) {
    return <p style={{ padding: '2rem' }}>No blogs found for tag: #{params.tag}</p>;
  }

  return (
    <div className={styles.blogWrapper}>
      <div className={styles.left}>
        <h1 style={{ marginBottom: '1rem' }}>#{params.tag} Blogs</h1>
        {filtered.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.featuredCard}>
            <Image
              src={post.coverImage}
              alt={post.title}
              width={700}
              height={400}
              className={styles.featuredImage}
            />
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
