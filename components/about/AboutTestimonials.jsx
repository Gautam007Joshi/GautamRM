'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/about/AboutTestimonials.module.css';

const initialTestimonials = [
  {
    name: 'Jessica Miller',
    title: 'CEO, TechStart',
    quote: 'DigitalGrowth transformed our online presence. Website traffic increased by 300% in 6 months.',
    stars: 5,
  },
  {
    name: 'Robert Chen',
    title: 'Marketing Director, LuxeBrands',
    quote: 'Their PPC strategy reduced our cost per acquisition by 65% while increasing conversion rates.',
    stars: 5,
  },
  {
    name: 'James Wilson',
    title: 'Founder, GreenLife',
    quote: 'From branding to social strategy, we scaled from $10k to $250k monthly revenue in 18 months.',
    stars: 5,
  },
  {
    name: 'Sarah Johnson',
    title: 'CMO, HealthPlus',
    quote: 'Organic traffic is up 420% and we’re closing more high-value clients than ever before.',
    stars: 4.5,
  },
];

const Testimonials = () => {
  const [cards] = useState(initialTestimonials);
  const [activeDot, setActiveDot] = useState(0);

  const containerRef = useRef(null);

  /* --- desktop drag helpers (only > 768) --- */
  const dragOffset = useRef({ x: 0, y: 0 });
  const activeId = useRef(null);

  const handleMouseDown = (e, id) => {
    if (window.innerWidth <= 768) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const card = cards.find((_, i) => i === id);
    dragOffset.current = {
      x: e.clientX - containerRect.left - (50 + id * 320),
      y: e.clientY - containerRect.top - 100,
    };
    activeId.current = id;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (activeId.current === null) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.current.x;
    const newY = e.clientY - containerRect.top - dragOffset.current.y;
    const cardEls = containerRef.current.querySelectorAll(`.${styles.testimonialCard}`);
    const el = cardEls[activeId.current];
    if (el) {
      el.style.left = `${newX}px`;
      el.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    activeId.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  /* --- mobile scroll-snap dots --- */
  useEffect(() => {
    if (window.innerWidth > 768) return;
    const scroller = containerRef.current;
    const handleScroll = () => {
      const cardWidth = 88; // 88vw
      const gap = 16;
      const index = Math.round(
        scroller.scrollLeft / ((scroller.offsetWidth * cardWidth) / 100 + gap)
      );
      setActiveDot(Math.min(Math.max(index, 0), cards.length - 1));
    };
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeading} ${styles.fadeIn}`}>
          <h2>
            <span className={styles.headingAccent}></span> Clients Testimonials
          </h2>
          <p>Real results. Real feedback. Straight from the brands we’ve scaled.</p>
        </div>

        <div className={`${styles.testimonialsCanvas} ${styles.mobileScroll}`} ref={containerRef}>
          {cards.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.testimonialCard} ${styles.fadeIn}`}
              onMouseDown={(e) => handleMouseDown(e, idx)}
              style={
                window.innerWidth > 768
                  ? { left: `${50 + idx * 320}px`, top: '100px' }
                  : {}
              }
            >
              <div className={styles.testimonialHeader}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, #0e82ac, #0c6b8e)`,
                    marginRight: 16,
                  }}
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.title}</p>
                </div>
              </div>
              <p className={styles.testimonialQuote}>"{item.quote}"</p>
              <div className={styles.testimonialStars}>
                {Array.from({ length: Math.floor(item.stars) }).map((_, i) => (
                  <i className="fas fa-star" key={i} />
                ))}
                {item.stars % 1 !== 0 && <i className="fas fa-star-half-alt" />}
              </div>
            </div>
          ))}
        </div>

        {/* mobile dots */}
        {typeof window !== 'undefined' && window.innerWidth <= 768 && (
          <div className={styles.dots}>
            {cards.map((_, idx) => (
              <div
                key={idx}
                className={`${styles.dot} ${idx === activeDot ? styles.active : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;