import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const stats = [
  { value: 12, prefix: '₹', suffix: 'L+', label: 'Annual Revenue' },
  { value: 3.8, prefix: '', suffix: 'x', label: 'ROAS' },
  { value: 2300, prefix: '', suffix: '+', label: 'Amazon Orders' },
  { value: 1200, prefix: '', suffix: '+', label: 'SKUs Branded' },
]

function StatPill({ stat, delay }) {
  const numRef = useRef(null)
  const pillRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(pillRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, delay, ease: 'power3.out' }
    )
    const obj = { v: 0 }
    gsap.to(obj, {
      v: stat.value, delay: delay + 0.2, duration: 1.8, ease: 'power2.out',
      onUpdate: () => {
        if (!numRef.current) return
        numRef.current.textContent = stat.prefix +
          (stat.value % 1 === 0 ? Math.round(obj.v).toLocaleString() : obj.v.toFixed(1)) +
          stat.suffix
      },
    })
  }, [stat, delay])

  return (
    <div ref={pillRef} style={{ opacity: 0, textAlign: 'center' }}>
      <div ref={numRef} style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(28px, 3.5vw, 44px)',
        letterSpacing: '-0.03em',
        color: 'var(--terra)',
        lineHeight: 1,
      }}>
        {stat.prefix}0{stat.suffix}
      </div>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '9px', letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--warm-gray)',
        marginTop: '6px',
      }}>{stat.label}</div>
    </div>
  )
}

export default function Hero() {
  const nameRef1 = useRef(null)
  const nameRef2 = useRef(null)
  const badgeRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const photoRef = useRef(null)
  const statsRef = useRef(null)
  const frameRef = useRef(null)
  const rotatingRef = useRef(null)

  useEffect(() => {
    const delay = 2.2
    const tl = gsap.timeline({ delay })

    tl.fromTo(badgeRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo(nameRef1.current, { opacity: 0, y: 80, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power4.out' }, '-=0.2')
      .fromTo(nameRef2.current, { opacity: 0, y: 80, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power4.out' }, '-=0.7')
      .fromTo(descRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(photoRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, delay * -1 + 0.1)
      .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')

    gsap.to(rotatingRef.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' })

    gsap.to(frameRef.current, {
      y: -12, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut',
    })
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      background: 'var(--cream)',
      padding: 'clamp(100px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>

      {/* Decorative background shapes */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%', width: '40vw', height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(194,76,21,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-5%', width: '30vw', height: '30vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,58,45,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* LEFT: Typography */}
        <div>
          {/* Badge */}
          <div ref={badgeRef} style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#22C55E', display: 'inline-block',
            }} className="pulse-dot" />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.2em',
              color: 'var(--warm-gray)', textTransform: 'uppercase',
            }}>Available for work · Delhi, India</span>
          </div>

          {/* Huge name */}
          <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
            <h1 ref={nameRef1} style={{
              opacity: 0,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(72px, 13vw, 160px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--dark)',
            }}>ARNAV</h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '32px' }}>
            <h1 ref={nameRef2} style={{
              opacity: 0,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(72px, 13vw, 160px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              WebkitTextStroke: '2px var(--terra)',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}>SHARMA</h1>
          </div>

          {/* Descriptor */}
          <p ref={descRef} style={{
            opacity: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'var(--warm-gray)',
            lineHeight: 1.6,
            maxWidth: '480px',
            marginBottom: '36px',
            fontWeight: 400,
          }}>
            Graphic Designer &amp; Performance Marketer who turns creative work into{' '}
            <span style={{ color: 'var(--dark)', fontWeight: 600 }}>measurable revenue</span>.
            Design that converts. Marketing that scales.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ opacity: 0, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#work" className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See My Work
            </a>
            <a href="mailto:2008arnavsharma@gmail.com" className="btn-outline">
              Get in Touch
            </a>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div ref={photoRef} style={{ opacity: 0, position: 'relative', flexShrink: 0 }}>
          {/* Decorative frame behind photo */}
          <div ref={frameRef} style={{
            position: 'absolute',
            top: '-16px', right: '-16px',
            width: 'clamp(200px, 28vw, 380px)',
            height: 'clamp(220px, 30vw, 400px)',
            border: '2px solid var(--terra)',
            borderRadius: '8px',
            opacity: 0.25,
          }} />

          {/* Photo */}
          <div style={{
            position: 'relative',
            width: 'clamp(200px, 28vw, 380px)',
            height: 'clamp(220px, 30vw, 400px)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}>
            <img src="/assets/pfp.png" alt="Arnav Sharma" style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              display: 'block',
            }} />
            {/* Warm overlay tint */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(28,17,8,0.4) 0%, transparent 50%)',
            }} />
          </div>

          {/* Rotating badge */}
          <div style={{
            position: 'absolute', bottom: '-24px', left: '-24px',
            width: '80px', height: '80px',
          }}>
            <svg ref={rotatingRef} viewBox="0 0 80 80" style={{ width: '100%', height: '100%' }}>
              <defs>
                <path id="circlePath" d="M 40,40 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" />
              </defs>
              <text style={{ fontSize: '8.5px', fill: 'var(--terra)', fontFamily: "'Space Mono', monospace", letterSpacing: '2px' }}>
                <textPath href="#circlePath">DESIGNER · MARKETER · DELHI ·&nbsp;</textPath>
              </text>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: '13px',
                color: 'var(--terra)',
              }}>AS</span>
            </div>
          </div>

          {/* Floating tag */}
          <div style={{
            position: 'absolute', top: '16px', left: '-20px',
            background: 'var(--terra)', color: '#fff',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '11px',
            padding: '6px 14px', borderRadius: '3px',
            whiteSpace: 'nowrap',
          }} className="float-delayed">
            BCA · 8.9 GPA
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} style={{
        opacity: 0,
        maxWidth: '1200px', margin: '60px auto 0', width: '100%',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px', background: 'var(--border)',
        border: '1px solid var(--border)', borderRadius: '6px',
        overflow: 'hidden',
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            background: 'var(--cream)',
            padding: '24px',
            textAlign: 'center',
          }}>
            <StatPill stat={s} delay={2.2 + i * 0.12} />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '8px', letterSpacing: '0.25em',
          color: 'var(--warm-gray)', textTransform: 'uppercase',
        }}>Scroll</span>
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(180deg, var(--terra), transparent)',
        }} className="float" />
      </div>
    </section>
  )
}
