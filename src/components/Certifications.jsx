import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const certs = [
  {
    title: 'Amazon ATES Training Programme',
    issuer: 'Amazon India',
    year: '2024',
    image: '/assets/certs/amazon-ates.jpg',
    color: '#FF9900',
    tag: 'E-Commerce',
  },
  {
    title: 'Advanced Graphic Designing',
    issuer: 'iElevate',
    year: '2024',
    image: '/assets/certs/advanced-design.jpg',
    color: 'var(--terra)',
    tag: 'Design',
  },
  {
    title: 'Digital Marketing Fundamentals',
    issuer: 'iElevate',
    year: '2024',
    image: '/assets/certs/digital-marketing.jpg',
    color: 'var(--sage-mid)',
    tag: 'Marketing',
  },
  {
    title: 'Graph-e-thon 3.0 — Participation',
    issuer: 'Graphic Era University',
    year: '2026',
    image: '/assets/certs/graphethon.png',
    color: '#3B5BDB',
    tag: 'Hackathon',
  },
  {
    title: 'Build Up Ideathon 2025',
    issuer: 'Geek Room, MSIT',
    year: '2025',
    image: '/assets/certs/ideathon.png',
    color: 'var(--amber)',
    tag: 'Competition',
  },
  {
    title: 'Viksit Bharat Conference',
    issuer: 'National Conference Presentation',
    year: '2026',
    image: '/assets/certs/national-conference.png',
    color: '#6B4F8A',
    tag: 'Research',
  },
]

function CertModal({ cert, onClose }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.2, onComplete: onClose,
    })
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(28,17,8,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px', backdropFilter: 'blur(8px)',
        opacity: 0, cursor: 'none',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '760px', width: '100%' }}>
        <button onClick={handleClose} style={{
          position: 'absolute', top: '-44px', right: 0,
          background: 'rgba(250,248,243,0.1)',
          border: '1px solid rgba(250,248,243,0.2)',
          color: '#FAF8F3', cursor: 'none',
          borderRadius: '100px', padding: '6px 18px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
        }}>✕ Close</button>
        <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(250,248,243,0.1)' }}>
          <img src={cert.image} alt={cert.title} style={{ width: '100%', display: 'block' }} />
        </div>
        <div style={{
          background: '#FAF8F3', borderRadius: '0 0 6px 6px',
          padding: '16px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '15px', color: 'var(--dark)',
            }}>{cert.title}</div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', color: 'var(--warm-gray)',
              letterSpacing: '0.1em', marginTop: '2px',
            }}>{cert.issuer} · {cert.year}</div>
          </div>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: cert.color,
            background: `${typeof cert.color === 'string' && cert.color.startsWith('#') ? cert.color : '#C24C15'}18`,
            padding: '4px 12px', borderRadius: '100px',
            border: `1px solid ${typeof cert.color === 'string' && cert.color.startsWith('#') ? cert.color : '#C24C15'}30`,
          }}>{cert.tag}</span>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const headRef = useRef(null)
  const stripRef = useRef(null)
  const [activeCert, setActiveCert] = useState(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    )
    gsap.fromTo(stripRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: stripRef.current, start: 'top 88%' } }
    )
  }, [])

  return (
    <>
      <section id="certifications" style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        background: 'var(--cream)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div ref={headRef} style={{ opacity: 0, marginBottom: 'clamp(32px, 4vw, 52px)' }}>
            <div className="section-rule" />
            <span className="section-label">06 — Certifications</span>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)',
              letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--dark)',
            }}>
              Credentials &amp;<br />
              <span className="gradient-terra">Proof of Work</span>
            </h2>
            <p style={{
              marginTop: '16px', fontSize: '14px', color: 'var(--warm-gray)',
              fontFamily: "'Space Mono', monospace", fontSize: '10px',
              letterSpacing: '0.1em',
            }}>Click any certificate to view it</p>
          </div>

          {/* Horizontal scrolling strip */}
          <div ref={stripRef} style={{ opacity: 0 }}>
            <div className="h-scroll" style={{ gap: '16px', paddingBottom: '12px' }}>
              {certs.map((cert) => (
                <div
                  key={cert.title}
                  onClick={() => setActiveCert(cert)}
                  style={{
                    flexShrink: 0, width: '280px',
                    background: 'var(--cream-2)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px', overflow: 'hidden',
                    cursor: 'none',
                    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(28,17,8,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    height: '170px', overflow: 'hidden',
                    background: 'var(--cream-3)',
                    position: 'relative',
                  }}>
                    <img src={cert.image} alt={cert.title} style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    {/* View overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(28,17,8,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, transition: 'opacity 0.3s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                    >
                      <span className="btn-glass">View Certificate</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '8px', letterSpacing: '0.15em',
                        textTransform: 'uppercase', color: cert.color,
                      }}>{cert.tag}</span>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '9px', color: 'var(--warm-gray)',
                      }}>{cert.year}</span>
                    </div>
                    <h4 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700, fontSize: '14px',
                      letterSpacing: '-0.01em', color: 'var(--dark)',
                      marginBottom: '3px', lineHeight: 1.3,
                    }}>{cert.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--warm-gray)' }}>{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </>
  )
}
