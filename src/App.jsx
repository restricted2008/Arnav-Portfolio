import { useState, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './lib/motion'

import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Lightbox from './components/Lightbox'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Designs from './components/Designs'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let ticking = false
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`
      ticking = false
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={ref} className="scroll-progress" />
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!loaded || reduced) return
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  }, [loaded, reduced])

  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <Lightbox />
      <ScrollProgress />

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Work />
          <Designs />
          <Skills />
          <Achievements />
          <Certifications />
          <Contact />
        </main>
      </div>
    </>
  )
}
