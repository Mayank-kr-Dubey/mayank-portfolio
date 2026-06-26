import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolio';

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Experience</h2>
          <p>Professional simulations and industry experience</p>
          <div className="title-line"></div>
        </motion.div>

        <div className="timeline">
          <div className="timeline-line"></div>
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
            >
              <div className="timeline-dot">
                <span>{exp.icon}</span>
              </div>
              <div className="timeline-card glass-card">
                <span className="timeline-period">{exp.period}</span>
                <h4>{exp.title}</h4>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px 0;
        }
        .timeline-line {
          position: absolute;
          left: 24px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--gradient-primary);
          opacity: 0.3;
        }
        .timeline-item {
          position: relative;
          padding-left: 64px;
          margin-bottom: 32px;
        }
        .timeline-dot {
          position: absolute;
          left: 12px;
          top: 24px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 2px solid var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          z-index: 1;
          box-shadow: 0 0 15px rgba(var(--accent-primary-rgb), 0.3);
        }
        .timeline-card {
          position: relative;
        }
        .timeline-period {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-secondary);
          font-weight: 500;
        }
        .timeline-card h4 {
          margin: 8px 0 4px;
          font-size: 1.15rem;
        }
        .timeline-company {
          color: var(--accent-primary);
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 8px;
        }
        .timeline-desc {
          font-size: 0.9rem;
          line-height: 1.6;
        }
        @media (max-width: 640px) {
          .timeline-item {
            padding-left: 52px;
          }
        }
      `}</style>
    </section>
  );
}
