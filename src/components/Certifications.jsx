import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const certs = [
  { title: 'Amazon ATES Training', issuer: 'Amazon India', year: '2024', image: '/assets/certs/amazon-ates.jpg', tag: 'E-Commerce' },
  { title: 'Advanced Graphic Designing', issuer: 'iElevate', year: '2024', image: '/assets/certs/advanced-design.jpg', tag: 'Design' },
  { title: 'Digital Marketing Fundamentals', issuer: 'iElevate', year: '2024', image: '/assets/certs/digital-marketing.jpg', tag: 'Marketing' },
  { title: 'Graph-e-thon 3.0', issuer: 'Graphic Era University', year: '2026', image: '/assets/certs/graphethon.png', tag: 'Hackathon' },
  { title: 'Build Up Ideathon 2025', issuer: 'Geek Room, MSIT', year: '2025', image: '/assets/certs/ideathon.png', tag: 'Competition' },
  { title: 'Viksit Bharat Conference', issuer: 'National Conference', year: '2026', image: '/assets/certs/national-conference.png', tag: 'Research' },
]

function Modal({ cert, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  const close = () => gsap.to(ref.current, { opacity: 0, duration: 0.2, onComplete: onClose })

  return (
    <div ref={ref} onClick={close} style={{
      position: 'fixed', inset: 0, zIndex: 10000, opacity: 0, cursor: 'none',
      background: 'rgba(20,14,9,0.92)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '760px', width: '100%' }}>
        <button onClick={close} className="btn-ghost" style={{ position: 'absolute', top: '-46px', right: 0, fontSize: '12px', padding: '8px 18px' }}>✕ Close</button>
        <div className="neu" style={{ padding: '12px' }}>
          <img src={cert.image} alt={cert.title} style={{ width: '100%', display: 'block', borderRadius: '14px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', padding: '0 6px' }}>
          <div>
            <div className="display-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '16px', color: 'var(--text)' }}>{cert.title}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: '3px' }}>{cert.issuer} · {cert.year}</div>
          </div>
          <span className="tag">{cert.tag}</span>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const headRef = useRef(null)
  const stripRef = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headRef.current, start: 'top 88%' } })
    gsap.fromTo(stripRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: stripRef.current, start: 'top 90%' } })
  }, [])

  return (
    <>
      <section id="certifications" className="section">
        <div className="wrap">
          <div ref={headRef} className="section-head" style={{ opacity: 0, textAlign: 'center' }}>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>06 · Certifications</span>
            <h2 className="display" style={{ fontSize: 'clamp(34px, 6vw, 64px)', marginTop: '12px' }}>
              Credentials &amp; <span className="grad-warm">proof of work</span>
            </h2>
            <p style={{ marginTop: '12px', fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', color: 'var(--muted)' }}>Click any certificate to view full size</p>
          </div>

          <div ref={stripRef} style={{ opacity: 0 }}>
            <div className="h-scroll">
              {certs.map(cert => (
                <div key={cert.title} onClick={() => setActive(cert)} className="neu neu-hover" style={{ flexShrink: 0, width: '280px', padding: '10px', cursor: 'none' }}>
                  <div style={{ height: '165px', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}>
                    <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(20,14,9,0.5)', opacity: 0, transition: 'opacity 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
                      <span className="btn-view">View Certificate</span>
                    </div>
                  </div>
                  <div style={{ padding: '14px 8px 8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)' }}>{cert.tag}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--muted)' }}>{cert.year}</span>
                    </div>
                    <h4 className="display-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', color: 'var(--text)', marginBottom: '3px', lineHeight: 1.25 }}>{cert.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-soft)' }}>{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {active && <Modal cert={active} onClose={() => setActive(null)} />}
    </>
  )
}
