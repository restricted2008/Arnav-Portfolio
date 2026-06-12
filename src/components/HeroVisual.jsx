import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/*
  Original looping "live campaign dashboard" vector.
  Relevant to a performance marketer: growing bars, a ROAS dial filling
  to 3.8x, a drawing sparkline, a ticking counter, floating ₹ coins,
  orbiting design/marketing glyphs. Continuous loop. No external assets.
*/
export default function HeroVisual() {
  const wrapRef = useRef(null)
  const barsRef = useRef([])
  const dialRef = useRef(null)
  const dialPctRef = useRef(null)
  const lineRef = useRef(null)
  const counterRef = useRef(null)
  const coinsRef = useRef([])
  const orbitRef = useRef(null)
  const glyphRefs = useRef([])
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // floating card bob
      gsap.to(cardRef.current, { y: -10, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' })

      // bars grow loop
      const barTops = [38, 22, 30, 14, 26, 8]
      const barLoop = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        barLoop.fromTo(bar,
          { scaleY: 0.15 },
          { scaleY: 1, duration: 0.5, ease: 'power2.out' },
          i * 0.1)
      })
      barLoop.to(barsRef.current.filter(Boolean), { scaleY: 0.15, duration: 0.4, ease: 'power1.in', stagger: 0.04 }, '+=1.4')

      // ROAS dial fill 0 → 3.8x (270deg arc)
      const dialLen = 2 * Math.PI * 52 * 0.75 // 75% arc
      gsap.set(dialRef.current, { strokeDasharray: dialLen, strokeDashoffset: dialLen })
      const dialObj = { v: 0 }
      gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
        .to(dialRef.current, { strokeDashoffset: dialLen * 0.1, duration: 1.6, ease: 'power2.out' }, 0)
        .to(dialObj, {
          v: 3.8, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { if (dialPctRef.current) dialPctRef.current.textContent = dialObj.v.toFixed(1) + 'x' },
        }, 0)
        .to({}, { duration: 1.4 })
        .to(dialRef.current, { strokeDashoffset: dialLen, duration: 0.6, ease: 'power1.in' }, '>')
        .to(dialObj, { v: 0, duration: 0.6, onUpdate: () => { if (dialPctRef.current) dialPctRef.current.textContent = dialObj.v.toFixed(1) + 'x' } }, '<')

      // sparkline draw loop
      const len = lineRef.current.getTotalLength()
      gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len })
      gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
        .to(lineRef.current, { strokeDashoffset: 0, duration: 2, ease: 'power1.inOut' })
        .to(lineRef.current, { strokeDashoffset: -len, duration: 1.2, ease: 'power1.in' }, '+=1')

      // counter ticking ₹
      const c = { v: 0 }
      gsap.timeline({ repeat: -1, repeatDelay: 1 })
        .to(c, {
          v: 1240000, duration: 2.4, ease: 'power2.out',
          onUpdate: () => { if (counterRef.current) counterRef.current.textContent = '₹' + Math.round(c.v).toLocaleString('en-IN') },
        })
        .to({}, { duration: 1.4 })
        .set(c, { v: 0 })

      // floating coins
      coinsRef.current.forEach((coin, i) => {
        if (!coin) return
        gsap.to(coin, {
          y: -16 - i * 4, duration: 2.2 + i * 0.4,
          yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.3,
        })
        gsap.to(coin, { rotateY: 360, duration: 2.4 + i * 0.5, repeat: -1, ease: 'none' })
      })

      // orbit glyphs
      gsap.to(orbitRef.current, { rotation: 360, duration: 22, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      glyphRefs.current.forEach((g) => {
        if (!g) return
        gsap.to(g, { rotation: -360, duration: 22, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: '480px', margin: '0 auto' }}>
      {/* glow */}
      <div className="glow-breathe" style={{
        position: 'absolute', inset: '8%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,90,31,0.22), transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Orbit ring + glyphs */}
      <svg viewBox="0 0 480 480" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g ref={orbitRef}>
          <circle cx="240" cy="240" r="210" fill="none" stroke="rgba(255,180,120,0.14)" strokeWidth="1.5" strokeDasharray="3 9" />
          {[
            { a: 0,   c: '#FF5A1F', t: '✎' },
            { a: 60,  c: '#FFB22E', t: '₹' },
            { a: 120, c: '#FF7A3D', t: '◐' },
            { a: 180, c: '#FF6B57', t: '♥' },
            { a: 240, c: '#FFC861', t: '▤' },
            { a: 300, c: '#FF9A4D', t: '↗' },
          ].map((g, i) => {
            const rad = (g.a * Math.PI) / 180
            const x = 240 + 210 * Math.cos(rad)
            const y = 240 + 210 * Math.sin(rad)
            return (
              <g key={i} ref={el => glyphRefs.current[i] = el} style={{ transform: `translate(${x - 240}px, ${y - 240}px)` }}>
                <circle cx="240" cy="240" r="20" fill="#251B13" stroke={g.c} strokeWidth="1.5" />
                <text x="240" y="240" textAnchor="middle" dominantBaseline="central" fontSize="18" fill={g.c} fontFamily="'Space Mono', monospace">{g.t}</text>
              </g>
            )
          })}
        </g>
      </svg>

      {/* Central dashboard card */}
      <div ref={cardRef} className="neu" style={{
        position: 'absolute', inset: '20%', borderRadius: '28px',
        padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px',
        background: 'linear-gradient(155deg, #2E2218, #1B130D)',
      }}>
        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '0.18em', color: '#927C66', textTransform: 'uppercase' }}>Live Campaign</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Space Mono', monospace", fontSize: '8px', color: '#FFB22E' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFB22E', display: 'inline-block' }} className="pulse-dot" />LIVE
          </span>
        </div>

        {/* counter */}
        <div>
          <div ref={counterRef} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 3.4vw, 30px)', color: '#FFC861', letterSpacing: '-0.02em' }}>₹0</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '7.5px', letterSpacing: '0.12em', color: '#927C66', textTransform: 'uppercase' }}>Attributed Revenue</div>
        </div>

        {/* bars + dial row */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-end', flex: 1 }}>
          {/* bars */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', height: '64px', flex: 1 }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} ref={el => barsRef.current[i] = el} style={{
                flex: 1, height: `${[64,42,52,32,46,26][i]}px`,
                borderRadius: '4px 4px 2px 2px',
                background: i === 0 ? 'linear-gradient(180deg, #FFC861, #FF5A1F)' : 'linear-gradient(180deg, #FF7A3D, #E8431A)',
                transformOrigin: 'bottom',
              }} />
            ))}
          </div>
          {/* dial */}
          <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', transform: 'rotate(135deg)' }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,180,120,0.1)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${2*Math.PI*52*0.75} ${2*Math.PI*52}`} />
              <circle ref={dialRef} cx="60" cy="60" r="52" fill="none" stroke="url(#dialGrad)" strokeWidth="9" strokeLinecap="round" />
              <defs>
                <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFC861" /><stop offset="1" stopColor="#FF5A1F" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span ref={dialPctRef} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '15px', color: '#FF7A3D' }}>0.0x</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '6px', letterSpacing: '0.1em', color: '#927C66' }}>ROAS</span>
            </div>
          </div>
        </div>

        {/* sparkline */}
        <div style={{ height: '34px' }}>
          <svg viewBox="0 0 260 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <polyline ref={lineRef} fill="none" stroke="#FFC861" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              points="0,32 30,26 60,30 90,16 120,20 150,10 180,14 210,6 240,9 260,3" />
          </svg>
        </div>
      </div>

      {/* floating coins */}
      {[
        { x: '4%', y: '24%', s: 38 },
        { x: '84%', y: '40%', s: 30 },
        { x: '14%', y: '74%', s: 26 },
      ].map((coin, i) => (
        <div key={i} ref={el => coinsRef.current[i] = el} style={{
          position: 'absolute', left: coin.x, top: coin.y,
          width: coin.s, height: coin.s, borderRadius: '50%',
          background: 'linear-gradient(150deg, #FFD98A, #FF9A2E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 18px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.5)',
          border: '1.5px solid rgba(255,200,120,0.6)',
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          color: '#8A3A00', fontSize: coin.s * 0.42,
        }}>₹</div>
      ))}
    </div>
  )
}
