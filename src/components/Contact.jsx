import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    )
  }, [])

  return (
    <section id="contact" ref={sectionRef} style={{
      background: 'var(--sage)',
      padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle texture dots */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06,
        backgroundImage: 'radial-gradient(circle, #FAF8F3 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div ref={contentRef} style={{
        opacity: 0,
        maxWidth: '800px', margin: '0 auto',
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(250,248,243,0.4)',
          display: 'block', marginBottom: '24px',
        }}>07 — Let's Talk</span>

        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: 'clamp(44px, 7vw, 80px)',
          letterSpacing: '-0.04em', lineHeight: 1,
          color: '#FAF8F3', marginBottom: '24px',
        }}>
          Ready to build<br />
          <span style={{
            WebkitTextStroke: '2px var(--amber)',
            WebkitTextFillColor: 'transparent',
          }}>something great?</span>
        </h2>

        <p style={{
          fontSize: '16px', color: 'rgba(250,248,243,0.6)',
          lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 48px',
        }}>
          Whether you need design, performance marketing, or both — I'm open to freelance projects, full-time roles, and creative collaborations.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
          <a href="mailto:2008arnavsharma@gmail.com" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em',
            textDecoration: 'none', color: 'var(--sage)', background: '#FAF8F3',
            padding: '16px 44px', borderRadius: '3px', display: 'inline-block',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FAF8F3'; e.currentTarget.style.color = 'var(--sage)'; e.currentTarget.style.transform = 'none' }}
          >2008arnavsharma@gmail.com</a>

          <a href="tel:+919289811877" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: '14px', letterSpacing: '0.06em',
            textDecoration: 'none', color: '#FAF8F3',
            padding: '15px 44px', borderRadius: '3px', display: 'inline-block',
            border: '1.5px solid rgba(250,248,243,0.25)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.color = 'var(--amber)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,248,243,0.25)'; e.currentTarget.style.color = '#FAF8F3' }}
          >+91 9289811877</a>
        </div>

        {/* Social row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/arnav-sharma-2bbb9837a/' },
            { label: 'Email', href: 'mailto:2008arnavsharma@gmail.com' },
            { label: 'murliwale.com', href: 'http://murliwale.com/' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px', fontWeight: 500,
              color: 'rgba(250,248,243,0.5)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,248,243,0.5)'}
            >{s.label} →</a>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(250,248,243,0.1)',
          paddingTop: '28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '18px', color: '#FAF8F3',
          }}>Arnav Sharma</span>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', color: 'rgba(250,248,243,0.3)',
            letterSpacing: '0.1em',
          }}>Delhi · India · {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  )
}
