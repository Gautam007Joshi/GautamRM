'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Award, Target, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import styles from '@/styles/aboutStepper.module.css';
import Section from './section';

const About = () => {
  const [activeTab, setActiveTab] = useState('why');
  const [circleActive, setCircleActive] = useState('Startup');

  // refs for animation
  const cardsRef = useRef([]);
  const boxRef = useRef(null);
  const tabsRef = useRef([]);
  const circleBtnsRef = useRef([]);

  useEffect(() => {
    if (activeTab === 'why') {
      // Animate box
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Animate cards
      gsap.fromTo(
  cardsRef.current.filter(Boolean),
  { opacity: 0, y: 40 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
  }
);


      // Animate circle buttons
      gsap.fromTo(
        circleBtnsRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [circleActive, activeTab]);

  useEffect(() => {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.from('[data-word="know"]', {
    y: -60,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  })
    .from('[data-word="us"]', {
      y: 60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.5')
    .fromTo('[data-word="better"]',
      {
        y: 60,
        x: 20,  // Starts a bit to the right
        opacity: 0,
      },
      {
        y: 0,
        x: 10,  // Stops slightly right
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      },
    )
    .to('[data-word="better"]', {
      x: 0, // Slides left to final position
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.3');
}, []);




const handleTabClick = (tab, i) => {
  setActiveTab(tab);

  // GSAP click ripple animation
  gsap.fromTo(
    tabsRef.current[i],
    { scale: 0.9 },
    { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
  );
};

const tabs = [
  { id: 'about', label: 'About Us' },
  { id: 'why', label: 'Why Choose Us' },
  { id: 'trusted', label: 'Trusted By' },
];

  const achievements = [
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Award-winning campaigns that set new standards.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented Strategy',
      description: 'Every step we take is tailored to your growth objectives.',
    },
    {
      icon: TrendingUp,
      title: 'Proven ROI',
      description: 'Campaigns that consistently deliver measurable results.',
    },
  ];

  const circleContent = {
  Startup: {
    title: '🚀 We understand startup urgency — and we match your speed.',
    list: [
      `We know what it’s like to build from zero — every day feels like a pitch, every task feels critical, and every decision feels risky. 
      You need partners who move fast, think smart, and don’t waste your time. 
      We’ll help you validate your idea, launch quickly, and communicate with clarity. 
      Whether you need an MVP, a landing page that converts, or content that makes investors listen — we're in the trenches with you, not watching from the side.`,
    ],
  },

  Business: {
    title: '🏢 You’ve built a business — now you want results that scale.',
    list: [
      `You're not experimenting anymore — you need consistency, clarity, and growth that actually makes sense. 
      We come in like a partner who respects what you’ve already built, and brings systems that amplify your efforts. 
      Our strategy isn't a bunch of slides — it’s battle-tested execution that increases revenue, enhances trust, and aligns with your long-term goals. 
      We don’t just bring ideas. We bring implementation and accountability.`,
    ],
  },

  Brand: {
    title: '🎯 You want to be unforgettable — not just "seen".',
    list: [
      `People don’t remember brands because of features — they remember how a brand made them feel. 
      We help you craft that emotional connection. 
      Whether you're rebranding, expanding, or refining your message — we make sure your visuals, your copy, and your tone all work in harmony. 
      We’re here to make you look good, sound clear, and feel authentic — everywhere your brand shows up.`,
    ],
  },
};


  return (
    <Section disableOverlay className={styles.aboutSection}>
  <div className={styles.wrapper}>
    <div className={styles.left}>
      {/* Heading */}
      <div className={styles.headingRow}>
  <h2 className={styles.heading}>
  <span className={styles.word} data-word="know">Know</span>{' '}
  <span className={styles.word} data-word="us">Us</span>{' '}
  <span className={styles.word} data-word="better">Better</span>
</h2>



  <div className={styles.tabs}>
    {tabs.map((tab, i) => (
      <button
        key={tab.id}
        ref={(el) => (tabsRef.current[i] = el)}
        onClick={() => handleTabClick(tab.id, i)}
        className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>

{activeTab === 'about' && (
  <div className={styles.aboutGrid}>
    {/* Left Section */}
    <div className={styles.aboutLeft}>
      <h2 className={styles.aboutHeading}>
        <span>About Rankers Mind</span>
      </h2>
      <p className={styles.aboutPara}>
        We're a team of passionate digital marketing experts dedicated to helping businesses thrive in the digital landscape.
        With over a decade of experience, we've helped hundreds of companies achieve their growth goals.
      </p>
      <p className={styles.aboutPara}>
        Our data-driven approach ensures every campaign is optimized for maximum ROI, while our creative team brings fresh ideas that make your brand stand out.
      </p>

      <div className={styles.achievementGrid}>
        {achievements.map((achievement, i) => (
          <div key={i} className={styles.achievementCard}>
            <div className={styles.achievementIcon}>
              <achievement.icon size={20} color="#2563eb" />
            </div>
            <div>
              <h3 className={styles.achievementTitle}>{achievement.title}</h3>
              <p className={styles.achievementDesc}>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Section */}
    {/* Right Section – Modern Look */}
<div className={styles.aboutRight}>
  <div className={styles.imageCard}>
    <img
      src="https://assets-global.website-files.com/5fbe71a7cfbb8037b3f6a176/621e8c13f6c9ec50a2a65016_Hero%20Image-p-800.png"
      alt="Team Illustration"
      className={styles.aboutImage}
    />

    <div className={styles.statBadgeTop}>
      <h3>500+</h3>
      <p>Happy Clients</p>
    </div>
    <div className={styles.statBadgeBottom}>
      <h3>10+</h3>
      <p>Years Experience</p>
    </div>
  </div>
</div>

  </div>
)}



      {/* (Optional Real Talk line for personality) */}
      {activeTab === 'why' && (
        <p className={styles.realTalk}>
          Here’s the truth — we don’t do generic. Who you are shapes how we help you.
        </p>
      )}

      {/* Now the circle buttons and deep content below */}
      {activeTab === 'why' && (
        <>
          <div className={styles.circleTabs}>
            {Object.keys(circleContent).map((key, i) => (
              <button
                key={key}
                onClick={() => setCircleActive(key)}
                ref={(el) => (circleBtnsRef.current[i] = el)}
                className={`${styles.circleBtn} ${circleActive === key ? styles.circleActive : ''}`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className={styles.box} ref={boxRef}>
            <h4>{circleContent[circleActive].title}</h4>
            <ul>
              {circleContent[circleActive].list.map((item, i) => (
                <li key={i}>{item}</li> // ✅ Removed "✅" for cleaner professional look
              ))}
            </ul>
          </div>

          <div className={styles.cards}>
            {achievements.map((item, i) => (
              <div className={styles.card} key={i} ref={(el) => (cardsRef.current[i] = el)}>
                <div className={styles.icon}>
                  <item.icon size={22} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>

    {/* Right side image (visible only in WHY) */}
    {activeTab === 'why' && (
      <div className={styles.right}>
        <img
          src="https://img.icons8.com/3d-fluency/500/group.png"
          alt="Team"
          className={styles.image}
        />
      </div>
    )}
  </div>
</Section>

  );
};

export default About;
