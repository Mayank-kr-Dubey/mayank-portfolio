import { useState, useEffect, useCallback } from 'react';
import { navLinks } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';
import '../../styles/components/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playClick, playHover } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    playClick();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }, [playClick]);

  const handleThemeToggle = () => {
    playClick();
    toggleTheme();
  };

  const handleSoundToggle = () => {
    toggleSound();
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="logo-bracket">{'<'}</span>
            MKD
            <span className="logo-bracket">{'/>'}</span>
          </div>

          <ul className="navbar-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={playHover}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <button
              className="navbar-toggle-btn"
              onClick={handleThemeToggle}
              onMouseEnter={playHover}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              className={`navbar-toggle-btn ${soundEnabled ? 'sound-on' : ''}`}
              onClick={handleSoundToggle}
              onMouseEnter={playHover}
              title={`Sound ${soundEnabled ? 'ON' : 'OFF'}`}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => { setMobileOpen(prev => !prev); playClick(); }}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href.replace('#', '') ? 'active' : ''}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}
