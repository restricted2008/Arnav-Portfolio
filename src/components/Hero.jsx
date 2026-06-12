import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroVisual from './HeroVisual'

const stats = [
  { value: 12, prefix: '₹', suffix: 'L+', label: 'Revenue Driven' },
  { value: 3.8, prefix: '', suffix: 'x', label: 'ROAS' },
  { value: 2300, prefix: '', suffix: '+', label: 'Orders' },
  { value: 1200, prefix: '', suffix: '+', label: 'SKUs' },
]

function Stat({ stat, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const o = { v: 0 }
    gsap.to(o, {
      v: stat.value, delay, duration: 1.8, ease: 'power2.out',
      onUpdate: () => {
        if (!ref.current) return
        ref.current.textContent = stat.prefix +
          (stat.value % 1 === 0 ? Math.round(o.v).toLocaleString() : o.v.toFixed(1)) + stat.suffix
      },
    })
  }, [stat, delay])
  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={ref} className="display" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', color: 'var(--gold)' }}>{stat.prefix}0{stat.suffix}</div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '6px' }}>{stat.label}</div>
    </div>
  )
}

export default function Hero() {
  const eyebrowRef = useRef(null)
  const l1 = useRef(null), l2 = useRef(null)
  const metaRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const visualRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const d = 2.2
    const tl = gsap.timeline({ delay: d })
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(l1.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power4.out' }, '-=0.3')
      .fromTo(l2.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power4.out' }, '-=0.6')
      .fromTo(metaRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
      .fromTo(descRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(visualRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, d * -1 + 0.3)
      .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: 'clamp(110px, 13vw, 140px) clamp(20px, 5vw, 56px) clamp(40px, 5vw, 64px)',
    }}>
      <div className="wrap" style={{ width: '100%' }}>
        <div className="row align-items-center g-4 gx-lg-5">
          {/* LEFT — text */}
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div ref={eyebrowRef} style={{ opacity: 0, marginBottom: '20px' }}>
              <span className="eyebrow">Designer · Marketer · Delhi</span>
            </div>

            <h1 style={{ marginBottom: '20px' }}>
              <span ref={l1} className="display" style={{ display: 'block', opacity: 0, fontSize: 'clamp(52px, 9vw, 108px)', color: 'var(--text)' }}>ARNAV</span>
              <span ref={l2} className="display grad-warm" style={{ display: 'block', opacity: 0, fontSize: 'clamp(52px, 9vw, 108px)' }}>SHARMA</span>
            </h1>

            <div ref={metaRef} style={{ opacity: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginBottom: '22px', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-soft)' }}>
              <span><span style={{ color: 'var(--muted)' }}>Role / </span>Graphic Designer &amp; Performance Marketer</span>
            </div>

            <p ref={descRef} style={{ opacity: 0, fontSize: 'clamp(14px, 1.6vw, 17px)', color: 'var(--text-soft)', lineHeight: 1.7, maxWidth: '460px', marginBottom: '30px' }}>
              I turn creative work into measurable revenue — design that converts,
              campaigns that scale. Backed by <span style={{ color: 'var(--cream)', fontWeight: 600 }}>₹12L+ in real sales</span>.
            </p>

            <div ref={ctaRef} style={{ opacity: 0, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#work" className="btn-neu" onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}>▶ See My Work</a>
              <a href="#contact" className="btn-ghost" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>Contact Me</a>
            </div>
          </div>

          {/* RIGHT — animated visual */}
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div ref={visualRef} style={{ opacity: 0 }}>
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* stats */}
        <div ref={statsRef} className="neu" style={{ opacity: 0, marginTop: 'clamp(28px, 4vw, 44px)', padding: '22px clamp(18px, 4vw, 40px)' }}>
          <div className="row g-3">
            {stats.map((s, i) => (
              <div key={s.label} className="col-6 col-md-3">
                <Stat stat={s} delay={2.3 + i * 0.12} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
