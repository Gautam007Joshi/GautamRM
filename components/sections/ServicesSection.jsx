'use client';

import React from 'react';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Section from './section';
import styles from '@/styles/ServicesSection.module.css';
import FlipCard from '../cards/FlipCard';
import {
  FaSearch,
  FaBullhorn,
  FaGoogle,
  FaLightbulb,
  FaEnvelope,
  FaCode,
  FaPenFancy,
  FaChartLine,
  FaMobileAlt,
  FaRobot,
} from 'react-icons/fa';

export default function ServicesSection() {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: 'SEO Optimization',
      desc: 'Improve visibility and rankings on search engines.',
      href: '/services/seo',
      icon: <FaSearch />,
    },
    {
      title: 'Social Media Marketing',
      desc: 'Grow your audience on social platforms.',
      href: '/services/social-media',
      icon: <FaBullhorn />,
    },
    {
      title: 'Google Ads (PPC)',
      desc: 'Generate leads with ad campaigns.',
      href: '/services/ppc',
      icon: <FaGoogle />,
    },
    {
      title: 'Brand Strategy',
      desc: 'Craft your identity and make lasting impressions.',
      href: '/services/branding',
      icon: <FaLightbulb />,
    },
    {
      title: 'Email Marketing',
      desc: 'Convert leads and nurture customers with automation.',
      href: '/services/email',
      icon: <FaEnvelope />,
    },
    {
      title: 'Web Development',
      desc: 'Build fast, responsive, and SEO-friendly websites.',
      href: '/services/web-development',
      icon: <FaCode />,
    },
    {
      title: 'Content Creation',
      desc: 'Deliver valuable, relevant content that converts.',
      href: '/services/content',
      icon: <FaPenFancy />,
    },
    {
      title: 'Analytics & Reporting',
      desc: 'Track performance and uncover growth insights.',
      href: '/services/analytics',
      icon: <FaChartLine />,
    },
    {
      title: 'App Development',
      desc: 'Create powerful iOS and Android mobile apps.',
      href: '/services/app-development',
      icon: <FaMobileAlt />,
    },
    {
      title: 'AI Development',
      desc: 'Harness AI to automate and optimize your business.',
      href: '/services/ai-development',
      icon: <FaRobot />,
    },
  ];

  return (
   <Section className={styles.tallsection}>


      <div id="services" className={styles.servicesSection}>
        <h2 className={styles.heading}>
          Elevate Your <span className={styles.highlight}>Digital</span> Presence.
        </h2>
        <p className={styles.subline}>
          From visibility to conversion, we craft digital solutions that deliver real results.
        </p>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.cardWrapper}>
              <FlipCard
                front={
                  <div className={styles.card}>
                    <div className={styles.icon}>{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                }
                back={
                  <div className={styles.card}>
                    <h3>{service.title}</h3>
                    <p>
                      Learn more about how our{' '}
                      {service.title.toLowerCase()} services can help.
                    </p>
                    <Link
                      href={service.href}
                      className={styles.ctaLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore →
                    </Link>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        <div className={styles.statsGrid} ref={statsRef}>
          <div className={styles.statBox}>
            <h4>{statsInView ? <CountUp end={300} duration={3} /> : 0}+</h4>
            <p>Projects Completed</p>
          </div>
          <div className={styles.statBox}>
            <h4>{statsInView ? <CountUp end={300} duration={3} /> : 0}+</h4>
            <p>Clients Served</p>
          </div>
          <div className={styles.statBox}>
            <h4>{statsInView ? <CountUp end={300} duration={3} /> : 0}+</h4>
            <p>Client Retention</p>
          </div>
          <div className={styles.statBox}>
            <h4>{statsInView ? <CountUp end={300} duration={3} /> : 0}+</h4>
            <p>Industries Covered</p>
          </div>
        </div>

        <div className={styles.ctaStrip}>
          <h3>Need a Custom Digital Strategy?</h3>
          <Link href="/contact" className={styles.ctaLink}>
            Let’s Talk →
          </Link>
        </div>

        
      </div>

    </Section>
  );
}
