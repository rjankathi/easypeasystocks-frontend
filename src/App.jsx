// Simple MVP UI: ticker input -> calls your Render backend -> shows JSON
// NOTE: Set Vercel env var VITE_API_BASE to your backend URL (no trailing slash)
import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE; // e.g. https://easypeasystocks-backend.onrender.com

export default function App() {
  const [ticker, setTicker] = useState("AAPL");      // default for quick testing
  const [data, setData] = useState(null);            // response from backend
  const [loading, setLoading] = useState(false);     // fetch state
  const [error, setError] = useState("");

  const pingHealth = async () => {
    // Quick check endpoint to verify .env + networking
    try {
      setLoading(true); setError("");
      const r = await fetch(`${API_BASE}/api/health`);
      const j = await r.json();
      setData(j);
    } catch (e) {
      setError("Health check failed. Check VITE_API_BASE env.");
    } finally {
      setLoading(false);
    }
  };

  const getReport = async () => {
    // Placeholder route using your current backend
    try {
      setLoading(true); setError("");
      const r = await fetch(`${API_BASE}/api/stock/${encodeURIComponent(ticker)}`);
      const j = await r.json();
      setData(j);
    } catch (e) {
      setError("Fetch failed. Confirm backend URL and CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <header className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold">EasyPeasy Stocks — MVP</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Enter a ticker → fetch from backend → render response. Export, theming, and real data come next.
        </p>
      </header>

      <main className="max-w-5xl mx-auto mt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 outline-none"
            placeholder="e.g., AAPL"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
          />
          <button
            onClick={getReport}
            className="rounded-lg px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Generate Report
          </button>
          <button
            onClick={pingHealth}
            className="rounded-lg px-4 py-2 bg-neutral-800 hover:bg-neutral-700 transition"
            title="Test connection to backend"
          >
            Test API
          </button>
        </div>

        {loading && <p className="mt-4 text-neutral-400">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {data && (
          <pre className="mt-6 bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-auto">
            {/* Show raw JSON for now; we’ll convert to cards later */}
{JSON.stringify(data, null, 2)}
          </pre>
        )}
      </main>
    </div>
  );
}
