import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-mid)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
        }}>
            <div style={{ color: 'var(--tx-muted)', marginBottom: 6, fontSize: 12 }}>{label}</div>
            <div style={{ color: 'var(--pri)', fontWeight: 700 }}>Xomashyo: {payload[0]?.value ?? '--'}</div>
            {payload[1] && <div style={{ color: 'var(--ok)', fontWeight: 700 }}>Foiz: {payload[1]?.value ?? '--'}%</div>}
        </div>
    );
};

export default function Chart({ data }) {
    const chartData = Array.isArray(data)
        ? data.slice().reverse().slice(-30).map(d => ({
            time: d.createdAt
                ? new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : '',
            raw: d.gas_raw,
            percent: d.percent,
        }))
        : [];

    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <div className="sec-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15 }}>📈</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx-soft)' }}>Vaqt bo'yicha gaz o'zgarishi</span>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                    {[
                        { label: 'Xomashyo', color: 'var(--pri)' },
                        { label: 'Foiz', color: 'var(--ok)' },
                    ].map(({ label, color }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 18, height: 2, background: color, borderRadius: 1 }} />
                            <span style={{ fontSize: 12, color: 'var(--tx-muted)' }}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ padding: '12px 8px 8px', height: 240 }}>
                {chartData.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 13, color: 'var(--tx-muted)' }}>
                        Grafik ma'lumotlari mavjud emas
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="2 5" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="time" tick={{ fill: 'var(--tx-muted)', fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                            <YAxis tick={{ fill: 'var(--tx-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine y={75} stroke="var(--err)" strokeDasharray="3 4" strokeOpacity={0.5} label={{ value: 'Xavfli', fill: 'var(--err)', fontSize: 11 }} />
                            <ReferenceLine y={40} stroke="var(--warn)" strokeDasharray="3 4" strokeOpacity={0.5} label={{ value: 'Ehtiyot', fill: 'var(--warn)', fontSize: 11 }} />
                            <Line type="monotone" dataKey="raw" stroke="var(--pri)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: 'var(--pri)', strokeWidth: 0 }} />
                            <Line type="monotone" dataKey="percent" stroke="var(--ok)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: 'var(--ok)', strokeWidth: 0 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
