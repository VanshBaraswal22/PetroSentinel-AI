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
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-900" />
              Macroeconomic Impact Simulator
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Simulate cascading impacts on India's economy and Strategic Petroleum Reserves (SPR) based on disruption scenarios.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-700 uppercase font-bold tracking-wider mr-2">Disruption Triggers:</span>
            {presets.map(p => (
              <button
                key={p}
                onClick={() => setScenario(p)}
                className={`px-3 py-2 rounded-md text-xs font-semibold border transition-all min-h-[44px] flex items-center justify-center ${
                  scenario === p ? 'bg-[#1e3a8a] text-white border-blue-900 font-bold' : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900'
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
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white font-sans transition-all shadow-xs min-h-[44px]"
            />
            <button 
              onClick={handleSimulate}
              disabled={isLoading || !scenario.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold text-xs bg-[#1e3a8a] text-white hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all min-h-[44px]"
            >
              {isLoading ? (
                <><RefreshCw className="w-4 h-4 animate-spin text-white" /> Simulating...</>
              ) : (
                <><Play className="w-4 h-4 fill-white" /> Calculate Shock Vector</>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2 animate-pulse font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" /> {error}
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full bg-white border border-slate-200 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
             <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 shrink-0">
               <AlertTriangle className="w-6 h-6 text-amber-600" />
             </div>
             <div>
               <div className="flex items-center gap-2 flex-wrap">
                 <span className="text-xs font-black uppercase tracking-widest bg-amber-600 text-white px-2.5 py-0.5 rounded-full">
                   SHOCK SCENARIO
                 </span>
               </div>
               <div className="text-xl font-bold text-slate-900 mt-1">{result.scenario}</div>
             </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-900 mb-2 relative z-10">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">SPR Survival Buffer</span>
            </div>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className={`text-4xl font-extrabold tracking-tighter ${result.spr_survival_days < 5 ? 'text-red-600' : 'text-slate-900'}`}>
                {result.spr_survival_days}
              </span>
              <span className="text-sm font-semibold text-slate-600">Days</span>
            </div>
            <div className="text-xs text-slate-600 mt-2 relative z-10 border-t border-slate-100 pt-2">Remaining runway from ISPRL 9.5-day baseline</div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-900 mb-2 relative z-10">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Brent Crude Surge</span>
            </div>
            <div className="text-4xl font-extrabold tracking-tighter text-slate-900 relative z-10">{result.brent_crude_surge_pct}</div>
            <div className="text-xs text-slate-600 mt-2 relative z-10 border-t border-slate-100 pt-2">Projected global price jump immediately</div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-900 mb-2 relative z-10">
              <FileText className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Pump Price Impact</span>
            </div>
            <div className="text-4xl font-extrabold tracking-tighter text-slate-900 relative z-10">{result.pump_price_impact_inr}</div>
            <div className="text-xs text-slate-600 mt-2 relative z-10 border-t border-slate-100 pt-2">Estimated hit to domestic retail fuels</div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm col-span-1">
            <div className="flex items-center gap-2 text-blue-900 mb-2">
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Refinery Slowdown</span>
            </div>
            <div className="text-3xl font-extrabold tracking-tighter text-slate-900">{result.refinery_slowdown_pct}</div>
            <div className="text-xs text-slate-600 mt-2 border-t border-slate-100 pt-2">Reduction in national refinery run rates</div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm col-span-full lg:col-span-2">
            <div className="flex items-center gap-2 text-blue-900 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Macroeconomic GDP Drag</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-3xl font-extrabold tracking-tighter text-amber-600">{result.gdp_drag_pct}</div>
              <div className="text-xs text-slate-600 flex-1 sm:pl-4 sm:border-l border-slate-200 pt-2 sm:pt-0 border-t sm:border-t-0">Estimated negative percentage point impact on India's annual GDP trajectory due to elevated energy costs and structural inflation.</div>
            </div>
          </div>

          <div className="col-span-full bg-slate-50 p-5 md:p-6 rounded-xl border border-slate-300 shadow-xs">
            <div className="text-xs text-slate-800 font-bold tracking-wider uppercase mb-2 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-blue-900" /> Critical Operational Bottleneck
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {result.critical_operational_bottleneck}
            </div>
          </div>

          <div className="col-span-full sm:col-span-1 bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-900 mb-2 relative z-10">
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Time to Stabilize</span>
            </div>
            <div className="text-2xl font-extrabold tracking-tighter text-slate-900 relative z-10">{result.days_to_stabilize}</div>
            <div className="text-xs text-slate-600 mt-2 relative z-10 border-t border-slate-100 pt-2">Estimated duration until normal supply resumes</div>
          </div>

          <div className="col-span-full sm:col-span-2 bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" /> Immediate 72-Hour Action Plan
            </div>
            <ul className="space-y-2">
              {result.immediate_actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-full bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> Base Model Assumptions (July 2026 Baseline)
            </div>
            <div className="flex flex-wrap gap-2">
              {result.model_assumptions.map((assumption, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-medium">
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
