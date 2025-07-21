import styles from '@/styles/blog/blogPage.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedPost({ post }) {
  return (
    <div className={styles.featured}>
      <Link href={`/blog/${post.slug}`}>
        <Image src={post.coverImage} alt={post.title} width={700} height={400} />
      </Link>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className={styles.meta}>
        <span>{post.author} in <strong>{post.tags.join(', ')}</strong></span>
        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
}
