import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { useSound } from '../../context/SoundContext';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);
  const sectionRef = useRef(null);
  const dropdownRef = useRef(null);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPhoneOptions(false);
      }
    };

    if (showPhoneOptions) {
      document.addEventListener('pointerdown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showPhoneOptions]);

  const handlePhoneClick = () => {
    playClick();
    setShowPhoneOptions(prev => !prev);
  };

  const handleEmailClick = () => {
    playClick();
    window.open(`mailto:${personalInfo.email}`, '_blank');
  };

  const handleSMS = () => {
    playClick();
    window.open(`sms:${personalInfo.phoneCountryCode}${personalInfo.phone}`, '_blank');
    setShowPhoneOptions(false);
  };

  const handleWhatsApp = () => {
    playClick();
    window.open(`https://wa.me/91${personalInfo.phone}`, '_blank');
    setShowPhoneOptions(false);
  };

  const handleCall = () => {
    playClick();
    window.open(`tel:${personalInfo.phoneCountryCode}${personalInfo.phone}`, '_self');
    setShowPhoneOptions(false);
  };

  const contactMethods = [
    {
      icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>,
      label: 'Email Me',
      value: personalInfo.email,
      color: '#8b5cf6',
      action: handleEmailClick,
    },
    {
      icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>,
      label: 'Call / Message',
      value: `+91 ${personalInfo.phone}`,
      color: '#06b6d4',
      action: handlePhoneClick,
      hasDropdown: true,
    },
    {
      icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
      label: 'LinkedIn',
      value: 'kr-mayankdubey',
      color: '#0a66c2',
      action: () => { playClick(); window.open(personalInfo.linkedin, '_blank'); },
    },
  ];

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <p>Let's build something amazing together</p>
          <div className="title-line"></div>
        </motion.div>

        <div className="contact-grid">
          {contactMethods.map((method, idx) => (
            <motion.div
              key={idx}
              className="contact-card glass-card"
              ref={method.hasDropdown ? dropdownRef : undefined}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: idx === 0 ? 3 : idx === 2 ? -3 : 0 }}
              onClick={method.action}
              onMouseEnter={playHover}
              style={{ cursor: 'pointer', '--card-color': method.color }}
            >
              <div className="contact-icon-wrapper" style={{ background: `${method.color}15`, borderColor: `${method.color}30` }}>
                <span className="contact-icon">{method.icon}</span>
              </div>
              <h4>{method.label}</h4>
              <p className="contact-value">{method.value}</p>
              <div className="contact-card-glow" style={{ background: method.color }}></div>

              {/* Phone Options Dropdown */}
              {method.hasDropdown && (
                <AnimatePresence>
                  {showPhoneOptions && (
                    <motion.div
                      className="phone-options"
                      initial={{ opacity: 0, y: -10, x: "-50%", scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                      exit={{ opacity: 0, y: -10, x: "-50%", scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="phone-option" onClick={handleCall}>
                        <span><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></span>
                        <div>
                          <strong>Call</strong>
                          <small>Make a voice call</small>
                        </div>
                      </button>
                      <button className="phone-option" onClick={handleSMS}>
                        <span><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg></span>
                        <div>
                          <strong>SMS</strong>
                          <small>Send a text message</small>
                        </div>
                      </button>
                      <button className="phone-option whatsapp" onClick={handleWhatsApp}>
                        <span><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.55 4.195 1.597 6.01L.068 24l6.104-1.603A11.968 11.968 0 0012.03 24c6.646 0 12.03-5.385 12.03-12.03S18.677 0 12.03 0zm5.96 17.202c-.255.72-1.488 1.4-2.046 1.46-.525.056-1.185.166-3.418-.755-2.737-1.13-4.512-3.92-4.65-4.103-.135-.184-1.11-1.48-1.11-2.825 0-1.346.7-2.012.95-2.288.24-.264.52-.33.69-.33.167 0 .334.004.485.011.16.007.375-.062.585.441.225.54.74 1.815.805 1.946.065.132.11.286.025.455-.084.17-.127.276-.252.424-.124.148-.266.326-.379.441-.124.124-.256.26-.112.51.144.25.642 1.06 1.378 1.716.945.84 1.745 1.099 1.996 1.224.25.125.395.105.542-.06.147-.165.632-.738.802-.99.17-.25.34-.208.57-.124.23.084 1.455.688 1.705.812.25.124.417.186.478.29.06.104.06.602-.196 1.32z"/></svg></span>
                        <div>
                          <strong>WhatsApp</strong>
                          <small>Message on WhatsApp</small>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="contact-cta"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            <span className="mono" style={{ color: 'var(--accent-secondary)' }}>{'// '}</span>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 900px;
          margin: 0 auto 48px;
        }
        .contact-card {
          text-align: center;
          padding: 36px 24px;
          position: relative;
          perspective: 1000px;
        }
        .contact-icon-wrapper {
          width: 68px;
          height: 68px;
          border-radius: var(--border-radius-lg);
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          transition: transform var(--transition-normal);
        }
        .contact-card:hover .contact-icon-wrapper {
          transform: scale(1.1);
        }
        .contact-icon {
          font-size: 1.8rem;
        }
        .contact-card h4 {
          font-size: 1.05rem;
          margin-bottom: 6px;
        }
        .contact-value {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--text-muted);
          word-break: break-all;
        }
        .contact-card-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        .contact-card:hover .contact-card-glow {
          opacity: 1;
          box-shadow: 0 0 20px currentColor;
        }
        .phone-options {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--border-radius-md);
          padding: 8px;
          z-index: 100;
          min-width: 220px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        .phone-option {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background: none;
          border: none;
          border-radius: var(--border-radius-sm);
          color: var(--text-primary);
          cursor: pointer;
          text-align: left;
          transition: background var(--transition-fast);
        }
        .phone-option:hover {
          background: rgba(var(--accent-primary-rgb), 0.1);
        }
        .phone-option span {
          font-size: 1.5rem;
        }
        .phone-option strong {
          display: block;
          font-size: 0.9rem;
        }
        .phone-option small {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        .phone-option.whatsapp:hover {
          background: rgba(37, 211, 102, 0.1);
        }
        .contact-cta {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }
        .contact-cta p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
}
