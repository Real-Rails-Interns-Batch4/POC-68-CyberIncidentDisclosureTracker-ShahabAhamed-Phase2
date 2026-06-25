"use client";

import React, { useEffect, useState } from "react";

interface ArchitectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitectModal({ isOpen, onClose }: ArchitectModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-md bg-[#0B1117] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(56,189,248,0.15)] overflow-hidden transition-all duration-300 transform ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-bold text-white tracking-tight">Architect Information</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Architect</p>
            <p className="text-white font-medium text-sm">Shahab Ahamed</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Program</p>
            <p className="text-cyan-400 font-medium text-sm">Infocreon Internship</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Batch</p>
              <p className="text-white font-medium text-sm">Batch 4</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">POC</p>
              <p className="text-white font-medium text-sm">POC-68</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Project</p>
            <p className="text-white font-medium text-sm">Cyber Incident Disclosure Tracker</p>
          </div>
          
          <div className="space-y-2 pt-2 border-t border-slate-800/50">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-md">Next.js</span>
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-md">FastAPI</span>
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-md">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
