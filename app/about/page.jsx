'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy imports
const Navbar = dynamic(() => import('@/components/sections/Navbar'));
const AboutHero = dynamic(() => import('@/components/about/AboutHero'));
const OurStory = dynamic(() => import('@/components/about/AboutMission'));
const Stats = dynamic(() => import('@/components/about/AboutStats'));
const TeamSection = dynamic(() => import('@/components/about/AboutTeam'));
const CoreValues = dynamic(() => import('@/components/about/AboutValues'));
const Testimonials = dynamic(() => import('@/components/about/AboutTestimonials'));
const CtaSection = dynamic(() => import('@/components/about/AboutCTA'));
const Footer = dynamic(() => import('@/components/sections/Footer'));
const Process = dynamic(() => import('@/components/about/aboutProcess'));

const SplashScreen = dynamic(() => import('@/components/splash/SplashScreen'), {
  ssr: false, // 👈 DISABLE SERVER-SIDE RENDERING
});

// About.tsx
const About = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    document.body.style.overflow = 'hidden';          // still lock body
    return () => {
      document.body.style.overflow = 'auto';          // unlock on unmount
    };
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      {showSplash && (
        <SplashScreen
          text="About Rankers Mind"
          onComplete={() => setShowSplash(false)}       // <- only this controls hiding
        />
      )}

      <div
        style={{
          opacity: showSplash ? 0 : 1,
          pointerEvents: showSplash ? 'none' : 'auto',
          transition: 'opacity 0.4s ease-in-out',
        }}
      >
        <Navbar />
        <AboutHero allowAnimation={!showSplash} />
        <OurStory />
        <Stats />
        <TeamSection />
        <CoreValues />
        <Process />
        <Testimonials />
        <CtaSection />
        <div style={{ height: '180px' }} />
        <Footer />
      </div>
    </>
  );
};

export default About;
