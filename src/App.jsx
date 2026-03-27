import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import { fetchLatest, fetchHistory } from './api';
import Dashboard from './components/Dashboard';

const REFRESH_INTERVAL = 5000;

// ── Theme helpers ──────────────────────────────────────────
function getInitialTheme() {
  try { return localStorage.getItem('gaz-theme') || 'dark'; } catch { return 'dark'; }
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('gaz-theme', theme); } catch { }
}

export default function App() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme on mount + whenever it changes
  useEffect(() => { applyTheme(theme); }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const load = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const [lat, hist] = await Promise.all([fetchLatest(), fetchHistory()]);
      setLatest(lat);
      setHistory(Array.isArray(hist) ? hist : (hist?.data ?? []));
      setError(null);
      setLastUpdated(new Date());
      setCountdown(REFRESH_INTERVAL / 1000);
    } catch (e) {
      setError(e.message || "Ma'lumot olishda xatolik");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const iv = setInterval(() => load(), REFRESH_INTERVAL);
    return () => clearInterval(iv);
  }, [load]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [lastUpdated]);

  const online = !error && !loading;

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>

      {/* ── Header ── */}
      <header style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 50,
        paddingTop: 'env(safe-area-inset-top)',
      }}>
        {/* Accent top strip */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, var(--pri) 0%, var(--ok) 100%)' }} />

        <div style={{
          maxWidth: 1120, margin: '0 auto', padding: '0 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 54,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34, height: 34, flexShrink: 0,
              background: 'var(--pri-dim)',
              border: '1px solid rgba(129,140,248,0.3)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>⬡</div>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 700, fontSize: 15,
                color: 'var(--tx-head)', letterSpacing: '0.04em',
              }}>
                Gaz<span style={{ color: 'var(--pri)' }}>Monitor</span>
              </div>
              <div className="hide-sm" style={{ fontSize: 11, color: 'var(--tx-muted)', marginTop: 1 }}>
                IoT nazorat paneli
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Online dot + label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div className="dot" style={{
                background: online ? 'var(--ok)' : 'var(--err)',
                boxShadow: online ? '0 0 7px var(--ok)' : 'none',
              }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: online ? 'var(--ok)' : 'var(--err)' }}>
                {online ? 'Jonli' : 'Oflayn'}
              </span>
            </div>

            {/* Countdown */}
            {online && (
              <span className="hide-sm" style={{ fontSize: 12, color: 'var(--tx-muted)' }}>
                {countdown}s
              </span>
            )}

            {/* Refresh button */}
            <button
              onClick={() => load(true)}
              disabled={refreshing}
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border-mid)',
                borderRadius: 8,
                padding: '7px 14px',
                color: 'var(--tx-soft)',
                fontSize: 13,
                fontWeight: 500,
                cursor: refreshing ? 'not-allowed' : 'pointer',
                opacity: refreshing ? 0.5 : 1,
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hi)'; e.currentTarget.style.color = 'var(--tx-base)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--tx-soft)'; }}
            >
              {refreshing ? '...' : '↺ Yangilash'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? "Yorug' rejim" : 'Qorong\'u rejim'}
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border-mid)',
                borderRadius: 8,
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17,
                cursor: 'pointer',
                transition: 'border-color 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hi)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '16px 18px 56px' }}>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', gap: 16 }}>
            <div style={{
              width: 38, height: 38,
              border: '2px solid var(--border-mid)',
              borderTop: '2px solid var(--ok)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: 13, color: 'var(--tx-muted)' }}>Sensor bilan ulanmoqda...</span>
          </div>
        )}

        {!loading && error && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '55vh' }}>
            <div className="card" style={{ padding: 32, textAlign: 'center', maxWidth: 360, width: '100%', borderColor: 'rgba(248,113,113,0.3)' }}>
              <div style={{ fontSize: 30, marginBottom: 12 }}>⚠</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--err)', marginBottom: 10 }}>Ulanish xatosi</div>
              <div style={{ fontSize: 13, color: 'var(--tx-muted)', marginBottom: 20, lineHeight: 1.6 }}>{error}</div>
              <button
                onClick={() => load(true)}
                style={{
                  background: 'var(--err-dim)',
                  border: '1px solid rgba(248,113,113,0.3)',
                  borderRadius: 8,
                  padding: '8px 20px',
                  color: 'var(--err)',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Qayta urinish
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <Dashboard latest={latest} history={history} lastUpdated={lastUpdated} />
        )}
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '14px 18px',
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))'
      }}>
        <div style={{
          maxWidth: 1120, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: 'var(--tx-muted)',
          flexWrap: 'wrap', gap: 4,
        }}>
          <span>GazMonitor nazorat paneli</span>
          <span>API: gaz-2uw1.onrender.com · 5s yangilanish</span>
        </div>
      </footer>
    </div>
  );
}
