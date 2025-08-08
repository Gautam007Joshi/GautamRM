'use client';

import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutStepper from '@/components/sections/AboutStepper';
import PopupForm from '@/components/sections/PopupForm';
import Footer from '@/components/sections/Footer';
import BlogsServer from '@/components/sections/BlogsServer';
import ContactForm from '@/components/sections/ContactForm';
import AOSClientWrapper from '@/components/sections/AOSClientWrapper';
import SplashScreen from '@/components/splash/SplashScreen';

export default function Home() {
  const contactRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [allowAnimation, setAllowAnimation] = useState(false);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setAllowAnimation(true);
    }
  }, [showSplash]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.init({
          duration: 800,
          once: true,
        });
      });
    }
  }, []);

  return (
    <>
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen
          text="Welcome to Rankers Mind"
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Page Content */}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          pointerEvents: showSplash ? 'none' : 'auto',
          transition: 'opacity 0.4s ease-in-out',
          willChange: 'opacity',
        }}
      >
        <AOSClientWrapper>
          <Navbar />
          <PopupForm />
          <HeroSection className="dark-section" />
          <ServicesSection
  onContactClick={scrollToContact}
  className="tallSection"
/>


          <div className="mobileSpacer" style={{ height: '20px' }}></div>
          <AboutStepper/>
          <BlogsServer />
          <div ref={contactRef}>
            <ContactForm />
          </div>
          <Footer />
        </AOSClientWrapper>
      </div>
    </>
  );
}