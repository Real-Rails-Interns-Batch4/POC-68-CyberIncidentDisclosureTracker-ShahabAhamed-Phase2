"use client";

import { useEffect, useState } from "react";
import SeverityChart from "@/components/SeverityChart";
import SectorChart from "@/components/SectorChart";
import TrendChart from "@/components/TrendChart";
import IntelligenceSidebar from "@/components/IntelligenceSidebar";
import IncidentTable from "@/components/IncidentTable";
import ArchitectModal from "@/components/ArchitectModal";

import {
  getMetrics,
  getAnalytics,
  getIncidents,
} from "@/lib/api";

export default function Home() {
  const [metrics, setMetrics] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [incidents, setIncidents] = useState<any[]>([]);

  const [sectorFilter, setSectorFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelType, setPanelType] = useState<string>("ai_insights");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isArchitectModalOpen, setIsArchitectModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const metricsData = await getMetrics();
        const analyticsData = await getAnalytics();
        const incidentsData = await getIncidents();

        setMetrics(metricsData);
        setAnalytics(analyticsData);
        setIncidents(incidentsData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    }

    loadData();
  }, []);

  async function applyFilters(sector?: string, severity?: string) {
    const data = await getIncidents(sector, severity);
    setIncidents(data);
  }

  useEffect(() => {
    applyFilters(sectorFilter, severityFilter);
  }, [sectorFilter, severityFilter]);

  const handleRowClick = (incident: any) => {
    setSelectedItem(incident);
    setPanelType("incident");
    setIsPanelOpen(true);
  };

  if (!metrics || !analytics) {
    return (
      <main className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center space-y-4">
        <div className="relative flex h-12 w-12">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20"></span>
          <span className="relative inline-flex rounded-full h-12 w-12 bg-cyan-500/20 border border-cyan-500/50"></span>
        </div>
        <p className="text-cyan-400 tracking-[0.2em] uppercase text-sm font-semibold animate-pulse">
          Initializing Intelligence Feed...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30">
      
      {/* Transparent Header */}
      <header className="relative w-full bg-[#030712]/90 border-b border-cyan-500/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 h-[72px] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </div>
            <span className="font-bold text-sm tracking-widest text-slate-300 uppercase hidden sm:block">
              Infocreon <span className="text-cyan-500">Internship</span>
            </span>
          </div>
          <button 
            onClick={() => setIsArchitectModalOpen(true)}
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2"
            title="Architect Information"
          >
            <svg className="w-5 h-5 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
        </div>
      </header>

      <div className="px-6 md:px-8 pt-5 pb-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Main Content Area (Full Width) */}
          <div className="w-full flex flex-col min-w-0">
            {/* Page Header */}
            <div className="mb-6 relative flex flex-col gap-1">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                  {metrics.source_mode || "LIVE"} INTELLIGENCE FEED
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 tracking-tight py-1">
                Infocreon Internship – Cyber Incident Disclosure Tracker
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                Monitoring SEC EDGAR, CISA, GDELT, SEC disclosures and global cyber threat intelligence.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <div className="glass-card relative overflow-hidden border border-slate-800/50 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:border-cyan-500/40 group cursor-pointer" onClick={() => { setPanelType("ai_insights"); setIsPanelOpen(true); }}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex justify-between items-start mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center space-x-2">
                    <svg className="w-4 h-4 text-cyan-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span>Total Incidents</span>
                  </h2>
                  <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>
                <p className="text-3xl font-black text-white tracking-tight relative z-10">
                  {metrics.total_incidents}
                </p>
              </div>

              <div className="glass-card relative overflow-hidden border border-slate-800/50 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)] hover:border-red-500/40 group cursor-pointer" onClick={() => { setPanelType("payment_flow"); setIsPanelOpen(true); }}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex justify-between items-start mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-red-400 transition-colors flex items-center space-x-2">
                    <svg className="w-4 h-4 text-red-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span>High Severity</span>
                  </h2>
                  <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-red-400 bg-red-400/10 border border-red-400/20 rounded-full flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse"></span>
                    HIGH RISK
                  </span>
                </div>
                <p className="text-3xl font-black text-red-400 tracking-tight relative z-10">
                  {metrics.high_severity}
                </p>
              </div>

              <div className="glass-card relative overflow-hidden border border-slate-800/50 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:border-cyan-500/40 group cursor-pointer" onClick={() => { setPanelType("sector_analytics"); setIsPanelOpen(true); }}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex justify-between items-start mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center space-x-2">
                    <svg className="w-4 h-4 text-cyan-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    <span>Sectors</span>
                  </h2>
                  <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-slate-300 bg-slate-800 border border-slate-700 rounded-full flex items-center gap-1">
                    MONITORED
                  </span>
                </div>
                <p className="text-3xl font-black text-white tracking-tight relative z-10">
                  {metrics.sectors}
                </p>
              </div>

              <div className="glass-card relative overflow-hidden border border-slate-800/50 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(129,140,248,0.2)] hover:border-indigo-500/40 group cursor-pointer" onClick={() => { setPanelType("connected_institutions"); setIsPanelOpen(true); }}>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex justify-between items-start mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors flex items-center space-x-2">
                    <svg className="w-4 h-4 text-indigo-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>Companies</span>
                  </h2>
                  <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-1">
                    TRACKED
                  </span>
                </div>
                <p className="text-3xl font-black text-white tracking-tight relative z-10">
                  {metrics.companies}
                </p>
              </div>
            </div>

            {/* Intelligence Summary - Kept inline for high-level context */}
            <div className="glass-card border border-slate-800/80 rounded-xl p-6 mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 relative z-10 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">Intelligence Summary</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold tracking-widest text-cyan-400 flex items-center space-x-1.5 shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  <span>SYSTEM GENERATED INSIGHTS</span>
                </span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 relative z-10">
                {(() => {
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

                  return (
                    <>
                      <li className="flex items-start space-x-3 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shadow-[0_0_8px_rgba(56,189,248,0.8)] group-hover/item:scale-150 transition-transform"></div>
                        <p className="text-sm text-slate-300 leading-relaxed"><strong className="text-white font-semibold">{topSector}</strong> is the most targeted sector.</p>
                      </li>
                      <li className="flex items-start space-x-3 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shadow-[0_0_8px_rgba(56,189,248,0.8)] group-hover/item:scale-150 transition-transform"></div>
                        <p className="text-sm text-slate-300 leading-relaxed"><strong className="text-white capitalize font-semibold">{topSeverity}</strong> incidents are prominent.</p>
                      </li>
                      <li className="flex items-start space-x-3 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shadow-[0_0_8px_rgba(56,189,248,0.8)] group-hover/item:scale-150 transition-transform"></div>
                        <p className="text-sm text-slate-300 leading-relaxed">Peak activity occurred in <strong className="text-white font-semibold">{activeMonth}</strong>.</p>
                      </li>
                      <li className="flex items-start space-x-3 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shadow-[0_0_8px_rgba(56,189,248,0.8)] group-hover/item:scale-150 transition-transform"></div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {isHighRisk 
                            ? <strong className="text-red-400 font-semibold drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">Elevated monitoring required.</strong>
                            : <strong className="text-green-400 font-semibold drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">Normal monitoring posture.</strong>}
                        </p>
                      </li>
                    </>
                  );
                })()}
              </ul>
            </div>

            {/* Main Stage */}
            <div className="flex flex-col space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div onClick={() => { setPanelType("chart_severity"); setIsPanelOpen(true); }} className="cursor-pointer transition-transform hover:-translate-y-1">
                  <SeverityChart data={analytics.severity_breakdown} />
                </div>
                <div onClick={() => { setPanelType("chart_sector"); setIsPanelOpen(true); }} className="cursor-pointer transition-transform hover:-translate-y-1">
                  <SectorChart data={analytics.sector_breakdown} />
                </div>
              </div>

              <div onClick={() => { setPanelType("chart_trend"); setIsPanelOpen(true); }} className="cursor-pointer transition-transform hover:-translate-y-1">
                <TrendChart data={analytics.monthly_trend} />
              </div>

              {/* Filters */}
              <div className="glass-card border border-slate-800/70 rounded-xl p-5 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/30 group-hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span>Intelligence Filters</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Sector Profile</label>
                    <div className="relative group/select">
                      <select
                        value={sectorFilter}
                        onChange={(e) => setSectorFilter(e.target.value)}
                        className="w-full bg-[#0B1117]/80 text-sm text-white border border-slate-700/80 rounded-lg py-2.5 px-3 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 group-hover/select:border-slate-600 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">All Sectors</option>
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Retail</option>
                        <option>Energy</option>
                        <option>Government</option>
                        <option>Telecommunications</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover/select:text-cyan-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Risk Severity</label>
                    <div className="relative group/select">
                      <select
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                        className="w-full bg-[#0B1117]/80 text-sm text-white border border-slate-700/80 rounded-lg py-2.5 px-3 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 group-hover/select:border-slate-600 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">All Severities</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover/select:text-cyan-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <IncidentTable incidents={incidents} onRowClick={handleRowClick} />
            </div>
          </div>
        </div>
      </div>

      <IntelligenceSidebar 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        metrics={metrics} 
        analytics={analytics} 
        selectedItem={selectedItem}
        panelType={panelType}
      />

      <ArchitectModal 
        isOpen={isArchitectModalOpen} 
        onClose={() => setIsArchitectModalOpen(false)} 
      />

    </main>
  );
}