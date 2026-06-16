import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../lib/motion'

const big = [
  { pct: 92, label: 'Graphic Design', fill: 'accent' },
  { pct: 88, label: 'E-Commerce Ops', fill: 'ink' },
  { pct: 85, label: 'Performance Marketing', fill: 'paper' },
  { pct: 80, label: 'Content & Social', fill: 'accent' },
]
const cols = [
  ['Design', ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Packaging Design', 'Brand Identity', 'Ad Creatives']],
  ['Marketing', ['Meta Ads Manager', 'Google Ads', 'Amazon Advertising', 'Campaign Optimization', 'ROAS & Budgeting', 'A/B Testing']],
  ['E-Commerce', ['Amazon Seller Central', 'Flipkart Seller Hub', 'WooCommerce', 'Listing Optimization', 'Marketplace SEO', 'Catalogue Mgmt']],
  ['Social & SEO', ['Social Media Marketing', 'Search Engine Optimization', 'Content Strategy', 'Reel Production', 'Community Engagement', 'Analytics']],
]

function Big({ b }) {
  const ref = useRef(null)
  const numRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) { if (numRef.current) numRef.current.textContent = b.pct; return }
    const ctx = gsap.context(() => {
      const o = { v: 0 }
      gsap.to(o, { v: b.pct, duration: 1.3, ease: 'power2.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' }, onUpdate: () => { if (numRef.current) numRef.current.textContent = Math.round(o.v) } })
    }, ref)
    return () => ctx.revert()
  }, [b, reduced])
  const bg = b.fill === 'accent' ? 'var(--accent)' : b.fill === 'ink' ? 'var(--ink)' : 'var(--paper)'
  const fg = b.fill === 'paper' ? 'var(--ink)' : 'var(--on-accent)'
  return (
    <div ref={ref} className="col-6 col-lg-3 q4v" style={{ borderBottom: '2px solid var(--ink)', background: bg, padding: 'clamp(16px,2.4vw,30px)' }}>
      <div className="display" style={{ fontSize: 'clamp(48px,8vw,110px)', color: fg, lineHeight: 0.85 }}><span ref={numRef}>0</span><span style={{ fontSize: '0.4em', verticalAlign: 'super' }}>%</span></div>
      <div className="meta" style={{ color: fg, marginTop: 8 }}>{b.label}</div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-s]', { opacity: 0, y: 24, duration: 0.6, stagger: 0.07, scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])
  return (
    <section id="skills" ref={ref} className="section">
      <div className="wrap">
        <div data-s style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span className="meta">04 / Skills</span>
          <span className="meta">Technical Proficiency</span>
        </div>
        <h2 data-s className="display dot h-lg" style={{ color: 'var(--ink)', margin: '8px 0 20px' }}>SKILLS</h2>
        <div className="rule-thick" style={{ marginBottom: 'clamp(24px,3vw,40px)' }} />

        {/* big % */}
        <div className="row g-0" style={{ borderLeft: '2px solid var(--ink)', borderRight: '2px solid var(--ink)', borderTop: '2px solid var(--ink)' }}>
          {big.map((b) => <Big key={b.label} b={b} />)}
        </div>

        {/* lists */}
        <div className="row g-0" style={{ borderLeft: '2px solid var(--ink)', borderRight: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)' }}>
          {cols.map(([head, list]) => (
            <div data-s key={head} className="col-6 col-lg-3 q4" style={{ padding: 'clamp(16px,2vw,24px)' }}>
              <div className="label-box" style={{ marginBottom: 14 }}>{head}</div>
              <ul style={{ listStyle: 'none' }}>
                {list.map((s, i) => (
                  <li key={s} style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: i < list.length - 1 ? '1px solid var(--line)' : 'none' }}>
                    <span className="meta" style={{ flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.3 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-s style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
          <span className="meta">Languages — English · Hindi</span>
          <span className="meta">Always adding tools — currently deepening motion &amp; analytics</span>
        </div>
      </div>
    </section>
  )
}
