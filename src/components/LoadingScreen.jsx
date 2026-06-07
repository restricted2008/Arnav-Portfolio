import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef(null)
  const monogramRef = useRef(null)
  const barRef = useRef(null)
  const percentRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(monogramRef.current,
      { opacity: 0, scale: 0.85, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )

    const counter = { val: 0 }
    tl.to(counter, {
      val: 100, duration: 1.8, ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) percentRef.current.textContent = Math.round(counter.val) + '%'
        if (barRef.current) barRef.current.style.width = counter.val + '%'
      },
    }, '-=0.2')

    tl.to(monogramRef.current, { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.2')
    tl.to(overlayRef.current, {
      scaleY: 0, transformOrigin: 'top center',
      duration: 0.8, ease: 'power4.inOut',
      onComplete: () => onComplete?.(),
    }, '-=0.1')
  }, [onComplete])

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 99990,
      background: 'var(--cream)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transformOrigin: 'top center',
    }}>
      <div ref={monogramRef} style={{ textAlign: 'center', opacity: 0 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(80px, 14vw, 140px)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1,
          color: 'var(--dark)',
        }}>
          A<span style={{ color: 'var(--terra)' }}>S</span>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px', letterSpacing: '0.3em',
          color: 'var(--warm-gray)', marginTop: '12px', textTransform: 'uppercase',
        }}>
          Arnav Sharma
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '56px', left: '50%',
        transform: 'translateX(-50%)', width: '180px',
      }}>
        <div style={{
          width: '100%', height: '1px', background: 'var(--border)', marginBottom: '8px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div ref={barRef} style={{
            position: 'absolute', top: 0, left: 0, height: '100%', width: '0%',
            background: 'linear-gradient(90deg, var(--terra), var(--amber))',
            transition: 'none',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span ref={percentRef} style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', color: 'var(--warm-gray)',
          }}>0%</span>
        </div>
      </div>
    </div>
  )
}
