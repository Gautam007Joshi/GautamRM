import Navbar from '@/components/sections/Navbar';
import { getAllPosts, getPostData } from '@/lib/server/blog';
import styles from '@/styles/blog/blogSingle.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// ✅ Static paths for all slugs
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | RankersMind`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: `https://rankersmind.com${post.coverImage}`,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`https://rankersmind.com${post.coverImage}`],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostData(params.slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rankersmind.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.description,
    "image": `https://rankersmind.com${post.coverImage}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "RankersMind",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rankersmind.com/logo.png" // Replace with actual logo URL
      }
    },
    "datePublished": post.date,
    "dateModified": post.date
  };

  return (
    <>
      <Navbar />

      {/* ✅ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.postWrapper}>
        <h1 className={styles.postTitle}>{post.title}</h1>

        <div className={styles.postMeta}>
          <span>
            📅 {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span>✍️ {post.author}</span>

          <div className={styles.tags}>
            {post.tags?.map((tag) => (
              <a
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className={styles.tag}
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>

        <Image
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={450}
          className={styles.postImage}
        />

        <article
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </>
  );
}
