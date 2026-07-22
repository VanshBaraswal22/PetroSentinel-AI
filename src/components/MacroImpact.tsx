import React, { useState } from 'react';
import { Activity, RefreshCw, AlertTriangle, Play, FileText, Database, ArrowRight } from 'lucide-react';
import { ImpactResponse } from '../types';

export const MacroImpact: React.FC = () => {
  const [scenario, setScenario] = useState<string>('Strait of Hormuz Closure');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ImpactResponse | null>(null);

  const presets = [
    'Strait of Hormuz Closure',
    'Red Sea Blockade',
    'OPEC+ Emergency Cut'
  ];

  const handleSimulate = async () => {
    if (!scenario.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/impact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });
      if (!response.ok) {
        throw new Error('Simulation failed');
      }
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error occurred connecting to the Macro Analyst backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Macroeconomic Impact Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Simulate cascading impacts on India's economy and Strategic Petroleum Reserves (SPR) based on disruption scenarios.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-300 uppercase font-bold tracking-wider mr-2">Disruption Triggers:</span>
            {presets.map(p => (
              <button
                key={p}
                onClick={() => setScenario(p)}
                className={`px-3 py-2 rounded-md text-xs font-semibold border transition-all min-h-[44px] flex items-center justify-center ${
                  scenario === p ? 'bg-blue-900 text-white border-blue-700 font-bold' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-slate-100 hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              placeholder="E.g., Strait of Hormuz Closure..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-900 font-sans transition-all shadow-xs min-h-[44px]"
            />
            <button 
              onClick={handleSimulate}
              disabled={isLoading || !scenario.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold text-xs bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all min-h-[44px]"
            >
              {isLoading ? (
                <><RefreshCw className="w-4 h-4 animate-spin text-white" /> Simulating...</>
              ) : (
                <><Play className="w-4 h-4 fill-white" /> Calculate Shock Vector</>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-300 flex items-center gap-2 animate-pulse font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" /> {error}
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
             <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300 shrink-0">
               <AlertTriangle className="w-6 h-6 text-amber-400" />
             </div>
             <div>
               <div className="flex items-center gap-2 flex-wrap">
                 <span className="text-xs font-black uppercase tracking-widest bg-amber-600 text-white px-2.5 py-0.5 rounded-full">
                   SHOCK SCENARIO
                 </span>
               </div>
               <div className="text-xl font-bold text-slate-100 mt-1">{result.scenario}</div>
             </div>
          </div>

          <div className="bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-400 mb-2 relative z-10">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">SPR Survival Buffer</span>
            </div>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className={`text-4xl font-extrabold tracking-tighter ${result.spr_survival_days < 5 ? 'text-red-400' : 'text-slate-100'}`}>
                {result.spr_survival_days}
              </span>
              <span className="text-sm font-semibold text-slate-400">Days</span>
            </div>
            <div className="text-xs text-slate-400 mt-2 relative z-10 border-t border-slate-800 pt-2">Remaining runway from ISPRL 9.5-day baseline</div>
          </div>

          <div className="bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-400 mb-2 relative z-10">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Brent Crude Surge</span>
            </div>
            <div className="text-4xl font-extrabold tracking-tighter text-slate-100 relative z-10">{result.brent_crude_surge_pct}</div>
            <div className="text-xs text-slate-400 mt-2 relative z-10 border-t border-slate-800 pt-2">Projected global price jump immediately</div>
          </div>

          <div className="bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-400 mb-2 relative z-10">
              <FileText className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Pump Price Impact</span>
            </div>
            <div className="text-4xl font-extrabold tracking-tighter text-slate-100 relative z-10">{result.pump_price_impact_inr}</div>
            <div className="text-xs text-slate-400 mt-2 relative z-10 border-t border-slate-800 pt-2">Estimated hit to domestic retail fuels</div>
          </div>

          <div className="bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 shadow-sm col-span-1">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Refinery Slowdown</span>
            </div>
            <div className="text-3xl font-extrabold tracking-tighter text-slate-100">{result.refinery_slowdown_pct}</div>
            <div className="text-xs text-slate-400 mt-2 border-t border-slate-800 pt-2">Reduction in national refinery run rates</div>
          </div>

          <div className="bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 shadow-sm col-span-full lg:col-span-2">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Macroeconomic GDP Drag</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-3xl font-extrabold tracking-tighter text-amber-400">{result.gdp_drag_pct}</div>
              <div className="text-xs text-slate-300 flex-1 sm:pl-4 sm:border-l border-slate-800 pt-2 sm:pt-0 border-t sm:border-t-0">Estimated negative percentage point impact on India's annual GDP trajectory due to elevated energy costs and structural inflation.</div>
            </div>
          </div>

          <div className="col-span-full bg-slate-950 p-5 md:p-6 rounded-xl border border-slate-800 shadow-xs">
            <div className="text-xs text-slate-200 font-bold tracking-wider uppercase mb-2 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Critical Operational Bottleneck
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
              {result.critical_operational_bottleneck}
            </div>
          </div>

          <div className="col-span-full sm:col-span-1 bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-400 mb-2 relative z-10">
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Time to Stabilize</span>
            </div>
            <div className="text-2xl font-extrabold tracking-tighter text-slate-100 relative z-10">{result.days_to_stabilize}</div>
            <div className="text-xs text-slate-400 mt-2 relative z-10 border-t border-slate-800 pt-2">Estimated duration until normal supply resumes</div>
          </div>

          <div className="col-span-full sm:col-span-2 bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Immediate 72-Hour Action Plan
            </div>
            <ul className="space-y-2">
              {result.immediate_actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-full bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> Base Model Assumptions (July 2026 Baseline)
            </div>
            <div className="flex flex-wrap gap-2">
              {result.model_assumptions.map((assumption, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                  {assumption}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
