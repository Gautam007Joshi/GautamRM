'use client';

import React from 'react';
import styles from '@/styles/about/AboutCTA.module.css';

const AboutCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Still thinking?</h2>
          <p>
            Let’s not keep your growth on pause. Whether it’s a question or a big idea, 
            our team is just one message away. We listen, we care, and we act fast.
          </p>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <img src="/about-assets/connectOnInsta.svg" alt="Instagram" />
            </div>
            <button>Connect On Instagram</button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <img src="/about-assets/call.svg" alt="Call" />
            </div>
            <button>Call Us Now</button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <img src="/about-assets/whatsappSVG.svg" alt="WhatsApp" />
            </div>
            <button>WhatsApp Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
