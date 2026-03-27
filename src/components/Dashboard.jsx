import React from 'react';
import StatusCard from './StatusCard';
import AlarmIndicator from './AlarmIndicator';
import PercentBar from './PercentBar';
import MapView from './MapView';
import DataTable from './DataTable';
import Chart from './Chart';

export default function Dashboard({ latest, history, lastUpdated }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Row 1 — 3 compact info cards */}
            <div className="grid-3">
                <AlarmIndicator alarm={latest?.alarm} />
                <PercentBar
                    percent={latest?.percent}
                    satellites={latest?.satellites}
                    gpsValid={latest?.gps_valid}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                        { label: 'Qurilma ID', val: latest?.device_id ?? '--', color: 'var(--pri)' },
                        { label: "Sun'iy yo'ldoshlar", val: latest?.satellites ?? '--', color: 'var(--tx-head)' },
                    ].map(({ label, val, color }) => (
                        <div key={label} className="card" style={{ padding: '12px 16px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="label">{label}</span>
                            <span className="mono" style={{ fontSize: 18, color }}>{val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2 — Main sensor card */}
            <StatusCard data={latest} />

            {/* Row 3 — Map + side stats */}
            <div className="grid-map">
                <MapView lat={latest?.lat} lng={latest?.lng} gpsValid={latest?.gps_valid} />

                <div className="side-stack">
                    {/* Last updated */}
                    <div className="card" style={{ padding: '14px 16px' }}>
                        <div className="label" style={{ marginBottom: 7 }}>Oxirgi yangilanish</div>
                        <div className="mono" style={{ fontSize: 18, color: 'var(--tx-head)' }}>
                            {lastUpdated ? lastUpdated.toLocaleTimeString('uz-UZ') : '--:--:--'}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--tx-muted)', marginTop: 4 }}>
                            {lastUpdated ? lastUpdated.toLocaleDateString('uz-UZ') : ''}
                        </div>
                    </div>

                    {/* Coordinates */}
                    <div className="card" style={{ padding: '14px 16px' }}>
                        <div className="label" style={{ marginBottom: 10 }}>Koordinatalar</div>
                        {[
                            { label: 'Kenglik', val: latest?.lat?.toFixed(5) ?? '--' },
                            { label: 'Uzunlik', val: latest?.lng?.toFixed(5) ?? '--' },
                        ].map(({ label, val }) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <span style={{ fontSize: 12, color: 'var(--tx-muted)' }}>{label}</span>
                                <span className="mono" style={{ fontSize: 13, color: 'var(--pri)' }}>{val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Voltage */}
                    <div className="card" style={{ padding: '14px 16px' }}>
                        <div className="label" style={{ marginBottom: 7 }}>Kuchlanish</div>
                        <div className="mono" style={{ fontSize: 22, color: 'var(--warn)' }}>
                            {latest?.voltage != null ? `${latest.voltage} V` : '-- V'}
                        </div>
                    </div>

                    {/* Total records */}
                    <div className="card" style={{ padding: '14px 16px' }}>
                        <div className="label" style={{ marginBottom: 7 }}>Jami yozuvlar</div>
                        <div className="mono" style={{ fontSize: 28, color: 'var(--tx-head)' }}>
                            {Array.isArray(history) ? history.length : 0}
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 4 — Chart */}
            <Chart data={history} />

            {/* Row 5 — History table */}
            <DataTable data={history} />
        </div>
    );
}
