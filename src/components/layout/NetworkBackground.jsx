import { useEffect, useRef, useState } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Config
    const config = {
      particleCount: window.innerWidth < 768 ? 50 : 100,
      baseSize: 1.5,
      connectionDistance: 160,
      baseSpeed: 0.4,
      accentPrimary: '139, 92, 246',
      accentSecondary: '6, 182, 212',
    };

    // Helper to get CSS variables dynamically
    const updateThemeColors = () => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      const pColor = computed.getPropertyValue('--accent-primary-rgb').trim();
      const sColor = computed.getPropertyValue('--accent-secondary-rgb').trim();
      
      if (pColor && sColor) {
        config.accentPrimary = pColor;
        config.accentSecondary = sColor;
      }
    };

    updateThemeColors();

    let mouse = {
      x: null,
      y: null,
      radius: 250,
      isDown: false
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.baseSpeed;
        this.vy = (Math.random() - 0.5) * config.baseSpeed;
        this.size = Math.random() * 2 + config.baseSize;
        this.isSecondary = Math.random() > 0.5;
        this.targetColor = this.isSecondary ? config.accentSecondary : config.accentPrimary;
      }

      update() {
        // Update target color in case theme changed
        this.targetColor = this.isSecondary ? config.accentSecondary : config.accentPrimary;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges instead of hard bounce for a more fluid feel
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            
            // If mouse is down, pull particles in. Otherwise push them away gently.
            const force = (mouse.radius - distance) / mouse.radius;
            if (mouse.isDown) {
               this.x += forceDirectionX * force * 3;
               this.y += forceDirectionY * force * 3;
            } else {
               this.x -= forceDirectionX * force * 1.5;
               this.y -= forceDirectionY * force * 1.5;
            }
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.targetColor}, 0.3)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.targetColor}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      config.particleCount = window.innerWidth < 768 ? 50 : 100;
      
      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Create trailing effect by drawing semi-transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw mouse glow
      if (mouse.x != null && mouse.y != null) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        gradient.addColorStop(0, `rgba(${config.accentPrimary}, 0.08)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            // Check distance from mouse to enhance connection brightness
            let mouseDist = 9999;
            if (mouse.x != null && mouse.y != null) {
              const midX = (particles[i].x + particles[j].x) / 2;
              const midY = (particles[i].y + particles[j].y) / 2;
              mouseDist = Math.sqrt(Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2));
            }
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            let opacity = (1 - (distance / config.connectionDistance)) * 0.4;
            // Boost opacity if near mouse
            if (mouseDist < mouse.radius) {
              opacity += (1 - mouseDist / mouse.radius) * 0.25;
            }
            
            // Create a gradient line between two particles
            const lineGradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            lineGradient.addColorStop(0, `rgba(${particles[i].targetColor}, ${opacity})`);
            lineGradient.addColorStop(1, `rgba(${particles[j].targetColor}, ${opacity})`);
            
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = mouseDist < mouse.radius ? 1.5 : 0.8;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleMouseDown = () => { mouse.isDown = true; };
    const handleMouseUp = () => { mouse.isDown = false; };

    // MutationObserver to watch for theme changes on HTML tag
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateThemeColors();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    init();
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
};

export default NetworkBackground;
