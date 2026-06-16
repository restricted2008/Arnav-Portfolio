import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/motion'

const numbers = [
  { v: '₹12L+', l: 'Revenue Driven' },
  { v: '3.8×', l: 'Return on Ad Spend' },
  { v: '2,300+', l: 'Amazon Orders' },
  { v: '1,200+', l: 'SKUs Branded' },
]

const index = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Work', href: '#work' },
  { n: '03', label: 'Designs', href: '#designs' },
  { n: '04', label: 'Skills', href: '#skills' },
  { n: '05', label: 'Wins', href: '#achievements' },
  { n: '06', label: 'Certifications', href: '#certifications' },
  { n: '07', label: 'Contact', href: '#contact' },
]

export default function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 })
      tl.from('[data-h="meta"]', { opacity: 0, y: -10, duration: 0.5 })
        .from('[data-h="name"] span', { yPercent: 110, duration: 0.8, ease: 'power4.out', stagger: 0.08 }, '-=0.2')
        .from('[data-h="role"]', { opacity: 0, y: 14, duration: 0.5 }, '-=0.4')
        .from('[data-h="num"]', { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, '-=0.2')
        .from('[data-h="side"]', { opacity: 0, x: 16, duration: 0.5 }, '-=0.5')
    }, ref)
    return () => ctx.revert()
  }, [])
  const go = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <section id="hero" ref={ref} style={{ padding: 'clamp(78px,9vw,110px) clamp(16px,4vw,48px) clamp(36px,5vw,64px)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="wrap" style={{ width: '100%' }}>

        {/* meta row */}
        <div data-h="meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: '18px' }}>
          <span className="meta meta-ink">Portfolio — Edition 2026</span>
          <span className="meta">Delhi, IN · Design × Growth</span>
        </div>
        <div className="rule-thick" />

        {/* name */}
        <div style={{ position: 'relative', padding: '14px 0 8px' }}>
          <span className="label-box accent-box" style={{ position: 'absolute', top: '18px', left: 0 }}>.Portfolio Presentation</span>
          <h1 data-h="name" className="display" style={{ fontSize: 'clamp(64px,16vw,210px)', lineHeight: 0.84, color: 'var(--ink)', paddingTop: '26px' }}>
            <span style={{ display: 'block', overflow: 'hidden' }}><span style={{ display: 'block' }}>ARNAV</span></span>
            <span style={{ display: 'block', overflow: 'hidden' }}><span style={{ display: 'block', WebkitTextStroke: '2px var(--ink)', color: 'transparent' }}>SHARMA</span></span>
          </h1>
        </div>

        <div data-h="role" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', borderTop: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)', padding: '12px 0', marginBottom: 'clamp(20px,3vw,34px)' }}>
          <span className="display" style={{ fontSize: 'clamp(18px,2.6vw,30px)', color: 'var(--ink)' }}>Graphic Designer</span>
          <span style={{ width: 10, height: 10, background: 'var(--accent)' }} />
          <span className="display" style={{ fontSize: 'clamp(18px,2.6vw,30px)', color: 'var(--ink)' }}>Performance Marketer</span>
          <span className="meta" style={{ marginLeft: 'auto' }}>BCA @ MSI · 9.1 GPA</span>
        </div>

        {/* numbers + index */}
        <div className="row g-0" style={{ border: '2px solid var(--ink)' }}>
          {/* numbers 2x2 */}
          <div className="col-12 col-lg-8 split-divider" style={{ display: 'flex' }}>
            <div className="row g-0" style={{ flex: 1, alignContent: 'stretch' }}>
              {numbers.map((m, i) => (
                <div data-h="num" key={m.l} className="col-6" style={{ borderBottom: i < 2 ? '2px solid var(--ink)' : 'none', borderRight: i % 2 === 0 ? '2px solid var(--ink)' : 'none', padding: 'clamp(16px,2.4vw,30px)', background: i === 0 ? 'var(--accent)' : 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="display" style={{ fontSize: 'clamp(40px,6vw,86px)', color: i === 0 ? 'var(--on-accent)' : 'var(--ink)', lineHeight: 0.9 }}>{m.v}</div>
                  <div className="meta" style={{ marginTop: '8px', color: i === 0 ? 'var(--on-accent)' : 'var(--ink)' }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* index + cta */}
          <div data-h="side" className="col-12 col-lg-4" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 'clamp(14px,1.8vw,20px)', borderBottom: '2px solid var(--ink)' }}>
              <span className="meta">Contents</span>
            </div>
            <div style={{ flex: 1 }}>
              {index.map(it => (
                <a key={it.href} href={it.href} onClick={(e) => go(e, it.href)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px clamp(14px,1.8vw,20px)', textDecoration: 'none', color: 'var(--ink)', borderBottom: '1px solid var(--line)', transition: 'background 0.15s, padding 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; e.currentTarget.style.paddingLeft = '26px' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.paddingLeft = '' }}>
                  <span className="meta" style={{ color: 'inherit' }}>{it.n}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'inherit' }}>{it.label}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '12px', color: 'inherit' }}>↘</span>
                </a>
              ))}
            </div>
            <div style={{ display: 'flex' }}>
              <a href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-accent" style={{ flex: 1, justifyContent: 'center', borderWidth: '2px 0 0 0' }}>Contact Now</a>
            </div>
          </div>
        </div>

        {/* barcode footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginTop: '16px' }}>
          <span className="meta">© 2026 · Murliwale · MSI Placement Cell · NSS</span>
          <div className="barcode" />
        </div>
      </div>
    </section>
  )
}
