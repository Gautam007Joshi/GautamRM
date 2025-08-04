'use client';

import { useRef } from 'react';
import styles from '@/styles/blogs.module.css';
import Section from './section';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Blogs({ blogPosts }) {
  const scrollRef = useRef();

  const scrollLeft = () => {
  const wrapper = scrollRef.current;
  if (!wrapper) return;

  const isMobile = window.innerWidth <= 768;
  const card = wrapper.querySelector(`.${styles.blogCard}`);
  if (!card) return;

  const cardWidth = isMobile ? window.innerWidth : card.offsetWidth + 24;
  const scrollLeft = wrapper.scrollLeft;

  if (scrollLeft <= 0) {
    wrapper.scrollTo({
      left: wrapper.scrollWidth,
      behavior: 'smooth',
    });
  } else {
    wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  const wrapper = scrollRef.current;
  if (!wrapper) return;

  const isMobile = window.innerWidth <= 768;
  const card = wrapper.querySelector(`.${styles.blogCard}`);
  if (!card) return;

  const cardWidth = isMobile ? window.innerWidth : card.offsetWidth + 24;
  const scrollLeft = wrapper.scrollLeft;
  const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;

  if (scrollLeft >= maxScrollLeft - 5) {
    wrapper.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  } else {
    wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
};




  return (
    <Section>
      <section className={styles.blogSection}>
        <h2 className={styles.sectionTitle}>Latest Blogs</h2>
        <p className={styles.sectionSubtitle}>Insights, strategies, and stories that inspire growth.</p>
        

        {blogPosts.length > 0 ? (
          <div className={styles.carouselWrapper}>
  {/* Left Arrow */}
  <button className={`${styles.arrowBtn} ${styles.left}`} onClick={scrollLeft}>
    <FaArrowLeft />
  </button>

  {/* Scrollable Container */}
  <div className={styles.blogScrollContainer}>
    <div className={styles.blogScrollWrapper} ref={scrollRef}>
      {blogPosts.slice(0, 5).map((post, index) => (
        <div key={index} className={styles.blogCard}>
          <img
            src={post.coverImage || 'https://via.placeholder.com/400x250'}
            alt={post.title}
            className={styles.blogImage}
          />
          <div className={styles.blogContent}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <a href={`/blog/${post.slug}`} className={styles.readMore}>Read More →</a>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Right Arrow */}
  <button className={`${styles.arrowBtn} ${styles.right}`} onClick={scrollRight}>
    <FaArrowRight />
  </button>
</div>

        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No blogs found.</p>
        )}

        <div className={styles.exploreButtonWrapper}>
    <a href="/blog" className={styles.exploreButton}>Explore All Blogs</a>
  </div>
      </section>
    </Section>
  );
}
