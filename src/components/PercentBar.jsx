import React from 'react';

function getStyle(p) {
    if (p >= 75) return { color: 'var(--err)', fill: 'var(--err)' };
    if (p >= 40) return { color: 'var(--warn)', fill: 'var(--warn)' };
    return { color: 'var(--ok)', fill: 'var(--ok)' };
}

const ZONES = [
    { label: 'Xavfsiz', from: 0, to: 40 },
    { label: 'Ehtiyot', from: 40, to: 75 },
    { label: 'Xavfli', from: 75, to: 100 },
];

export default function PercentBar({ percent, satellites, gpsValid }) {
    const pct = percent ?? 0;
    const { color, fill } = getStyle(pct);
    const activeZone = pct >= 75 ? 2 : pct >= 40 ? 1 : 0;

    return (
        <div className="card" style={{ padding: '14px 16px' }}>
            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 15 }}>📊</span>
                    <span className="label">Gaz darajasi</span>
                </div>
                <div className="mono" style={{ fontSize: 22, color }}>{pct}%</div>
            </div>

            {/* Bar */}
            <div className="prog-track" style={{ marginBottom: 8 }}>
                <div className="prog-fill" style={{ width: `${Math.min(pct, 100)}%`, background: fill }} />
            </div>

            {/* Zone labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                {ZONES.map((z, i) => (
                    <span key={z.label} style={{
                        fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
                        color: i === activeZone ? color : 'var(--tx-muted)',
                        opacity: i === activeZone ? 1 : 0.6,
                    }}>{z.label}</span>
                ))}
            </div>

            {/* GPS row */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="label">GPS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="dot" style={{ background: gpsValid ? 'var(--ok)' : 'var(--tx-muted)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: gpsValid ? 'var(--ok)' : 'var(--tx-muted)' }}>
                        {gpsValid ? 'Aniqlandi' : 'Aniqlanmadi'}
                    </span>
                    {satellites != null && (
                        <span style={{ fontSize: 12, color: 'var(--tx-muted)' }}>({satellites})</span>
                    )}
                </div>
            </div>
        </div>
    );
}
