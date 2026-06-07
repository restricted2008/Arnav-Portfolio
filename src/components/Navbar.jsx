import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Wins', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.4 }
    )
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '18px clamp(20px, 5vw, 56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(250,248,243,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <a href="#" onClick={(e) => go(e, '#hero')} style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: '20px', letterSpacing: '-0.03em',
          color: 'var(--terra)', textDecoration: 'none',
        }}>AS</a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
          className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px', fontWeight: 500,
                letterSpacing: '0.04em',
                color: 'var(--warm-gray)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--dark)'}
              onMouseLeave={e => e.target.style.color = 'var(--warm-gray)'}
            >{l.label}</a>
          ))}
          <a href="mailto:2008arnavsharma@gmail.com" className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '11px' }}>
            Hire Me
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'none', flexDirection: 'column', gap: '5px', padding: '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: i === 1 ? (menuOpen ? '28px' : '18px') : '28px',
              height: '1.5px',
              background: 'var(--dark)', transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 1 ? 'scaleX(0)'
                : 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(250,248,243,0.98)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '40px',
          backdropFilter: 'blur(16px)',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '40px', fontWeight: 700,
                letterSpacing: '-0.03em', color: 'var(--dark)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--terra)'}
              onMouseLeave={e => e.target.style.color = 'var(--dark)'}
            >{l.label}</a>
          ))}
        </div>
      )}
    </>
  )
}
