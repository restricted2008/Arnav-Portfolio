import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const groups = [
  { label: 'Design & Creative', accent: 'var(--orange)', skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Packaging Design', 'Brand Identity', 'Ad Creatives', 'Social Media Visuals'] },
  { label: 'Performance Marketing', accent: 'var(--amber)', skills: ['Meta Ads Manager', 'Google Ads', 'Amazon Advertising', 'Campaign Optimization', 'ROAS & Budgeting', 'Audience Targeting', 'A/B Testing'] },
  { label: 'Digital & Social', accent: 'var(--gold)', skills: ['Social Media Marketing', 'Search Engine Optimization (SEO)', 'Content Strategy', 'Instagram & LinkedIn', 'Reel Production', 'Community Engagement'] },
  { label: 'E-Commerce', accent: 'var(--coral)', skills: ['Amazon Seller Central', 'Flipkart Seller Hub', 'WooCommerce', 'Listing Optimization', 'Marketplace SEO', 'Catalogue Management'] },
]

function Group({ group, index }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, delay: index * 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%' } })
  }, [index])
  return (
    <div ref={ref} className="col-12 col-md-6" style={{ opacity: 0 }}>
      <div className="neu neu-hover" style={{ padding: '26px', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <span style={{ width: 18, height: 3, borderRadius: '2px', background: group.accent, display: 'inline-block' }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'var(--muted)' }}>0{index + 1}</span>
          <h3 className="display-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '18px', color: 'var(--text)' }}>{group.label}</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {group.skills.map(s => <span key={s} className="chip">{s}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const headRef = useRef(null)
  const langRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headRef.current, start: 'top 88%' } })
    gsap.fromTo(langRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: langRef.current, start: 'top 92%' } })
  }, [])

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div ref={headRef} className="section-head" style={{ opacity: 0, textAlign: 'center' }}>
          <span className="eyebrow" style={{ marginBottom: '14px' }}>04 · Skills</span>
          <h2 className="display" style={{ fontSize: 'clamp(34px, 6vw, 64px)', marginTop: '12px' }}>
            The toolkit <span className="grad-warm">behind the work</span>
          </h2>
        </div>

        <div className="row g-3">
          {groups.map((g, i) => <Group key={g.label} group={g} index={i} />)}
        </div>

        <div ref={langRef} className="neu-sm" style={{ opacity: 0, padding: '18px 26px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>Languages</span>
          {['English', 'Hindi'].map(l => (
            <span key={l} className="display-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '17px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 12, height: 2, borderRadius: '2px', background: 'var(--orange)', display: 'inline-block' }} />{l}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
