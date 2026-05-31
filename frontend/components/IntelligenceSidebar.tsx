"use client";

import React from 'react';

export default function IntelligenceSidebar({ metrics, analytics }: any) {
  const topSector = analytics?.sector_breakdown
    ? Object.entries(analytics.sector_breakdown).sort((a: any, b: any) => Number(b[1]) - Number(a[1]))[0]?.[0]
    : "N/A";

  const topSeverity = analytics?.severity_breakdown
    ? Object.entries(analytics.severity_breakdown).sort((a: any, b: any) => Number(b[1]) - Number(a[1]))[0]?.[0]
    : "N/A";

  const activeMonth = analytics?.monthly_trend
    ? Object.entries(analytics.monthly_trend).sort((a: any, b: any) => Number(b[1]) - Number(a[1]))[0]?.[0]
    : "N/A";

  const isHighRisk = metrics?.high_severity > 20;
  const riskLevel = isHighRisk ? "Elevated Monitoring Required" : "Normal Monitoring";

  // Calculate Cyber Risk Index
  let riskScore = 20; // Base score
  if (metrics?.high_severity > 10) riskScore += 25;
  if (metrics?.high_severity > 30) riskScore += 15;
  if (metrics?.total_incidents > 50) riskScore += 10;
  if (metrics?.total_incidents > 100) riskScore += 10;
  if (analytics?.severity_breakdown?.Critical > 5) riskScore += 20;
  riskScore = Math.min(100, Math.max(0, riskScore));

  let riskCategory = "Low";
  let riskColor = "text-green-400";
  let riskColorBg = "bg-green-400";
  let riskBg = "bg-green-500/10";
  let riskBorder = "border-green-500/30";
  if (riskScore > 30) {
    riskCategory = "Moderate";
    riskColor = "text-yellow-400";
    riskColorBg = "bg-yellow-400";
    riskBg = "bg-yellow-500/10";
    riskBorder = "border-yellow-500/30";
  }
  if (riskScore > 60) {
    riskCategory = "Elevated";
    riskColor = "text-red-400";
    riskColorBg = "bg-red-400";
    riskBg = "bg-red-500/10";
    riskBorder = "border-red-500/30";
  }

  return (
    <div className="h-full glass-card border border-slate-800 rounded-xl p-6 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center space-x-2 mb-8 border-b border-slate-800 pb-4">
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Brief</h2>
      </div>

      <div className="space-y-8 flex-grow">
        {/* Why This Matters */}
        <div className="group">
          <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-semibold mb-3 flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2 group-hover:animate-pulse"></span>
            Context Analysis
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed bg-[#0B1117] p-4 rounded-lg border border-slate-800/50">
            {isHighRisk 
              ? "Current disclosure patterns indicate elevated cyber exposure across critical infrastructure sectors. Immediate situational awareness and proactive threat hunting are strongly advised." 
              : "Baseline cyber disclosure patterns observed. No systemic anomalies detected in the current monitoring window, though standard diligence remains necessary."}
          </p>
        </div>

        {/* Intelligence Signals */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-semibold mb-3 flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
            Key Signals
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#0B1117] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 rounded-lg p-4 group">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 group-hover:text-cyan-400/70 transition-colors">Top Sector Target</p>
              <p className="text-white font-semibold truncate group-hover:text-cyan-100 transition-colors" title={topSector}>{topSector}</p>
            </div>
            <div className="bg-[#0B1117] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 rounded-lg p-4 group">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 group-hover:text-cyan-400/70 transition-colors">Dominant Severity</p>
              <p className="text-white font-semibold truncate group-hover:text-cyan-100 transition-colors capitalize" title={topSeverity}>{topSeverity}</p>
            </div>
            <div className="col-span-2 bg-[#0B1117] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 rounded-lg p-4 flex justify-between items-center group">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider group-hover:text-cyan-400/70 transition-colors">Entities Tracked</p>
              <p className="text-cyan-400 font-bold text-lg drop-shadow-[0_0_5px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform origin-right">{metrics?.companies}</p>
            </div>
          </div>

          {/* Cyber Risk Index */}
          <div className={`relative overflow-hidden rounded-lg p-5 border transition-all duration-500 shadow-[0_0_10px_rgba(0,0,0,0.3)] mb-6 ${riskBg} ${riskBorder} group`}>
            <div className="flex justify-between items-end relative z-10 mb-2">
              <div>
                <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${riskColor} opacity-80`}>Cyber Risk Index</p>
                <div className="flex items-baseline space-x-1.5">
                  <span className={`text-4xl font-black ${riskColor} drop-shadow-[0_0_8px_currentColor]`}>{riskScore}</span>
                  <span className={`text-sm font-bold ${riskColor} opacity-50`}>/ 100</span>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[9px] uppercase tracking-widest font-bold text-slate-500 mb-1`}>Status</p>
                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest ${riskBg} ${riskColor} border ${riskBorder}`}>
                  {riskCategory}
                </span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mt-4">
              <div 
                className={`h-full ${riskColorBg} shadow-[0_0_10px_currentColor] transition-all duration-1000`} 
                style={{ width: `${riskScore}%` }}
              ></div>
            </div>
          </div>

          {/* Dynamic Risk Assessment */}
          <div className={`relative overflow-hidden rounded-lg p-5 border-2 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] mb-6 ${
            isHighRisk 
              ? "bg-red-950/20 border-red-500/40 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]" 
              : "bg-green-950/20 border-green-500/40 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          }`}>
            <div className={`absolute -top-10 -right-10 w-32 h-32 blur-3xl rounded-full ${isHighRisk ? 'bg-red-500/30' : 'bg-green-500/30'}`}></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center space-x-2">
                <span className={`relative flex h-3 w-3`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighRisk ? 'bg-red-400' : 'bg-green-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isHighRisk ? 'bg-red-500' : 'bg-green-500'}`}></span>
                </span>
                <p className={`text-[11px] uppercase font-bold tracking-widest ${isHighRisk ? "text-red-400" : "text-green-400"}`}>
                  Risk Alert
                </p>
              </div>
              {isHighRisk && (
                <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest text-red-100 bg-red-500/20 border border-red-500/30 rounded">
                  ELEVATED
                </span>
              )}
            </div>
            <p className="text-white font-bold text-base mb-1.5 relative z-10 tracking-tight">{riskLevel}</p>
            <p className="text-slate-400 text-xs leading-relaxed relative z-10">
              {isHighRisk
                ? "Multiple high-severity disclosures indicate increased cyber exposure across the monitored ecosystem."
                : "Current disclosure patterns indicate stable and anticipated monitoring conditions."}
            </p>
          </div>
        </div>

        {/* Threat Outlook */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-semibold mb-3 flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
            Threat Outlook
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#0B1117] border border-slate-800/80 hover:border-cyan-500/30 transition-colors rounded-lg p-4 group">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 group-hover:text-cyan-400/70 transition-colors">Current Risk Trend</p>
              <p className={`font-bold flex items-center transition-colors ${isHighRisk ? 'text-red-400 group-hover:text-red-300' : 'text-green-400 group-hover:text-green-300'}`}>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isHighRisk 
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 14l7 7m0 0l7-7m-7 7V3"></path>}
                </svg>
                {isHighRisk ? "Increasing" : "Stable"}
              </p>
            </div>
            <div className="bg-[#0B1117] border border-slate-800/80 hover:border-cyan-500/30 transition-colors rounded-lg p-4 group">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 group-hover:text-cyan-400/70 transition-colors">Monitoring Status</p>
              <p className="text-cyan-400 font-bold flex items-center group-hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse mr-2 shadow-[0_0_5px_rgba(56,189,248,0.8)]"></span>
                Active
              </p>
            </div>
            <div className="col-span-2 bg-[#0B1117] border border-slate-800/80 hover:border-cyan-500/30 transition-colors rounded-lg p-4 flex justify-between items-center group">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider group-hover:text-cyan-400/70 transition-colors">Most Active Month</p>
              <p className="text-white font-bold group-hover:text-cyan-100 transition-colors">{activeMonth}</p>
            </div>
          </div>
        </div>

        {/* Data Provenance */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Data Provenance
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Derived from SEC EDGAR filings, GDELT event streams, and global disclosure regulations.
          </p>
        </div>

        {/* Who Controls The Rail */}
        <div className="bg-[#030712] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 rounded-lg p-5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/30 group-hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
          <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-semibold mb-3 flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
            Who Controls The Rail
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed mb-4 italic">
            “SEC EDGAR filings, regulatory disclosures, and global event monitoring systems determine how cyber incidents become publicly visible.”
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-[9px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              SEC EDGAR
            </span>
            <span className="px-2 py-1 text-[9px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              GDELT
            </span>
            <span className="px-2 py-1 text-[9px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              Disclosure Feeds
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800/60">
        <a
          href="http://127.0.0.1:8000/api/download"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full items-center justify-center space-x-2 overflow-hidden rounded-lg bg-[#0B1117] border border-cyan-500/30 px-4 py-3 font-medium text-cyan-400 transition-all hover:bg-cyan-500/10 hover:border-cyan-400/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span>Export Dataset</span>
        </a>
      </div>
    </div>
  );
}