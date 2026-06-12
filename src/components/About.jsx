import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Maharaja Surajmal Institute (MSI)', location: 'New Delhi',
    period: 'Aug 2025 – Expected Aug 2028', gpa: '9.1',
    highlights: ['Social Media Head, BCA Placement Cell — 2026', 'Member, Geek Room MSIT — 2025', 'Member, National Service Scheme (NSS) — 2025'],
  },
  {
    degree: 'High School Diploma — CBSE Class XII',
    school: 'Bloom Public School', location: 'New Delhi',
    period: '2025', gpa: null, highlights: [],
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const introRef = useRef(null)
  const eduRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(photoRef.current, { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } })
      gsap.fromTo(introRef.current, { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, delay: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } })
      gsap.fromTo(eduRef.current, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: eduRef.current, start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="wrap">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ marginBottom: '14px' }}>01 · Who I Am</span>
          <h2 className="display" style={{ fontSize: 'clamp(34px, 6vw, 64px)', marginTop: '12px' }}>
            The designer who <span className="grad-warm">thinks in metrics</span>
          </h2>
        </div>

        {/* intro */}
        <div className="row g-3 g-lg-4 align-items-stretch">
          <div className="col-12 col-lg-5" ref={photoRef} style={{ opacity: 0 }}>
            <div className="neu" style={{ padding: '14px', height: '100%' }}>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '100%', minHeight: '300px' }}>
                <img src="/assets/pfp.png" alt="Arnav Sharma" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,19,14,0.7), transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
                  <span className="tag float-anim" style={{ background: 'rgba(26,19,14,0.7)', backdropFilter: 'blur(8px)' }}>BCA · 9.1 GPA · 2+ yrs experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7" ref={introRef} style={{ opacity: 0 }}>
            <div className="card-cream" style={{ padding: 'clamp(26px, 4vw, 44px)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C24C15' }}>About Arnav</span>
              <p className="display" style={{ fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.15, color: '#1A130E', margin: '14px 0 18px' }}>
                I don't just make things look good — I make them <span className="grad-warm-2">work</span>.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#5A4634', marginBottom: '12px' }}>
                A visual designer and performance marketer from Delhi. Every creative decision ties
                back to a business outcome — more clicks, better conversions, stronger brand recall.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#5A4634', marginBottom: '24px' }}>
                At 17 I was already running real campaigns — ₹98K in ad spend at 3.8x ROAS,
                1,200+ SKUs across Amazon &amp; Flipkart — while studying BCA and heading social
                media for our placement cell.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="mailto:2008arnavsharma@gmail.com" className="btn-neu" style={{ fontSize: '12px', padding: '11px 24px' }}>Email Me →</a>
                <a href="tel:+919289811877" className="btn-neu btn-cream" style={{ fontSize: '12px', padding: '11px 24px' }}>+91 92898 11877</a>
              </div>
            </div>
          </div>
        </div>

        {/* education */}
        <div ref={eduRef} style={{ opacity: 0, marginTop: 'clamp(36px, 5vw, 56px)' }}>
          <div className="section-head" style={{ marginBottom: '24px' }}>
            <span className="eyebrow">02 · Education</span>
            <h3 className="display" style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginTop: '10px' }}>Academic <span className="grad-warm-2">background</span></h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {education.map((edu, i) => (
              <div key={i} className="neu neu-hover" style={{ padding: 'clamp(22px, 3vw, 30px)' }}>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-md-7">
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>{edu.period}</span>
                    <h4 className="display-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(18px, 2.4vw, 24px)', color: 'var(--text)', margin: '8px 0 4px' }}>{edu.degree}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-soft)' }}>{edu.school} · {edu.location}</p>
                  </div>
                  <div className="col-12 col-md-5">
                    {edu.gpa && (
                      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', marginBottom: edu.highlights.length ? '14px' : 0 }}>
                        <span className="display grad-warm" style={{ fontSize: '32px' }}>{edu.gpa}</span>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>GPA / 10</span>
                      </div>
                    )}
                    {edu.highlights.length > 0 && (
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                        {edu.highlights.map(h => (
                          <li key={h} style={{ fontSize: '12.5px', color: 'var(--text-soft)', display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                            <span style={{ width: 12, height: 2, borderRadius: '2px', background: 'var(--orange)', flexShrink: 0, display: 'inline-block', transform: 'translateY(-3px)' }} />{h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
