import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef(null)
  const nameRef = useRef(null)
  const metaRef = useRef(null)
  const barRef = useRef(null)
  const pctRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (pctRef.current) pctRef.current.textContent = '100'
      if (barRef.current) barRef.current.style.width = '100%'
      const t = setTimeout(() => onComplete?.(), 400)
      return () => clearTimeout(t)
    }
    const tl = gsap.timeline()
    tl.fromTo(nameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(metaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
    const c = { v: 0 }
    tl.to(c, { v: 100, duration: 1.6, ease: 'power2.inOut',
      onUpdate: () => { if (pctRef.current) pctRef.current.textContent = String(Math.round(c.v)).padStart(3, '0'); if (barRef.current) barRef.current.style.width = c.v + '%' } }, '-=0.1')
    tl.to(overlayRef.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', onComplete: () => onComplete?.() }, '+=0.2')
  }, [onComplete])

  return (
    <div ref={overlayRef} style={{ position: 'fixed', inset: 0, zIndex: 99990, background: 'var(--paper)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(24px,5vw,56px)' }}>
      {/* top meta row */}
      <div ref={metaRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="meta meta-ink">Arnav Sharma©</span>
        <span className="meta">Delhi, India</span>
      </div>

      {/* center name */}
      <div ref={nameRef} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <span className="meta" style={{ marginBottom: '12px' }}>Graphic Designer · Performance Marketer</span>
        <h1 className="display" style={{ fontSize: 'clamp(64px, 17vw, 240px)', lineHeight: 0.82, color: 'var(--ink)' }}>
          ARNAV<br /><span style={{ WebkitTextStroke: '2px var(--ink)', color: 'transparent' }}>SHARMA</span>
        </h1>
      </div>

      {/* bottom progress */}
      <div>
        <div className="rule" style={{ marginBottom: '12px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
          <span className="meta">Loading Assets</span>
          <div style={{ flex: 1, height: '8px', border: '2px solid var(--ink)', position: 'relative', maxWidth: '420px' }}>
            <div ref={barRef} style={{ position: 'absolute', inset: 0, width: '0%', background: 'var(--accent)' }} />
          </div>
          <span className="display" style={{ fontSize: 'clamp(26px,4vw,48px)', color: 'var(--ink)' }}><span ref={pctRef}>000</span><span style={{ color: 'var(--accent-2)' }}>%</span></span>
        </div>
      </div>
    </div>
  )
}
