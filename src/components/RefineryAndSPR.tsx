import React, { useState } from 'react';
import { Database, ShieldCheck, AlertTriangle, ShieldAlert, Droplets, Gauge, Activity, Zap, Building2, CheckCircle2 } from 'lucide-react';

interface RefineryAndSPRProps {
  overallScore: number | null;
}

export const RefineryAndSPR: React.FC<RefineryAndSPRProps> = ({ overallScore }) => {
  const score = overallScore ?? 0;

  const [importLossPercent, setImportLossPercent] = useState<number>(
    overallScore ? Math.min(80, Math.max(10, Math.round(overallScore * 0.6))) : 25
  );

  // Total ISPRL Phase I capacity = 5.33 Million Metric Tonnes (~39 Million barrels)
  const totalSprBarrels = 39.0; // Million barrels
  const dailyImportReq = 4.8; // Million barrels / day

  const lostBarrelsPerDay = (dailyImportReq * (importLossPercent / 100));
  const sprRunwayDays = lostBarrelsPerDay > 0 ? (totalSprBarrels / lostBarrelsPerDay) : 99;

  // SPR Drawdown Decision Engine Logic
  const getDecision = () => {
    if (score < 40) {
      return {
        level: 'LOW',
        badge: 'DEFENSIVE / STANDBY',
        title: 'NOMINAL RESERVES POSTURE',
        text: 'No drawdown required. Maintain reserves at baseline levels.',
        bgColor: 'bg-emerald-50 border-emerald-200',
        textColor: 'text-[#059669]',
        badgeColor: 'bg-green-600 text-white rounded-full'
      };
    } else if (score >= 40 && score <= 60) {
      return {
        level: 'WARNING',
        badge: 'STAGE 1 READINESS',
        title: 'PRECAUTIONARY ALERT',
        text: 'Precautionary alert: Pre-position drawdown authorization paperwork. Do NOT activate yet.',
        bgColor: 'bg-amber-50 border-amber-200',
        textColor: 'text-[#d97706]',
        badgeColor: 'bg-amber-600 text-white rounded-full'
      };
    } else if (score > 60 && score <= 80) {
      return {
        level: 'HIGH',
        badge: 'ACTIVATE PADUR CAVERN',
        title: 'PARTIAL DRAWDOWN DIRECTIVE',
        text: 'ACTIVATE partial drawdown — Padur cavern at 50,000 bpd. Cabinet notification required.',
        bgColor: 'bg-amber-100/70 border-amber-300',
        textColor: 'text-[#d97706]',
        badgeColor: 'bg-amber-600 text-white rounded-full'
      };
    } else {
      return {
        level: 'CRITICAL',
        badge: 'MAX DRAWDOWN (245k bpd)',
        title: 'EMERGENCY SPR ACTIVATION',
        text: 'EMERGENCY ACTIVATION — All three caverns at maximum drawdown rate. ISPRL directive required.',
        bgColor: 'bg-red-50 border-red-200 animate-pulse',
        textColor: 'text-[#dc2626]',
        badgeColor: 'bg-red-600 text-white rounded-full'
      };
    }
  };

  const decision = getDecision();

  // Helper for refinery exposure based on overallScore
  const getRefineryExposure = (refineryName: string) => {
    if (refineryName.includes('Numaligarh')) {
      return { level: 'LOW', color: 'bg-green-600 text-white rounded-full' };
    }
    if (refineryName.includes('Paradip')) {
      if (score >= 70) return { level: 'HIGH EXPOSURE', color: 'bg-red-600 text-white rounded-full' };
      return { level: 'LOW', color: 'bg-green-600 text-white rounded-full' };
    }
    if (refineryName.includes('Jamnagar')) {
      if (score >= 70) return { level: 'CRITICAL EXPOSURE', color: 'bg-red-600 text-white rounded-full' };
      if (score >= 40) return { level: 'HIGH EXPOSURE', color: 'bg-amber-600 text-white rounded-full' };
      return { level: 'MODERATE', color: 'bg-amber-600 text-white rounded-full' };
    }
    // Kochi & Mangalore
    if (score >= 70) return { level: 'CRITICAL EXPOSURE', color: 'bg-red-600 text-white rounded-full' };
    if (score >= 40) return { level: 'HIGH EXPOSURE', color: 'bg-amber-600 text-white rounded-full' };
    return { level: 'NORMAL', color: 'bg-green-600 text-white rounded-full' };
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-slate-100">India Strategic Petroleum Reserves (ISPRL) & Refinery Buffer</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              National crude oil emergency drawdown simulation and refinery inventory buffer matrix.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-right">
              <span className="text-[10px] text-slate-300 uppercase font-semibold block">Total SPR Capacity</span>
              <strong className="text-blue-400 font-bold text-sm">5.33 MMT (~39M bbls)</strong>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-right">
              <span className="text-[10px] text-slate-300 uppercase font-semibold block">Commercial Tankage</span>
              <strong className="text-emerald-400 font-bold text-sm">~64 Days Supply</strong>
            </div>
          </div>
        </div>

        {/* Interactive Drawdown Simulator */}
        <div className="mt-5 bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-blue-400" />
                Simulate Maritime Disruption & Import Reduction
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Adjust the estimated percentage reduction in daily crude imports to calculate Strategic Petroleum Reserve runway.
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-900 text-white shadow-xs">
              {importLossPercent}% Import Loss ({lostBarrelsPerDay.toFixed(2)}M bpd short)
            </span>
          </div>

          {/* Slider input */}
          <div className="space-y-1">
            <input
              type="range"
              min="5"
              max="90"
              step="5"
              value={importLossPercent}
              onChange={(e) => setImportLossPercent(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-300 font-medium">
              <span>5% (Minor Reroute)</span>
              <span>25% (Red Sea Diversion)</span>
              <span>50% (Hormuz Partial Disruption)</span>
              <span>90% (Severe Blockade)</span>
            </div>
          </div>

          {/* Output Runway Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-300 block">Pure SPR Standalone Runway</span>
              <div className="text-2xl font-extrabold text-blue-400 mt-1">
                {sprRunwayDays > 90 ? '> 90 Days' : `${sprRunwayDays.toFixed(1)} Days`}
              </div>
              <span className="text-xs text-slate-300">Under ISPRL Phase I reserves alone</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-300 block">Combined SPR + Industry Tankage</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                {(sprRunwayDays + 64).toFixed(0)} Days
              </div>
              <span className="text-xs text-slate-300">Includes OMCs & refinery crude stocks</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-300 block">Required Spot Subscriptions</span>
              <div className="text-2xl font-extrabold text-blue-400 mt-1">
                +{Math.round(lostBarrelsPerDay * 30)}M bbls/mo
              </div>
              <span className="text-xs text-slate-300">Non-Gulf spot purchase needed</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: SPR Drawdown Decision Engine */}
      <div className={`p-5 md:p-6 rounded-xl border transition-all shadow-sm ${
        decision.level === 'CRITICAL' ? 'bg-red-950/40 border-red-800/80' :
        decision.level === 'HIGH' || decision.level === 'WARNING' ? 'bg-amber-950/40 border-amber-800/80' :
        'bg-emerald-950/40 border-emerald-800/80'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 shrink-0 shadow-xs">
              {decision.level === 'CRITICAL' ? (
                <ShieldAlert className="w-7 h-7 text-red-400 animate-bounce" />
              ) : decision.level === 'HIGH' ? (
                <AlertTriangle className="w-7 h-7 text-amber-400" />
              ) : decision.level === 'WARNING' ? (
                <Activity className="w-7 h-7 text-amber-400" />
              ) : (
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                  SPR DRAWDOWN DECISION ENGINE
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 uppercase ${decision.badgeColor}`}>
                  {decision.badge}
                </span>
              </div>
              <h3 className={`text-base font-black tracking-tight ${
                decision.level === 'CRITICAL' ? 'text-red-300' :
                decision.level === 'HIGH' || decision.level === 'WARNING' ? 'text-amber-300' :
                'text-emerald-300'
              }`}>
                {decision.title} (Score: {score}/100)
              </h3>
              <p className="text-sm font-semibold text-slate-200 mt-1">
                "{decision.text}"
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-300 uppercase font-bold block">Cabinet Trigger Level</span>
            <span className="text-xs font-bold text-slate-200">
              {score < 40 ? 'Level 0 (Standby)' : score <= 60 ? 'Level 1 (Paperwork)' : score <= 80 ? 'Level 2 (Partial 50k bpd)' : 'Level 3 (Max 245k bpd)'}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Three SPR Cavern Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            ISPRL Phase I Underground Cavern Storage Status
          </h3>
          <span className="text-xs text-slate-300 font-semibold">Total Volume: 5.33 MMT (~39M Barrels)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Padur Cavern */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-100">Padur Cavern</h4>
                  <span className="text-xs font-medium text-slate-300">Udupi, Karnataka</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 bg-emerald-600 text-white rounded-full">
                  FULL (100%)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Capacity & Fill:</span>
                  <strong className="text-slate-100 font-bold">2.50 / 2.50 MMT</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Days of Cover:</span>
                  <strong className="text-blue-400 font-bold">~4.5 Days</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Max Drawdown Rate:</span>
                  <strong className="text-emerald-400 font-bold">120,000 bpd</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>Linked Port: Mangalore SPM</span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
          </div>

          {/* Visakhapatnam Cavern */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-100">Visakhapatnam Cavern</h4>
                  <span className="text-xs font-medium text-slate-300">Andhra Pradesh</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 bg-amber-600 text-white rounded-full">
                  PARTIAL (68%)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Capacity & Fill:</span>
                  <strong className="text-slate-100 font-bold">0.90 / 1.33 MMT</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Days of Cover:</span>
                  <strong className="text-blue-400 font-bold">~1.6 Days</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Max Drawdown Rate:</span>
                  <strong className="text-emerald-400 font-bold">50,000 bpd</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>Dual Cavern (HPCL Shared)</span>
              <span className="text-amber-400 font-bold">COMMERCIAL + SPR</span>
            </div>
          </div>

          {/* Mangalore Cavern */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-100">Mangalore Cavern</h4>
                  <span className="text-xs font-medium text-slate-300">Karnataka</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 bg-emerald-600 text-white rounded-full">
                  OPERATIONAL (89%)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Capacity & Fill:</span>
                  <strong className="text-slate-100 font-bold">1.33 / 1.50 MMT</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Days of Cover:</span>
                  <strong className="text-blue-400 font-bold">~2.4 Days</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-medium">Max Drawdown Rate:</span>
                  <strong className="text-emerald-400 font-bold">75,000 bpd</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>Direct Link: MRPL Refinery</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: National Refinery Status Board */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
              National Refinery Status Board
            </h3>
          </div>
          <span className="text-xs text-slate-300 font-semibold">National Capacity: 256 MTPA</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-300 tracking-wider bg-slate-950">
                <th className="p-3">Refinery Name</th>
                <th className="p-3">Capacity (MTPA)</th>
                <th className="p-3">Primary Crude Source</th>
                <th className="p-3">Exposure Level</th>
                <th className="p-3">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              
              {/* Jamnagar */}
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  Jamnagar (Reliance)
                </td>
                <td className="p-3 font-semibold text-slate-300">33.0 MTPA</td>
                <td className="p-3 text-slate-300">Middle East Heavy Sour</td>
                <td className="p-3">
                  {(() => {
                    const exp = getRefineryExposure('Jamnagar');
                    return (
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase ${exp.color}`}>
                        {exp.level}
                      </span>
                    );
                  })()}
                </td>
                <td className="p-3 text-slate-300">Run-rate adjustment standby</td>
              </tr>

              {/* Kochi */}
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  Kochi (BPCL)
                </td>
                <td className="p-3 font-semibold text-slate-300">15.5 MTPA</td>
                <td className="p-3 text-slate-300">Middle East & West Africa</td>
                <td className="p-3">
                  {(() => {
                    const exp = getRefineryExposure('Kochi');
                    return (
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase ${exp.color}`}>
                        {exp.level}
                      </span>
                    );
                  })()}
                </td>
                <td className="p-3 text-slate-300">Optimizing West Africa intake</td>
              </tr>

              {/* Mangalore */}
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  Mangalore (MRPL)
                </td>
                <td className="p-3 font-semibold text-slate-300">15.0 MTPA</td>
                <td className="p-3 text-slate-300">Middle East Sour & Spot</td>
                <td className="p-3">
                  {(() => {
                    const exp = getRefineryExposure('Mangalore');
                    return (
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase ${exp.color}`}>
                        {exp.level}
                      </span>
                    );
                  })()}
                </td>
                <td className="p-3 text-slate-300">Linked to Padur SPR pipeline</td>
              </tr>

              {/* Paradip */}
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Paradip (IOCL)
                </td>
                <td className="p-3 font-semibold text-slate-300">15.0 MTPA</td>
                <td className="p-3 text-slate-300">Russian Urals & African Sweet</td>
                <td className="p-3">
                  {(() => {
                    const exp = getRefineryExposure('Paradip');
                    return (
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase ${exp.color}`}>
                        {exp.level}
                      </span>
                    );
                  })()}
                </td>
                <td className="p-3 text-slate-300">Operating at 102% throughput</td>
              </tr>

              {/* Numaligarh */}
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Numaligarh (NRL)
                </td>
                <td className="p-3 font-semibold text-slate-300">3.0 MTPA</td>
                <td className="p-3 text-slate-300">Domestic Assam Crude</td>
                <td className="p-3">
                  {(() => {
                    const exp = getRefineryExposure('Numaligarh');
                    return (
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase ${exp.color}`}>
                        {exp.level}
                      </span>
                    );
                  })()}
                </td>
                <td className="p-3 text-emerald-400 font-semibold">100% Insulated (Domestic)</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
