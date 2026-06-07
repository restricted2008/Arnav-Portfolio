import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX - 5, y: mouseY - 5, duration: 0.08, ease: 'power2.out' })
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX - 22, y: ringY - 22 })
      requestAnimationFrame(tick)
    }

    const onEnter = () => {
      gsap.to(dot, { scale: 2.5, background: 'var(--terra)', duration: 0.25 })
      gsap.to(ring, { scale: 1.4, borderColor: 'var(--terra)', opacity: 0.6, duration: 0.25 })
    }
    const onLeave = () => {
      gsap.to(dot, { scale: 1, background: 'var(--dark)', duration: 0.25 })
      gsap.to(ring, { scale: 1, borderColor: 'var(--dark)', opacity: 0.35, duration: 0.25 })
    }

    window.addEventListener('mousemove', onMove)
    tick()

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addListeners()
    const obs = new MutationObserver(addListeners)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 10, height: 10,
        borderRadius: '50%', background: 'var(--dark)',
        pointerEvents: 'none', zIndex: 99998,
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 44, height: 44,
        borderRadius: '50%', border: '1.5px solid rgba(28,17,8,0.35)',
        pointerEvents: 'none', zIndex: 99997,
      }} />
    </>
  )
}
