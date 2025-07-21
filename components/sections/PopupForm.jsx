'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/popupForm.module.css';


function RotatingWord() {
  const rotatingWords = ['Impactful', 'Innovative', 'Impressive'];
  const [text, setText] = useState('I');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(1); // Start after 'I'
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = rotatingWords[wordIndex];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      const base = 'I';
      const currentDisplay = currentWord.slice(1); // Skip first letter 'I'

      if (isDeleting) {
        if (charIndex > 1) {
          setCharIndex((prev) => prev - 1);
          setText(base + currentDisplay.slice(0, charIndex - 2));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }
      } else {
        if (charIndex <= currentDisplay.length + 1) {
          setText(base + currentDisplay.slice(0, charIndex - 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <span className={styles.highlightBox}>
      {text}
    </span>
  );
}


export default function PopupForm() {
  const [showPopup, setShowPopup] = useState(false);
  const scrollYRef = useRef(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
  const timer = setTimeout(() => {
    scrollYRef.current = window.scrollY;
    lockScroll();
    setShowPopup(true);
  }, 4000);

  return () => {
    clearTimeout(timer);
    unlockScroll(); // ✅ Ensure scroll unlocks on unmount
  };
}, []);


  const lockScroll = () => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollYRef.current);
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    unlockScroll();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { name, phone, email } = formData;

    if (!name || !phone || !email) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email }),
      });

      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        setFormData({ name: '', phone: '', email: '' });
        closePopup();
      }
    } catch (err) {
      alert('Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div
    className={`${styles.popupOverlay} ${showPopup ? styles.visible : styles.hidden}`}
    onClick={closePopup}
  >
    <div
      className={styles.popupContainer}
      onClick={(e) => e.stopPropagation()}
    >
        {/* Left side */}
        <div className={styles.leftSide}>
          <img src="/logo.png" alt="Company Logo" className={styles.logo} />
          <h2 className={styles.popupHeading}>
  Let’s build something <RotatingWord /> together.
</h2>

<p className={styles.projectText}>
  Have a project in mind? Want to scale faster? Share your details and let’s start a conversation <strong>that drives results.</strong>
</p>




          <div className={styles.socials}>
            <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <img src="/icons/linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="mailto:gautamjoshi06042002@gmail.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/email.svg" alt="Email" />
            </a>
            <a href="https://www.facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook" />
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className={styles.rightSide}>
          <button className={styles.closeBtn} onClick={closePopup}>✖</button>
          <h3 className={styles.formHeading}>We’ll get back to you</h3>
          <p className={styles.subText}>Just drop your details below and our team will reach out shortly.</p>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name*"
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Your Mobile Number*"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email*"
          />

          <button className={styles.submitBtn} onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
