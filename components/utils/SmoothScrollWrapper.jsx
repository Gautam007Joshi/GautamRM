'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

let globalLenis = null; // 🔁 Global instance to access anywhere

export function getLenis() {
  return globalLenis;
}

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    globalLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
}
