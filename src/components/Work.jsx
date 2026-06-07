import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BentoGallery from './BentoGallery'

gsap.registerPlugin(ScrollTrigger)

/* ─── Murliwale bento items ─── */
const murliwaleItems = [
  { src: '/assets/designs/murliwale/kkts-set.png',         alt: 'KKTS Product Set',     cols: 2, rows: 1, label: 'Product Set Photography', bg: '#F5F0E8' },
  { src: '/assets/designs/murliwale/kkts-single.png',      alt: 'KKTS Single Product',  cols: 1, rows: 2, label: 'Lifestyle Shot', bg: '#F5F0E8' },
  { src: '/assets/designs/murliwale/insta-1.jpg',          alt: 'Instagram Post',       cols: 1, rows: 1, label: 'Social Media', bg: '#EDF5F0' },
  { src: '/assets/designs/murliwale/insta-2.jpg',          alt: 'Instagram Post',       cols: 1, rows: 1, label: 'Social Media', bg: '#EDF5F0' },
  { src: '/assets/designs/murliwale/label-fulwari.png',    alt: 'Fulwari Label Design', cols: 2, rows: 1, label: 'Label — Fulwari', type: 'label', bg: '#EDF5F0' },
  { src: '/assets/designs/murliwale/label-rose.png',       alt: 'Rose Label Design',    cols: 1, rows: 2, label: 'Label — Rose', type: 'label', bg: '#EDF5F0' },
  { src: '/assets/designs/murliwale/insta-3.jpg',          alt: 'Instagram Post',       cols: 1, rows: 1, label: 'Social Media', bg: '#EDF5F0' },
  { src: '/assets/designs/murliwale/packaging-vrindha.png',alt: 'Vrindha Packaging',    cols: 1, rows: 2, label: 'Packaging Design', bg: '#F5F0E8' },
  { src: '/assets/designs/murliwale/insta-4.jpg',          alt: 'Instagram Post',       cols: 1, rows: 1, label: 'Social Media', bg: '#EDF5F0' },
  { src: '/assets/designs/murliwale/insta-5.jpg',          alt: 'Instagram Post',       cols: 1, rows: 1, label: 'Social Media', bg: '#EDF5F0' },
]

/* ─── BCA bento items ─── */
const bcaItems = [
  { src: '/assets/designs/misc/tech-talk.png', alt: 'Tech Talk Event Poster', cols: 1, rows: 2, label: 'Event Poster', bg: '#1A2A5E' },
  { src: '/assets/designs/misc/one-tool.png',  alt: 'One Tool One Career',    cols: 2, rows: 1, label: 'LinkedIn Post', bg: '#EEF2FF' },
  { src: '/assets/designs/misc/chess.png',     alt: 'Chess Not Checkers Banner', cols: 3, rows: 1, label: 'LinkedIn Banner', bg: '#F5F5F0' },
]

/* ─── Misc design thumbnails ─── */
const miscPreviewCards = [
  { src: '/assets/designs/misc/chess.png',    label: 'LinkedIn Banner' },
  { src: '/assets/designs/misc/one-tool.png', label: 'LinkedIn Post' },
  { src: '/assets/designs/misc/tech-talk.png', label: 'Event Poster' },
]

/* ─── Murliwale preview thumbnails ─── */
const murliwalePreviewCards = [
  { src: '/assets/designs/murliwale/kkts-set.png',         label: 'Product Set' },
  { src: '/assets/designs/murliwale/packaging-vrindha.png', label: 'Packaging' },
  { src: '/assets/designs/murliwale/label-fulwari.png',    label: 'Label Design' },
  { src: '/assets/designs/murliwale/insta-1.jpg',          label: 'Social Media' },
  { src: '/assets/designs/murliwale/insta-2.jpg',          label: 'Campaign' },
  { src: '/assets/designs/murliwale/kkts-single.png',      label: 'Lifestyle' },
]

/* ─── BCA preview thumbnails ─── */
const bcaPreviewCards = [
  { src: '/assets/designs/misc/tech-talk.png', label: 'Tech Talk' },
  { src: '/assets/designs/misc/one-tool.png',  label: 'LinkedIn Post' },
]

