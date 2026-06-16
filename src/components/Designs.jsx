import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import BentoGallery from './BentoGallery'
import { usePrefersReducedMotion } from '../lib/motion'

const M = '/assets/designs/murliwale/'
const X = '/assets/designs/misc/'

const categories = [
  {
    key: 'A', label: 'Product', desc: 'Packaging · Labels · Product Shots',
    items: [
      { src: M + 'kkts-set.png', alt: 'KKTS Product Set' },
      { src: M + 'packaging-vrindha.png', alt: 'Vrindha Packaging' },
      { src: M + 'chameli-set.png', alt: 'Chameli & Fulwari' },
      { src: M + 'label-fulwari.png', alt: 'Fulwari Label' },
      { src: M + 'label-rose.png', alt: 'Rose Label' },
      { src: M + 'find-size.png', alt: 'Dress Size Guide' },
      { src: M + 'idol-shiva-family.png', alt: 'Shiv Parivar Idol' },
      { src: M + 'idol-radha-krishna.png', alt: 'Radha Krishna Idol' },
      { src: M + 'idol-shiva.png', alt: 'Shiva Idol' },
      { src: M + 'kkts-single.png', alt: 'Lifestyle Shot' },
    ],
  },
  {
    key: 'B', label: 'Social Media', desc: 'Festive · Campaigns · Carousels',
    items: [
      { src: M + 'insta-1.jpg', alt: 'Raksha Bandhan' },
      { src: X + 'one-tool.png', alt: 'Tools Behind Real Developers' },
      { src: M + 'mata-rani-dresses.png', alt: 'Mata Rani Dresses' },
      { src: M + 'insta-2.jpg', alt: 'Ganesh Chaturthi' },
      { src: M + 'insta-4.jpg', alt: 'Durga Pooja' },
      { src: M + 'insta-5.jpg', alt: 'Navratri' },
      { src: M + 'insta-3.jpg', alt: 'Festival' },
      { src: X + 'maha-shivaratri.png', alt: 'Maha Shivaratri' },
      { src: X + 'mahagauri.png', alt: 'NSS · Navratri' },
      { src: X + 'chess.png', alt: 'Chess Banner' },
      { src: X + 'profile-building.png', alt: 'Profile Building' },
      { src: X + 'summer-internships.png', alt: 'Summer Internships' },
      { src: X + 'ecom-banner.png', alt: 'E-Commerce Banner' },
    ],
  },
  {
    key: 'C', label: 'Events', desc: 'Posters · Fests · Certificates',
    items: [
      { src: X + 'farewell.png', alt: 'Farewell' },
      { src: X + 'tech-talk.png', alt: 'Tech Talk' },
      { src: X + 'genesis-fest.jpg', alt: 'Genesis Fest' },
      { src: X + 'calm-chaos.png', alt: 'Calm Within Chaos' },
      { src: X + 'genesis-cert.png', alt: 'Genesis Certificate' },
    ],
  },
]

function Row({ cat, onOpen }) {
  const preview = cat.items.slice(0, 3)
  return (
    <div className="row g-0" style={{ borderTop: '2px solid var(--ink)', borderLeft: '2px solid var(--ink)' }}>
      {preview.map((it, i) => (
        <div key={i} className="col-6 col-lg-3">
          <button onClick={() => onOpen(cat)} className="photo" style={{ width: '100%', aspectRatio: '1', border: 'none', borderRight: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)', cursor: 'none' }}>
            <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
            <span className="jg-label" style={{ opacity: 1 }}>{it.alt}</span>
          </button>
        </div>
      ))}
      {/* View all tile — same box size */}
      <div className="col-6 col-lg-3">
        <button onClick={() => onOpen(cat)} className="box-accent" style={{ width: '100%', aspectRatio: '1', border: 'none', borderRight: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)', cursor: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span className="display" style={{ fontSize: 'clamp(34px,5vw,64px)', color: 'var(--on-accent)', lineHeight: 0.85 }}>{String(cat.items.length).padStart(2, '0')}</span>
          <span className="meta" style={{ color: 'var(--on-accent)' }}>View All ↗</span>
        </button>
      </div>
    </div>
  )
}

export default function Designs() {
  const ref = useRef(null)
  const [open, setOpen] = useState(null) // category object
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-d]', { opacity: 0, y: 24, duration: 0.6, stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="designs" ref={ref} className="section">
      <div className="wrap">
        <div data-d style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span className="meta">03 / Designs</span>
          <span className="meta">By Niche · Click to open</span>
        </div>
        <h2 data-d className="display dot h-lg" style={{ color: 'var(--ink)', margin: '8px 0 20px' }}>DESIGNS</h2>
        <div className="rule-thick" style={{ marginBottom: 'clamp(20px,3vw,34px)' }} />

        {categories.map(cat => (
          <div data-d key={cat.key} style={{ marginBottom: 'clamp(24px,3vw,40px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label-box">{cat.key}</span>
              <h3 className="display" style={{ fontSize: 'clamp(22px,3.4vw,44px)', color: 'var(--ink)' }}>{cat.label}</h3>
              <span className="meta" style={{ marginLeft: 4 }}>{cat.desc}</span>
              <div style={{ flex: 1, height: 2, background: 'var(--line-strong)', minWidth: 30 }} />
              <span className="meta">{String(cat.items.length).padStart(2, '0')}</span>
            </div>
            <Row cat={cat} onOpen={setOpen} />
          </div>
        ))}
      </div>

      <BentoGallery key={open?.key} isOpen={!!open} onClose={() => setOpen(null)} title={open ? `${open.label} — Collection` : ''} subtitle={open ? open.desc : ''} items={open ? open.items : []} />
    </section>
  )
}
