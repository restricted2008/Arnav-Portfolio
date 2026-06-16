import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0, hovering = false, raf = 0
    const onEnter = () => { gsap.to(ring, { scale: 1.8, backgroundColor: 'rgba(215,169,46,0.25)', duration: 0.2 }) }
    const onLeave = () => { gsap.to(ring, { scale: 1, backgroundColor: 'rgba(215,169,46,0)', duration: 0.2 }) }
    // One delegated handler — no per-element listeners, no MutationObserver.
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      gsap.to(dot, { x: mx, y: my, duration: 0.06 })
      const over = !!e.target.closest?.('a, button, [data-cursor]')
      if (over !== hovering) { hovering = over; over ? onEnter() : onLeave() }
    }
    const tick = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; gsap.set(ring, { x: rx, y: ry }); raf = requestAnimationFrame(tick) }
    window.addEventListener('mousemove', onMove)
    tick()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-el" style={{ position: 'fixed', top: 0, left: 0, width: 7, height: 7, background: '#17160F', pointerEvents: 'none', zIndex: 99998, transform: 'translate(-50%,-50%)' }} />
      <div ref={ringRef} className="cursor-el" style={{ position: 'fixed', top: 0, left: 0, width: 30, height: 30, border: '1.5px solid #17160F', pointerEvents: 'none', zIndex: 99997, transform: 'translate(-50%,-50%)' }} />
    </>
  )
}
