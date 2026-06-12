/*
  Brand mark for Arnav Sharma.
  Squircle badge with a geometric "A" monogram + an apex spark
  (a nod to growth / performance). Optional wordmark.
*/
export default function Logo({ size = 34, showWord = true, wordColor = 'var(--text)', word = 'Arnav', id = 'lg' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" style={{ display: 'block', flexShrink: 0 }}>
        <defs>
          <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF9A52" />
            <stop offset="0.55" stopColor="#FF5A1F" />
            <stop offset="1" stopColor="#E0381A" />
          </linearGradient>
          <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {/* badge */}
        <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#${id}-grad)`} />
        <rect x="2" y="2" width="44" height="22" rx="14" fill={`url(#${id}-shine)`} />
        <rect x="2.5" y="2.5" width="43" height="43" rx="13.5" fill="none" stroke="rgba(255,220,180,0.5)" strokeWidth="1" />
        {/* geometric A */}
        <path d="M15 35 L24 13 L33 35" fill="none" stroke="#FFF4E8" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.7 28 H29.3" fill="none" stroke="#FFF4E8" strokeWidth="3.6" strokeLinecap="round" />
        {/* apex spark */}
        <circle cx="24" cy="10.5" r="2.6" fill="#FFD98A" />
        <circle cx="24" cy="10.5" r="4.6" fill="none" stroke="rgba(255,217,138,0.5)" strokeWidth="1" />
      </svg>
      {showWord && (
        <span style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: size * 0.5, color: wordColor, letterSpacing: '-0.03em', lineHeight: 1,
        }}>
          {word}<span style={{ color: 'var(--orange)' }}>.</span>
        </span>
      )}
    </span>
  )
}
