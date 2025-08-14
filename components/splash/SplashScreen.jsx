'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/styles/services/splash.module.css';

export default function SplashScreen({ text = 'Welcome', onComplete = () => {} }) {
  const splashRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onComplete();
      },
    });

    tl.fromTo(
  textRef.current,
  { opacity: 0, scale: 0.96, y: 20 },
  { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out' },
  0
).to(
  splashRef.current,
  {
    y: '-100%',
    duration: 1.4,
    ease: 'expo.inOut',
  },
  '>' // <- starts immediately after previous tween
);
  }, [onComplete]);

  return (
    <div className={styles.splashWrapper} ref={splashRef}>
      <h1 className={styles.splashText} ref={textRef}>
        {text}
      </h1>
    </div>
  );
}
