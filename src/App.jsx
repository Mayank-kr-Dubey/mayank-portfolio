import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import NetworkBackground from './components/layout/NetworkBackground';
import './styles/index.css';

function App() {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  useEffect(() => {
    if (isIntroPlaying) {
      document.body.classList.add('intro-locked');
      // Scroll to top on load to ensure intro is seen from top
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove('intro-locked');
    }
  }, [isIntroPlaying]);

  return (
    <ThemeProvider>
      <SoundProvider>
        <div className="app">
          <NetworkBackground />
          <Navbar />
          <main>
            <Hero isIntroPlaying={isIntroPlaying} setIsIntroPlaying={setIsIntroPlaying} />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </div>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
