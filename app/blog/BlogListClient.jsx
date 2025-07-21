'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/blog/blogPage.module.css';
import SplashScreen from '@/components/splash/SplashScreen'; // ✅ IMPORT

export default function BlogListClient({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [showSplash, setShowSplash] = useState(true); // ✅ NEW STATE

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const sorted = [...filtered];
    switch (sortBy) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'az':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [searchQuery, sortBy, posts]);

  const [featured, ...others] = filteredPosts;

  return (
    <>
      {showSplash && (
        <SplashScreen text="Rankers Mind Blog" onComplete={() => setShowSplash(false)} />
      )}

      {!showSplash && (
        <div className={styles.blogWrapper}>
          <div className={styles.searchSortWrapper}>
            <input
              type="text"
              placeholder="🔍 Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="latest">🆕 Latest</option>
              <option value="oldest">📅 Oldest</option>
              <option value="az">🔤 A–Z</option>
            </select>
          </div>

          {featured && (
            <div className={styles.left}>
              <div className={styles.featuredCardWrapper}>
                <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    width={700}
                    height={400}
                    className={styles.featuredImage}
                  />
                  <h2>{featured.title}</h2>
                  <p>{featured.description}</p>
                </Link>
                <div className={styles.tags}>
                  {featured.tags?.map((tag) => (
                    <Link
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className={styles.tag}
                      key={tag}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={styles.right}>
            {others.map((post) => (
              <div key={post.slug} className={styles.sideCard}>
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={100}
                    height={70}
                    className={styles.sideImage}
                  />
                </Link>
                <div>
                  <Link href={`/blog/${post.slug}`}>
                    <p className={styles.sideTitle}>{post.title}</p>
                  </Link>
                  <span className={styles.sideDate}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className={styles.tags}>
                  {post.tags?.map((tag) => (
                    <Link
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className={styles.tag}
                      key={tag}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
