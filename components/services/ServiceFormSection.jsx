'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/services/ServiceEnquiryForm.module.css';

export default function SplitServicePhoto({ slug }) {
  /* service → title map */
  const serviceMap = {
    seo: 'SEO',
    'web-development': 'Web Development',
    'ai-development': 'AI Development',
    'app-development': 'App Development',
    'social-media': 'Social Media Marketing',
    email: 'Email Marketing',
    branding: 'Branding',
    analytics: 'Analytics & Data',
    ppc: 'PPC Campaigns',
    content: 'Content Strategy',
  };

  /* form state */
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: serviceMap[slug] || 'General',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setForm((f) => ({ ...f, service: serviceMap[slug] || 'General' }));
  }, [slug]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    /* replace with real endpoint */
    setTimeout(() => setStatus('success'), 1200);
  };

  return (
    <section className={styles.section}>
      <div className={styles.grid}>

        {/* LEFT — Form */}
        <div className={styles.left}>
          <h2 className={styles.title}>
            Start Your <span>{form.service}</span> Project
          </h2>
          <p className={styles.sub}>
            Tell us a little about your goals and we’ll craft a custom proposal.
          </p>

          <form onSubmit={onSubmit} className={styles.form} noValidate>
            <div className={styles.cols}>
              <div className={styles.field}>
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Company / Organization</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={onChange}
              />
            </div>

            <div className={styles.field}>
              <label>Service of Interest</label>
              <select
                name="service"
                value={form.service}
                onChange={onChange}
              >
                {Object.values(serviceMap).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>Project Details</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={styles.btn}
            >
              {status === 'loading' ? 'Sending…' : 'Request Consultation'}
            </button>

            {status === 'success' && (
              <p className={styles.success}>Thank you — we’ll be in touch soon.</p>
            )}
          </form>
        </div>

        {/* RIGHT — SVG photo-real illustration */}
        <div className={styles.right}>
          <svg
            className={styles.heroSvg}
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Background gradient to fake depth */}
            <defs>
              <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#e5f4fa" />
                <stop offset="100%" stopColor="#cce9f5" />
              </linearGradient>

              <clipPath id="clipComputer">
                <rect x="100" y="140" width="300" height="180" rx="12" />
              </clipPath>
            </defs>

            <rect width="500" height="500" fill="url(#bg)" />

            {/* Desk */}
            <rect x="80" y="330" width="340" height="20" rx="6" fill="#b8d8e6" />

            {/* Computer */}
            <rect
              x="100"
              y="140"
              width="300"
              height="180"
              rx="12"
              fill="#0d81ac"
              clipPath="url(#clipComputer)"
            />

            {/* Screen highlight */}
            <rect
              x="110"
              y="150"
              width="280"
              height="160"
              rx="6"
              fill="#ffffff"
            />

            {/* Code lines */}
            <g fill="#0d81ac" opacity=".6">
              <rect x="130" y="175" width="60" height="8" rx="4" />
              <rect x="200" y="175" width="40" height="8" rx="4" />
              <rect x="130" y="190" width="100" height="8" rx="4" />
              <rect x="130" y="205" width="80" height="8" rx="4" />
              <rect x="130" y="220" width="90" height="8" rx="4" />
              <rect x="130" y="235" width="70" height="8" rx="4" />
            </g>

            {/* Coffee cup */}
            <g>
              <rect x="380" y="300" width="30" height="40" rx="6" fill="#ffffff" />
              <rect x="415" y="310" width="10" height="20" rx="5" fill="#ffffff" />
            </g>

            {/* Plant */}
            <g>
              <rect x="90" y="300" width="40" height="30" rx="6" fill="#ffffff" />
              <circle cx="110" cy="280" r="25" fill="#8ed1a4" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}