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
      {/* input + buttons ... */}
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-400">{error}</p>}

      {data && (
        <div className="mt-8">
          <ReportPage reportData={data} />
        </div>
      )}
    </div>
  );
}
