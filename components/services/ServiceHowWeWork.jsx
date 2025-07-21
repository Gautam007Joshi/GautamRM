// components/services/ServiceHowWeWork.jsx
import React from 'react';
import styles from '@/styles/services/ServiceHowWeWork.module.css';

export default function ServiceHowWeWork({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.subtitle}>Our Methodology</h2>
          <p className={styles.title}>The Science Behind Our Success</p>
          <p className={styles.description}>
            We combine cutting-edge technology with proven strategies to deliver exceptional results.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.stepNumber}>
                <span>{step.number}</span>
              </div>
              <div className={styles.cardContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
