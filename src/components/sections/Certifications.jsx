import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../../data/portfolio';

export default function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Certifications & Achievements</h2>
          <p>Recognition of skills and accomplishments</p>
          <div className="title-line"></div>
        </motion.div>

        <div className="cert-grid">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              className="cert-card glass-card"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="cert-shimmer"></div>
              <div className="cert-icon">{cert.icon}</div>
              <h4 className="cert-name">{cert.name}</h4>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .cert-card {
          text-align: center;
          position: relative;
          overflow: hidden;
          padding: 32px 24px;
        }
        .cert-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(var(--accent-primary-rgb), 0.05),
            transparent
          );
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .cert-card:hover .cert-shimmer {
          left: 100%;
        }
        .cert-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }
        .cert-name {
          font-size: 1rem;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .cert-issuer {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 500;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .cert-date {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .cert-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
