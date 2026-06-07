const items = [
  '₹12L+ Revenue', '3.8x ROAS', '2,300+ Orders', '1,200+ SKUs',
  'Meta Ads', 'Google Ads', 'Amazon Sponsored', 'Brand Identity',
  'Packaging Design', 'Social Media', 'Graph-e-thon Finalist',
  'Ideathon Winner', 'BCA · 8.9 GPA', 'Social Media Head',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0',
      background: 'var(--cream-2)',
    }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px', letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: i % 3 === 0 ? 'var(--terra)' : 'var(--warm-gray)',
            padding: '0 28px',
            display: 'inline-flex', alignItems: 'center', gap: '28px',
          }}>
            {item}
            <span style={{ opacity: 0.3, fontSize: '6px' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
