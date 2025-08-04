'use client';
import { useState } from 'react';
import styles from '@/styles/contactForm.module.css';
import Section from './section';
import '@/styles/animatedButton.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    referral: '',
    projectDetails: '',
  });

  const [sent, setSent] = useState(false);

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('/api/ContactForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      console.log('✅ Email sent');
      setSent(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        referral: '',
        projectDetails: '',
      });

      setTimeout(() => {
        setSent(false);
      }, 4000);
    } else {
      console.error('❌ Failed to send email:', data.message);
    }
  } catch (err) {
    console.error('❌ Error sending request:', err.message);
  } finally {
    setLoading(false);
  }
};




  return (
    <Section bgColor="#f4f7fb" className={styles.contactFormSection} disableOverlay>
      <div className={styles.bgWrapper}>
        <div className={styles.container}>
          
          {/* ✅ LEFT COLUMN — Title Text (No change needed) */}
          <div className={styles.textBlock}>
            <h2>Start Your Vision With Us</h2>
            <p>
              Whether you’re building a brand or scaling up, we bring your vision to life with creativity, strategy, and technology.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.floatingGroup}>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder=" "
              />
              <label>First Name*</label>
            </div>

            <div className={styles.floatingGroup}>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Last Name*</label>
            </div>

            <div className={styles.floatingGroup}>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Email Address*</label>
            </div>

            <div className={styles.floatingGroup}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Phone</label>
            </div>

            <div className={styles.floatingGroup}>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Company</label>
            </div>

            <div className={styles.floatingGroup}>
              <select
                name="referral"
                required
                value={formData.referral}
                onChange={handleChange}
              >
                <option value="" disabled hidden></option>
                <option value="Google">Google</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Other">Other</option>
              </select>
              <label>How did you hear about us?*</label>
            </div>

            <div className={styles.floatingGroup}>
              <textarea
                name="projectDetails"
                required
                value={formData.projectDetails}
                onChange={handleChange}
                placeholder=" "
                rows="4"
              />
              <label>Project Details*</label>
            </div>

           <button
  type="submit"
  className={styles.cssbuttonsIoButton}
  disabled={loading || sent}
>
  <span className={styles.btnText}>Send Message</span>

  {sent ? (
    <div className={styles.sentOverlay}>
      Sent ✔️
    </div>
  ) : (
    <div className={styles.icon}>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    </div>
  )}
</button>




          </form>
        </div>
      </div>
    </Section>
  );
}