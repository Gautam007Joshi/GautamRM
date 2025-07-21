import React from 'react';
import styles from '@/styles/about/AboutStats.module.css';

const stats = [
  {
    value: '250+',
    label: 'Satisfied Clients',
  },
  {
    value: '1.2M',
    label: 'Leads Generated',
  },
  {
    value: '500%',
    label: 'Avg. ROI Increase',
  },
  {
    value: '45',
    label: 'Team Members',
  },
];

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>By The Numbers</h2>
          <p>Our impact in the digital marketing world speaks for itself</p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={styles.statCard}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
