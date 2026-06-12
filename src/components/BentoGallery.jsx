import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const GAP = 16 // small gap between designs

/*
  items: [{ src, alt, label }]
  Justified (Flickr-style) layout: each row is scaled so its images line up
  with a small gap between them — no cropping (contain), aspect preserved,
  rounded soft-shadow cards. Landscape pieces lead (array order).
*/
export default function BentoGallery({ isOpen, onClose, title, subtitle, items = [] }) {
  const overlayRef = useRef(null)
  const scrollRef = useRef(null)
  const gridRef = useRef(null)
  const itemRefs = useRef([])
  const lightboxRef = useRef(null)
  const [ratios, setRatios] = useState([])
  const [containerW, setContainerW] = useState(0)
  const [rows, setRows] = useState([])
  const [lightbox, setLightbox] = useState(null) // index of zoomed design

  // preload natural aspect ratios
  useEffect(() => {
    if (!isOpen) { setRatios([]); return }
    let cancelled = false
    Promise.all(items.map(it => new Promise(res => {
      const img = new Image()
      img.onload = () => res(img.naturalWidth / img.naturalHeight)
      img.onerror = () => res(1)
      img.src = it.src
    }))).then(rs => { if (!cancelled) setRatios(rs) })
    return () => { cancelled = true }
  }, [isOpen, items])

  // measure container width
  useEffect(() => {
    if (!isOpen) return
    const measure = () => { if (gridRef.current) setContainerW(gridRef.current.clientWidth) }
    const id = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', measure) }
  }, [isOpen])

  // build justified rows (accounting for the gap between cells)
  useEffect(() => {
    if (!ratios.length || !containerW) return
    const targetH = containerW < 560 ? 170 : containerW < 980 ? 215 : 250
    const out = []
    let row = [], sum = 0
    ratios.forEach((r, i) => {
      row.push({ i, r }); sum += r
      const naturalW = sum * targetH + GAP * (row.length - 1)
      if (naturalW >= containerW) {
        const avail = containerW - GAP * (row.length - 1)
        const h = avail / sum
        out.push(row.map(c => ({ ...c, h })))
        row = []; sum = 0
      }
    })
    if (row.length) {
      const avail = containerW - GAP * (row.length - 1)
      const h = avail / sum
      out.push(h <= targetH * 1.55
        ? row.map(c => ({ ...c, h }))
        : row.map(c => ({ ...c, h: targetH })))
    }
    setRows(out)
  }, [ratios, containerW])

  // open animation + pause Lenis (native wheel scroll) + restore on close
  useEffect(() => {
    if (!isOpen) return
    const savedY = window.scrollY
    window.__lenis?.stop()
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    return () => {
      window.__lenis?.start()
      window.__lenis?.scrollTo(savedY, { immediate: true })
    }
  }, [isOpen])

  // stagger reveal once rows computed
  useEffect(() => {
    if (!rows.length) return
    gsap.fromTo(itemRefs.current.filter(Boolean),
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.04 })
  }, [rows])

  const handleClose = () => gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose })

  // lightbox open animation
  useEffect(() => {
    if (lightbox === null || !lightboxRef.current) return
    gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    const img = lightboxRef.current.querySelector('img')
    if (img) gsap.fromTo(img, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
  }, [lightbox])

  // Esc: close lightbox first, then the gallery
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape' || !isOpen) return
      if (lightbox !== null) setLightbox(null)
      else handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, lightbox])

  if (!isOpen) return null

  return (
    <div ref={overlayRef} style={{ position: 'fixed', inset: 0, zIndex: 10000, opacity: 0 }}>
      <div ref={scrollRef} data-lenis-prevent style={{
        position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden',
        background: 'linear-gradient(168deg, #211810, #1A130E 60%, #140E09)',
        WebkitOverflowScrolling: 'touch',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6, backgroundImage: 'radial-gradient(rgba(255,180,120,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10, padding: '18px clamp(20px, 4vw, 56px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(26,19,14,0.88)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--line)',
        }}>
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(20px, 3vw, 30px)', color: 'var(--text)' }}>{title}</h2>
            {subtitle && <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '5px' }}>{subtitle}</p>}
          </div>
          <button onClick={handleClose} className="btn-ghost" style={{ fontSize: '12px', padding: '10px 22px' }}>← Close</button>
        </div>

        {/* justified gallery */}
        <div style={{ padding: 'clamp(18px, 3vw, 36px) clamp(16px, 4vw, 56px) 48px', position: 'relative', zIndex: 1 }}>
          <div ref={gridRef} className="jg">
            {rows.map((row, ri) => (
              <div key={ri} className="jg-row" style={{ gap: `${GAP}px`, marginBottom: ri < rows.length - 1 ? `${GAP}px` : 0 }}>
                {row.map(cell => {
                  const item = items[cell.i]
                  return (
                    <div key={cell.i} ref={el => itemRefs.current[cell.i] = el} className="jg-cell" data-cursor
                      onClick={() => setLightbox(cell.i)}
                      style={{ flex: '0 0 auto', width: `${cell.r * cell.h}px`, height: `${cell.h}px` }}>
                      <img src={item.src} alt={item.alt || ''} />
                      {item.label && <span className="jg-label">{item.label}</span>}
                      <span className="jg-zoom">⤢</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '36px 0 8px', fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'var(--surface-hi)', textTransform: 'uppercase' }}>
            All designs by Arnav Sharma · {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Lightbox — click a design to zoom full size */}
      {lightbox !== null && (
        <div ref={lightboxRef} data-lenis-prevent
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 10002, opacity: 0,
            background: 'rgba(12,8,5,0.92)', backdropFilter: 'blur(14px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(20px, 5vw, 64px)',
          }}>
          {/* back button */}
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="btn-ghost"
            style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '12px', padding: '10px 22px', zIndex: 2 }}>
            ← Back
          </button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
            style={{ position: 'absolute', top: '22px', right: '24px', zIndex: 2, background: 'none', border: 'none', color: 'var(--text-soft)', cursor: 'none', fontSize: '22px', fontFamily: "'Inter', sans-serif" }}>✕</button>

          {/* counter */}
          <div style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.15em', color: 'var(--muted)' }}>
            {String(lightbox + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            {items[lightbox]?.label ? ` · ${items[lightbox].label}` : ''}
          </div>

          {/* prev / next */}
          {items.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length) }}
                style={{ position: 'absolute', left: 'clamp(8px, 2vw, 28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: 48, height: 48, borderRadius: '50%', background: 'rgba(46,34,24,0.7)', border: '1px solid var(--line)', color: 'var(--text)', cursor: 'none', fontSize: '20px' }}>‹</button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length) }}
                style={{ position: 'absolute', right: 'clamp(8px, 2vw, 28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: 48, height: 48, borderRadius: '50%', background: 'rgba(46,34,24,0.7)', border: '1px solid var(--line)', color: 'var(--text)', cursor: 'none', fontSize: '20px' }}>›</button>
            </>
          )}

          <img src={items[lightbox]?.src} alt={items[lightbox]?.alt || ''} onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '100%', maxHeight: '86vh', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 30px 80px rgba(0,0,0,0.7)' }} />
        </div>
      )}
    </div>
  )
}
