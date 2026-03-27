const BASE_URL = 'https://gaz-2uw1.onrender.com';

export async function fetchLatest() {
    const res = await fetch(`${BASE_URL}/api/latest`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function fetchHistory() {
    const res = await fetch(`${BASE_URL}/api/data`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}
