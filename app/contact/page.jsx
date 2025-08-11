"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/styles/contactPage/contact.module.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const formRef = useRef(null);
  const blobRef = useRef(null);
  const cardRefs = useRef([]);

  /* 3-D parallax for form */
  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const { left, top, width, height } = formRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    formRef.current.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };
  const resetTilt = () => {
    if (!formRef.current) return;
    formRef.current.style.transform = `perspective(1200px) rotateY(0deg) rotateX(0deg)`;
  };

  /* Blob morphing */
  useEffect(() => {
    let frame;
    let angle = 0;
    const animate = () => {
      angle += 0.008;
      const path = `M 50 ${50 + Math.sin(angle) * 5} C ${
        90 + Math.cos(angle * 0.7) * 10
      } ${20 + Math.sin(angle * 0.9) * 5}, ${
        110 + Math.cos(angle * 0.6) * 5
      } ${80 + Math.sin(angle * 1.1) * 10}, 50 ${
        150 + Math.sin(angle) * 5
      } C ${10 + Math.cos(angle * 0.8) * 5} ${
        130 + Math.sin(angle * 0.7) * 5
      }, ${-10 + Math.cos(angle * 0.9) * 5} ${
        20 + Math.sin(angle * 1.2) * 5
      }, 50 ${50 + Math.sin(angle) * 5} Z`;
      blobRef.current?.setAttribute("d", path);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Magnetic cursor */
  useEffect(() => {
    const moveCursor = (e) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle(styles.show, e.isIntersecting)),
      { threshold: 0.3 }
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Form submit */
  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Sending …");

  const body = Object.fromEntries(new FormData(e.target));

  try {
    const r = await fetch("/api/contactPage", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await r.json();
    if (data.ok) {
      setStatus("Sent ✓");
      formRef.current.reset();
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("Failed – please retry");
    }
  } catch {
    setStatus("Failed – please retry");
  }
};

  return (
    <>

    <Navbar/>

    <main className={styles.main}>
      {/* Custom cursor */}
      <div className={styles.cursor} />

      {/* Animated blob */}
      <svg className={styles.blob} viewBox="0 0 200 200">
        <path ref={blobRef} fill="url(#grad)" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b3dfff" />
            <stop offset="100%" stopColor="#0077e6" />
          </linearGradient>
        </defs>
      </svg>

      <section className={styles.section}>
        <div className={styles.grid}>
          {/* Left copy */}
          <div className={styles.left}>
            <h1 className={`${styles.title} ${styles.reveal}`}>
              Let’s craft the unforgettable.
            </h1>
            <p className={`${styles.sub} ${styles.reveal}`}>
              Share your boldest idea and we’ll design a digital experience that
              leaves the market breathless.
            </p>

            <div className={styles.cards}>
              {[
  {
    icon: "📞",
    label: "+91-9269529252",
    action: () => (window.location.href = "tel:+919269529252"),
  },
  {
    icon: "✉️",
    label: "info@rankersmind.com",
    action: () => (window.location.href = "mailto:info@rankersmind.com"),
  },
  {
    icon: "💬",
    label: "Chat on WhatsApp",
    action: () =>
      (window.location.href =
        "https://wa.me/919269529252?text=Hi%2C%20I%20would%20like%20to%20know%20more"),
  },
].map((item, i) => (
  <button
    key={i}
    className={`${styles.card} ${styles.reveal}`}
    onClick={item.action}
    type="button"
  >
    <span className={styles.icon}>{item.icon}</span>
    <span>{item.label}</span>
  </button>
))}
            </div>
          </div>

          {/* Right form */}
          <form
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div className={styles.row}>
              <input required name="first" placeholder="First name" />
              <input required name="last" placeholder="Last name" />
            </div>
            <input required type="email" name="email" placeholder="Email" />
            <input name="company" placeholder="Company" />
            <textarea
              required
              rows="5"
              name="message"
              placeholder="How can we help?"
            />
            <button type="submit" className={styles.btn}>
              <span>{status || "Send message"}</span>
              <div className={styles.particles} />
            </button>
          </form>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}