import React from 'react';

export default function AlarmIndicator({ alarm }) {
    if (!alarm) {
        return (
            <div className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                    width: 40, height: 40, flexShrink: 0,
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border-mid)',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                }}>🔕</div>
                <div>
                    <div className="label" style={{ marginBottom: 4 }}>Signal holati</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tx-muted)' }}>Faol emas</div>
                </div>
            </div>
        );
    }

    return (
        <div className="card" style={{
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
            borderColor: 'rgba(248,113,113,0.3)',
            background: 'rgba(248,113,113,0.04)',
        }}>
            <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
                <div className="pulse-ring" style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'rgba(248,113,113,0.15)' }} />
                <div className="alarm-blink" style={{
                    position: 'relative', width: 40, height: 40, borderRadius: 8,
                    background: 'var(--err-dim)', border: '1px solid rgba(248,113,113,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>🔔</div>
            </div>
            <div>
                <div className="label" style={{ marginBottom: 4, color: 'rgba(248,113,113,0.6)' }}>Signal holati</div>
                <div className="alarm-blink" style={{ fontSize: 14, fontWeight: 700, color: 'var(--err)' }}>⚠ Faol</div>
            </div>
        </div>
    );
}