function DesignCardGrid({ cards, onViewAll, viewLabel }) {
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '10px',
        marginBottom: '20px',
      }}>
        {cards.map((card, i) => (
          <div key={i} className="design-card" style={{ aspectRatio: '1', cursor: 'none' }}>
            <img src={card.src} alt={card.label} style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
            }} />
            <div className="overlay">
              <button
                className="btn-glass"
                onClick={onViewAll}
                style={{ cursor: 'none' }}
              >
                View ↗
              </button>
            </div>
            <div style={{
              position: 'absolute', top: '8px', left: '8px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '8px', letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
              padding: '3px 8px', borderRadius: '100px',
            }}>{card.label}</div>
          </div>
        ))}
        {/* "View all" tile */}
        <div
          onClick={onViewAll}
          className="design-card"
          style={{
            aspectRatio: '1',
            background: 'var(--terra)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'none',
            border: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '28px', color: '#fff', lineHeight: 1,
          }}>→</span>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase',
            marginTop: '8px', textAlign: 'center', padding: '0 12px',
          }}>{viewLabel}</span>
        </div>
      </div>
    </div>
  )
}

function SectionTag({ children }) {
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '9px', letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--terra)',
      background: 'rgba(194,76,21,0.08)',
      padding: '4px 12px', borderRadius: '100px',
      border: '1px solid rgba(194,76,21,0.2)',
      display: 'inline-block', marginBottom: '16px',
    }}>{children}</span>
  )
}

function ProjectBlock({ children, index }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
    )
  }, [])
  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: 'clamp(60px, 8vw, 100px)' }}>
      {children}
    </div>
  )
}

