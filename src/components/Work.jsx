import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BentoGallery from './BentoGallery'

gsap.registerPlugin(ScrollTrigger)

/* ─── MURLIWALE — landscape pieces lead, then social, then portraits ─── */
const murliwaleItems = [
  { src: '/assets/designs/murliwale/kkts-set.png',          alt: 'KKTS Product Set',  label: 'Product Set' },
  { src: '/assets/designs/murliwale/chameli-set.png',       alt: 'Chameli & Fulwari', label: 'Product Range' },
  { src: '/assets/designs/murliwale/find-size.png',         alt: 'Dress Size Guide',  label: 'Size Guide' },
  { src: '/assets/designs/murliwale/label-fulwari.png',     alt: 'Fulwari Label',     label: 'Label · Fulwari' },
  { src: '/assets/designs/murliwale/mata-rani-dresses.png', alt: 'Mata Rani Dresses', label: 'Social · Dresses' },
  { src: '/assets/designs/murliwale/insta-1.jpg',           alt: 'Raksha Bandhan',    label: 'Social' },
  { src: '/assets/designs/murliwale/insta-2.jpg',           alt: 'Ganesh Chaturthi',  label: 'Social' },
  { src: '/assets/designs/murliwale/insta-4.jpg',           alt: 'Durga Pooja',       label: 'Social' },
  { src: '/assets/designs/murliwale/insta-5.jpg',           alt: 'Navratri',          label: 'Social' },
  { src: '/assets/designs/murliwale/insta-3.jpg',           alt: 'Festival Post',     label: 'Social' },
  { src: '/assets/designs/murliwale/idol-shiva-family.png', alt: 'Shiv Parivar Idol', label: 'Product Shot' },
  { src: '/assets/designs/murliwale/idol-radha-krishna.png',alt: 'Radha Krishna Idol',label: 'Product Shot' },
  { src: '/assets/designs/murliwale/idol-shiva.png',        alt: 'Shiva Idol',        label: 'Product Shot' },
  { src: '/assets/designs/murliwale/kkts-single.png',       alt: 'Lifestyle Shot',    label: 'Lifestyle' },
  { src: '/assets/designs/murliwale/packaging-vrindha.png', alt: 'Vrindha Packaging', label: 'Packaging' },
  { src: '/assets/designs/murliwale/label-rose.png',        alt: 'Rose Label',        label: 'Label · Rose' },
]

/* ─── CAMPUS / BCA — landscape leads, ecom banner LAST ─── */
const campusItems = [
  { src: '/assets/designs/misc/one-tool.png',            alt: 'Tools Behind Real Developers', label: 'Carousel' },
  { src: '/assets/designs/misc/chess.png',               alt: 'Chess LinkedIn Banner', label: 'LinkedIn Banner' },
  { src: '/assets/designs/misc/genesis-cert.png',        alt: 'Genesis Certificate',label: 'Certificate Design' },
  { src: '/assets/designs/misc/farewell.png',            alt: 'Farewell Poster',    label: 'Farewell' },
  { src: '/assets/designs/misc/tech-talk.png',           alt: 'Tech Talk Poster',   label: 'Event Poster' },
  { src: '/assets/designs/misc/profile-building.png',    alt: 'Profile Building',   label: 'LinkedIn Post' },
  { src: '/assets/designs/misc/calm-chaos.png',          alt: 'Calm Within Chaos',  label: 'Event Poster' },
  { src: '/assets/designs/misc/genesis-fest.jpg',        alt: 'Genesis Fest Poster',label: 'Genesis Fest' },
  { src: '/assets/designs/misc/summer-internships.png',  alt: 'Summer Internships', label: 'Placement Post' },
  { src: '/assets/designs/misc/maha-shivaratri.png',     alt: 'Maha Shivaratri',    label: 'Festival Post' },
  { src: '/assets/designs/misc/mahagauri.png',           alt: 'NSS Navratri Post',  label: 'NSS · Navratri' },
  { src: '/assets/designs/misc/ecom-banner.png',         alt: 'E-Commerce Banner',  label: 'E-Commerce Banner' },
]

const murliwalePreview = [
  { src: '/assets/designs/murliwale/kkts-set.png', label: 'Product Set' },
  { src: '/assets/designs/murliwale/packaging-vrindha.png', label: 'Packaging' },
  { src: '/assets/designs/murliwale/insta-1.jpg', label: 'Social' },
  { src: '/assets/designs/murliwale/chameli-set.png', label: 'Range' },
  { src: '/assets/designs/murliwale/label-rose.png', label: 'Label' },
]
const campusPreview = [
  { src: '/assets/designs/misc/farewell.png', label: 'Farewell' },
  { src: '/assets/designs/misc/one-tool.png', label: 'Carousel' },
  { src: '/assets/designs/misc/tech-talk.png', label: 'Tech Talk' },
  { src: '/assets/designs/misc/genesis-fest.jpg', label: 'Genesis' },
]

