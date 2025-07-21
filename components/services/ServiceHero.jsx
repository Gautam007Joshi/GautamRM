// components/ServiceHero.jsx
import React from 'react';
import styles from '@/styles/services/ServiceHero.module.css';
import { FaPlayCircle } from 'react-icons/fa';

export default function ServiceHero({ titleLine1, titleLine2, description, imageUrl }) {
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
