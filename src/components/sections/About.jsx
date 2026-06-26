import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

export default function About() {
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
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <div className="title-line"></div>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-photo-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about-photo-ring">
              <div className="about-photo">
                <img src={personalInfo.profilePhoto} alt={personalInfo.name} />
              </div>
            </div>
            <div className="about-photo-glow"></div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="about-intro">
              <span className="mono" style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem' }}>
                {'// who am i?'}
              </span>
              <h3>A passionate developer who loves building things</h3>
            </div>

            <p className="about-bio">{personalInfo.bio}</p>

            <div className="about-stats">
              <div className="stat-item glass-card">
                <span className="stat-number gradient-text">3+</span>
                <span className="stat-label">Projects Led</span>
              </div>
              <div className="stat-item glass-card">
                <span className="stat-number gradient-text">3rd</span>
                <span className="stat-label">Year B.E. CSE</span>
              </div>
              <div className="stat-item glass-card">
                <span className="stat-number gradient-text">6+</span>
                <span className="stat-label">Certifications</span>
              </div>
              <div className="stat-item glass-card">
                <span className="stat-number gradient-text">5+</span>
                <span className="stat-label">Hackathons</span>
              </div>
            </div>

            <div className="about-actions">
              <a href={personalInfo.resumeLink} className="btn btn-primary" download>
                📄 Download Resume
              </a>
              <div className="about-socials">
                <a href={`mailto:${personalInfo.email}`} className="social-link" title="Email" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
                <a href={personalInfo.linkedin} className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href={personalInfo.github} className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: center;
        }
        .about-photo-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .about-photo-ring {
          position: relative;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          padding: 4px;
          background: var(--gradient-primary);
        }
        .about-photo-ring::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: var(--gradient-warm);
          z-index: -1;
          filter: blur(15px);
          opacity: 0.5;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .about-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--bg-primary);
        }
        .about-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .about-photo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about-intro h3 {
          font-size: 1.6rem;
          margin-top: 8px;
        }
        .about-bio {
          font-size: 1.05rem;
          line-height: 1.8;
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin: 8px 0;
        }
        .stat-item {
          text-align: center;
          padding: 16px 8px;
        }
        .stat-number {
          display: block;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .about-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 8px;
        }
        .about-socials {
          display: flex;
          gap: 10px;
        }
        .social-link {
          width: 44px;
          height: 44px;
          border-radius: var(--border-radius-full);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all var(--transition-normal);
        }
        .social-link:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-glow);
          transform: translateY(-3px) scale(1.05);
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .about-actions {
            justify-content: center;
            flex-wrap: wrap;
          }
          .about-photo-ring {
            width: 220px;
            height: 220px;
          }
        }
      `}</style>
    </section>
  );
}
