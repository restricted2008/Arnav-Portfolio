import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Logo from './Logo'

export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subRef = useRef(null)
  const barRef = useRef(null)
  const pctRef = useRef(null)
  const orbRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.to(orbRef.current, { rotation: 360, duration: 14, repeat: -1, ease: 'none' })

    tl.fromTo(logoRef.current, { opacity: 0, y: 16, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' })
      .fromTo(line1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, '-=0.2')
      .fromTo(line2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, '-=0.45')
      .fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

    const c = { v: 0 }
    tl.to(c, {
      v: 100, duration: 1.7, ease: 'power2.inOut',
      onUpdate: () => { if (pctRef.current) pctRef.current.textContent = Math.round(c.v) + '%'; if (barRef.current) barRef.current.style.width = c.v + '%' },
    }, '-=0.3')

    tl.to([logoRef.current, line1Ref.current, line2Ref.current, subRef.current], { y: -24, opacity: 0, duration: 0.45, ease: 'power2.in', stagger: 0.04 }, '+=0.25')
    tl.to(overlayRef.current, { scaleY: 0, transformOrigin: 'top center', duration: 0.8, ease: 'power4.inOut', onComplete: () => onComplete?.() }, '-=0.15')
  }, [onComplete])

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 99990,
      background: 'linear-gradient(168deg, #211810, #1A130E 58%, #140E09)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transformOrigin: 'top center', overflow: 'hidden', padding: '24px',
    }}>
      {/* ambient glow + rotating ring */}
      <div style={{ position: 'absolute', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,31,0.12), transparent 65%)', pointerEvents: 'none' }} />
      <svg ref={orbRef} viewBox="0 0 200 200" style={{ position: 'absolute', width: 'min(78vw, 540px)', height: 'min(78vw, 540px)', opacity: 0.35, pointerEvents: 'none' }}>
        <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,120,60,0.3)" strokeWidth="1" strokeDasharray="2 12" />
      </svg>

      {/* logo */}
      <div ref={logoRef} style={{ marginBottom: '34px', position: 'relative' }}>
        <Logo size={52} showWord={false} id="load" />
      </div>

      {/* quote */}
      <div style={{ textAlign: 'center', position: 'relative', maxWidth: '900px' }}>
        <div style={{ overflow: 'hidden' }}>
          <h1 ref={line1Ref} className="display" style={{ fontSize: 'clamp(34px, 7vw, 84px)', color: 'var(--cream)', lineHeight: 1.02 }}>
            Minimalism kills
          </h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h1 ref={line2Ref} className="display" style={{ fontSize: 'clamp(34px, 7vw, 84px)', lineHeight: 1.06 }}>
            the <span className="grad-warm" style={{ fontStyle: 'italic' }}>Creativity</span>
          </h1>
        </div>
        <div ref={subRef} style={{ marginTop: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: 26, height: 1.5, background: 'var(--muted)', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase' }}>Arnav Sharma · Portfolio</span>
          <span style={{ width: 26, height: 1.5, background: 'var(--muted)', display: 'inline-block' }} />
        </div>
      </div>

      {/* progress */}
      <div style={{ position: 'absolute', bottom: '52px', left: '50%', transform: 'translateX(-50%)', width: '200px' }}>
        <div style={{ width: '100%', height: '2px', background: 'rgba(255,180,120,0.12)', borderRadius: '2px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>
          <div ref={barRef} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '0%', background: 'linear-gradient(90deg, #FFC861, #FF5A1F)', borderRadius: '2px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.2em' }}>LOADING</span>
          <span ref={pctRef} style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--gold)' }}>0%</span>
        </div>
      </div>
    </div>
  )
}
