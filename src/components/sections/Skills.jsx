import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolio';
import { useSound } from '../../context/SoundContext';

const iconStyle = { width: '32px', height: '32px', objectFit: 'contain' };
const expressStyle = { ...iconStyle, filter: 'brightness(0) invert(1)' };

const skillIcons = {
  java: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" style={iconStyle} />,
  python: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" style={iconStyle} />,
  c: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" alt="C" style={iconStyle} />,
  cpp: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" style={iconStyle} />,
  mongodb: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" style={iconStyle} />,
  express: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" alt="Express" style={expressStyle} />,
  react: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" style={iconStyle} />,
  nodejs: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" style={iconStyle} />,
  swift: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" alt="Swift" style={iconStyle} />,
  html: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" style={iconStyle} />,
  css: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" style={iconStyle} />,
  javascript: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" style={iconStyle} />,
  marketing: '📢',
  problemsolving: '🧩',
  leadership: '👑',
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);
  const { playClick, playPop, playHover } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setBasketOpen(true), 400);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSkillClick = (skill) => {
    playClick();
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  const handleSkillHover = (skill) => {
    playHover();
    setHoveredSkill(skill);
  };

  const categories = [
    { key: 'language', label: 'Languages', icon: '💻' },
    { key: 'mern', label: 'MERN Stack', icon: '🔥' },
    { key: 'mobile', label: 'Mobile', icon: '📱' },
    { key: 'web', label: 'Web', icon: '🌐' },
    { key: 'soft', label: 'Soft Skills', icon: '🧠' },
  ];

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Skills & Expertise</h2>
          <p>Technologies and tools I work with</p>
          <div className="title-line"></div>
        </motion.div>

        {/* Skill Basket Animation */}
        <motion.div
          className="skill-basket-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={`skill-basket ${basketOpen ? 'open' : ''}`}>
            <div className="basket-body">
              <span className="basket-icon">🧺</span>
              <span className="basket-label">{basketOpen ? 'Skills Unleashed!' : 'My Skill Basket'}</span>
            </div>
            <div className="basket-glow"></div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              className="skill-category"
              initial={{ opacity: 0, y: 40 }}
              animate={basketOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + catIdx * 0.15 }}
            >
              <h4 className="category-title">
                <span>{cat.icon}</span> {cat.label}
              </h4>
              <div className="category-skills">
                {skills
                  .filter(s => s.category === cat.key)
                  .map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      className={`skill-item ${selectedSkill?.name === skill.name ? 'selected' : ''} ${hoveredSkill?.name === skill.name ? 'hovered' : ''}`}
                      initial={{ opacity: 0, scale: 0, y: -200, x: 0 }}
                      animate={basketOpen ? { opacity: 1, scale: 1, y: 0, x: 0 } : {}}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                        delay: 0.5 + catIdx * 0.15 + idx * 0.1,
                      }}
                      onClick={() => handleSkillClick(skill)}
                      onMouseEnter={() => handleSkillHover(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.08, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="skill-icon" style={{ '--skill-color': skill.color }}>
                        {skillIcons[skill.icon] || '⭐'}
                      </div>
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-color-bar" style={{ background: skill.color }}></div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="skill-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="skill-detail glass-card"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="skill-detail-header">
                  <span className="skill-detail-icon">
                    {skillIcons[selectedSkill.icon] || '⭐'}
                  </span>
                  <h4>{selectedSkill.name}</h4>
                  <button className="skill-detail-close" onClick={() => { setSelectedSkill(null); playClick(); }}>
                    ✕
                  </button>
                </div>
                <p>{selectedSkill.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .skill-basket-container {
          display: flex;
          justify-content: center;
          margin-bottom: 48px;
        }
        .skill-basket {
          position: relative;
          cursor: default;
        }
        .basket-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px 48px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--border-radius-xl);
          transition: all 0.5s ease;
        }
        .skill-basket.open .basket-body {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-glow-strong);
        }
        .basket-icon {
          font-size: 3rem;
          transition: transform 0.5s ease;
        }
        .skill-basket.open .basket-icon {
          transform: rotate(-15deg) scale(1.1);
          animation: float 2s ease-in-out infinite;
        }
        .basket-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .basket-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.15) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .skill-basket.open .basket-glow {
          opacity: 1;
        }
        .skills-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .skill-category {
          padding: 24px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--border-radius-lg);
        }
        .category-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--glass-border);
        }
        .category-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .skill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 20px;
          background: var(--bg-secondary);
          border: 1px solid transparent;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          min-width: 90px;
          position: relative;
          overflow: hidden;
          transition: all var(--transition-normal);
        }
        .skill-item:hover, .skill-item.hovered {
          border-color: var(--glass-border-hover);
          box-shadow: var(--shadow-glow);
          background: var(--bg-tertiary);
        }
        .skill-item.selected {
          border-color: var(--accent-primary);
          box-shadow: 0 0 20px rgba(var(--accent-primary-rgb), 0.3);
        }
        .skill-icon {
          font-size: 2rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--border-radius-md);
          background: rgba(var(--accent-primary-rgb), 0.08);
        }
        .skill-name {
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-align: center;
        }
        .skill-color-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        .skill-item:hover .skill-color-bar,
        .skill-item.selected .skill-color-bar {
          opacity: 1;
        }
        .skill-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .skill-detail {
          max-width: 450px;
          width: 100%;
          text-align: center;
          background: var(--bg-elevated);
          border: 1px solid var(--accent-primary);
          box-shadow: var(--shadow-glow-strong);
        }
        .skill-detail-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
          position: relative;
        }
        .skill-detail-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }
        .skill-detail-header h4 {
          font-size: 1.2rem;
        }
        .skill-detail-close {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 1.1rem;
          padding: 4px 8px;
          transition: color var(--transition-fast);
        }
        .skill-detail-close:hover {
          color: var(--accent-warm);
        }
        .skill-detail p {
          font-size: 0.95rem;
          line-height: 1.7;
        }
        @media (max-width: 640px) {
          .category-skills {
            justify-content: center;
          }
          .skill-item {
            min-width: 80px;
            padding: 12px 14px;
          }
        }
      `}</style>
    </section>
  );
}
