import { useRef, useEffect, useState, Suspense } from 'react';
import { personalInfo } from '../../data/portfolio';
import IntroScene from '../three/IntroScene';

export default function Hero({ isIntroPlaying, setIsIntroPlaying }) {
  const sectionRef = useRef(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let animationFrame;
    const startTime = Date.now();
    const duration = 10000; // 10 seconds

    const animate = () => {
      if (!isIntroPlaying) return;
      
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setTimeProgress(progress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsIntroPlaying(false);
      }
    };

    if (isIntroPlaying) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      setTimeProgress(1);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isIntroPlaying, setIsIntroPlaying]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.8)));
      setScrollOffset(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSkip = (e) => {
    e.preventDefault();
    setTimeProgress(1);
    setIsIntroPlaying(false);
  };

  // Dynamic styles based on time progress (fix structure from 7s to 9s)
  const fixProgress = Math.min(1, Math.max(0, (timeProgress - 0.7) * 5)); 
  const scatterAmt = 1 - fixProgress;
  const grayscaleValue = scatterAmt;

  // Hide fixed elements after scrolling past hero
  const heroVisible = scrollOffset < 0.95;

  return (
    <section id="home" ref={sectionRef} className="hero-section">
      {/* 3D Scene Background */}
      <div className="hero-3d-container" style={{
        opacity: heroVisible ? 1 : 0,
        pointerEvents: heroVisible ? 'none' : 'none',
        transition: 'opacity 0.5s ease',
      }}>
        <Suspense fallback={null}>
          <IntroScene timeProgress={timeProgress} />
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="hero-content" style={{
        filter: `grayscale(${grayscaleValue})`,
        opacity: heroVisible ? 1 : 0,
        pointerEvents: heroVisible ? 'auto' : 'none',
        transition: 'filter 0.3s ease, opacity 0.5s ease',
      }}>
        <div className="container">
          <div className="hero-text">
            <div className="hero-greeting" style={{
              transform: `translate(${-150 * scatterAmt}px, ${-80 * scatterAmt}px) rotate(${-15 * scatterAmt}deg)`,
              transition: 'transform 0.1s ease',
            }}>
              <span className="mono" style={{ color: 'var(--accent-secondary)', fontSize: '1rem' }}>
                {'// Hello World, I am'}
              </span>
            </div>

            <h1 className="hero-name" style={{
              transform: `translate(${200 * scatterAmt}px, ${-120 * scatterAmt}px) rotate(${12 * scatterAmt}deg)`,
              letterSpacing: `${scatterAmt * 15}px`,
              opacity: 1 - (scatterAmt * 0.3),
              transition: 'transform 0.1s ease, letter-spacing 0.1s ease, opacity 0.1s ease',
            }}>
              <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            <div className="hero-title-wrapper" style={{
              transform: `translate(${-250 * scatterAmt}px, ${150 * scatterAmt}px) rotate(${-8 * scatterAmt}deg)`,
              transition: 'transform 0.1s ease',
            }}>
              <h2 className="hero-title">
                {personalInfo.title}
              </h2>
            </div>

            <p className="hero-tagline" style={{
              transform: `translate(${180 * scatterAmt}px, ${200 * scatterAmt}px) rotate(${15 * scatterAmt}deg)`,
              transition: 'transform 0.1s ease',
            }}>
              {personalInfo.tagline}
            </p>

            <div className="hero-cta" style={{
              transform: `translate(${-100 * scatterAmt}px, ${250 * scatterAmt}px) rotate(${-5 * scatterAmt}deg)`,
              transition: 'transform 0.1s ease',
            }}>
              <a href="#projects" className="btn btn-primary">
                View My Work
                <span>→</span>
              </a>
              <a href="#contact" className="btn btn-outline">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Button during Intro */}
      {isIntroPlaying && (
        <div className="skip-intro" style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          zIndex: 100,
        }}>
          <button className="btn btn-outline" onClick={handleSkip} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Skip Intro ⏭
          </button>
        </div>
      )}

      {/* Scroll Indicator */}
      {heroVisible && !isIntroPlaying && (
        <div className="scroll-indicator" style={{
          opacity: scrollOffset < 0.1 ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to begin</span>
        </div>
      )}

      <style>{`
        .hero-section {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: flex-start;
          overflow: hidden;
        }
        .hero-3d-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
          pointer-events: none;
        }
        .hero-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          z-index: 2;
          pointer-events: none;
        }
        .hero-content .container {
          pointer-events: auto;
        }
        .hero-text {
          max-width: 700px;
        }
        .hero-greeting {
          margin-bottom: 12px;
        }
        .hero-name {
          margin-bottom: 8px;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .hero-title {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-title::before {
          content: '';
          display: inline-block;
          width: 40px;
          height: 2px;
          background: var(--accent-primary);
        }
        .hero-tagline {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: var(--text-muted);
          margin-bottom: 32px;
          max-width: 500px;
        }
        .hero-cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .scroll-indicator {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .scroll-mouse {
          width: 24px;
          height: 38px;
          border: 2px solid var(--text-muted);
          border-radius: 12px;
          position: relative;
        }
        .scroll-wheel {
          width: 4px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 4px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll-bounce 1.5s infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(10px); opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .hero-text {
            padding-top: 100px;
          }
          .hero-cta {
            flex-direction: column;
          }
          .hero-cta .btn {
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
