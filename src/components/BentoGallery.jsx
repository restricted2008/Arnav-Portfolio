import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

const GAP = 12

export default function BentoGallery({ isOpen, onClose, title, subtitle, items = [] }) {
  const overlayRef = useRef(null)
  const gridRef = useRef(null)
  const lightboxRef = useRef(null)
  const [ratios, setRatios] = useState([])
  const [containerW, setContainerW] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  // Async aspect-ratio probe — state is only set inside the resolved promise.
  useEffect(() => {
    if (!isOpen || !items.length) return
    let cancelled = false
    Promise.all(items.map(it => new Promise(res => {
      const img = new Image()
      img.onload = () => res(img.naturalWidth / img.naturalHeight)
      img.onerror = () => res(1)
      img.src = it.src
    }))).then(rs => { if (!cancelled) setRatios(rs) })
    return () => { cancelled = true }
  }, [isOpen, items])

  useEffect(() => {
    if (!isOpen) return
    const measure = () => { if (gridRef.current) setContainerW(gridRef.current.clientWidth) }
    const id = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', measure) }
  }, [isOpen])

  // Justified rows are pure derivation — compute during render, not via setState.
  const rows = useMemo(() => {
    if (ratios.length !== items.length || !containerW) return []
    const targetH = containerW < 560 ? 170 : containerW < 980 ? 215 : 250
    const out = []; let row = [], sum = 0
    ratios.forEach((r, i) => {
      row.push({ i, r }); sum += r
      if (sum * targetH + GAP * (row.length - 1) >= containerW) {
        const h = (containerW - GAP * (row.length - 1)) / sum
        out.push(row.map(c => ({ ...c, h }))); row = []; sum = 0
      }
    })
    if (row.length) { const h = (containerW - GAP * (row.length - 1)) / sum; out.push(h <= targetH * 1.55 ? row.map(c => ({ ...c, h })) : row.map(c => ({ ...c, h: targetH }))) }
    return out
  }, [ratios, containerW, items.length])

  useEffect(() => {
    if (!isOpen) return
    const savedY = window.scrollY
    window.__lenis?.stop()
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    return () => { window.__lenis?.start(); window.__lenis?.scrollTo(savedY, { immediate: true }) }
  }, [isOpen])

  useEffect(() => {
    if (lightbox === null || !lightboxRef.current) return
    gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
  }, [lightbox])

  const handleClose = useCallback(() => gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose }), [onClose])

  useEffect(() => {
    const onKey = (e) => { if (e.key !== 'Escape' || !isOpen) return; if (lightbox !== null) setLightbox(null); else handleClose() }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, lightbox, handleClose])

  if (!isOpen) return null

  return (
    <div ref={overlayRef} role="dialog" aria-modal="true" aria-label={title || 'Design collection'} style={{ position: 'fixed', inset: 0, zIndex: 10000, opacity: 0 }}>
      <div data-lenis-prevent style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', background: 'var(--paper)' }}>
        {/* header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px clamp(16px,4vw,48px)', background: 'var(--paper-2)', borderBottom: '2px solid var(--ink)' }}>
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(18px,3vw,32px)', color: 'var(--ink)' }}>{title}</h2>
            {subtitle && <span className="meta" style={{ color: 'var(--accent)' }}>{subtitle}</span>}
          </div>
          <button onClick={handleClose} className="btn btn-accent">✕ Close</button>
        </div>

        {/* justified grid */}
        <div style={{ padding: 'clamp(16px,3vw,40px) clamp(16px,4vw,48px) 64px' }}>
          <div ref={gridRef} className="jg">
            {rows.map((row, ri) => (
              <div key={ri} className="jg-row" style={{ gap: GAP, marginBottom: ri < rows.length - 1 ? GAP : 0 }}>
                {row.map(cell => {
                  const item = items[cell.i]
                  return (
                    <div key={cell.i} className="jg-cell" data-cursor onClick={() => setLightbox(cell.i)} style={{ flex: '0 0 auto', width: cell.r * cell.h, height: cell.h }}>
                      <img src={item.src} alt={item.alt || ''} />
                      {item.label && <span className="jg-label">{item.label}</span>}
                      <span className="jg-zoom">⤢</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}><span className="meta">All designs © Arnav Sharma · {new Date().getFullYear()}</span></div>
        </div>
      </div>

      {/* lightbox */}
      {lightbox !== null && (
        <div ref={lightboxRef} data-lenis-prevent onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, zIndex: 10002, opacity: 0, background: 'rgba(23,22,15,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px,5vw,64px)' }}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="btn btn-accent" style={{ position: 'absolute', top: 20, left: 20 }}>← Back</button>
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}><span className="meta" style={{ color: 'var(--accent)' }}>{String(lightbox + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {items[lightbox]?.label}</span></div>
          {items.length > 1 && (<>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length) }} className="btn btn-accent" style={{ position: 'absolute', left: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', padding: '14px 18px' }}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length) }} className="btn btn-accent" style={{ position: 'absolute', right: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', padding: '14px 18px' }}>›</button>
          </>)}
          <img src={items[lightbox]?.src} alt="" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '100%', maxHeight: '84vh', objectFit: 'contain', border: '3px solid var(--ink)' }} />
        </div>
      )}
    </div>
  )
}
