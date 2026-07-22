import React from 'react';
import { 
  Radio, 
  Ship, 
  FileText, 
  ShieldAlert, 
  Bell, 
  Cpu, 
  Activity, 
  Map, 
  Database, 
  TrendingUp, 
  Route, 
  Printer, 
  History, 
  Layers, 
  ArrowDown, 
  Sparkles,
  Server
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono font-bold uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 text-blue-900" /> System Architecture & Data Flow Diagram
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          India Energy Crisis Radar — Autonomous Multi-Agent Command Core
        </h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          End-to-end pipeline architecture converting unstructured maritime intelligence and geopolitical news into real-time risk scores, SPR drawdown mandates, and rerouting plans.
        </p>
      </div>

      {/* Main Diagram Area */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative space-y-8">
        
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 font-bold uppercase">System Color Legend:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
            <span className="text-slate-700">Data Sources & Inputs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-blue-50 border border-blue-300" />
            <span className="text-blue-900 font-semibold">Gemini AI Orchestrator</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
            <span className="text-slate-700">Analytics Agents & Decision Outputs</span>
          </div>
        </div>

        {/* LAYER 1: DATA INGESTION */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
            <span className="px-2 py-0.5 rounded bg-slate-200 border border-slate-300">LAYER 1</span>
            <span>DATA INGESTION & REAL-TIME INTELLIGENCE FEEDS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <Radio className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">News Feed APIs</div>
                <div className="text-[10px] text-slate-500">Geopolitical Wire Services</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <Ship className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">AIS Vessel Tracking</div>
                <div className="text-[10px] text-slate-500">Chokepoint Density Logs</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <FileText className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">OPEC+ Bulletins</div>
                <div className="text-[10px] text-slate-500">Quota & OSP Surcharges</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Sanctions Registries</div>
                <div className="text-[10px] text-slate-500">OFAC & Shipping Bans</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all col-span-2 sm:col-span-1">
              <Bell className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Maritime Alerts</div>
                <div className="text-[10px] text-slate-500">Navy & DG Shipping Advisories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Directional Connector Arrow 1 */}
        <div className="flex justify-center py-1">
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <div className="w-0.5 h-6 bg-slate-300" />
            <ArrowDown className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        {/* LAYER 2: AI INTELLIGENCE CORE */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2 text-amber-800 font-mono font-bold text-xs uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-200">LAYER 2</span>
              <span>AI INTELLIGENCE CORE & MULTI-AGENT REASONING PIPELINE</span>
            </div>
            <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
              Powered by Google Gemini 3.6 Flash
            </span>
          </div>

          {/* Central Orchestrator Node */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 shadow-xs text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-100 border border-amber-200 text-amber-800 shrink-0">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  Gemini AI Orchestrator Node
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                    STRUCTURED JSON OUTPUTS
                  </span>
                </h3>
                <p className="text-xs text-slate-600">
                  Parses natural language intelligence, normalizes geopolitical signals, and triggers structured agents with context parameters.
                </p>
              </div>
            </div>
          </div>

          {/* Three Sub-Agent Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Agent 1 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-amber-600 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wide">Geopolitical Risk Agent</div>
                  <p className="text-[11px] text-slate-600 leading-snug mt-1">
                    Evaluates Hormuz, Red Sea & OPEC+ threat vectors. Computes scores, momentum, and primary threat vectors.
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-500 bg-white p-2 rounded border border-slate-200">
                Endpoint: <span className="text-slate-800 font-semibold">/api/analyze-risk</span>
              </div>
            </div>

            {/* Agent 2 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-amber-600 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wide">Macro Impact Modeller</div>
                  <p className="text-[11px] text-slate-600 leading-snug mt-1">
                    Simulates Brent surge, Rs pump price impact, refinery slowdown %, GDP drag, and 72h emergency actions.
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-500 bg-white p-2 rounded border border-slate-200">
                Endpoint: <span className="text-slate-800 font-semibold">/api/macro-impact</span>
              </div>
            </div>

            {/* Agent 3 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-amber-600 shrink-0">
                  <Route className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wide">Logistics Optimizer</div>
                  <p className="text-[11px] text-slate-600 leading-snug mt-1">
                    Generates 3 ranked rerouting alternatives with crude grades, spot premiums, compatible refineries, and activation steps.
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-500 bg-white p-2 rounded border border-slate-200">
                Endpoint: <span className="text-slate-800 font-semibold">/api/logistics</span>
              </div>
            </div>

          </div>
        </div>

        {/* Directional Connector Arrow 2 */}
        <div className="flex justify-center py-1">
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <div className="w-0.5 h-6 bg-slate-300" />
            <ArrowDown className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        {/* LAYER 3: DECISION OUTPUTS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
            <span className="px-2 py-0.5 rounded bg-slate-200 border border-slate-300">LAYER 3</span>
            <span>OPERATIONAL DECISION OUTPUTS & COMMAND VIEWS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <Map className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Live Risk Dashboard</div>
                <div className="text-[10px] text-slate-500">Interactive Maritime Map</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <Database className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">SPR Drawdown Trigger</div>
                <div className="text-[10px] text-slate-500">Cabinet Level Authorization</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Procurement Rerouting</div>
                <div className="text-[10px] text-slate-500">72h Executable Reroutes</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all">
              <Printer className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Executive Brief</div>
                <div className="text-[10px] text-slate-500">Ministry Printable Export</div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2 shadow-xs hover:border-amber-400 transition-all col-span-2 sm:col-span-1">
              <History className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Historical Log</div>
                <div className="text-[10px] text-slate-500">Audit Trail & Incident Archive</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tech Stack Pills */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
          <Server className="w-4 h-4 text-amber-600" />
          <span>Production Tech Stack & Framework Badges</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> React 18 + TypeScript
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Gemini AI (gemini-3.6-flash)
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Express.js Backend
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Vite Build System
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Tailwind CSS
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Node.js Container Environment
          </span>
        </div>
      </div>
    </div>
  );
};
