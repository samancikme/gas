import React from 'react';

const ST = {
    safe: { bg: 'var(--ok-dim)', color: 'var(--ok)', label: 'Xavfsiz' },
    warning: { bg: 'var(--warn-dim)', color: 'var(--warn)', label: 'Ehtiyot' },
    danger: { bg: 'var(--err-dim)', color: 'var(--err)', label: 'Xavfli' },
};

export default function DataTable({ data }) {
    const rows = Array.isArray(data) ? data.slice(0, 20) : [];

    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <div className="sec-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15 }}>🗄</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx-soft)' }}>Ma'lumotlar tarixi</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--tx-muted)' }}>{rows.length} ta yozuv</span>
            </div>

            <div style={{ overflowX: 'auto', maxHeight: 340, overflowY: 'auto' }}>
                {rows.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, fontSize: 13, color: 'var(--tx-muted)' }}>
                        Tarix ma'lumotlari mavjud emas
                    </div>
                ) : (
                    <table className="tbl">
                        <thead>
                            <tr>
                                {['Vaqt', 'Xomashyo', 'Kuchlanish', 'Darajasi', 'Holat', 'Signal', 'GPS'].map(h => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => {
                                const st = ST[row.status] || { bg: 'var(--bg-raised)', color: 'var(--tx-muted)', label: row.status ?? '--' };
                                const pctColor = (row.percent ?? 0) >= 75 ? 'var(--err)' : (row.percent ?? 0) >= 40 ? 'var(--warn)' : 'var(--ok)';
                                return (
                                    <tr key={row._id || i}>
                                        <td style={{ color: 'var(--tx-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>
                                            {row.createdAt ? new Date(row.createdAt).toLocaleString('uz-UZ') : '--'}
                                        </td>
                                        <td><span className="mono" style={{ fontSize: 14, color: 'var(--tx-head)' }}>{row.gas_raw ?? '--'}</span></td>
                                        <td style={{ color: 'var(--tx-soft)' }}>{row.voltage ?? '--'} V</td>
                                        <td><span className="mono" style={{ fontSize: 13, color: pctColor }}>{row.percent ?? '--'}%</span></td>
                                        <td>
                                            <span style={{
                                                fontSize: 12, fontWeight: 600, padding: '3px 9px', borderRadius: 6,
                                                background: st.bg, color: st.color, border: `1px solid ${st.color}30`,
                                            }}>{st.label}</span>
                                        </td>
                                        <td>
                                            {row.alarm
                                                ? <span style={{ color: 'var(--err)', fontSize: 13, fontWeight: 600 }}>● Faol</span>
                                                : <span style={{ color: 'var(--tx-muted)', fontSize: 13 }}>○ Yo'q</span>}
                                        </td>
                                        <td>
                                            {row.gps_valid
                                                ? <span style={{ color: 'var(--pri)', fontSize: 12 }}>{row.lat?.toFixed(3)}, {row.lng?.toFixed(3)}</span>
                                                : <span style={{ color: 'var(--tx-muted)', fontSize: 12 }}>N/A</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
