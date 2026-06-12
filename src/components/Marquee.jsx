const items = [
  '₹12L+ Revenue', '3.8x ROAS', '2,300+ Orders', '1,200+ SKUs',
  'Meta Ads', 'Google Ads', 'Amazon Sponsored', 'Brand Identity',
  'Packaging Design', 'Social Media', 'Graph-e-thon Finalist',
  'Ideathon Winner', 'BCA · 9.1 GPA', 'Social Media Head',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden', padding: '15px 0',
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
      background: 'linear-gradient(180deg, rgba(46,34,24,0.4), rgba(27,19,13,0.3))',
    }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Space Mono', monospace", fontSize: '11px',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: i % 3 === 0 ? 'var(--orange)' : 'var(--muted)',
            padding: '0 26px', display: 'inline-flex', alignItems: 'center', gap: '26px',
          }}>
            {item}
            <span style={{ opacity: 0.5, fontSize: '7px', color: 'var(--amber)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
