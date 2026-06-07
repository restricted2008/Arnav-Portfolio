import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    tag: 'Competition Winner',
    color: 'var(--terra)',
    year: '2025',
    org: 'Geek Room, MSIT',
    title: 'Build Up Ideathon 2025',
    role: 'Winner · Best Freshers Team · Team Leader',
    description: 'Pitched KrishiRaksha — a blockchain-based agricultural traceability platform for farm-to-consumer supply chain transparency. Won Best Freshers Team out of all competing teams.',
    icon: '🏆',
  },
  {
    tag: 'All India Finalist',
    color: 'var(--sage-mid)',
    year: '2026',
    org: 'Graphic Era University, Dehradun',
    title: 'Graph-e-thon 3.0',
    role: 'All India Finalist · Team Leader, PowerRangers (MSI)',
    description: 'Co-built and pitched Raksha — a women\'s emergency SOS platform targeting feature-phone users. Led the full business evaluation round with a 12-slide deck and live demo.',
    icon: '🥇',
  },
  {
    tag: 'Academic Research',
    color: 'var(--amber)',
    year: '2026',
    org: 'Viksit Bharat Conference',
    title: 'Co-Author & Presenter',
    role: 'Research Presentation — National Conference',
    description: 'Co-authored and presented "Reimagining Pedagogy in the Age of Generative AI" at Viksit Bharat Conference 2026.',
    icon: '📄',
  },
  {
    tag: 'Leadership Role',
    color: '#6B4F8A',
    year: '2026',
    org: 'MSI, BCA Placement Cell',
    title: 'Social Media Head',
    role: 'Promoted 2026 · Instagram & LinkedIn',
    description: 'Promoted to Social Media Head — manages official Instagram and LinkedIn channels with 774+ followers and 10K+ average views per post.',
    icon: '📱',
  },
  {
    tag: 'Event Organisation',
    color: 'var(--sage)',
    year: '2026',
    org: 'Maharaja Surajmal Group of Institutions',
    title: 'Chief Organiser — Genesis 2K26',
    role: 'Annual Cultural Fest — MSI',
    description: 'Chief Organiser for Genesis 2K26, the annual cultural fest held on 11 & 12 February 2026 at Maharaja Surajmal Group of Institutions.',
    icon: '🎭',
  },
]

function AchievementCard({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, delay: (index % 3) * 0.1, ease: 'power3.out',
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
        padding: '28px',
        height: '100%',
        position: 'relative', overflow: 'hidden',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(28,17,8,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Left border accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
          background: item.color,
          borderRadius: '8px 0 0 8px',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: item.color,
            background: `${item.color}15`,
            padding: '3px 10px', borderRadius: '100px',
            border: `1px solid ${item.color}30`,
          }}>{item.tag}</span>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px', color: 'var(--warm-gray)',
          }}>{item.year}</span>
        </div>

        <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>

        <h4 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: '19px',
          letterSpacing: '-0.01em', color: 'var(--dark)',
          marginBottom: '4px',
        }}>{item.title}</h4>

        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--warm-gray)',
          marginBottom: '12px',
        }}>{item.org}</p>

        <p style={{ fontSize: '13px', color: 'var(--warm-gray)', lineHeight: 1.6, marginBottom: '12px' }}>
          {item.description}
        </p>

        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px', letterSpacing: '0.08em',
          color: item.color, lineHeight: 1.4,
        }}>{item.role}</p>
      </div>
    </div>
  )
}

export default function Achievements() {
  const headRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <section id="achievements" style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      background: 'var(--cream-2)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={headRef} style={{ opacity: 0, marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div className="section-rule" />
          <span className="section-label">05 — Recognitions & Achievements</span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--dark)',
          }}>
            Wins &amp;<br />
            <span className="gradient-terra">Recognition</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
