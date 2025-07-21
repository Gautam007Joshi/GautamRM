'use client';

import React, { useState } from 'react';
import {
  Search,
  Lightbulb,
  Rocket,
  BarChart,
  RefreshCw,
} from 'lucide-react';
import styles from '@/styles/about/aboutProcess.module.css';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';



const steps = [
  {
    icon: Search,
    title: 'Discovery & Research',
    description:
      'We start by truly understanding your business — not just the numbers, but the heart behind it.',
    phase: '01',
    details: `Before we touch strategy or design, we sit down (virtually or over coffee) to really *get you*. We explore your story, your market, and what your audience actually cares about. No assumptions — just honest curiosity. This phase sets the tone for everything that follows.`,
  },
  {
    icon: Lightbulb,
    title: 'Strategy Development',
    description:
      'Based on what we’ve learned, we craft a strategy that actually makes sense for *you*.',
    phase: '02',
    details: `There’s no one-size-fits-all here. Whether you're launching a startup or scaling a 10-year-old business, we build a roadmap that aligns with *your* goals. Every decision is backed by research, tailored to your brand voice, and designed to make real impact — not just look good in a pitch deck.`,
  },
  {
    icon: Rocket,
    title: 'Campaign Launch',
    description:
      'With the plan in place, we bring it to life — in your tone, with your audience, on your timeline.',
    phase: '03',
    details: `This is where the sparks fly. We execute the creative, schedule content, set up targeting, and launch your campaigns across the platforms that matter. You’ll always know what’s going out, when, and why — because transparency builds trust.`,
  },
  {
    icon: BarChart,
    title: 'Monitor & Analyze',
    description:
      'Once live, we don’t just let it run — we stay on top of the data and adjust fast.',
    phase: '04',
    details: `We're not the kind of team that disappears after launch. We watch performance in real time, track KPIs that *you* care about (not just vanity metrics), and constantly ask: what's working, and what could work better? You'll get updates without jargon — just honest insights.`,
  },
  {
    icon: RefreshCw,
    title: 'Optimize & Scale',
    description:
      'When we find what works, we double down. When we see gaps, we fix them.',
    phase: '05',
    details: `We treat your brand like it’s our own. That means scaling winning strategies, refining weaker ones, and staying agile as your goals evolve. Growth isn’t a finish line — it’s an ongoing process, and we’re here for the long haul, not just the launch.`,
  },
];


const Process = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();


  const toggleDetail = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section id="process" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <h2 className={styles.heading}>
            <span className={styles.gradientText}>Our Process</span>
          </h2>
          <p className={styles.subtext}>
            A proven methodology that delivers consistent results for our
            clients
          </p>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.verticalLine}></div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.stepRow} ${
                index % 2 === 0 ? styles.normal : styles.reverse
              }`}
            >
              <div className={styles.stepContent}>
                <div
                  className={`${styles.card} ${
                    openIndex === index ? styles.cardActive : ''
                  }`}
                  onClick={() => toggleDetail(index)}
                >
                  <div className={styles.cardTop}>
  <span className={styles.phase}>{step.phase}</span>
  <div className={styles.iconBox}>
    <step.icon className={styles.icon} />
  </div>
  <div className={styles.expandIcon}>
    <ChevronDown
      className={`${styles.chevron} ${
        openIndex === index ? styles.rotate : ''
      }`}
    />
  </div>
</div>

                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>
                    {step.description}
                  </p>

                  {/* Expanded content */}
                  {openIndex === index && (
                    <div className={styles.detail}>
                      <p>{step.details}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.iconCircleContainer}>
  <div className={styles.pingWrapper}>
    <div className={styles.ping}></div>
    <div className={styles.iconCircle}>
      <step.icon className={styles.iconLarge} />
    </div>
  </div>
</div>


              <div className={styles.spacer}></div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <button
  className={styles.ctaButton}
  onClick={() => router.push('/start-campaign')}
>
  Let’s Build Something Together
</button>

        </div>
      </div>
    </section>
  );
};

export default Process;
