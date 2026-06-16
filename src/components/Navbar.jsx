import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/motion'

const links = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Work', href: '#work' },
  { n: '03', label: 'Designs', href: '#designs' },
  { n: '04', label: 'Skills', href: '#skills' },
  { n: '05', label: 'Wins', href: '#achievements' },
  { n: '06', label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!prefersReducedMotion()) gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 1.4 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => { e.preventDefault(); setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
        borderBottom: '2px solid var(--ink)',
        background: scrolled ? 'var(--paper)' : 'transparent',
        transition: 'background 0.3s',
      }}>
        <a href="#hero" onClick={(e) => go(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px clamp(16px,4vw,30px)', borderRight: '2px solid var(--ink)' }}>
          <span style={{ width: 26, height: 26, background: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: '16px' }}>A</span>
          <span className="display" style={{ fontSize: '18px', color: 'var(--ink)' }}>SHARMA<span style={{ color: 'var(--accent)' }}>®</span></span>
        </a>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'stretch' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '0 clamp(14px,1.6vw,22px)',
              borderLeft: '2px solid var(--ink)', textDecoration: 'none', color: 'var(--ink)',
              transition: 'background 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)' }}>
              <span className="meta" style={{ fontSize: '9px', color: 'inherit' }}>{l.n}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'inherit' }}>{l.label}</span>
            </a>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="nav-burger" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 56, borderLeft: '2px solid var(--ink)', background: open ? 'var(--accent)' : 'transparent', cursor: 'none', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map(i => <span key={i} style={{ width: 24, height: 2.5, background: open ? 'var(--on-accent)' : 'var(--ink)', transition: 'all .3s', transform: open ? (i === 0 ? 'rotate(45deg) translate(4px,5px)' : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(4px,-5px)') : 'none' }} />)}
        </button>
      </nav>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--paper)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', textDecoration: 'none', color: 'var(--ink)', borderBottom: '2px solid var(--ink)', padding: '14px 0' }}>
              <span className="meta">{l.n}</span>
              <span className="display h-md">{l.label}</span>
            </a>
          ))}
        </div>
      )}
    </>
  )
}
