import { personalInfo } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-bracket">{'<'}</span>
            MKD
            <span className="logo-bracket">{'/>'}</span>
          </div>
          <p className="footer-text">
            Designed & Built by <span className="gradient-text">{personalInfo.name}</span>
          </p>
          <div className="footer-links">
            <a href={`mailto:${personalInfo.email}`} target="_blank" rel="noopener noreferrer" aria-label="Email">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.814 1.102.814 2.222v3.293c0 .319.218.694.825.576C20.565 21.79 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 40px 0;
          border-top: 1px solid var(--glass-border);
          background: var(--bg-secondary);
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        .footer-logo {
          font-family: var(--font-mono);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .footer-logo .logo-bracket {
          color: var(--accent-primary);
        }
        .footer-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .footer-links {
          display: flex;
          gap: 16px;
        }
        .footer-links a {
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
        .footer-links a:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-glow);
          transform: translateY(-3px);
        }
        .footer-copy {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `}</style>
    </footer>
  );
}
