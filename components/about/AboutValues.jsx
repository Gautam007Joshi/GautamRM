'use client';

import React, { useState } from 'react';
import styles from '@/styles/about/AboutValues.module.css';

const Values = () => {
  const [activeCard, setActiveCard] = useState(null);

  const values = [
  {
    icon: 'fas fa-lightbulb',
    title: 'Innovation',
    description: 'We push boundaries for cutting-edge digital solutions.',
    details: {
      strongText:
        "Innovation isn’t a once-a-year brainstorming session — it’s how we operate daily. Whether we're crafting a fresh brand identity or solving a stubborn UX problem, we don’t default to what’s easy. We explore, test, fail fast, and refine faster. We ask “what if” more than “what’s been done.” Our goal? Not just to keep up — but to lead.",
      extraText:
        "We work at the edge of what's possible — blending creativity with data, design with code, and strategy with intuition. Our most powerful tool? Curiosity that never shuts off.",
      subText: "Our innovation principles include:",
      points: [
        'Rapid prototyping with measurable goals',
        'Embracing failure as a step toward breakthrough',
        'Collaborative ideation across departments',
        'Always questioning the status quo'
      ]
    }
  },
  {
    icon: 'fas fa-chart-pie',
    title: 'Transparency',
    description: 'Open communication and clear reporting at every step.',
    details: {
      strongText:
        "We know how frustrating it feels when you're left out of the loop. That’s why we don’t just “keep you updated” — we actively bring you into the process. From timelines to costs to setbacks, we show you the real picture. Always. No polished versions. No hiding behind buzzwords.",
      extraText:
        "We believe clarity builds trust, and trust builds momentum. Whether it’s a Slack ping, a shared Notion board, or a quick check-in — you’ll never feel like you’re guessing what’s going on.",
      subText: "Transparency in action means:",
      points: [
        'Live access to project dashboards',
        'Honest timelines, budgets, and risks',
        'Weekly check-ins and feedback loops',
        'No hidden surprises — ever'
      ]
    }
  },
  {
    icon: 'fas fa-heart',
    title: 'Passion',
    description: 'We love what we do, and it shows in the results.',
    details: {
      strongText:
        "This isn’t just a job for us — it’s what we wake up excited to do. Every project is a new puzzle, every launch a mini-celebration. We sweat the small stuff because we care. We celebrate your wins like they’re ours, because in many ways, they are.",
      extraText:
        "Passion isn’t about working 18-hour days. It’s about finding joy in the craft, pride in the process, and a deep desire to make something that matters.",
      subText: "Our passion reflects through:",
      points: [
        'Obsessing over the tiniest design details',
        'Celebrating your wins like our own',
        'Bringing joy and curiosity to every sprint',
        'Staying late because we *want* to, not because we have to'
      ]
    }
  },
  {
    icon: 'fas fa-users',
    title: 'Collaboration',
    description: 'We build with you, not just for you.',
    details: {
      strongText:
        "We don’t just want your approval — we want your voice. The best results happen when we bring together your insights and our expertise. No egos. No silos. Just real collaboration. We believe the best work doesn’t happen to you — it happens with you.",
      extraText:
        "You’ll be part of every step — from ideation to iteration. And if something doesn’t feel right to you, we talk, adapt, and improve — together.",
      subText: "Collaboration is how we win together:",
      points: [
        'Clear, two-way communication',
        'Figma, Slack, and Notion for real-time feedback',
        'Workshops that include all voices',
        'Your goals = our shared mission'
      ]
    }
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Trust',
    description: 'Long-term success begins with trust.',
    details: {
      strongText:
        "We earn your trust by doing what we say — not once, but every single time. When things go great, we share the credit. When things go wrong, we take the heat. We don't ghost you, dodge accountability, or play the blame game. We show up. Fully.",
      extraText:
        "Trust isn’t built on promises — it’s built on patterns. And we’re committed to creating a pattern of reliability you can count on for the long haul.",
      subText: "We nurture trust by:",
      points: [
        'Being transparent — even when it’s tough',
        'Delivering results, not excuses',
        'Prioritizing long-term relationships over short-term wins',
        'Treating your business like our own'
      ]
    }
  },
  {
    icon: 'fas fa-rocket',
    title: 'Impact',
    description: 'We don’t just build — we move the needle.',
    details: {
      strongText:
        "Likes are nice. Engagement is cool. But we’re not here for vanity metrics. We’re here to move the needle — whether that means more conversions, smoother workflows, or stronger brand equity. We start with your goals and reverse-engineer our process from there.",
      extraText:
        "Our focus is results that make you say: “That changed something.” Real growth. Real change. Real value. That’s what we show up to deliver — every time.",
      subText: "The impact we aim for includes:",
      points: [
        'Clear KPIs from day one',
        'Iterative improvements based on data',
        'Scalable, sustainable solutions',
        'Tangible results that align with your vision'
      ]
    }
  }
];



  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        {activeCard === null && (
          <>
            <div className={styles.heading}>
              <h2>Our Core Values</h2>
              <p>The principles that guide everything we do</p>
            </div>
            <div className={styles.grid}>
              {values.map((value, index) => (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => setActiveCard(index)}
                >
                  <div className={styles.icon}>
                    <i className={value.icon}></i>
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                  <span className={styles.clickHint}>
  Click to Learn More <i className="fas fa-arrow-right"></i>
</span>

                </div>
              ))}
            </div>
          </>
        )}

        {activeCard !== null && (
  <div className={styles.expandedView}>
    <div className={styles.expandedInner}>
      <div className={styles.expandedLeft}>
        <h2>{values[activeCard].title}</h2>
        <p>{values[activeCard].details.strongText}</p>
      </div>
      <div className={styles.expandedRight}>
        <p className={styles.subText}>{values[activeCard].details.subText}</p>
        <ul>
          {values[activeCard].details.points.map((point, i) => (
            <li key={i}>✓ {point}</li>
          ))}
        </ul>
      </div>
    </div>
    <button
      className={styles.backBtn}
      onClick={() => setActiveCard(null)}
    >
      ← Back to all values
    </button>
  </div>
)}

      </div>
    </section>
  );
};

export default Values;
