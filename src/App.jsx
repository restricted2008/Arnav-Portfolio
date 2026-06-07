import { useState, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import About from './components/About'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${window.scrollY / total})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div ref={barRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
      zIndex: 9998, transform: 'scaleX(0)', transformOrigin: 'left',
      background: 'linear-gradient(90deg, var(--terra), var(--amber))',
    }} />
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    gsap.ticker.lagSmoothing(0)

    return () => lenis.destroy()
  }, [loaded])

  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <ScrollProgress />

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <main>
          {/* 1 - Who I am */}
          <Hero />
          <Marquee />
          {/* 2 - Education (inside About) */}
          <About />
          {/* 3 - Experience / Work */}
          <Work />
          {/* 4 - Skills */}
          <Skills />
          {/* 5 - Recognitions & Achievements */}
          <Achievements />
          {/* 6 - Certifications */}
          <Certifications />
          {/* Contact */}
          <Contact />
        </main>
      </div>
    </>
  )
}
