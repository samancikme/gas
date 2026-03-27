import React from 'react';

const DEFAULT_LAT = 39.7587818;
const DEFAULT_LNG = 64.4401539;

export default function MapView({ lat, lng, gpsValid }) {
    const hasCoords = lat != null && lng != null && gpsValid;
    const displayLat = hasCoords ? lat : DEFAULT_LAT;
    const displayLng = hasCoords ? lng : DEFAULT_LNG;

    const mapSrc = `https://maps.google.com/maps?q=${displayLat},${displayLng}&z=15&output=embed`;

    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <div className="sec-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15 }}>📍</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx-soft)' }}>GPS Joylashuvi</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="dot" style={{ background: hasCoords ? 'var(--ok)' : 'var(--warn)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: hasCoords ? 'var(--ok)' : 'var(--warn)' }}>
                        {hasCoords ? `${lat?.toFixed(4)}, ${lng?.toFixed(4)}` : 'Standart joylashuv'}
                    </span>
                </div>
            </div>

            <div style={{ height: 256, background: 'var(--bg)' }}>
                <iframe
                    title="Qurilma joylashuvi"
                    src={mapSrc}
                    style={{ width: '100%', height: '100%', border: 'none', opacity: 0.9 }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
}