export default function Work() {
  const headRef = useRef(null)
  const [murliwaleOpen, setMurliwaleOpen] = useState(false)
  const [bcaOpen, setBcaOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <>
      <section id="work" style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        background: 'var(--cream)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Section header */}
          <div ref={headRef} style={{ opacity: 0, marginBottom: 'clamp(48px, 6vw, 80px)' }}>
            <div className="section-rule" />
            <span className="section-label">02 — Selected Work</span>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)',
              letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--dark)',
            }}>
              Work that<br />
              <span className="gradient-terra">ships results</span>
            </h2>
          </div>

          {/* ── MURLIWALE ── */}
          <ProjectBlock index={0}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '48px', alignItems: 'start',
            }}>
              {/* Info */}
              <div>
                <SectionTag>Brand Identity · E-Commerce · Performance Marketing</SectionTag>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)',
                  letterSpacing: '-0.03em', lineHeight: 1,
                  color: 'var(--dark)', marginBottom: '16px',
                }}>Murliwale</h3>
                <p style={{
                  fontSize: '15px', color: 'var(--warm-gray)',
                  lineHeight: 1.7, marginBottom: '28px',
                }}>
                  Designed every visual touchpoint — label art, packaging, ad creatives, and social media — for a live D2C puja brand. Also ran the full Amazon, Flipkart &amp; WooCommerce operation and managed ₹98K+ in paid campaigns.
                </p>

                {/* 4 metrics in 2×2 */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1px', background: 'var(--border)',
                  border: '1px solid var(--border)', borderRadius: '6px',
                  overflow: 'hidden', marginBottom: '28px',
                }}>
                  {[
                    ['₹12L+', 'Annual Sales'],
                    ['3.8x',  'ROAS'],
                    ['₹98K+', 'Ad Spend'],
                    ['1,200+','SKUs Branded'],
                  ].map(([v, l]) => (
                    <div key={l} style={{ background: 'var(--cream)', padding: '20px 20px' }}>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700, fontSize: '28px',
                        letterSpacing: '-0.03em', color: 'var(--terra)',
                      }}>{v}</div>
                      <div style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '9px', letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--warm-gray)',
                        marginTop: '4px',
                      }}>{l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {['Photoshop', 'Illustrator', 'Canva', 'Amazon Ads', 'Meta Ads', 'Google Ads'].map(t => (
                    <span key={t} className="pill" style={{ fontSize: '11px', padding: '4px 12px' }}>{t}</span>
                  ))}
                </div>

                <a href="http://murliwale.com/" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600, fontSize: '13px',
                  color: 'var(--terra)', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  transition: 'gap 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >Visit murliwale.com →</a>
              </div>

              {/* Design card grid */}
              <div>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--warm-gray)',
                  marginBottom: '12px',
                }}>Design Samples — click to view collection</p>
                <DesignCardGrid
                  cards={murliwalePreviewCards}
                  onViewAll={() => setMurliwaleOpen(true)}
                  viewLabel="Full Collection"
                />
              </div>
            </div>
          </ProjectBlock>

          {/* ── BCA PLACEMENT CELL ── */}
          <ProjectBlock index={1}>
            <div style={{
              background: 'var(--cream-2)',
              border: '1px solid var(--border)',
              borderRadius: '8px', overflow: 'hidden',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              }}>
                {/* Info */}
                <div style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
                  <SectionTag>Social Media · Content Design</SectionTag>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)',
                    letterSpacing: '-0.03em', lineHeight: 1,
                    color: 'var(--dark)', marginBottom: '16px',
                  }}>BCA Placement Cell</h3>
                  <p style={{ fontSize: '14px', color: 'var(--warm-gray)', lineHeight: 1.7, marginBottom: '24px' }}>
                    Promoted to Social Media Head in 2026. Manages official Instagram &amp; LinkedIn for MSI's placement cell. Runs original post and reel series averaging 10K+ views — all creatives designed in-house.
                  </p>
                  <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {[['10K+', 'Avg Views'], ['774+', 'LinkedIn Followers'], ['2', 'Channels']].map(([v, l]) => (
                      <div key={l}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--sage)', letterSpacing: '-0.02em' }}>{v}</div>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginTop: '3px' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Photoshop', 'Canva', 'Instagram', 'LinkedIn'].map(t => (
                      <span key={t} className="pill" style={{ fontSize: '11px', padding: '4px 12px' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Cards */}
                <div style={{ padding: '24px', background: 'var(--cream)' }}>
                  <p style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'var(--warm-gray)',
                    marginBottom: '12px',
                  }}>Design Samples</p>
                  <DesignCardGrid
                    cards={bcaPreviewCards}
                    onViewAll={() => setBcaOpen(true)}
                    viewLabel="View Designs"
                  />
                </div>
              </div>
            </div>
          </ProjectBlock>

          {/* ── GRAPH-E-THON ── */}
          <ProjectBlock index={2}>
            <div style={{
              background: 'var(--sage)',
              borderRadius: '8px',
              padding: 'clamp(28px, 4vw, 52px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '40px', alignItems: 'center',
            }}>
              <div>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(250,248,243,0.5)', display: 'block', marginBottom: '16px',
                }}>Hackathon · Product Design · Pitch</span>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)',
                  letterSpacing: '-0.03em', lineHeight: 1,
                  color: '#FAF8F3', marginBottom: '16px',
                }}>Graph-e-thon 3.0</h3>
                <p style={{ fontSize: '14px', color: 'rgba(250,248,243,0.6)', lineHeight: 1.7, marginBottom: '24px' }}>
                  All India Finalist. Led Team PowerRangers (MSI) at a 72-hour national SDG hackathon. Co-built and pitched Raksha — a women's safety SOS platform targeting feature-phone users. Delivered a 12-slide deck and live demo to the judging panel at Graphic Era University.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                  {['All India Finalist', '72hr Hackathon', 'Team Leader', 'Graphic Era University'].map(t => (
                    <span key={t} style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '9px', letterSpacing: '0.1em',
                      color: 'rgba(250,248,243,0.7)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '4px 12px', borderRadius: '100px',
                    }}>{t}</span>
                  ))}
                </div>
                <a href="/assets/raksha-pitch.pdf" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--sage)', background: '#FAF8F3',
                  padding: '12px 28px', borderRadius: '3px', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#FAF8F3'; e.currentTarget.style.color = 'var(--sage)' }}
                >View Pitch Deck PDF →</a>
              </div>

              {/* Certificate image */}
              <div style={{
                borderRadius: '6px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.12)',
                maxWidth: '380px', margin: '0 auto',
              }}>
                <img src="/assets/certs/graphethon.png" alt="Graph-e-thon Certificate" style={{
                  width: '100%', display: 'block',
                }} />
              </div>
            </div>
          </ProjectBlock>

        </div>
      </section>

      {/* Bento gallery overlays */}
      <BentoGallery
        isOpen={murliwaleOpen}
        onClose={() => setMurliwaleOpen(false)}
        title="Murliwale — Design Collection"
        subtitle="Brand identity · Packaging · Social media · Label design"
        accent="#C24C15"
        items={murliwaleItems}
        darkBg="#1B3A2D"
      />
      <BentoGallery
        isOpen={bcaOpen}
        onClose={() => setBcaOpen(false)}
        title="BCA Placement Cell — Social Media Designs"
        subtitle="Instagram · LinkedIn · Event posters"
        accent="#3B5BDB"
        items={bcaItems}
        darkBg="#0F1A3A"
      />
    </>
  )
}
