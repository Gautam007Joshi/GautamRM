// AboutTeam.jsx

'use client';

import React, { useRef, useEffect, useLayoutEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/about/AboutTeam.module.css'; // Importing the styles for the team section

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'David Wilson',
    role: 'SEO Director',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Lisa Park',
    role: 'PPC Specialist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a05d6e0918?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Lisa Park',
    role: 'PPC Specialist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a05d6e0918?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Lisa Park',
    role: 'PPC Specialist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a05d6e0918?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Lisa Park',
    role: 'PPC Specialist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a05d6e0918?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  
];

const AboutTeam = () => {
  const wrapperRef = useRef(null);
  const scrollContentRef = useRef(null);

  useLayoutEffect(() => {
  const wrapper = wrapperRef.current;
  const scrollContent = scrollContentRef.current;

  const totalScroll = scrollContent.scrollWidth;

  const ctx = gsap.context(() => {
    gsap.to(scrollContent, {
      x: () => - (scrollContent.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, wrapper);

  return () => ctx.revert();
}, []);




  return (
    <section className={styles.teamSection}>
  <div className={styles.heading}>
    <h2 className={styles.sectionTitle}>
  <span className={styles.sameSize}>Meet Our</span>{' '}
  <span className={styles.gradientTitleNoLine}>Team</span>
</h2>

    <p className={styles.sectionText}>
  At the heart of everything we do is a passion for creating extraordinary digital experiences.  
  We don’t just build — we innovate, challenge the norm, and push boundaries to craft stories that resonate.
</p>
<p className={styles.sectionText}>
  Our team thrives on curiosity, creativity, and collaboration.  
  Together, we turn bold ideas into impactful realities — designed to inspire, connect, and deliver lasting value.
</p>

  </div>

  <div className={styles.scrollWrapper} ref={wrapperRef}>
    <div className={styles.scrollContent} ref={scrollContentRef}>
      {teamMembers.map((member, index) => (
        <div className={styles.teamCard} key={index}>
          <img src={member.image} alt={member.name} />
          <div className={styles.cardContent}>
            <h3>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* New content section */}
  <div className={styles.afterTeamContent} id="afterTeam">
  <div className={styles.contentContainer}>


    <h2 className={styles.sectionTitle}>
  Our <span className={styles.gradientText}>Vision</span>
</h2>


    <p className={styles.sectionText}>
      We are committed to designing purposeful digital experiences that deliver measurable impact. Our work
      combines strategy, design, and technology to help brands thrive in a rapidly evolving world.
    </p>

    <p className={styles.sectionText}>
      Guided by a culture of excellence and innovation, we turn complexity into clarity—transforming bold ideas into scalable, user-centric solutions. Every engagement is an opportunity to build lasting value.
    </p>
  </div>
</div>


</section>

  );
};

export default AboutTeam;
