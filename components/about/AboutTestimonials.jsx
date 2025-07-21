'use client';

import React, { useState, useRef } from 'react';
import styles from '@/styles/about/AboutTestimonials.module.css';

const initialTestimonials = [
  {
    name: 'Jessica Miller',
    title: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    quote: 'DigitalGrowth transformed our online presence. Website traffic increased by 300% in 6 months.',
    stars: 5,
  },
  {
    name: 'Robert Chen',
    title: 'Marketing Director, LuxeBrands',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    quote: 'Their PPC strategy reduced our cost per acquisition by 65% while increasing conversion rates.',
    stars: 5,
  },
  {
    name: 'James Wilson',
    title: 'Founder, GreenLife',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    quote: 'From branding to social strategy, we scaled from $10k to $250k monthly revenue in 18 months.',
    stars: 5,
  },
  {
    name: 'Sarah Johnson',
    title: 'CMO, HealthPlus',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    quote: 'Organic traffic is up 420% and we’re closing more high-value clients than ever before.',
    stars: 4.5,
  },
];

const Testimonials = () => {
  const [cards, setCards] = useState(
    initialTestimonials.map((card, i) => ({
      ...card,
      id: i,
      x: 50 + i * 320,
      y: 100,
    }))
  );

  const containerRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const activeId = useRef(null);

  const handleMouseDown = (e, id) => {
  const containerRect = containerRef.current.getBoundingClientRect();
  const card = cards.find((c) => c.id === id);

  dragOffset.current = {
    x: e.clientX - containerRect.left - card.x,
    y: e.clientY - containerRect.top - card.y,
  };

  activeId.current = id;

  document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd);

};


  const handleMouseMove = (e) => {
    if (activeId.current === null) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.current.x;
    const newY = e.clientY - containerRect.top - dragOffset.current.y;

    setCards((prev) =>
      prev.map((card) =>
        card.id === activeId.current ? { ...card, x: newX, y: newY } : card
      )
    );
  };

  const handleMouseUp = () => {
    activeId.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchMove = (e) => {
  if (activeId.current === null || !e.touches[0]) return;

  const containerRect = containerRef.current.getBoundingClientRect();
  const newX = e.touches[0].clientX - containerRect.left - dragOffset.current.x;
  const newY = e.touches[0].clientY - containerRect.top - dragOffset.current.y;

  setCards((prev) =>
    prev.map((card) =>
      card.id === activeId.current ? { ...card, x: newX, y: newY } : card
    )
  );
};

const handleTouchEnd = () => {
  activeId.current = null;
  document.removeEventListener('touchmove', handleTouchMove);
  document.removeEventListener('touchend', handleTouchEnd);
};

const handleTouchStart = (e, id) => {
  if (!e.touches[0]) return;

  const containerRect = containerRef.current.getBoundingClientRect();
  const card = cards.find((c) => c.id === id);

  dragOffset.current = {
    x: e.touches[0].clientX - containerRect.left - card.x,
    y: e.touches[0].clientY - containerRect.top - card.y,
  };

  activeId.current = id;

  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd);
};



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

          {cards.map((item) => (
            <div
              key={item.id}
              className={`${styles.testimonialCard} ${styles.fadeIn}`}
              onMouseDown={(e) => window.innerWidth > 768 && handleMouseDown(e, item.id)}


              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
              }}
            >
              <div className={styles.testimonialHeader}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.title}</p>
                </div>
              </div>
              <p className={styles.testimonialQuote}>"{item.quote}"</p>
              <div className={styles.testimonialStars}>
                {Array.from({ length: Math.floor(item.stars) }).map((_, i) => (
                  <i className="fas fa-star" key={i}></i>
                ))}
                {item.stars % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
