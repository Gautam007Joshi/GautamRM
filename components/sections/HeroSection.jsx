'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/HeroSection.module.css';
import { ArrowRight, Play, BarChart3, Users, Target } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';


// Dynamically import the 3D logo model
const LogoModel = dynamic(() => import('@/components/utils/LogoModel'), { ssr: false });

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [floatItems, setFloatItems] = useState([]);


const router = useRouter();


  useEffect(() => {
    const handleMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2,
    }));
    setFloatItems(generated);
  }, []);

  return (
    <section className={`${styles.heroWrap} heroWrap`}>
      <div className={styles.floatingBg}>
        {floatItems.map((item) => (
          <div
            key={item.id}
            className={styles.floatDot}
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.shapeSquare} />
      <div className={styles.shapeCircle} />
      <div className={styles.shapeTilt} />

      <div
        className={styles.cursorFollower}
        style={{ left: mouse.x - 8, top: mouse.y - 8 }}
      />

      {/* Two-column layout: Text on left, 3D model on right */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        zIndex: 3,
        position: 'relative',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        {/* Left Side Content */}
        <div className={styles.contentBox} style={{ flex: '1 1 500px' }}>
          <div className={styles.headingAccent}>
            <div className={styles.line}></div>
            <BarChart3 className={styles.icon} />
            <div className={styles.line}></div>
          </div>

          <h1 className={styles.mainTitle}>
            <span className={styles.textPrimary}>Digital Marketing</span>
            <span className={styles.textSecondary}>That Delivers Results</span>
          </h1>

          <p className={styles.subText}>
            Transform your business with data-driven strategies that
            <span> increase conversions </span> and accelerate growth.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn} onClick={() => router.push('/start-campaign')}>
  <span>Start Your Campaign</span>
  <ArrowRight className={styles.btnIcon} />
</button>


            <button className={styles.secondaryBtn}>
              <Play className={styles.btnIcon} />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className={styles.statsGrid}>
            {[
              { number: '500+', label: 'Successful Campaigns', icon: Target },
              { number: '2M+', label: 'Leads Generated', icon: Users },
              { number: '95%', label: 'Client Satisfaction', icon: BarChart3 },
            ].map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <stat.icon className={styles.statIcon} />
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Image */}
        <div className={styles.imageWrapper} style={{ flex: '1 1 450px' }}>
          <img
            src="/heroPhoto.png"
            alt="Hero visual"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </div>

        

<div className={styles.auditFormSection}>
  <form className={styles.auditFormHorizontal}>
    <input
      type="url"
      placeholder="Website URL"
      className={styles.auditInputH}
      required
    />
    <input
      type="email"
      placeholder="Email"
      className={styles.auditInputH}
      required
    />
    <input
      type="tel"
      placeholder="Phone Number"
      className={styles.auditInputH}
      required
    />
    <button type="submit" className={styles.auditButtonH}>
      Get Free Audit 🚀
    </button>
  </form>
</div>
 <div className={styles.blankSpace}></div>
      </div>
     


      
    </section>
  );
}
