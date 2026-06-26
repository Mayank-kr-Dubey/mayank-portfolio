import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data/portfolio';

export default function Education() {
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
    <section id="education" className="section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Education</h2>
          <p>My academic journey</p>
          <div className="title-line"></div>
        </motion.div>

        <div className="education-grid">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              className="education-card glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="edu-icon">{edu.icon}</div>
              <div className="edu-content">
                <h4>{edu.degree}</h4>
                <p className="edu-institution">{edu.institution}</p>
                <span className="edu-period">{edu.period}</span>
                {edu.score && (
                  <div className="edu-score">
                    <div className="score-bar">
                      <div
                        className="score-fill"
                        style={{ width: edu.score }}
                      ></div>
                    </div>
                    <span className="score-label">{edu.score}</span>
                  </div>
                )}
                {edu.current && (
                  <span className="current-badge">
                    <span className="pulse-dot"></span>
                    Currently Pursuing
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .education-card {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .edu-icon {
          font-size: 2.2rem;
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(var(--accent-primary-rgb), 0.08);
          border-radius: var(--border-radius-md);
        }
        .edu-content {
          flex: 1;
        }
        .edu-content h4 {
          font-size: 1.05rem;
          margin-bottom: 4px;
        }
        .edu-institution {
          color: var(--accent-primary);
          font-weight: 500;
          font-size: 0.9rem;
          margin-bottom: 4px;
        }
        .edu-period {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .edu-score {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        .score-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: var(--border-radius-full);
          overflow: hidden;
        }
        .score-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: var(--border-radius-full);
          transition: width 1s ease;
        }
        .score-label {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent-secondary);
          font-weight: 600;
        }
        .current-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          padding: 4px 12px;
          background: rgba(52, 211, 153, 0.1);
          color: #34d399;
          border-radius: var(--border-radius-full);
          font-size: 0.78rem;
          font-weight: 500;
          border: 1px solid rgba(52, 211, 153, 0.2);
        }
        .pulse-dot {
          width: 6px;
          height: 6px;
          background: #34d399;
          border-radius: 50%;
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
}
