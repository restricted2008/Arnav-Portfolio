import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/*
  items: [{ src, alt, cols, rows }]
  cols: 1 | 2 | 3   → grid-column: span N
  rows: 1 | 2       → grid-row: span N
  bg: optional background for contain-mode cells
*/
export default function BentoGallery({ isOpen, onClose, title, subtitle, accent = '#C24C15', items = [], darkBg = '#1B3A2D' }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const cellsRef = useRef([])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'

    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    gsap.fromTo(contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power3.out' }
    )
    gsap.fromTo(
      cellsRef.current.filter(Boolean),
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5, ease: 'power2.out',
        stagger: 0.06, delay: 0.2,
      }
    )

    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: onClose,
    })
  }

  const handleKey = (e) => { if (e.key === 'Escape') handleClose() }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      onKeyDown={handleKey}
      tabIndex={-1}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: darkBg,
        overflowY: 'auto',
        opacity: 0,
      }}
    >
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: darkBg,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '20px clamp(20px, 4vw, 60px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(12px)',
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 'clamp(20px, 3vw, 28px)',
            letterSpacing: '-0.02em', color: '#FAF8F3',
          }}>{title}</h2>
          {subtitle && (
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.15em',
              color: 'rgba(250,248,243,0.4)', textTransform: 'uppercase',
              marginTop: '4px',
            }}>{subtitle}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#FAF8F3', cursor: 'none',
            borderRadius: '100px',
            padding: '8px 20px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: '12px',
            letterSpacing: '0.08em',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          ← Close Gallery
        </button>
      </div>

      {/* Bento grid */}
      <div ref={contentRef} style={{ padding: 'clamp(16px, 3vw, 32px) clamp(16px, 4vw, 48px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {items.map((item, i) => (
            <div
              key={i}
              ref={el => cellsRef.current[i] = el}
              style={{
                gridColumn: item.cols > 1 ? `span ${item.cols}` : undefined,
                gridRow: item.rows > 1 ? `span ${item.rows}` : undefined,
                borderRadius: '8px',
                overflow: 'hidden',
                background: item.bg || 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: item.rows > 1 ? '400px' : '220px',
                position: 'relative',
                transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
                opacity: 0,
                cursor: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.015)'
                e.currentTarget.style.boxShadow = `0 0 0 2px ${accent}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img
                src={item.src}
                alt={item.alt || ''}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  padding: item.type === 'label' ? '16px' : '0',
                }}
              />
              {/* Subtle label on hover */}
              {item.label && (
                <div style={{
                  position: 'absolute', bottom: '10px', left: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  color: '#FAF8F3',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px', letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: '100px',
                }}>{item.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div style={{
        textAlign: 'center', padding: '32px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '10px', letterSpacing: '0.15em',
        color: 'rgba(250,248,243,0.3)', textTransform: 'uppercase',
      }}>
        All designs by Arnav Sharma · {new Date().getFullYear()}
      </div>
    </div>
  )
}
