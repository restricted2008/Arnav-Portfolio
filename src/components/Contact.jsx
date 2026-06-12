import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=2008arnavsharma@gmail.com'

const footerCols = [
  { head: 'Navigate', items: [
    { label: 'Home', href: '#hero' }, { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' }, { label: 'Skills', href: '#skills' },
  ]},
  { head: 'Connect', items: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/arnav-sharma-2bbb9837a/' },
    { label: 'murliwale.com', href: 'http://murliwale.com/' },
  ]},
  { head: 'Contact', items: [
    { label: '2008arnavsharma@gmail.com', href: GMAIL },
    { label: '+91 9289811877', href: 'tel:+919289811877' },
    { label: 'Delhi — 110008', href: null },
  ]},
]

export default function Contact() {
  const sectionRef = useRef(null)
  const ctaRef = useRef(null)
  const footRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } })
    gsap.fromTo(footRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: footRef.current, start: 'top 92%' } })
  }, [])

  const go = (e, href) => { if (href && href.startsWith('#')) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) } }

  return (
    <section id="contact" ref={sectionRef} className="section" style={{ paddingBottom: 'clamp(36px, 5vw, 56px)' }}>
      <div className="wrap">
        {/* CTA */}
        <div ref={ctaRef} className="card-orange" style={{ opacity: 0, padding: 'clamp(40px, 6vw, 76px) clamp(26px, 5vw, 56px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="glow-breathe" style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '70%', height: '160%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Let's Talk</span>
            <h2 className="display" style={{ fontSize: 'clamp(38px, 7vw, 80px)', margin: '16px 0 20px', color: '#fff' }}>
              Ready to build<br />something <span style={{ WebkitTextStroke: '2px #fff', WebkitTextFillColor: 'transparent', color: 'transparent' }}>great?</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 32px' }}>
              Whether you need design, performance marketing, or both — I'm open to freelance projects, full-time roles, and creative collaborations.
            </p>
            {/* email button — opens Gmail compose with my address pre-filled */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={GMAIL} target="_blank" rel="noopener noreferrer" className="btn-neu btn-cream" style={{ fontSize: '14px', padding: '15px 36px' }}>
                ✉ 2008arnavsharma@gmail.com
              </a>
              <a href="tel:+919289811877" style={{
                fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                color: '#fff', padding: '14px 36px', borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.45)',
                display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >+91 9289811877</a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div ref={footRef} className="neu" style={{ opacity: 0, marginTop: '16px', padding: 'clamp(28px, 4vw, 44px)' }}>
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="display-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '26px', color: 'var(--text)', marginBottom: '12px', letterSpacing: '-0.02em' }}>Arnav Sharma</div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '260px' }}>Graphic Designer &amp; Performance Marketer. Design that converts, marketing that scales.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.head} className={col.head === 'Contact' ? 'col-12 col-lg-4' : 'col-6 col-lg-2'}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '16px' }}>{col.head}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.items.map(it => (
                    <li key={it.label}>
                      {it.href ? (
                        <a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" onClick={(e) => go(e, it.href)} style={{ fontFamily: "'Inter', sans-serif", fontSize: col.head === 'Contact' ? '12.5px' : '13px', color: 'var(--text-soft)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-soft)'}
                        >{it.label}</a>
                      ) : <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12.5px', color: 'var(--muted)' }}>{it.label}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px', paddingTop: '22px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Arnav Sharma · Delhi, India</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: 'var(--surface-hi)', letterSpacing: '0.08em' }}>Designed &amp; built with intent</span>
          </div>
        </div>
      </div>
    </section>
  )
}
