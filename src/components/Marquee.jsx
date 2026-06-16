const items = [
  '₹12L+ Revenue', '3.8× ROAS', '2,300+ Orders', '1,200+ SKUs',
  'Meta Ads', 'Google Ads', 'Amazon Sponsored', 'Brand Identity',
  'Packaging Design', 'Graph-e-thon Finalist', 'Ideathon Winner', 'Social Media Head',
]

export default function Marquee() {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div style={{ overflow: 'hidden', background: 'var(--accent)', borderTop: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)', padding: '11px 0' }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '22px', padding: '0 22px' }}>
            <span className="display" style={{ fontSize: '20px', color: 'var(--on-accent)' }}>{item}</span>
            <span style={{ color: 'var(--on-accent)', fontSize: '11px', opacity: 0.6 }}>✱</span>
          </span>
        ))}
      </div>
    </div>
  )
}
