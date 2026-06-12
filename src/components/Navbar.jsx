import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Logo from './Logo'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Wins', href: '#achievements' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.4 })
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => { e.preventDefault(); setMenuOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, width: 'calc(100% - 52px)', maxWidth: '1180px',
      }}>
        <div className="neu" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '9px 12px 9px 22px' : '13px 14px 13px 24px',
          borderRadius: '999px', transition: 'all 0.4s ease',
          background: scrolled ? 'linear-gradient(150deg, #2E2218, #1B130D)' : 'linear-gradient(150deg, rgba(46,34,24,0.7), rgba(27,19,13,0.6))',
          backdropFilter: 'blur(16px)',
        }}>
          <a href="#hero" onClick={(e) => go(e, '#hero')} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Logo size={34} />
          </a>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {[...links, { label: 'Contact', href: '#contact' }].map(l => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} style={{
                fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500,
                color: 'var(--text-soft)', textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-soft)'}
              >{l.label}</a>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" style={{
            display: 'none', background: 'none', border: 'none', cursor: 'none',
            flexDirection: 'column', gap: '5px', padding: '8px',
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: i === 1 ? (menuOpen ? '26px' : '16px') : '26px', height: '2px',
                background: 'var(--text)', borderRadius: '2px', transition: 'all 0.3s',
                transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(5px,-5px)') : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(26,19,14,0.97)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px',
        }}>
          {[...links, { label: 'Contact', href: '#contact' }].map(l => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '40px',
              color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '-0.02em',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--orange)'}
              onMouseLeave={e => e.target.style.color = 'var(--text)'}
            >{l.label}</a>
          ))}
        </div>
      )}
    </>
  )
}
