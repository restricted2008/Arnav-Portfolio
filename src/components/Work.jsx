import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../lib/motion'

const cases = [
  {
    id: 'WK-001', title: 'MURLIWALE', cat: 'Brand Identity · E-Commerce · Paid Growth', year: '2022 — Now',
    overview: 'Built the full brand system for a live B2C puja brand — labels, packaging, festive creatives & social — then ran the Amazon, Flipkart & WooCommerce store with ₹98K+ in paid ads.',
    result: [['₹12L+', 'Annual Sales'], ['3.8×', 'ROAS'], ['1,200+', 'SKUs']],
    link: { label: 'Visit murliwale.com', href: 'http://murliwale.com/' },
    brand: { wordmark: 'Murliwale', sub: 'Puja Fragrance Brand · murliwale.com' },
    accent: true,
  },
  {
    id: 'WK-002', title: 'SOCIETIES & COLLEGE', cat: 'Social Media · Posters · Society & Campus Design', year: '2025 — Now',
    overview: 'Design lead across college societies, NSS & the placement cell — event posters, fest branding, festive creatives and LinkedIn series, all shipped in-house.',
    result: [['10K+', 'Avg Views'], ['774+', 'Followers'], ['12+', 'Campaigns']],
    link: null,
    brand: { logo: '/assets/bca-logo.png', sub: 'MSI · Placement Cell & Societies' },
    accent: false,
  },
]

function BrandPanel({ brand }) {
  return (
    <div style={{ height: '100%', minHeight: 240, background: 'var(--paper-3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 'clamp(24px,4vw,48px)', textAlign: 'center' }}>
      <div style={{ background: '#F3EEDF', border: '2px solid var(--ink)', padding: 'clamp(20px,3vw,34px)', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '60%' }}>
        {brand.logo
          ? <img src={brand.logo} alt="" data-zoom loading="lazy" decoding="async" style={{ width: 'clamp(120px,16vw,180px)', height: 'auto', display: 'block' }} />
          : <span className="display" style={{ fontSize: 'clamp(28px,4vw,52px)', color: '#143C36', lineHeight: 0.9, fontFamily: 'var(--display)' }}>{brand.wordmark}</span>}
      </div>
      <span className="meta">{brand.sub}</span>
    </div>
  )
}

function Case({ c }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={ref} style={{ border: '2px solid var(--ink)', marginBottom: '20px', background: 'var(--paper)' }}>
      {/* head */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', padding: 'clamp(14px,1.8vw,22px) clamp(16px,2.2vw,28px)', borderBottom: '2px solid var(--ink)', background: c.accent ? 'var(--accent)' : 'transparent' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
          <span className="label-box" style={c.accent ? { background: 'var(--on-accent)', color: 'var(--accent)' } : {}}>{c.id}</span>
          <h3 className="display" style={{ fontSize: 'clamp(26px,4vw,56px)', color: c.accent ? 'var(--on-accent)' : 'var(--ink)', lineHeight: 0.9 }}>{c.title}</h3>
        </div>
        <span className="meta" style={{ textAlign: 'right', color: c.accent ? 'var(--on-accent)' : 'var(--ink)' }}>{c.year}</span>
      </div>
      <div style={{ padding: 'clamp(6px,1vw,10px) clamp(16px,2.2vw,28px)', borderBottom: '2px solid var(--ink)' }}>
        <span className="meta">{c.cat}</span>
      </div>

      {/* body */}
      <div className="row g-0">
        {/* left — 2 boxes */}
        <div className="col-12 col-lg-8" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* box 1: overview */}
          <div style={{ padding: 'clamp(18px,2.2vw,30px)', borderBottom: '2px solid var(--ink)', display: 'flex', gap: 'clamp(12px,2vw,24px)' }}>
            <span className="vert meta" style={{ flexShrink: 0, letterSpacing: '0.2em' }}>Overview</span>
            <p className="body" style={{ margin: 0 }}>{c.overview}</p>
          </div>
          {/* box 2: impact — grows to fill so the dividers reach the bottom */}
          <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
            {c.result.map((r, i) => (
              <div key={r[1]} style={{ flex: '1 1 110px', padding: 'clamp(16px,2vw,26px)', borderRight: i < c.result.length - 1 ? '2px solid var(--ink)' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="display" style={{ fontSize: 'clamp(30px,4vw,56px)', color: 'var(--ink)', lineHeight: 0.85 }}>{r[0]}</div>
                <div className="meta" style={{ marginTop: 8 }}>{r[1]}</div>
              </div>
            ))}
          </div>
          {c.link && (
            <div style={{ padding: 'clamp(14px,1.8vw,22px)', borderTop: '2px solid var(--ink)' }}>
              <a href={c.link.href} target="_blank" rel="noopener noreferrer" className="btn">{c.link.label} ↗</a>
            </div>
          )}
        </div>
        {/* right — brand panel */}
        <div className="col-12 col-lg-4 case-brand">
          <BrandPanel brand={c.brand} />
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-w]', { opacity: 0, y: 26, duration: 0.6, stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])
  return (
    <section id="work" ref={ref} className="section" style={{ background: 'var(--paper-2)' }}>
      <div className="wrap">
        <div data-w style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span className="meta">02 / Experience</span>
          <span className="meta">Where I've Worked</span>
        </div>
        <h2 data-w className="display dot h-lg" style={{ color: 'var(--ink)', margin: '8px 0 20px' }}>WORK</h2>
        <div className="rule-thick" style={{ marginBottom: 'clamp(24px,3vw,40px)' }} />
        {cases.map(c => <Case key={c.id} c={c} />)}
      </div>
    </section>
  )
}
