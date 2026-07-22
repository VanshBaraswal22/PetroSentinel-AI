import React, { useState, useMemo } from 'react';
import { MacroImpact } from './MacroImpact';
import { LogisticsOptimizer } from './LogisticsOptimizer';
import { 
  Activity, 
  Route, 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  Database, 
  Factory, 
  Zap, 
  RotateCcw, 
  ShieldAlert,
  Droplets,
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';

interface ScenarioImpactViewProps {
  initialSubTab?: 'twin' | 'macro' | 'logistics';
}

export const ScenarioImpactView: React.FC<ScenarioImpactViewProps> = ({ initialSubTab = 'twin' }) => {
  const [subTab, setSubTab] = useState<'twin' | 'macro' | 'logistics'>(
    initialSubTab === 'macro' ? 'macro' : initialSubTab === 'logistics' ? 'logistics' : 'twin'
  );

  // Digital Twin Slider States
  const [hormuzCut, setHormuzCut] = useState<number>(40); // 0% to 100%
  const [redSeaCut, setRedSeaCut] = useState<number>(25); // 0% to 100%
  const [opecCut, setOpecCut] = useState<number>(1.5); // 0 to 5.0 M bpd

  // Preset Scenario Handlers
  const handlePresetHormuz = () => {
    setHormuzCut(75);
    setRedSeaCut(30);
    setOpecCut(2.0);
  };

  const handlePresetOpec = () => {
    setHormuzCut(10);
    setRedSeaCut(10);
    setOpecCut(3.0);
  };

  const handlePresetRedSea = () => {
    setHormuzCut(15);
    setRedSeaCut(85);
    setOpecCut(0.5);
  };

  const handleResetBaseline = () => {
    setHormuzCut(0);
    setRedSeaCut(0);
    setOpecCut(0.0);
  };

  // Live Calculations (Client-Side Instant Engine)
  const metrics = useMemo(() => {
    // Baseline constants
    const BASELINE_BRENT = 82.0; // $/bbl
    const TOTAL_IMPORTS_MBPD = 4.22; // 88% of 4.8M bpd total consumption
    const HORMUZ_SHARE_MBPD = 1.80; // 42.5% of imports
    const RED_SEA_SHARE_MBPD = 1.48; // 35% of imports
    const SPR_CAPACITY_BARRELS_M = 39.0; // 5.33 MMT (~39M barrels = 9.5 days cover)

    // Disrupted volumes
    const hormuzDisrupted = HORMUZ_SHARE_MBPD * (hormuzCut / 100);
    const redSeaDisrupted = RED_SEA_SHARE_MBPD * (redSeaCut / 100);
    const opecIndiaShareCut = opecCut * 0.18; // India takes ~18% of global OPEC export cuts

    const totalAffectedVolume = hormuzDisrupted + redSeaDisrupted + opecIndiaShareCut;

    // Net daily supply deficit (accounting for partial Red Sea Cape detour smoothing)
    const netDailyDeficit = 
      hormuzDisrupted * 1.0 + 
      redSeaDisrupted * 0.35 + 
      opecIndiaShareCut * 1.0;

    // Brent Price Surge calculation
    const priceSurgeDollar = 
      (hormuzCut * 0.48) + 
      (redSeaCut * 0.18) + 
      (opecCut * 12.50);
    
    const projectedBrent = BASELINE_BRENT + priceSurgeDollar;
    const priceSurgePct = (priceSurgeDollar / BASELINE_BRENT) * 100;

    // Pump Price Impact (Rs/litre) - ~$10/bbl = ~Rs 7.5/L
    const pumpImpactINR = (priceSurgeDollar / 10) * 7.5;

    // Days until SPR exhaustion
    let sprDaysToDepletion = 90; // Default safe cap
    if (netDailyDeficit > 0.01) {
      sprDaysToDepletion = Math.max(0.5, SPR_CAPACITY_BARRELS_M / netDailyDeficit);
    }

    // Refinery Exposures
    const refineries = [
      {
        name: 'Jamnagar (Reliance)',
        location: 'West Coast (Gujarat)',
        capacityMBPD: 1.40,
        type: 'Mega-Refinery (Heavy Sour)',
        exposureScore: Math.min(100, Math.round(hormuzCut * 0.85 + opecCut * 9 + redSeaCut * 0.1)),
        primarySource: 'Persian Gulf Crude (Saudi, Iraq, UAE)',
        riskNote: 'High vulnerability to Hormuz & OPEC sour crude cuts.'
      },
      {
        name: 'Mangalore (MRPL)',
        location: 'West Coast (Karnataka)',
        capacityMBPD: 0.30,
        type: 'Coastal Refinery (Medium Sour)',
        exposureScore: Math.min(100, Math.round(hormuzCut * 0.90 + opecCut * 6)),
        primarySource: 'Middle East Gulf & ISPRL Mangalore Padur Caverns',
        riskNote: 'Directly linked to ISPRL Padur cavern drawdown.'
      },
      {
        name: 'Kochi (BPCL)',
        location: 'West Coast (Kerala)',
        capacityMBPD: 0.31,
        type: 'Coastal Refinery (Sweet/Sour)',
        exposureScore: Math.min(100, Math.round(hormuzCut * 0.50 + redSeaCut * 0.45 + opecCut * 5)),
        primarySource: 'Red Sea Transits & Middle East Arabian Light',
        riskNote: 'Susceptible to Bab el-Mandeb Cape of Good Hope rerouting delays.'
      },
      {
        name: 'Paradip (IOCL)',
        location: 'East Coast (Odisha)',
        capacityMBPD: 0.30,
        type: 'Coastal Refinery (High Sulfur)',
        exposureScore: Math.min(100, Math.round(redSeaCut * 0.75 + opecCut * 6 + hormuzCut * 0.20)),
        primarySource: 'Urals, Mediterranean & West African Sweet',
        riskNote: 'Highly exposed to Red Sea lane disruptions & Russian ESPO diversion.'
      },
      {
        name: 'Numaligarh (NRL)',
        location: 'Inland (Assam)',
        capacityMBPD: 0.06,
        type: 'Inland Hydrocracker',
        exposureScore: Math.min(100, Math.round((netDailyDeficit / 4.22) * 35)),
        primarySource: 'Domestic Assam Fields & Paradip Pipeline Blend',
        riskNote: 'Minimal direct maritime risk; affected by national allocation rationing.'
      }
    ].sort((a, b) => b.exposureScore - a.exposureScore);

    // 30-Day SPR Drawdown Chart Data
    const chartData = [];
    for (let day = 0; day <= 30; day += 2) {
      const remainingBarrels = Math.max(0, SPR_CAPACITY_BARRELS_M - (netDailyDeficit * day));
      const remainingDaysCover = (remainingBarrels / 4.8); // Cover against total demand
      chartData.push({
        day: `Day ${day}`,
        barrels: Number(remainingBarrels.toFixed(1)),
        daysCover: Number(remainingDaysCover.toFixed(1))
      });
    }

    return {
      affectedVolumeMBPD: totalAffectedVolume,
      netDeficitMBPD: netDailyDeficit,
      projectedBrent,
      priceSurgeDollar,
      priceSurgePct,
      pumpImpactINR,
      sprDaysToDepletion,
      refineries,
      chartData
    };
  }, [hormuzCut, redSeaCut, opecCut]);

  return (
    <div className="space-y-6">
      
      {/* Sub-navigation bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl shadow-sm">
        <button
          onClick={() => setSubTab('twin')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] ${
            subTab === 'twin'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4 text-blue-300" />
          Supply Chain Digital Twin
        </button>

        <button
          onClick={() => setSubTab('macro')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] ${
            subTab === 'macro'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          AI Macro Shock Model
        </button>

        <button
          onClick={() => setSubTab('logistics')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] ${
            subTab === 'logistics'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
          }`}
        >
          <Route className="w-4 h-4" />
          Logistics Rerouting
        </button>
      </div>

      {/* Render selected view */}
      {subTab === 'macro' && <MacroImpact />}
      {subTab === 'logistics' && <LogisticsOptimizer />}

      {subTab === 'twin' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header & Preset Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-widest bg-blue-900 text-white px-2.5 py-0.5 rounded">
                    DIGITAL TWIN SIMULATOR
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    REAL-TIME CLIENT-SIDE STRESS TESTING
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
                  India Energy Supply Chain Stress Model
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Simulate chokepoint capacity cuts & OPEC quotas to compute immediate Brent price shocks, net crude import deficits, and SPR survival runways.
                </p>
              </div>

              {/* Preset Scenario Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider w-full lg:w-auto block lg:inline">
                  Preset Scenarios:
                </span>

                <button
                  onClick={handlePresetHormuz}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-red-950/60 text-red-300 border border-red-800/80 hover:bg-red-900/80 flex items-center gap-1.5 transition-all min-h-[44px]"
                >
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  Hormuz Partial Closure
                </button>

                <button
                  onClick={handlePresetOpec}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-amber-950/60 text-amber-300 border border-amber-800/80 hover:bg-amber-900/80 flex items-center gap-1.5 transition-all min-h-[44px]"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  OPEC+ Emergency Cut
                </button>

                <button
                  onClick={handlePresetRedSea}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-sky-950/60 text-sky-300 border border-sky-800/80 hover:bg-sky-900/80 flex items-center gap-1.5 transition-all min-h-[44px]"
                >
                  <Activity className="w-4 h-4 text-sky-400" />
                  Red Sea Suspension
                </button>

                <button
                  onClick={handleResetBaseline}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 flex items-center gap-1.5 transition-all min-h-[44px]"
                  title="Reset to normal operational baseline"
                >
                  <RotateCcw className="w-4 h-4 text-slate-300" />
                  Reset
                </button>
              </div>
            </div>

            {/* Slider Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2 border-t border-slate-800">
              
              {/* Slider A: Strait of Hormuz */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-200 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    Strait of Hormuz
                  </span>
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                    hormuzCut > 50 ? 'bg-red-600 text-white' : hormuzCut > 0 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {hormuzCut}% Cut
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={hormuzCut}
                  onChange={(e) => setHormuzCut(Number(e.target.value))}
                  className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>0% (Normal)</span>
                  <span>50%</span>
                  <span>100% (Blocked)</span>
                </div>
                <p className="text-xs text-slate-300 leading-tight">
                  Handles 1.80 M bpd (~42.5% of total Indian crude imports).
                </p>
              </div>

              {/* Slider B: Red Sea / Bab el-Mandeb */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-200 flex items-center gap-1.5">
                    <Route className="w-4 h-4 text-sky-400" />
                    Red Sea / Bab el-Mandeb
                  </span>
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                    redSeaCut > 50 ? 'bg-red-600 text-white' : redSeaCut > 0 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {redSeaCut}% Cut
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={redSeaCut}
                  onChange={(e) => setRedSeaCut(Number(e.target.value))}
                  className="w-full accent-sky-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>0% (Clear)</span>
                  <span>50%</span>
                  <span>100% (Suspended)</span>
                </div>
                <p className="text-xs text-slate-300 leading-tight">
                  Handles 1.48 M bpd (~35% of imports; forces +14d Cape detour).
                </p>
              </div>

              {/* Slider C: OPEC+ Supply Cut */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-200 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    OPEC+ Global Supply Cut
                  </span>
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                    opecCut > 2.0 ? 'bg-red-600 text-white' : opecCut > 0 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {opecCut.toFixed(1)} M bpd
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={opecCut}
                  onChange={(e) => setOpecCut(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>0.0 M bpd</span>
                  <span>2.5 M bpd</span>
                  <span>5.0 M bpd</span>
                </div>
                <p className="text-xs text-slate-300 leading-tight">
                  Global quota reduction impacting Saudi, Iraq, and UAE term supplies.
                </p>
              </div>

            </div>
          </div>

          {/* Computed Key Indicators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Projected Brent Price */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs font-bold uppercase tracking-wider">Projected Brent Price</span>
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
                ${metrics.projectedBrent.toFixed(2)}
                <span className="text-xs text-slate-300 font-normal"> /bbl</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className={`font-bold font-mono ${metrics.priceSurgeDollar > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {metrics.priceSurgeDollar >= 0 ? '+' : ''}${metrics.priceSurgeDollar.toFixed(2)} ({metrics.priceSurgePct >= 0 ? '+' : ''}{metrics.priceSurgePct.toFixed(1)}%)
                </span>
                <span className="text-slate-400">vs $82 base</span>
              </div>
              <p className="text-xs text-slate-300 border-t border-slate-800 pt-2 mt-2">
                Est. pump price impact: <strong className="text-slate-200 font-mono">+₹{metrics.pumpImpactINR.toFixed(1)}/L</strong>
              </p>
            </div>

            {/* KPI 2: Affected Import Volume */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs font-bold uppercase tracking-wider">Affected Import Volume</span>
                <Droplets className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
                {metrics.affectedVolumeMBPD.toFixed(2)}
                <span className="text-xs text-slate-300 font-normal"> M bpd</span>
              </div>
              <div className="text-xs text-slate-300 pt-1">
                <strong className="text-blue-400 font-mono">
                  {((metrics.affectedVolumeMBPD / 4.22) * 100).toFixed(1)}%
                </strong> of total 4.22M bpd import stream
              </div>
              <p className="text-xs text-slate-300 border-t border-slate-800 pt-2 mt-2">
                Hormuz + Red Sea + OPEC quota disruptions combined.
              </p>
            </div>

            {/* KPI 3: Net Daily Supply Deficit */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs font-bold uppercase tracking-wider">Net Daily Crude Deficit</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${metrics.netDeficitMBPD > 1.0 ? 'text-red-400' : 'text-slate-100'}`}>
                {metrics.netDeficitMBPD.toFixed(2)}
                <span className="text-xs text-slate-300 font-normal"> M bpd</span>
              </div>
              <div className="text-xs text-slate-300 pt-1">
                Net physical deficit requiring drawdown or spot substitution
              </div>
              <p className="text-xs text-slate-300 border-t border-slate-800 pt-2 mt-2">
                Equivalent to ~{Math.round(metrics.netDeficitMBPD * 1000)}k barrels/day missing.
              </p>
            </div>

            {/* KPI 4: SPR Exhaustion Runway */}
            <div className={`border rounded-xl p-5 shadow-sm space-y-1 transition-all ${
              metrics.sprDaysToDepletion <= 5
                ? 'bg-red-950/50 border-red-800/80'
                : metrics.sprDaysToDepletion <= 10
                ? 'bg-amber-950/50 border-amber-800/80'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs font-bold uppercase tracking-wider">SPR Exhaustion Runway</span>
                <Database className="w-4 h-4 text-blue-400" />
              </div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                metrics.sprDaysToDepletion <= 5 ? 'text-red-400' : metrics.sprDaysToDepletion <= 10 ? 'text-amber-300' : 'text-slate-100'
              }`}>
                {metrics.sprDaysToDepletion >= 90 ? '> 90 Days' : `${metrics.sprDaysToDepletion.toFixed(1)} Days`}
              </div>
              <div className="text-xs font-semibold text-slate-300 pt-1">
                {metrics.sprDaysToDepletion < 9.5 ? 'CRITICAL: Below 9.5-day ISPRL baseline' : 'Within normal ISPRL buffer guidelines'}
              </div>
              <p className="text-xs text-slate-300 border-t border-slate-800 pt-2 mt-2">
                Total ISPRL cavern stock: 39.0 Million Barrels (5.33 MMT).
              </p>
            </div>

          </div>

          {/* Main Visual Dual Panel: Chart + Refinery Exposures */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left/Main Column: Real-Time SPR Drawdown Chart */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    30-Day Strategic Petroleum Reserve (SPR) Drawdown Curve
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    ISPRL Buffer Projection
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Projected remaining underground reserves (Padur, Visakhapatnam, Mangalore) assuming no immediate non-Gulf spot replacement.
                </p>
              </div>

              {/* Responsive Chart */}
              <div className="w-full h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sprGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <YAxis domain={[0, 40]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderRadius: '8px', border: '1px solid #1e293b', color: '#f8fafc', fontSize: '12px' }}
                      formatter={(value: any) => [`${value} M bbls`, 'SPR Inventory']}
                    />
                    <ReferenceLine y={12.3} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '3-Day Emergency Limit', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }} />
                    <Area type="monotone" dataKey="barrels" stroke="#60a5fa" strokeWidth={2.5} fillOpacity={1} fill="url(#sprGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span>
                  <span>Active Simulation Curve</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-red-500 inline-block"></span>
                  <span>National Emergency Cabinet Threshold</span>
                </div>
              </div>
            </div>

            {/* Right Column: Refinery Exposure Breakdown */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <Factory className="w-4 h-4 text-blue-400" />
                  Indian Refinery Vulnerability Ranking
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                Exposure scores recalculated live based on crude sulfur types, regional port logistics, and cavern linkages.
              </p>

              <div className="space-y-3.5">
                {metrics.refineries.map((ref) => (
                  <div key={ref.name} className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-100">{ref.name}</span>
                        <span className="text-xs text-slate-300 ml-2">({ref.capacityMBPD} M bpd)</span>
                      </div>
                      <span className={`text-xs font-black px-2 py-0.5 rounded ${
                        ref.exposureScore >= 70 ? 'bg-red-600 text-white' : ref.exposureScore >= 40 ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {ref.exposureScore}% Exposed
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          ref.exposureScore >= 70 ? 'bg-red-500' : ref.exposureScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${ref.exposureScore}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>{ref.location}</span>
                      <span className="truncate max-w-[180px]" title={ref.primarySource}>{ref.primarySource}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 4: Operational Mitigation Directives */}
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-5 md:p-6 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Automated Command Directives (Simulated Response)
              </h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
              <li className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <strong className="text-slate-100 block mb-1">1. Padur & Mangalore Drawdown</strong>
                If deficit exceeds 1.0M bpd, trigger Phase-1 ISPRL cavern valve opening at 120,000 bpd to supply MRPL and Kochi refineries.
              </li>
              <li className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <strong className="text-slate-100 block mb-1">2. Spot Tanker Rerouting</strong>
                Contract non-Gulf Atlantic basin cargoes (West Africa Bonny Light / US WTI Midland) via Singapore trading desks to dock at Sikka terminal.
              </li>
              <li className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <strong className="text-slate-100 block mb-1">3. Hydrocracker Optimization</strong>
                Adjust Jamnagar and Paradip refinery run-rates to process high-sulfur substitutes while maintaining domestic diesel output buffers.
              </li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
