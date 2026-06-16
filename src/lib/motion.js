import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// One-shot read — for animations that only fire once (intros). Never replay an
// intro just because a setting changed, so these don't need to be reactive.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(QUERY).matches

// Reactive read — re-renders when the OS setting changes so motion effects can
// re-run live (no page reload). Use for scroll reveals and smooth scrolling.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
