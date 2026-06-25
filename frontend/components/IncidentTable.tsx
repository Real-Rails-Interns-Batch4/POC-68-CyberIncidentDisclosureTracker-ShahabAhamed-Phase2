"use client";

import React from "react";

export default function IncidentTable({ incidents, onRowClick }: any) {

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toLowerCase()) {

      case "critical":
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            CRITICAL
          </span>
        );

      case "high":
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            HIGH
          </span>
        );

      case "medium":
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            MEDIUM
          </span>
        );

      case "low":
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            LOW
          </span>
        );

      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-slate-500/10 text-slate-400 border border-slate-500/30">
            {severity?.toUpperCase()}
          </span>
        );
    }
  };

  return (
    <div className="glass-card border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.05)]">

      {/* Header */}
      <div className="p-6 border-b border-slate-800/60 bg-slate-900/20">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold text-white flex items-center space-x-2">

            <svg
              className="w-5 h-5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <span>Incident Log</span>

          </h2>

          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            {incidents?.length || 0} Records
          </span>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">

        <table className="w-full text-sm text-left border-collapse relative">

          {/* Table Head */}
          <thead className="text-[10px] uppercase tracking-widest text-slate-400 bg-[#0B1117] sticky top-0 z-20 shadow-md">

            <tr>

              <th className="p-4 font-bold border-b border-slate-800">
                Company
              </th>

              <th className="p-4 font-bold border-b border-slate-800">
                Sector
              </th>

              <th className="p-4 font-bold border-b border-slate-800">
                Severity
              </th>

              <th className="p-4 font-bold border-b border-slate-800">
                Type
              </th>

              <th className="p-4 font-bold border-b border-slate-800">
                Country
              </th>

              <th className="p-4 font-bold text-right border-b border-slate-800">
                Date
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-800/50">

            {incidents?.map((incident: any) => (

              <tr
                key={incident.id}
                onClick={() => onRowClick && onRowClick(incident)}
                className="hover:bg-cyan-500/10 transition-all duration-200 group cursor-pointer"
              >

                {/* Company */}
                <td className="p-4 max-w-[220px] truncate font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {incident.company}
                </td>

                {/* Sector */}
                <td className="p-4 text-slate-400 group-hover:text-slate-300 transition-colors">
                  {incident.sector}
                </td>

                {/* Severity */}
                <td className="p-4">
                  {getSeverityBadge(incident.severity)}
                </td>

                {/* Type */}
                <td className="p-4 text-slate-400 group-hover:text-slate-300 transition-colors">
                  {incident.incident_type}
                </td>

                {/* Country */}
                <td className="p-4 text-slate-400 group-hover:text-slate-300 transition-colors">
                  {incident.country}
                </td>

                {/* Date */}
                <td className="p-4 text-slate-400 text-right whitespace-nowrap font-medium group-hover:text-cyan-100 transition-colors">
                  {incident.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* Empty State */}
        {(!incidents || incidents.length === 0) && (

          <div className="p-8 text-center text-slate-500">
            No incidents found matching criteria.
          </div>

        )}

      </div>

    </div>
  );
}