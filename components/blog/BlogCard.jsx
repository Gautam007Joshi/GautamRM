import styles from '@/styles/blog/blogPage.module.css';

import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  return (
    <div className={styles.card}>
      <Link href={`/blog/${post.slug}`}>
        <Image src={post.coverImage} alt={post.title} width={80} height={80} />
      </Link>
      <div>
        <h4>{post.title}</h4>
        <div className={styles.metaSmall}>
          <span>{post.author} in <strong>{post.tags.join(', ')}</strong></span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
