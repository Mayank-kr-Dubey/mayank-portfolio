import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { useSound } from '../../context/SoundContext';

const GuardHerScene = lazy(() => import('../three/projects/GuardHerScene'));
const BidVaultScene = lazy(() => import('../three/projects/BidVaultScene'));
const GoalkeepersScene = lazy(() => import('../three/projects/GoalkeepersScene'));

const sceneMap = {
  'guard-her': GuardHerScene,
  'bid-vault': BidVaultScene,
  'the-goalkeepers': GoalkeepersScene,
};

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Projects</h2>
          <p>Things I've built with passion and purpose</p>
          <div className="title-line"></div>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, idx) => {
            const SceneComponent = sceneMap[project.id];
            return (
              <motion.div
                key={project.id}
                className="project-card glass-card"
                initial={{ opacity: 0, y: 60 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.2 }}
              >
                <div className="project-layout">
                  {/* 3D Scene */}
                  <div className="project-3d-scene">
                    <Suspense fallback={
                      <div className="scene-loading">
                        <div className="loading-spinner"></div>
                        <span>Loading 3D Scene...</span>
                      </div>
                    }>
                      {SceneComponent && <SceneComponent />}
                    </Suspense>
                  </div>

                  {/* Project Info */}
                  <div className="project-info">
                    <div className="project-header">
                      <div>
                        <h3 style={{ color: project.color }}>{project.name}</h3>
                        <div className="project-meta">
                          <span className="badge">{project.year}</span>
                          <span className="badge" style={{ background: `${project.color}20`, color: project.color, borderColor: `${project.color}40` }}>
                            {project.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-features">
                      {project.features.map((feature, i) => (
                        <div key={i} className="feature-item">
                          <span className="feature-dot" style={{ background: project.color }}></span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="project-tech">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href={project.github}
                        className="btn btn-outline"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}>
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                      <a
                        href={project.demo}
                        className="btn btn-primary"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        style={{ background: project.color }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🚀 Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        .project-card {
          padding: 0;
          overflow: hidden;
        }
        .project-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          min-height: 400px;
        }
        .project-layout:nth-child(even) {
          direction: rtl;
        }
        .project-layout > * {
          direction: ltr;
        }
        .project-3d-scene {
          position: relative;
          min-height: 350px;
          background: radial-gradient(circle at center, rgba(var(--accent-primary-rgb), 0.05) 0%, var(--bg-primary) 70%);
          border-right: 1px solid var(--glass-border);
        }
        .scene-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 12px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--glass-border);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .project-info {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .project-header h3 {
          font-size: 1.6rem;
          margin-bottom: 8px;
        }
        .project-meta {
          display: flex;
          gap: 8px;
        }
        .project-description {
          font-size: 0.95rem;
          line-height: 1.7;
        }
        .project-features {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tech-badge {
          padding: 4px 10px;
          background: var(--bg-tertiary);
          color: var(--text-accent);
          border-radius: var(--border-radius-full);
          font-size: 0.75rem;
          font-family: var(--font-mono);
          border: 1px solid var(--glass-border);
        }
        .project-links {
          display: flex;
          gap: 12px;
          margin-top: auto;
          padding-top: 12px;
        }
        .project-links .btn {
          font-size: 0.85rem;
          padding: 10px 20px;
        }
        @media (max-width: 900px) {
          .project-layout {
            grid-template-columns: 1fr;
          }
          .project-3d-scene {
            min-height: 250px;
            border-right: none;
            border-bottom: 1px solid var(--glass-border);
          }
        }
      `}</style>
    </section>
  );
}
