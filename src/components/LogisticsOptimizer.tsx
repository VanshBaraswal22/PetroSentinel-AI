import React, { useState } from 'react';
import { Route, RefreshCw, AlertTriangle, Play, Ship, Clock, TrendingUp, CheckCircle, ShieldCheck, Layers, Award, Terminal } from 'lucide-react';
import { LogisticsResponse } from '../types';

export const LogisticsOptimizer: React.FC = () => {
  const [scenario, setScenario] = useState<string>('Strait of Hormuz Closure');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LogisticsResponse | null>(null);

  const presets = [
    'Strait of Hormuz Closure',
    'Red Sea Blockade',
    'OPEC+ Emergency Cut'
  ];

  const handleOptimize = async () => {
    if (!scenario.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/logistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });
      if (!response.ok) {
        throw new Error('Optimization failed');
      }
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error occurred connecting to the Logistics backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Control Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Route className="w-5 h-5 text-blue-900" />
              Autonomous Procurement & Supply Rerouting Engine
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Computes structured alternative crude sourcing directives for Indian procurement officers (IOC, BPCL, HPCL) with strict volume, cost delta, transit time, and execution SLAs.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mr-2">Disruption Scenario:</span>
            {presets.map(p => (
              <button
                key={p}
                onClick={() => setScenario(p)}
                className={`px-3 py-2 rounded-md text-xs font-semibold border transition-all min-h-[44px] flex items-center justify-center ${
                  scenario === p ? 'bg-[#1e3a8a] text-white border-blue-900 font-bold' : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
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
              className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-900 font-sans transition-all shadow-xs min-h-[44px]"
            />
            <button 
              onClick={handleOptimize}
              disabled={isLoading || !scenario.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold text-xs bg-[#1e3a8a] text-white hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all min-h-[44px]"
            >
              {isLoading ? (
                <><RefreshCw className="w-4 h-4 animate-spin text-white" /> Computing Directive...</>
              ) : (
                <><Ship className="w-4 h-4 fill-white" /> Compute Alternate Sourcing</>
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

      {/* Ranked Procurement Alternatives Cards */}
      {result && result.alternatives && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Ranked Operational Procurement Rerouting Plan
            </h3>
            <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              3 Directives Generated • Structured Execution Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {result.alternatives.map((alt) => {
              const supplier = alt.supplier_name || alt.source;
              const volume = alt.volume_m_bbls || "2.5M bbls";
              const costDelta = alt.cost_delta_per_bbl || alt.estimated_spot_premium;
              const transitTime = alt.transit_time_days || alt.transit_time_delta;
              const compatibility = alt.port_refinery_compatibility || (alt.compatible_refineries ? alt.compatible_refineries.join(', ') : 'West Coast Terminals');
              const confidence = alt.confidence_score || "92%";
              const timeToExec = alt.time_to_execute || "Actionable within 18 hours";

              return (
                <div key={alt.rank} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-blue-900/40 transition-all space-y-4">
                  
                  {/* Rank Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm shrink-0 border ${
                          alt.rank === 1 ? 'bg-amber-100 text-amber-900 border-amber-300' : alt.rank === 2 ? 'bg-sky-100 text-sky-900 border-sky-300' : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}>
                          #{alt.rank}
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Primary Supplier & Grade</div>
                          <div className="text-sm font-extrabold text-slate-900 leading-tight">{supplier}</div>
                          <div className="text-xs font-medium text-slate-500">{alt.crude_grade}</div>
                        </div>
                      </div>

                      <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {confidence}
                      </span>
                    </div>

                    {/* Actionability SLA Badge */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center justify-between text-xs text-blue-950 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-800" />
                        <span>Execution SLA:</span>
                      </div>
                      <span className="font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-200 font-mono">
                        {timeToExec}
                      </span>
                    </div>

                    {/* Key Procurement Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-slate-600" /> Target Volume
                        </div>
                        <div className="text-xs font-extrabold text-slate-900 font-mono">{volume}</div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-amber-700" /> Cost Delta
                        </div>
                        <div className="text-xs font-extrabold text-slate-900 font-mono">{costDelta}</div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 col-span-2">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                          <Ship className="w-3 h-3 text-sky-700" /> Tanker Voyage Transit Time
                        </div>
                        <div className="text-xs font-semibold text-slate-800 font-mono">{transitTime}</div>
                      </div>
                    </div>

                    {/* Port & Refinery Compatibility */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-slate-600" /> Port & Refinery Compatibility
                      </div>
                      <p className="text-xs text-slate-700 leading-tight font-medium">
                        {compatibility}
                      </p>
                    </div>

                    {/* Activation Steps */}
                    {alt.activation_steps && alt.activation_steps.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-bold uppercase text-blue-900 tracking-wider flex items-center gap-1">
                          <Play className="w-3 h-3 text-blue-900 fill-blue-900" /> Executive Action Plan
                        </div>
                        <ul className="space-y-1.5">
                          {alt.activation_steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-tight">
                              <span className="text-blue-900 font-black font-mono text-xs">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Strategic Advantage & Risk */}
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <div>
                      <div className="text-[10px] text-blue-900 font-black tracking-widest uppercase mb-0.5">
                        Strategic Rationale
                      </div>
                      <p className="text-xs text-slate-700 leading-snug">
                        {alt.strategic_advantage}
                      </p>
                    </div>

                    {alt.risk_caveat && (
                      <div className="p-2 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-1.5 leading-tight">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong className="font-bold">Risk Caveat:</strong> {alt.risk_caveat}</span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
