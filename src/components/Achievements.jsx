import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../lib/motion'

const featured = {
  title: 'Social Media Head', org: 'BCA Placement Cell · MSI', year: '2026',
  role: 'Instagram & LinkedIn',
  blurb: 'Took a social channel from scratch to a repeatable content engine — concepting, designing, writing and shipping every post & reel solo. The series average 10K+ views and grew the audience past 774 followers in months.',
  stats: [['10K+', 'Avg Views'], ['774+', 'Followers'], ['12+', 'Campaigns']],
  img: '/assets/smh-batch.png',
}

const wins = [
  { n: '01', title: 'Build Up Ideathon 2025', role: 'Winner · Best Freshers Team · Team Leader', org: 'Geek Room, MSIT', year: '2025', img: '/assets/certs/ideathon.png', tag: 'Winner' },
  { n: '02', title: 'Graph-e-thon 3.0', role: 'All India Finalist · Team Leader, PowerRangers', org: 'Graphic Era University', year: '2026', img: '/assets/certs/graphethon.png', tag: 'Finalist' },
  { n: '03', title: 'Viksit Bharat Conference', role: 'Co-Author & Presenter — “Pedagogy in the Age of GenAI”', org: 'National Conference', year: '2026', img: '/assets/certs/national-conference.png', tag: 'Research' },
  { n: '04', title: 'Genesis 2K26', role: 'Chief Organiser — Annual Socio-Cultural Fest', org: 'Maharaja Surajmal Institute', year: '2026', img: '/assets/certs/genesis.png', tag: 'Organiser' },
]

export default function Achievements() {
  const ref = useRef(null)
  const [zoom, setZoom] = useState(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-win]', { opacity: 0, x: -24, duration: 0.55, stagger: 0.07, scrollTrigger: { trigger: ref.current, start: 'top 78%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setZoom(null) }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="achievements" ref={ref} className="section" style={{ background: 'var(--ink)' }}>
      <div className="wrap">
        <div data-win style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span className="meta" style={{ color: 'var(--grey-2)' }}>05 / Recognition</span>
          <span className="meta" style={{ color: 'var(--accent)' }}>Verified · Click to view</span>
        </div>
        <h2 data-win className="display h-lg" style={{ color: 'var(--paper)', margin: '8px 0 20px' }}><span style={{ color: 'var(--accent)' }}>.</span>WINS</h2>
        <div style={{ height: 5, background: 'var(--accent)', marginBottom: 'clamp(24px,3vw,40px)' }} />

        {/* featured — Social Media Head */}
        <div data-win style={{ border: '2px solid var(--paper)', marginBottom: 20, background: 'var(--accent)' }}>
          <div className="row g-0">
            <div className="col-12 col-lg-5 split-divider">
              <button onClick={() => setZoom(featured)} className="photo" style={{ width: '100%', height: '100%', minHeight: 240, border: 'none', cursor: 'none', background: 'var(--ink)' }}>
                <img src={featured.img} alt={featured.title} style={{ objectFit: 'cover' }} loading="lazy" decoding="async" />
              </button>
            </div>
            <div className="col-12 col-lg-7" style={{ padding: 'clamp(20px,3vw,40px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span className="label-box">Centre Stage</span>
                <span className="meta" style={{ color: 'var(--on-accent)' }}>{featured.year}</span>
              </div>
              <h3 className="display" style={{ fontSize: 'clamp(30px,5vw,64px)', color: 'var(--on-accent)', lineHeight: 0.9, margin: '14px 0 6px' }}>{featured.title}</h3>
              <span className="meta" style={{ color: 'var(--on-accent)' }}>{featured.org} · {featured.role}</span>
              <p style={{ fontFamily: 'var(--body)', fontSize: 15, lineHeight: 1.6, color: 'var(--on-accent)', margin: '14px 0 18px', maxWidth: '54ch' }}>{featured.blurb}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '2px solid var(--ink)' }}>
                {featured.stats.map((s, i) => (
                  <div key={s[1]} style={{ padding: '14px 12px', borderRight: i < featured.stats.length - 1 ? '2px solid var(--ink)' : 'none' }}>
                    <div className="display" style={{ fontSize: 'clamp(24px,3vw,40px)', color: 'var(--on-accent)', lineHeight: 0.9 }}>{s[0]}</div>
                    <div className="meta" style={{ color: 'var(--on-accent)', marginTop: 4 }}>{s[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* list */}
        <div style={{ border: '2px solid var(--paper)' }}>
          {wins.map((w, i) => (
            <button data-win key={w.n} onClick={() => setZoom(w)} className="win-row" style={{
              width: '100%', textAlign: 'left', cursor: 'none',
              padding: 'clamp(14px,2vw,24px) clamp(14px,2.4vw,30px)',
              borderBottom: i < wins.length - 1 ? '2px solid var(--paper)' : 'none', background: 'transparent', transition: 'background 0.18s',
            }}>
              <div className="win-head">
                <span data-fg className="display win-num" style={{ color: 'var(--accent)' }}>{w.n}</span>
                <div className="win-titles">
                  <div data-fg className="display win-title" style={{ color: 'var(--paper)' }}>{w.title}</div>
                  <div data-fg className="small" style={{ color: 'var(--grey-2)', marginTop: 4 }}>{w.role} — {w.org}</div>
                </div>
              </div>
              <div className="win-aside">
                <span data-fg className="tag" style={{ color: 'var(--paper)', borderColor: 'var(--paper)' }}>{w.tag}</span>
                <span data-fg className="meta win-year" style={{ color: 'var(--grey-2)' }}>{w.year}</span>
                <div className="photo win-thumb" style={{ border: '2px solid var(--paper)' }}><img src={w.img} alt="" loading="lazy" decoding="async" /></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {zoom && (
        <div role="dialog" aria-modal="true" aria-label={zoom.title} onClick={() => setZoom(null)} style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(23,22,15,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px,5vw,64px)', cursor: 'none' }}>
          <button onClick={() => setZoom(null)} className="btn btn-accent" style={{ position: 'absolute', top: 20, left: 20 }}>← Back</button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 760 }}>
            <img src={zoom.img} alt={zoom.title} style={{ width: '100%', border: '3px solid var(--paper)', display: 'block' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, gap: 12 }}>
              <span className="meta" style={{ color: 'var(--ink)' }}>{zoom.title} — {zoom.org}</span>
              <span className="meta" style={{ color: 'var(--accent)' }}>{zoom.year}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