function DesignGrid({ cards, onView, viewLabel }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
      {cards.map((c, i) => (
        <div key={i} className="design-card" style={{ aspectRatio: '1' }}>
          <img src={c.src} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div className="overlay"><button className="btn-view" onClick={onView}>View ↗</button></div>
          <div style={{ position: 'absolute', top: '8px', left: '8px', fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(26,19,14,0.65)', backdropFilter: 'blur(4px)', padding: '3px 8px', borderRadius: '999px', border: '1px solid var(--line)' }}>{c.label}</div>
        </div>
      ))}
      <div onClick={onView} className="design-card" style={{ aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #FF7A3D, #E8431A)' }}>
        <span className="display" style={{ fontSize: '30px', color: '#fff', lineHeight: 1 }}>→</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', marginTop: '8px', textAlign: 'center', padding: '0 8px' }}>{viewLabel}</span>
      </div>
    </div>
  )
}

function Block({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%' } })
  }, [])
  return <div ref={ref} style={{ opacity: 0, marginBottom: 'clamp(14px, 2vw, 22px)' }}>{children}</div>
}

export default function Work() {
  const headRef = useRef(null)
  const [murliOpen, setMurliOpen] = useState(false)
  const [campusOpen, setCampusOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headRef.current, start: 'top 88%' } })
  }, [])

  return (
    <>
      <section id="work" className="section">
        <div className="wrap">
          <div ref={headRef} className="section-head" style={{ opacity: 0, textAlign: 'center' }}>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>03 · Selected Work</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 6.5vw, 72px)', marginTop: '12px' }}>
              Work that <span className="grad-warm">ships results</span>
            </h2>
          </div>

          {/* ── MURLIWALE ── */}
          <Block>
            <div className="neu" style={{ padding: 'clamp(22px, 3.5vw, 40px)' }}>
              <div className="row g-4 gx-lg-5 align-items-center">
                <div className="col-12 col-lg-6">
                  <span className="tag" style={{ marginBottom: '16px' }}>Brand Identity · E-Commerce · Paid Growth</span>
                  <h3 className="display" style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', marginBottom: '14px' }}>
                    Murliwale
                  </h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: '24px' }}>
                    Designed every visual touchpoint — label art, packaging, ad creatives and social —
                    for a live B2C puja brand. Ran the full Amazon, Flipkart &amp; WooCommerce operation
                    and managed ₹98K+ in paid campaigns.
                  </p>
                  <div className="row g-2" style={{ marginBottom: '22px' }}>
                    {[['₹12L+', 'Annual Sales'], ['3.8x', 'ROAS'], ['₹98K+', 'Ad Spend'], ['1,200+', 'SKUs']].map(([v, l]) => (
                      <div key={l} className="col-6">
                        <div className="neu-in" style={{ padding: '14px 16px' }}>
                          <div className="display grad-warm-2" style={{ fontSize: '25px' }}>{v}</div>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '5px' }}>{l}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="http://murliwale.com/" target="_blank" rel="noopener noreferrer" className="btn-neu" style={{ fontSize: '12px', padding: '11px 26px' }}>Visit murliwale.com →</a>
                </div>
                <div className="col-12 col-lg-6">
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>Designs — click to open gallery</p>
                  <DesignGrid cards={murliwalePreview} onView={() => setMurliOpen(true)} viewLabel="Full Collection" />
                </div>
              </div>
            </div>
          </Block>

          {/* ── BCA / CAMPUS ── */}
          <Block>
            <div className="neu" style={{ padding: 'clamp(22px, 3.5vw, 40px)' }}>
              <div className="row g-4 gx-lg-5 align-items-center">
                <div className="col-12 col-lg-6">
                  <span className="tag" style={{ marginBottom: '16px' }}>Social Media · Content · College Design</span>
                  <h3 className="display" style={{ fontSize: 'clamp(28px, 4vw, 46px)', marginBottom: '14px' }}>
                    BCA Placement <span className="grad-warm-2">& College</span>
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: '22px' }}>
                    Social Media Head for MSI's placement cell since 2026 — Instagram &amp; LinkedIn
                    post and reel series averaging 10K+ views. Plus event posters, fest branding and
                    college campaigns, all designed in-house.
                  </p>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {[['10K+', 'Avg Views'], ['774+', 'Followers'], ['9+', 'Campaigns']].map(([v, l]) => (
                      <div key={l}>
                        <div className="display grad-warm-2" style={{ fontSize: '24px' }}>{v}</div>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '3px' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>Designs — click to open gallery</p>
                  <DesignGrid cards={campusPreview} onView={() => setCampusOpen(true)} viewLabel="All College Designs" />
                </div>
              </div>
            </div>
          </Block>
        </div>
      </section>

      <BentoGallery isOpen={murliOpen} onClose={() => setMurliOpen(false)} title="Murliwale — Design Collection" subtitle="Brand identity · Packaging · Social · Labels" items={murliwaleItems} />
      <BentoGallery isOpen={campusOpen} onClose={() => setCampusOpen(false)} title="BCA & College — Design Collection" subtitle="Posters · Social · Fest branding · E-commerce" items={campusItems} />
    </>
  )
}
