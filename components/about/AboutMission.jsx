'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/styles/about/AboutMission.module.css';
import { gsap } from 'gsap';

const OurMission = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.animate'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      }
    );
  }, []);

  return (
    <section className={styles.missionSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.heading} animate`}>
          <h2><span className={styles.gradientTitle}>Our Mission</span></h2>
        </div>

        <div className={styles.contentWrapper}>
          <div className={`${styles.imageWrapper} animate`}>
            <img
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1000&q=80"
              alt="Digital team working"
            />
          </div>

          <div className={`${styles.textWrapper} animate`}>
            <h3>Empowering Brands to Lead Fearlessly</h3>
            <p>
              At <strong>Rankers Mind</strong>, we ignite growth through bold strategies and smart marketing. We blend creativity with precision to craft impactful, data-driven digital journeys.
            </p>
            <p>
              Every pixel and campaign we launch carries one goal — helping you dominate the digital battlefield.
            </p>

            <div className={styles.points}>
              <div className={`${styles.point} animate`}>
                <i className="fas fa-bullseye"></i>
                <p>Precision-Driven Strategies</p>
              </div>
              <div className={`${styles.point} animate`}>
                <i className="fas fa-rocket"></i>
                <p>Results That Go Beyond Metrics</p>
              </div>
              <div className={`${styles.point} animate`}>
                <i className="fas fa-handshake"></i>
                <p>Partnerships That Endure</p>
              </div>
            </div>

            <button className={styles.glassBtn}>
              <span>Explore Our Approach</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
