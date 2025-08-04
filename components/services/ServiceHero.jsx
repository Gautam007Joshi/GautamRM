// components/ServiceHero.jsx
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/services/ServiceHero.module.css';
import { FaPlayCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceHero({ titleLine1, titleLine2, description, imageUrl }) {
  useEffect(() => {
    gsap.from('.textBlock', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.heroSection',
        start: 'top center', // Adjust the trigger position as needed
        toggleActions: 'play none none reverse',
      }
    });

    gsap.from('.heroImage', {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.heroSection',
        start: 'top center', // Adjust the trigger position as needed
        toggleActions: 'play none none reverse',
      }
    });
  }, []);

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContentWrapper}>
          <div className={styles.textBlock}>
            <h1 className={styles.heading}>
              <span className={styles.block}>{titleLine1}</span>
              <span className={`${styles.block} ${styles.gradientText}`}>{titleLine2}</span>
            </h1>
            <p className={styles.description}>{description}</p>

            <div className={styles.buttonGroup}>
              <a href="#" className={`${styles.primaryBtn} ${styles.btnHover}`}>
                Boost My Rankings
              </a>
              <a href="#" className={`${styles.secondaryBtn} ${styles.btnHover}`}>
                <FaPlayCircle className={styles.playIcon} /> Watch Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroImageWrapper}>
        <img
          src={imageUrl}
          alt="SEO optimization"
          className={styles.heroImage}
        />
      </div>
    </div>
  );
}