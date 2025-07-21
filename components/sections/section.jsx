'use client';

import { useRef, useEffect, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/section.module.css';

gsap.registerPlugin(ScrollTrigger);

const Section = forwardRef(
  ({ children, bgColor, title, className = '', style = {}, disableOverlay = false }, ref) => {
    const sectionWrapRef = useRef();
    const sectionRef = ref || sectionWrapRef;

    useEffect(() => {
  const section = sectionRef.current;
  const card = section?.querySelector(`.${styles.sectionCard}`);
  const nextSection = section?.nextElementSibling;

  if (!section || !card) return;

  const tl = gsap.fromTo(
    card,
    { y: 300 },
    {
      y: -200,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 100%',
        end: 'top 10%',
        scrub: true,
      },
    }
  );

  let overlayTrigger;

  if (!disableOverlay && nextSection) {
    overlayTrigger = ScrollTrigger.create({
      trigger: nextSection,
      start: 'top 40%',
      end: 'top 10%',
      scrub: true,
      onUpdate: (self) => {
        const opacity = self.progress * 0.6;
        card.style.setProperty('--overlay-opacity', opacity.toFixed(2));
      },
    });
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    overlayTrigger?.kill();
  };
}, []);


    return (
      <section
        ref={sectionRef}
        className={`${styles.sectionWrap} ${
          bgColor === 'black' ? styles.darkSection : ''
        } ${className}`}
        style={style}
      >
        <div
          className={`${styles.sectionCard} ${disableOverlay ? styles.noOverlay : ''}`}
          style={{
            backgroundColor: bgColor,
            '--overlay-opacity': 0,
          }}
        >
          {title && <h1>{title}</h1>}
          {children}
        </div>
      </section>
    );
  }
);

export default Section;
