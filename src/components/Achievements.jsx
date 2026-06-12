import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    tag: 'Competition Winner', year: '2025', org: 'Geek Room, MSIT',
    title: 'Build Up Ideathon 2025', role: 'Winner · Best Freshers Team · Team Leader',
    chips: ['Winner', 'Best Freshers Team', 'Blockchain', 'Team Leader'],
    description: 'Pitched KrishiRaksha — a blockchain-based agricultural traceability platform for farm-to-consumer supply chain transparency. Won Best Freshers Team out of all competing teams.',
    image: '/assets/certs/ideathon.png',
  },
  {
    tag: 'Leadership Role', year: '2026', org: 'MSI · BCA Placement Cell',
    title: 'Social Media Head', role: 'Instagram & LinkedIn · 774+ followers',
    chips: ['Promoted 2026', '10K+ Avg Views', 'In-house Design'],
    description: 'Promoted to Social Media Head — manages official Instagram and LinkedIn channels, running original post and reel series averaging 10K+ views, all designed in-house.',
    image: '/assets/smh-batch.png', cover: true,
  },
  {
    tag: 'All India Finalist', year: '2026', org: 'Graphic Era University, Dehradun',
    title: 'Graph-e-thon 3.0', role: 'Team Leader · PowerRangers (MSI)',
    chips: ['All India Finalist', '72hr Hackathon', 'Product Design', 'Live Pitch'],
    description: "Co-built and pitched Raksha — a women's emergency SOS platform targeting feature-phone users. Led the full business evaluation round with a 12-slide deck and live demo to the judging panel.",
    image: '/assets/certs/graphethon.png',
    link: '/assets/raksha-pitch.pdf', linkLabel: 'View Pitch Deck PDF →',
  },
  {
    tag: 'Academic Research', year: '2026', org: 'Viksit Bharat Conference',
    title: 'Co-Author & Presenter', role: 'National Conference · Research Paper',
    chips: ['Co-Author', 'Presenter', 'Generative AI'],
    description: 'Co-authored and presented "Reimagining Pedagogy in the Age of Generative AI" at Viksit Bharat Conference 2026 — a national academic research presentation.',
    image: '/assets/certs/national-conference.png',
  },
  {
    tag: 'Event Organisation', year: '2026', org: 'Maharaja Surajmal Institute',
    title: 'Chief Organiser — Genesis 2K26', role: 'Annual Socio-Cultural Fest',
    chips: ['Chief Organiser', 'Cultural Fest', 'Team Lead'],
    description: 'Chief Organiser for Genesis 2K26 — the annual socio-cultural fest held 11–12 February 2026 at Maharaja Surajmal Group of Institutions.',
    image: '/assets/certs/genesis.png',
  },
]

function Box({ item }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%' } })
  }, [])

  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: 'clamp(14px, 2vw, 20px)' }}>
      <div className="neu" style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
        <div className="row g-4 gx-lg-5 align-items-center">
          {/* content */}
          <div className="col-12 col-lg-7">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="tag">{item.tag}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: 'var(--muted)' }}>{item.year}</span>
            </div>
            <h3 className="display" style={{ fontSize: 'clamp(24px, 3.6vw, 38px)', marginBottom: '5px', color: 'var(--text)' }}>{item.title}</h3>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '14px' }}>{item.org}</p>
            <p style={{ fontSize: '13.5px', color: 'var(--text-soft)', lineHeight: 1.65, marginBottom: '18px' }}>{item.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: item.link ? '20px' : 0 }}>
              {item.chips.map(c => (
                <span key={c} style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', padding: '5px 12px', borderRadius: '999px', color: 'var(--gold)', border: '1px solid rgba(255,200,97,0.25)', background: 'rgba(255,200,97,0.07)' }}>{c}</span>
              ))}
            </div>
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-neu" style={{ fontSize: '12px', padding: '11px 26px' }}>{item.linkLabel}</a>
            )}
          </div>
          {/* image — capped height so the box stays compact */}
          <div className="col-12 col-lg-5">
            <div style={{
              height: 'clamp(150px, 22vw, 210px)', borderRadius: '14px', overflow: 'hidden',
              border: '1px solid var(--line)', boxShadow: '0 14px 32px rgba(0,0,0,0.4)',
              background: 'linear-gradient(150deg, rgba(48,36,26,0.5), rgba(20,14,9,0.4))',
            }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: item.cover ? 'cover' : 'contain', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Achievements() {
  const headRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headRef.current, start: 'top 88%' } })
  }, [])

  return (
    <section id="achievements" className="section">
      <div className="wrap">
        <div ref={headRef} className="section-head" style={{ opacity: 0, textAlign: 'center' }}>
          <span className="eyebrow" style={{ marginBottom: '14px' }}>05 · Recognitions & Achievements</span>
          <h2 className="display" style={{ fontSize: 'clamp(34px, 6vw, 64px)', marginTop: '12px' }}>
            Wins &amp; <span className="grad-warm">recognition</span>
          </h2>
        </div>
        {achievements.map(item => <Box key={item.title} item={item} />)}
      </div>
    </section>
  )
}
