import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Maharaja Surajmal Institute (MSI)',
    location: 'New Delhi',
    period: 'Aug 2025 – Expected Aug 2028',
    gpa: '8.9 / 10.0',
    highlights: [
      'Social Media Head, BCA Placement Cell — 2026',
      'Member, Geek Room MSIT — 2025',
      'Member, National Service Scheme (NSS) — 2025',
    ],
  },
  {
    degree: 'High School Diploma — CBSE Class XII',
    school: 'Bloom Public School',
    location: 'New Delhi',
    period: '2025',
    gpa: null,
    highlights: [],
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const eduRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(eduRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: eduRef.current, start: 'top 85%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{
      background: 'var(--cream-2)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* ── Who I am ── */}
      <div style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Photo */}
        <div ref={leftRef} style={{ opacity: 0, position: 'relative' }}>
          <div style={{
            position: 'absolute', bottom: '-12px', right: '-12px',
            width: '100%', height: '100%',
            border: '2px solid var(--terra)',
            borderRadius: '8px', opacity: 0.2,
          }} />
          <img
            src="/assets/pfp.png"
            alt="Arnav Sharma"
            style={{
              width: '100%', maxWidth: '360px',
              borderRadius: '8px', display: 'block',
              border: '1px solid var(--border)',
              position: 'relative', zIndex: 1,
            }}
          />
          {/* Experience tag */}
          <div style={{
            position: 'absolute', top: '-16px', left: '-16px', zIndex: 2,
            background: 'var(--terra)', color: '#fff',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '13px',
            padding: '10px 18px', borderRadius: '4px',
          }} className="float">
            2+ Years Real Experience
          </div>
        </div>

        {/* Text */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <div className="section-rule" />
          <span className="section-label">01 — Who I Am</span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 'clamp(30px, 4vw, 44px)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--dark)', marginBottom: '24px',
          }}>
            Designer who<br />
            <span className="gradient-terra">thinks in metrics</span>
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--warm-gray)', lineHeight: 1.8, marginBottom: '18px' }}>
            I'm Arnav — a visual designer and performance marketer based in Delhi. I don't just make things look good. I make them work. Every creative decision I make is tied to a business outcome.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--warm-gray)', lineHeight: 1.8, marginBottom: '32px' }}>
            At 17, I was already running real campaigns — ₹98K in ad spend, 3.8x ROAS, 1,200+ SKUs across Amazon and Flipkart. Studying BCA at MSI while heading social media for our placement cell and competing in national design hackathons.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="mailto:2008arnavsharma@gmail.com" className="btn-primary"
              style={{ textDecoration: 'none' }}>Email Me</a>
            <a href="tel:+919289811877" className="btn-outline"
              style={{ textDecoration: 'none' }}>+91 92898 11877</a>
          </div>
        </div>
      </div>

      {/* ── Education ── */}
      <div ref={eduRef} style={{
        opacity: 0,
        borderTop: '1px solid var(--border)',
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-rule" />
          <span className="section-label">Education</span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)',
            letterSpacing: '-0.03em', lineHeight: 1,
            color: 'var(--dark)', marginBottom: '36px',
          }}>Academic Background</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {education.map((edu, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px', alignItems: 'start',
                background: 'var(--cream)',
                border: '1px solid var(--border)',
                borderRadius: '6px', padding: '28px 32px',
                borderLeft: `4px solid ${i === 0 ? 'var(--terra)' : 'var(--border-2)'}`,
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'var(--warm-gray)',
                    marginBottom: '8px',
                  }}>{edu.period}</div>
                  <h4 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700, fontSize: '17px',
                    letterSpacing: '-0.01em', color: 'var(--dark)',
                    marginBottom: '4px',
                  }}>{edu.degree}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--warm-gray)' }}>
                    {edu.school} · {edu.location}
                  </p>
                </div>
                <div>
                  {edu.gpa && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(194,76,21,0.08)',
                      border: '1px solid rgba(194,76,21,0.2)',
                      borderRadius: '4px', padding: '6px 14px',
                      marginBottom: '12px',
                    }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '16px', color: 'var(--terra)' }}>{edu.gpa}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>GPA</span>
                    </div>
                  )}
                  {edu.highlights.length > 0 && (
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {edu.highlights.map(h => (
                        <li key={h} style={{
                          fontSize: '13px', color: 'var(--warm-gray)',
                          display: 'flex', alignItems: 'flex-start', gap: '8px',
                        }}>
                          <span style={{ color: 'var(--terra)', marginTop: '2px', flexShrink: 0 }}>◆</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
