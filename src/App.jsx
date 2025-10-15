// src/App.jsx
import React, { useState } from "react";
import ReportPage from "./components/ReportPage.jsx";

const API_BASE = import.meta.env.VITE_API_BASE; // your backend URL

export default function App() {
  const [ticker, setTicker] = useState("AAPL");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getReport = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/stock/${ticker}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Failed to fetch report data");
    } finally {
      setLoading(false);
    }
  };

  const testApi = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/health`);
      const json = await res.json();
      setData(json);
    } catch {
      setError("API unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-neutral-950 text-neutral-100">
      {/* --- Header / Input --- */}
      <header className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold mb-2">EasyPeasy Stocks — MVP</h1>
        <p className="text-sm text-neutral-400">
          Enter a stock ticker, fetch report data, and view styled output.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <input
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 outline-none"
            placeholder="e.g. AAPL"
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
            onClick={testApi}
            className="rounded-lg px-4 py-2 bg-neutral-800 hover:bg-neutral-700 transition"
          >
            Test API
          </button>
        </div>
      </header>

      {/* --- Body --- */}
      <main className="max-w-5xl mx-auto">
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-400">{error}</p>}
        {data && <ReportPage reportData={data} />}
      </main>
    </div>
  );
}
