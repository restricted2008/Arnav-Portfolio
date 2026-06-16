import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

/* Global click-to-zoom: any <img data-zoom> opens here. */
export default function Lightbox() {
  const [item, setItem] = useState(null) // { src, alt }
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      const img = e.target.closest('img[data-zoom]')
      if (!img) return
      e.preventDefault()
      setItem({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!item) return
    window.__lenis?.stop()
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
    const onKey = (e) => { if (e.key === 'Escape') setItem(null) }
    window.addEventListener('keydown', onKey)
    return () => { window.__lenis?.start(); window.removeEventListener('keydown', onKey) }
  }, [item])

  if (!item) return null
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label={item.alt || 'Image preview'} onClick={() => setItem(null)} style={{ position: 'fixed', inset: 0, zIndex: 10050, background: 'rgba(23,22,15,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px,5vw,64px)', cursor: 'none' }}>
      <button onClick={(e) => { e.stopPropagation(); setItem(null) }} className="btn btn-accent" style={{ position: 'absolute', top: 20, left: 20 }}>← Back</button>
      {item.alt && <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}><span className="meta" style={{ color: 'var(--accent)' }}>{item.alt}</span></div>}
      <img src={item.src} alt={item.alt} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '100%', maxHeight: '86vh', objectFit: 'contain', border: '3px solid var(--ink)' }} />
    </div>
  )
}
