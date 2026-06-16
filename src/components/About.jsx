import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../lib/motion'

const facts = [
  ['Based', 'New Delhi, India'],
  ['Experience', '4 Years · Live Brand'],
  ['Now', 'Designer & Marketer @ Murliwale'],
  ['Strengths', 'Brand · Paid Ads · E-Com'],
]

export default function About() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-a]', { opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" ref={ref} className="section">
      <div className="wrap">
        {/* header */}
        <div data-a style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: '8px', flexWrap: 'wrap' }}>
          <span className="meta">01 / About</span>
          <span className="meta">Fig. 01 — The Person</span>
        </div>
        <h2 data-a className="display dot h-lg" style={{ color: 'var(--ink)', marginBottom: '20px' }}>ABOUT ME</h2>
        <div className="rule-thick" style={{ marginBottom: 'clamp(24px,3vw,40px)' }} />

        <div className="row g-0" style={{ border: '2px solid var(--ink)' }}>
          {/* photo */}
          <div data-a className="col-12 col-lg-4 split-divider">
            <div className="photo" style={{ border: 'none', height: '100%', minHeight: 320 }}>
              <img src="/assets/pfp.png" alt="Arnav Sharma" data-zoom loading="lazy" decoding="async" />
              <span className="label-box" style={{ position: 'absolute', bottom: 12, left: 12 }}>@arnav · Designer</span>
            </div>
          </div>

          {/* statement */}
          <div className="col-12 col-lg-8" style={{ display: 'flex', flexDirection: 'column' }}>
            <div data-a style={{ padding: 'clamp(20px,3vw,40px)', borderBottom: '2px solid var(--ink)' }}>
              <p className="display" style={{ fontSize: 'clamp(22px,3.2vw,46px)', lineHeight: 1.04, color: 'var(--ink)' }}>
                I don't just make things <span style={{ color: 'var(--accent)' }}>look good</span> — I make them <span style={{ background: 'var(--accent)', color: 'var(--on-accent)', padding: '0 6px' }}>sell</span>.
              </p>
            </div>
            <div data-a style={{ padding: 'clamp(20px,3vw,40px)' }}>
              <p className="body" style={{ marginBottom: '16px', maxWidth: '62ch' }}>
                A visual designer and performance marketer who treats design as a growth lever, not decoration.
                Across four years on a live consumer brand I've owned the full loop — ₹98K in ad spend at
                3.8× ROAS over 1,200+ SKUs on Amazon, Flipkart &amp; WooCommerce — turning creative directly
                into revenue.
              </p>
              <p className="small" style={{ maxWidth: '62ch' }}>
                I learn fast and ship faster. Every decision ties back to a number — clicks, conversions,
                recall — and I'd rather make sharp, measurable work than safe, pretty work. Hand me a brief
                and I'll own it end-to-end, from first concept to the metric it moves.
              </p>
            </div>
          </div>
        </div>

        {/* facts strip */}
        <div data-a className="row g-0" style={{ borderLeft: '2px solid var(--ink)', borderRight: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)' }}>
          {facts.map((f) => (
            <div key={f[0]} className="col-6 col-lg-3 q4" style={{ padding: 'clamp(14px,1.6vw,20px)' }}>
              <span className="meta" style={{ display: 'block', marginBottom: '6px' }}>{f[0]}</span>
              <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '13px', color: 'var(--ink)', lineHeight: 1.3, display: 'block' }}>{f[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
