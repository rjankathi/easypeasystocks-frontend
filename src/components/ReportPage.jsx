// src/components/ReportPage.jsx
import React from "react";
import { getTheme } from "../utils/theme.js";

export default function ReportPage({ reportData }) {
  const accent = getTheme(reportData.ticker || "DEFAULT");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="p-6 border-b" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-bold" style={{ color: accent }}>
          {reportData.ticker} — {reportData.companyName}
        </h1>
      </header>

      <section className="p-6">
        <h2 className="text-xl font-semibold underline mb-2">Summary</h2>
        <p>{reportData.companySummary}</p>
      </section>

      <section className="p-6">
        <h2 className="text-xl font-semibold underline mb-2">Financials</h2>
        <table className="w-full border-collapse">
          <tbody>
            {Object.entries(reportData.financials || {}).map(([k, v]) => (
              <tr key={k}>
                <td className="font-semibold pr-4 py-1">{k}</td>
                <td className="py-1">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
