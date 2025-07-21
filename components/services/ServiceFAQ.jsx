'use client';

import React, { useState } from 'react';
import styles from '@/styles/services/ServiceFAQ.module.css';

const ServiceFAQ = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!faqs || !Array.isArray(faqs)) return null;

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.question}>
                <span>{faq.question}</span>
                <span className={styles.toggleIcon}>{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
