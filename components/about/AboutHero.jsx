'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/about/AboutHero.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const containerRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !containerRef.current) return;

    const heading = containerRef.current.querySelector(`.${styles.title}`);
    const buttons = containerRef.current.querySelector(`.${styles.buttonGroup}`);
    const image = containerRef.current.querySelector(`.${styles.heroImage}`);
    const logos = containerRef.current.querySelector(`.${styles.logos}`);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [heading, buttons],
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        image,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        logos,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [hasMounted]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={styles.container} ref={containerRef}>
        <div className={`animate ${styles.left}`}>
          <h1 className={`animate ${styles.title}`}>
            Welcome to <span>Rankers Mind</span>
          </h1>
          <p className={styles.subtext}>
            Crafting <strong>performance-driven</strong> digital experiences since 2012.
            We're not just marketers — we’re <strong>growth architects</strong> for your brand.
          </p>
          <ul className={styles.points}>
            <li>🚀 200+ Brands Scaled Globally</li>
            <li>📊 10x Return on Ad Spend (ROAS)</li>
            <li>🏆 Recognized by Clutch & G2 for SEO Excellence</li>
          </ul>
          <div className={`animate ${styles.buttonGroup}`}>
            <button className={styles.primaryBtn}>Explore Services</button>
            <button className={styles.outlineBtn}>Contact Us</button>
          </div>
          <div className={`animate ${styles.trustedBy}`}>
            <div className={styles.logos}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                alt="Google"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
              />
            </div>
          </div>
        </div>

        <div className={`animate ${styles.heroImage}`}>
          <img
            src="/about-assets/heroSection.webp"
            alt="Rankers Mind Strategy"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
