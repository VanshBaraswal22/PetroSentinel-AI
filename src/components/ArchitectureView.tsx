import React from 'react';
import { 
  Radio, 
  Ship, 
  FileText, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  Layers, 
  ArrowDown, 
  Map, 
  Activity, 
  Database, 
  Printer, 
  TrendingUp, 
  BarChart3, 
  Compass, 
  DollarSign, 
  Server,
  Zap,
  Globe
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-mono font-bold uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 text-blue-400" /> PetroSentinel-AI Architecture
        </div>
        <h2 className="text-2xl font-black text-slate-100 tracking-tight">
          System Architecture & Data Flow Diagram
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Top-to-bottom pipeline processing real-time geopolitical intelligence through Gemini AI into operational energy security decisions.
        </p>
      </div>

      {/* Main Diagram Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* LAYER 1: Signal Sources */}
        <div className="bg-slate-900/90 rounded-xl border-2 border-blue-500/60 p-5 space-y-4 shadow-lg shadow-blue-950/20">
          <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono font-bold text-xs uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300 font-black">LAYER 1</span>
              <span className="flex items-center gap-1.5"><Radio className="w-4 h-4 text-blue-400" /> Signal Sources</span>
            </div>
            <span className="text-[10px] font-mono text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
              Raw Intelligence Ingestion
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-blue-500/40 hover:border-blue-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">News/Wire Feed</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Real-time Reuters, AP, Bloomberg geopolitical wire ingestion</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-blue-500/40 hover:border-blue-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 shrink-0">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">AIS Vessel Data</div>
                <div className="text-[11px] text-slate-300 mt-0.5">VLCC vessel locations, speed & chokepoint telemetry</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-blue-500/40 hover:border-blue-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Sanctions Registry</div>
                <div className="text-[11px] text-slate-300 mt-0.5">OFAC, Maritime Advisories & Indian Navy DG Shipping</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-blue-500/40 hover:border-blue-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Commodity Prices</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Brent Crude, Dubai Sour, OSP Surcharges & Freight Swaps</div>
              </div>
            </div>
          </div>
        </div>

        {/* Directional Connector Arrow */}
        <div className="flex justify-center py-0.5">
          <div className="flex flex-col items-center gap-1 text-slate-500">
            <div className="w-0.5 h-6 bg-amber-500/50" />
            <ArrowDown className="w-5 h-5 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* LAYER 2: AI Risk Engine */}
        <div className="bg-slate-900/90 rounded-xl border-2 border-amber-500/60 p-5 space-y-4 shadow-lg shadow-amber-950/20">
          <div className="flex items-center justify-between border-b border-amber-900/50 pb-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-black">LAYER 2</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> AI Risk Engine — Gemini API</span>
            </div>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
              Powered by @google/genai (Structured Outputs)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-amber-500/40 hover:border-amber-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Multi-Source Fusion</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Correlates disparate news feeds, vessel tracking, and pricing anomalies into unified event vectors</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-amber-500/40 hover:border-amber-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">NLP Extraction</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Extracts threat severity, involved chokepoints, affected refinery grades, and lead time metrics</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-amber-500/40 hover:border-amber-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Risk Scoring Algorithm</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Computes normalized risk scores (0-100), risk momentum trends, and recommended policy mitigations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Directional Connector Arrow */}
        <div className="flex justify-center py-0.5">
          <div className="flex flex-col items-center gap-1 text-slate-500">
            <div className="w-0.5 h-6 bg-orange-500/50" />
            <ArrowDown className="w-5 h-5 text-orange-400 animate-bounce" />
          </div>
        </div>

        {/* LAYER 3: Risk Assessment Layer */}
        <div className="bg-slate-900/90 rounded-xl border-2 border-orange-500/60 p-5 space-y-4 shadow-lg shadow-orange-950/20">
          <div className="flex items-center justify-between border-b border-orange-900/50 pb-2">
            <div className="flex items-center gap-2 text-orange-400 font-mono font-bold text-xs uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded bg-orange-950 border border-orange-800 text-orange-300 font-black">LAYER 3</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-orange-400" /> Risk Assessment Layer</span>
            </div>
            <span className="text-[10px] font-mono text-orange-300 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800">
              Normalized Vector Metrics
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-orange-500/40 hover:border-orange-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-orange-950/80 border border-orange-800 text-orange-400 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Hormuz Score</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Tracks 26.5°N 56.5°E bottleneck threat (2.1M bpd Indian volume)</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-orange-500/40 hover:border-orange-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-orange-950/80 border border-orange-800 text-orange-400 shrink-0">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Red Sea Score</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Monitors Bab el-Mandeb / Suez reroute delays & freight surcharges</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-orange-500/40 hover:border-orange-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-orange-950/80 border border-orange-800 text-orange-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">OPEC Score</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Evaluates quota cut policy, OSP premium hikes & Middle East supply tightness</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-orange-500/40 hover:border-orange-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-orange-950/80 border border-orange-800 text-orange-400 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Composite Index</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Weighted national disruption risk score triggering automated alert levels</div>
              </div>
            </div>
          </div>
        </div>

        {/* Directional Connector Arrow */}
        <div className="flex justify-center py-0.5">
          <div className="flex flex-col items-center gap-1 text-slate-500">
            <div className="w-0.5 h-6 bg-emerald-500/50" />
            <ArrowDown className="w-5 h-5 text-emerald-400 animate-bounce" />
          </div>
        </div>

        {/* LAYER 4: Output Modules */}
        <div className="bg-slate-900/90 rounded-xl border-2 border-emerald-500/60 p-5 space-y-4 shadow-lg shadow-emerald-950/20">
          <div className="flex items-center justify-between border-b border-emerald-900/50 pb-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-black">LAYER 4</span>
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-emerald-400" /> Output Modules</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              Cabinet-Ready Executive Action
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 shrink-0">
                <Map className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Maritime Map</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Geospatial corridor monitor with real-time waypoint telemetry & AIS updates</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Scenario Impact</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Digital twin stress-testing, Brent crude price projections & supply rerouting</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">SPR Intelligence</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Mangalore, Padur & Visakhapatnam reserve depletion curves & drawdown mandates</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">Exec Brief</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Policy-ready PDF export generator formatted for Ministry cabinet briefings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Diagram Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm mt-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-bold uppercase">Architecture Layer Legend:</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-950 border border-blue-500" />
              <span className="text-blue-300 font-semibold">1. Signal Ingestion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-950 border border-amber-500" />
              <span className="text-amber-300 font-semibold">2. Gemini AI Core</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-orange-950 border border-orange-500" />
              <span className="text-orange-300 font-semibold">3. Risk Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-500" />
              <span className="text-emerald-300 font-semibold">4. Decision Outputs</span>
            </div>
          </div>
        </div>

      </div>

      {/* Production Tech Stack Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          <Server className="w-4 h-4 text-blue-400" />
          <span>Production Tech Stack & Framework Integration</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> React 18 + TypeScript
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs font-mono font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Gemini AI (@google/genai SDK)
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Express.js Node Server
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Vite Build Tool
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Tailwind CSS
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Recharts Data Viz
          </span>
        </div>
      </div>
    </div>
  );
};
