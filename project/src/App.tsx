import { MotionConfig } from 'framer-motion';
import AmbientBackground from '@/components/layout/AmbientBackground';
import CustomCursor from '@/components/layout/CustomCursor';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import SmoothScroll from '@/components/layout/SmoothScroll';
import About from '@/components/about/About';
import Contact from '@/components/contact/Contact';
import Hero from '@/components/hero/Hero';
import Journey from '@/components/journey/Journey';
import TechMarquee from '@/components/marquee/TechMarquee';
import Projects from '@/components/projects/Projects';
import Skills from '@/components/skills/Skills';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <AmbientBackground />
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </MotionConfig>
  );
}
