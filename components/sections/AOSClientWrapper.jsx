'use client';

import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSClientWrapper({ children }) {
  const heroRef = useRef();

  useEffect(() => {
    console.trace('AOS initialization');
    AOS.init({ once: true });

    const scroll = localStorage.getItem('scrollToServices');
    if (scroll) {
      localStorage.removeItem('scrollToServices');
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return children;
}
