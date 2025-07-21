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

const About = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Prevent hydration mismatch by waiting until mount
    setHasMounted(true);

    const timer = setTimeout(() => {
      setShowSplash(false);
      document.body.style.overflow = 'auto';
    }, 3000); // Example splash duration

    document.body.style.overflow = 'hidden';

    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) return null; // ✅ Avoid hydration error

  return (
    <>
      {showSplash && (
        <SplashScreen text="About Rankers Mind" onComplete={() => setShowSplash(false)} />
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
