import React from 'react';

const STATUS = {
    safe: { label: 'Xavfsiz', cls: 'badge-ok', color: 'var(--ok)', dim: 'var(--ok-dim)', border: 'rgba(74,222,128,0.2)' },
    warning: { label: 'Ogohlantirish', cls: 'badge-warn', color: 'var(--warn)', dim: 'var(--warn-dim)', border: 'rgba(251,191,36,0.2)' },
    danger: { label: 'Xavfli', cls: 'badge-err', color: 'var(--err)', dim: 'var(--err-dim)', border: 'rgba(248,113,113,0.2)' },
};

export default function StatusCard({ data }) {
    const st = STATUS[data?.status] || STATUS.safe;

    return (
        <div className="card" style={{ borderColor: st.border, overflow: 'hidden' }}>
            {/* Header */}
            <div className="sec-header" style={{ background: st.dim }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15 }}>📡</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx-soft)' }}>Gaz sensori — holat</span>
                </div>
                <span className={`badge ${st.cls}`}>
                    <span className="dot" style={{
                        width: 7, height: 7,
                        background: st.color,
                        ...(data?.status === 'danger' ? { animation: 'blink 0.9s ease-in-out infinite' } : {}),
                    }} />
                    {st.label}
                </span>
            </div>

            {/* Big reading row */}
            <div style={{ padding: '18px 18px 0', display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
                <div>
                    <div className="label" style={{ marginBottom: 6 }}>Xomashyo qiymati</div>
                    <div className="mono" style={{ fontSize: 68, color: st.color, letterSpacing: '-2px' }}>
                        {data?.gas_raw ?? '--'}
                    </div>
                </div>
                <div style={{ paddingBottom: 10 }}>
                    <div className="label" style={{ marginBottom: 6 }}>Darajasi</div>
                    <div className="mono" style={{ fontSize: 30, color: st.color }}>
                        {data?.percent != null ? `${data.percent}%` : '--'}
                    </div>
                </div>
            </div>

            {/* Details grid */}
            <div style={{ margin: '16px 18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 1, background: 'var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                {[
                    { k: 'Kuchlanish', v: data?.voltage != null ? `${data.voltage} V` : '--' },
                    { k: 'Raqamli', v: data?.gas_digital ?? '--' },
                    { k: 'Qurilma', v: data?.device_id ?? '--' },
                ].map(({ k, v }) => (
                    <div key={k} style={{ background: 'var(--bg-card)', padding: '12px 14px' }}>
                        <div className="label" style={{ marginBottom: 5 }}>{k}</div>
                        <div className="mono" style={{ fontSize: 16, color: 'var(--tx-head)' }}>{v}</div>
                    </div>
                ))}
            </div>

            {/* Timestamp */}
            <div style={{ padding: '0 18px 16px', fontSize: 12, color: 'var(--tx-muted)' }}>
                ⏱ {data?.createdAt ? new Date(data.createdAt).toLocaleString('uz-UZ') : 'Vaqt mavjud emas'}
            </div>
        </div>
    );
}
