'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';


import SplashScreen from '@/components/splash/SplashScreen'; // 👈 Import the custom splash

const Navbar = dynamic(() => import('@/components/sections/Navbar'));
const ContactForm = dynamic(() => import('@/components/sections/ContactForm'));
const Footer = dynamic(() => import('@/components/sections/Footer'));
const ServiceHero = dynamic(() => import('@/components/services/ServiceHero'));
const StatsSection = dynamic(() => import('@/components/services/ServiceStats'));
const ServiceHowWeWork = dynamic(() => import('@/components/services/ServiceHowWeWork'));
const ServicePricingPlans = dynamic(() => import('@/components/services/ServicePricingPlans'));
const ServiceFAQ = dynamic(() => import('@/components/services/ServiceFAQ'));

// Data Imports
import * as webDev from '../data/webDev';
import * as aiDev from '../data/aiDev';
import * as appDev from '../data/appDev';
import * as socialMedia from '../data/socialMedia';
import * as email from '../data/email';
import * as branding from '../data/branding';
import * as analytics from '../data/analytics';
import * as seo from '../data/seo';
import * as ppc from '../data/ppc';
import * as content from '../data/content';

const slugMap = {
  'web-development': 'webDev',
  'ai-development': 'aiDev',
  'app-development': 'appDev',
  'social-media': 'socialMedia',
  'email': 'email',
  'branding': 'branding',
  'analytics': 'analytics',
  'seo': 'seo',
  'ppc': 'ppc',
  'content': 'content',
};

const splashTextMap = {
  'web-development': 'Building Beautiful Web Experiences',
  'ai-development': 'Empowering Your Business with AI',
  'app-development': 'Crafting Mobile Magic',
  'social-media': 'Let Your Brand Be Heard',
  'email': 'Emails That Convert',
  'branding': 'Your Identity, Reinvented',
  'analytics': 'Data That Drives Decisions',
  'seo': 'Climb the Ranks Organically',
  'ppc': 'Clicks That Count',
  'content': 'Content That Connects',
};

const dataMap = {
  webDev,
  aiDev,
  appDev,
  socialMedia,
  email,
  branding,
  analytics,
  seo,
  ppc,
  content,
};

export default function ServicePageClient({ slug }) {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const pageRef = useRef(null);

  useEffect(() => {
    const mappedSlug = slugMap[slug];
    if (!mappedSlug || !dataMap[mappedSlug]) {
      setData(null);
      return;
    }
    setData(dataMap[mappedSlug].default);
    setShowSplash(true); // Show splash screen on slug change
  }, [slug]);

  useEffect(() => {
  
  }, [data, showSplash]);

  if (!slugMap[slug]) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>404 - Service Not Found</h1>
          <p>The service you are looking for doesn’t exist or has been removed.</p>
        </div>
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen
          key={slug}
          text={splashTextMap[slug] || 'Welcome to Rankers Mind'}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Page Content */}
      <div ref={pageRef}>

        <Navbar />
        <ServiceHero {...data} />
        <StatsSection stats={data.stats} />
        <ServiceHowWeWork steps={data.howWeWork} />
        {data.pricingPlans && <ServicePricingPlans plans={data.pricingPlans} />}
        {data.faqs && <ServiceFAQ faqs={data.faqs} />}
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}
