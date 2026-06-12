import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      gsap.to(dot, { x: mx - 4, y: my - 4, duration: 0.08, ease: 'power2.out' })
    }
    const tick = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      gsap.set(ring, { x: rx - 20, y: ry - 20 })
      requestAnimationFrame(tick)
    }
    const onEnter = () => {
      gsap.to(dot, { scale: 2.4, background: '#FF5A1F', duration: 0.25 })
      gsap.to(ring, { scale: 1.5, borderColor: '#FF5A1F', opacity: 0.7, duration: 0.25 })
    }
    const onLeave = () => {
      gsap.to(dot, { scale: 1, background: '#FFB22E', duration: 0.25 })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,178,46,0.4)', opacity: 0.5, duration: 0.25 })
    }

    window.addEventListener('mousemove', onMove)
    tick()
    const add = () => document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    add()
    const obs = new MutationObserver(add)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => { window.removeEventListener('mousemove', onMove); obs.disconnect() }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        borderRadius: '50%', background: '#FFB22E',
        pointerEvents: 'none', zIndex: 99998,
        boxShadow: '0 0 12px rgba(255,90,31,0.6)',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 40, height: 40,
        borderRadius: '50%', border: '1.5px solid rgba(255,178,46,0.4)',
        pointerEvents: 'none', zIndex: 99997, opacity: 0.5,
      }} />
    </>
  )
}
