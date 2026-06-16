import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../lib/motion'

const MAILTO = 'mailto:2008arnavsharma@gmail.com?subject=Let%27s%20work%20together'

const rows = [
  ['Email', 'Email Me', MAILTO],
  ['Phone', '+91 92898 11877', null],
  ['LinkedIn', '/in/arnav-sharma', 'https://linkedin.com/in/arnav-sharma-2bbb9837a/'],
  ['Live Work', 'murliwale.com', 'http://murliwale.com/'],
]

export default function Contact() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-ct]', { opacity: 0, y: 28, duration: 0.6, stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 78%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="contact" ref={ref} className="section" style={{ paddingBottom: 'clamp(24px,3vw,40px)' }}>
      <div className="wrap">
        <div data-ct style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span className="meta">07 / Contact</span>
          <span className="meta">End of Document</span>
        </div>
        <h2 data-ct className="display dot" style={{ fontSize: 'clamp(54px,15vw,220px)', color: 'var(--ink)', lineHeight: 0.82, margin: '6px 0 10px' }}>GET IN<br />TOUCH</h2>
        <div className="rule-thick" style={{ marginBottom: 'clamp(20px,3vw,32px)' }} />

        {/* value statement */}
        <div data-ct className="box-fill" style={{ padding: 'clamp(20px,3vw,36px)', marginBottom: 20 }}>
          <p className="display" style={{ fontSize: 'clamp(20px,3vw,40px)', color: 'var(--paper)', lineHeight: 1.02 }}>
            Design that <span style={{ color: 'var(--accent-2)' }}>converts</span>. Marketing that <span style={{ color: 'var(--accent-2)' }}>scales</span>.<br />Delhi / NCR · Remote-ready.
          </p>
        </div>

        {/* contact rows */}
        <div data-ct style={{ border: '2px solid var(--ink)' }}>
          {rows.map(([k, v, href], i) => {
            const Tag = href ? 'a' : 'div'
            const linkProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {}
            return (
              <Tag key={k} {...linkProps} style={{
                display: 'flex', alignItems: 'center', gap: 'clamp(12px,2vw,24px)', textDecoration: 'none', color: 'var(--ink)',
                padding: 'clamp(12px,1.8vw,20px) clamp(16px,2.4vw,28px)', borderBottom: i < rows.length - 1 ? '2px solid var(--ink)' : 'none', transition: 'background 0.18s, padding 0.18s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; e.currentTarget.style.paddingLeft = '40px' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.paddingLeft = '' }}>
                <span className="meta" style={{ width: 90, flexShrink: 0, color: 'inherit' }}>{k}</span>
                <span className="display" style={{ fontSize: 'clamp(18px,2.6vw,34px)', color: 'inherit', lineHeight: 0.95, flex: 1, wordBreak: 'break-word' }}>{v}</span>
                {href && <span style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'inherit' }}>↗</span>}
              </Tag>
            )
          })}
        </div>

        {/* email cta button */}
        <div data-ct style={{ marginTop: 20 }}>
          <a href={MAILTO} className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', fontSize: 14, padding: '20px' }}>✉ Email Me</a>
        </div>

        {/* footer */}
        <div data-ct style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(28px,4vw,48px)', paddingTop: 18, borderTop: '2px solid var(--ink)' }}>
          <div>
            <div className="display" style={{ fontSize: 22, color: 'var(--ink)' }}>ARNAV SHARMA<span style={{ color: 'var(--accent-2)' }}>®</span></div>
            <span className="meta">Graphic Designer · Performance Marketer · Delhi, IN</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="barcode" style={{ marginLeft: 'auto' }} />
            <span className="meta" style={{ display: 'block', marginTop: 8 }}>© {new Date().getFullYear()} · Edition 2026 · Built by hand</span>
          </div>
        </div>
      </div>
    </section>
  )
}
