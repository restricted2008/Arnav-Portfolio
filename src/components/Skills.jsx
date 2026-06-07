import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Strictly from the resume — no invented tools */
const skillGroups = [
  {
    label: 'Design & Creative',
    color: 'var(--terra)',
    skills: ['Photoshop', 'Illustrator', 'Canva', 'Product Creatives', 'Ad Design', 'Packaging Design', 'Brand Identity', 'Social Media Visuals'],
  },
  {
    label: 'Performance Marketing',
    color: 'var(--amber)',
    skills: ['Meta Ads Manager', 'Google Ads', 'Amazon Sponsored Products', 'Campaign Optimisation', 'Budget Management'],
  },
  {
    label: 'E-Commerce Operations',
    color: 'var(--sage-mid)',
    skills: ['Amazon Seller Central', 'Flipkart Seller Hub', 'WooCommerce', 'Marketplace SEO', 'Product Listing Optimisation'],
  },
  {
    label: 'Marketing Operations',
    color: '#6B4F8A',
    skills: ['Meta Business Suite', 'Content Planning', 'Audience Engagement'],
  },
]

function SkillGroup({ group, index }) {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.7, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      }
    )
  }, [index])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <div style={{
        background: 'var(--cream)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '28px 28px 24px',
        height: '100%',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Color stripe top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: group.color,
        }} />

        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: '15px',
          color: group.color, marginBottom: '18px',
          letterSpacing: '-0.01em',
        }}>{group.label}</h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {group.skills.map(skill => (
            <span
              key={skill}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px', fontWeight: 500,
                color: 'var(--dark-2)',
                background: 'var(--cream-2)',
                border: '1px solid var(--border)',
                padding: '6px 14px', borderRadius: '100px',
                transition: 'all 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = group.color
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = group.color
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--cream-2)'
                e.currentTarget.style.color = 'var(--dark-2)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >{skill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const headRef = useRef(null)
  const langRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    )
    gsap.fromTo(langRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: langRef.current, start: 'top 90%' } }
    )
  }, [])

  return (
    <section id="skills" style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      background: 'var(--cream)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={headRef} style={{ opacity: 0, marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div className="section-rule" />
          <span className="section-label">04 — Skills</span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--dark)',
          }}>
            The toolkit<br />
            <span className="gradient-terra">behind the work</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}>
          {skillGroups.map((g, i) => (
            <SkillGroup key={g.label} group={g} index={i} />
          ))}
        </div>

        {/* Languages */}
        <div ref={langRef} style={{
          opacity: 0,
          background: 'var(--cream-2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '20px 28px',
          display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--warm-gray)',
          }}>Languages</span>
          {['English', 'Hindi'].map(lang => (
            <span key={lang} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600, fontSize: '15px',
              color: 'var(--dark)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--terra)', display: 'inline-block',
              }} />
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
