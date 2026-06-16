import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../lib/motion'

const certs = [
  { title: 'Amazon ATES Training', issuer: 'Amazon India', year: '2024', img: '/assets/certs/amazon-ates.jpg', tag: 'E-Commerce' },
  { title: 'Advanced Graphic Designing', issuer: 'iElevate', year: '2024', img: '/assets/certs/advanced-design.jpg', tag: 'Design' },
  { title: 'Digital Marketing Fundamentals', issuer: 'iElevate', year: '2024', img: '/assets/certs/digital-marketing.jpg', tag: 'Marketing' },
  { title: 'Build Up Ideathon 2025', issuer: 'Geek Room, MSIT', year: '2025', img: '/assets/certs/ideathon.png', tag: 'Competition' },
  { title: 'Graph-e-thon 3.0', issuer: 'Graphic Era University', year: '2026', img: '/assets/certs/graphethon.png', tag: 'Hackathon' },
  { title: 'Viksit Bharat Conference', issuer: 'National Conference', year: '2026', img: '/assets/certs/national-conference.png', tag: 'Research' },
  { title: 'Genesis 2K26 — Organiser', issuer: 'Maharaja Surajmal Institute', year: '2026', img: '/assets/certs/genesis.png', tag: 'Organiser' },
]

export default function Certifications() {
  const ref = useRef(null)
  const [zoom, setZoom] = useState(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-c]', { opacity: 0, y: 24, duration: 0.55, stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setZoom(null) }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="certifications" ref={ref} className="section">
      <div className="wrap">
        <div data-c style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span className="meta">06 / Credentials</span>
          <span className="meta">Formal Training</span>
        </div>
        <h2 data-c className="display dot h-lg" style={{ color: 'var(--ink)', margin: '8px 0 20px' }}>CERTS</h2>
        <div className="rule-thick" style={{ marginBottom: 'clamp(24px,3vw,40px)' }} />

        <div className="row g-0" style={{ borderTop: '2px solid var(--ink)', borderLeft: '2px solid var(--ink)' }}>
          {certs.map((c) => (
            <div data-c key={c.title} className="col-12 col-lg-4 cert-cell">
              <button onClick={() => setZoom(c)} className="photo" style={{ width: '100%', border: 'none', borderBottom: '2px solid var(--ink)', aspectRatio: '1.5', cursor: 'none' }}>
                <img src={c.img} alt={c.title} loading="lazy" decoding="async" />
                <span className="jg-zoom" style={{ opacity: 1, top: 10, right: 10 }}>⤢</span>
              </button>
              <div style={{ padding: 'clamp(14px,1.8vw,22px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className="meta accent" style={{ color: 'var(--accent-2)' }}>{c.tag}</span>
                  <span className="meta">{c.year}</span>
                </div>
                <div className="display" style={{ fontSize: 'clamp(18px,2.2vw,26px)', color: 'var(--ink)', lineHeight: 0.95 }}>{c.title}</div>
                <div className="small" style={{ marginTop: 4 }}>{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {zoom && (
        <div role="dialog" aria-modal="true" aria-label={zoom.title} onClick={() => setZoom(null)} style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(23,22,15,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px,5vw,64px)', cursor: 'none' }}>
          <button onClick={() => setZoom(null)} className="btn btn-accent" style={{ position: 'absolute', top: 20, left: 20 }}>← Back</button>
          <img onClick={(e) => e.stopPropagation()} src={zoom.img} alt={zoom.title} style={{ maxWidth: '100%', maxHeight: '84vh', objectFit: 'contain', border: '3px solid var(--paper)' }} />
        </div>
      )}
    </section>
  )
}
