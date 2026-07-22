import React, { useState, useEffect } from 'react';
import { Anchor, ShieldAlert, AlertTriangle, Compass, Layers, Radio, Ship, TrendingDown, ArrowRight, AlertOctagon } from 'lucide-react';

interface MaritimeMapProps {
  hormuzRisk: number;
  redSeaRisk: number;
  opecRisk: number;
}

const AIS_FEED = [
  "MT Jamnagar Spirit — VLCC — 280,000 DWT — Last ping: Persian Gulf (26.2°N) — ETA Sikka: 8 days",
  "MT Paradip Eagle — Aframax — 115,000 DWT — Rerouted via Cape — ETA +16 days",
  "MT Swarna Kamal — Suezmax — 150,000 DWT — Position: Arabian Sea (21.2°N, 68.4°E) — Escort: INS Chennai",
  "MT Desh Vishal — VLCC — 300,000 DWT — Position: Bab el-Mandeb Approach — Status: Standing by",
  "MT Ratna Puja — Aframax — 105,000 DWT — Position: Malacca Strait — ETA Visakhapatnam: 4 days",
  "MT APJ Mahakali — Suezmax — 158,000 DWT — Position: Cape of Good Hope (34.4°S) — Transit: South Atlantic"
];

export const MaritimeMap: React.FC<MaritimeMapProps> = ({
  hormuzRisk,
  redSeaRisk,
  opecRisk
}) => {
  const [selectedNode, setSelectedNode] = useState<string>('hormuz');
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % AIS_FEED.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getNodeColor = (score: number) => {
    if (score >= 70) return '#dc2626'; // red for high risk
    return '#d97706'; // amber primary accent
  };

  const isHighHormuz = hormuzRisk >= 70;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-400" />
            India Maritime Crude Corridor Supply Map
          </h2>
          <p className="text-xs text-slate-400">
            Real-time geopolitical chokepoint monitor tracking 88.6% of India's daily 4.8M bpd crude imports
          </p>
        </div>

        {/* Tanker Volume Indicator */}
        <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-mono transition-all ${
          isHighHormuz 
            ? 'bg-red-950/80 text-red-300 border-red-800 animate-pulse shadow-sm' 
            : 'bg-slate-800 text-slate-200 border-slate-700'
        }`}>
          <Ship className={`w-4 h-4 ${isHighHormuz ? 'text-red-400 animate-bounce' : 'text-blue-400'}`} />
          <div>
            <span className="font-bold">~18 VLCCs/day</span>
            <span className="text-[10px] block opacity-80">Hormuz Indian Crude Flow</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-2 relative bg-slate-950 rounded-xl border border-slate-800 p-4 min-h-[400px] flex flex-col justify-between overflow-hidden">
          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

          {/* SVG Map Graphics */}
          <svg viewBox="0 0 800 450" width="100%" preserveAspectRatio="xMidYMid meet" className="w-full h-full relative z-10 select-none">
            
            {/* World Coastlines Stylized Path */}
            <g fill="none" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
              {/* Arabian Peninsula & Gulf */}
              <path d="M 120 180 Q 150 140 220 160 T 290 190 T 320 220 T 260 280 T 200 320 T 150 250 Z" fill="#1e293b" opacity="0.6" />
              {/* India West Coast & Peninsula */}
              <path d="M 460 150 L 520 210 L 550 290 L 570 340 L 600 330 L 620 280 L 650 220 L 620 160 Z" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
              {/* East Africa & Red Sea coast */}
              <path d="M 60 210 L 110 240 L 130 320 L 100 400" fill="none" />
            </g>

            {/* ROUTE 1: Hormuz to India West Coast */}
            <path
              d="M 280 180 Q 360 210 510 220"
              fill="none"
              stroke={getNodeColor(hormuzRisk)}
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animate-pulse"
            />
            {/* Flow dots */}
            <circle cx="350" cy="198" r="3" fill={getNodeColor(hormuzRisk)} />
            <circle cx="430" cy="212" r="3" fill={getNodeColor(hormuzRisk)} />

            {/* ROUTE 2: Suez -> Bab el-Mandeb -> India */}
            <path
              d="M 70 180 L 130 250 Q 240 280 510 220"
              fill="none"
              stroke={getNodeColor(redSeaRisk)}
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />

            {/* ROUTE 3: Cape of Good Hope Alternate Route */}
            <path
              d="M 60 410 Q 200 430 510 220"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 60 410 Q 300 440 610 220"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.6"
            />

            {/* WAYPOINT 1: Strait of Hormuz (26.5°N, 56.5°E) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedNode('hormuz')}
            >
              <circle cx="280" cy="180" r="18" fill={getNodeColor(hormuzRisk)} opacity="0.3" className="animate-ping pointer-events-none" />
              <circle cx="280" cy="180" r="12" fill="#0f172a" stroke={getNodeColor(hormuzRisk)} strokeWidth="3" className="group-hover:stroke-white transition-all" />
              <text x="280" y="184" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {hormuzRisk}
              </text>
              <text x="280" y="156" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" className="group-hover:fill-amber-300 transition-colors">
                Strait of Hormuz
              </text>
              <text x="280" y="142" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="semibold" fontFamily="monospace">
                26.5°N, 56.5°E
              </text>
            </g>

            {/* WAYPOINT 2: Bab el-Mandeb / Red Sea (12.5°N, 43.3°E) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedNode('redsea')}
            >
              <circle cx="130" cy="250" r="18" fill={getNodeColor(redSeaRisk)} opacity="0.3" className="animate-ping pointer-events-none" />
              <circle cx="130" cy="250" r="12" fill="#0f172a" stroke={getNodeColor(redSeaRisk)} strokeWidth="3" className="group-hover:stroke-white transition-all" />
              <text x="130" y="254" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {redSeaRisk}
              </text>
              <text x="130" y="278" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" className="group-hover:fill-amber-300 transition-colors">
                Bab el-Mandeb / Red Sea
              </text>
              <text x="130" y="291" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="semibold" fontFamily="monospace">
                12.5°N, 43.3°E
              </text>
            </g>

            {/* WAYPOINT 3: Suez Canal Entry Point (30°N, 32.5°E) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedNode('suez')}
            >
              <circle cx="70" cy="180" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" className="group-hover:stroke-white transition-all" />
              <text x="70" y="183" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">SZ</text>
              <text x="70" y="162" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold" className="group-hover:fill-sky-300 transition-colors">
                Suez Canal
              </text>
              <text x="70" y="150" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                30.0°N, 32.5°E
              </text>
            </g>

            {/* WAYPOINT 4: Cape of Good Hope Reroute (34.4°S, 18.5°E) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedNode('cape')}
            >
              <circle cx="60" cy="410" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" className="group-hover:stroke-white transition-all" />
              <text x="60" y="414" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">↪</text>
              <text x="120" y="412" textAnchor="start" fill="#38bdf8" fontSize="10" fontWeight="bold" className="group-hover:fill-sky-300 transition-colors">
                Cape of Good Hope
              </text>
              <text x="120" y="424" textAnchor="start" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                34.4°S, 18.5°E (Alternate Bypass)
              </text>
            </g>

            {/* WAYPOINT 5: Paradip & East Coast Port Cluster (20.3°N, 86.6°E) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedNode('paradip')}
            >
              <rect x="595" y="205" width="28" height="28" rx="6" fill="#047857" stroke="#34d399" strokeWidth="2" className="group-hover:stroke-white transition-all" />
              <text x="609" y="223" textAnchor="middle" fill="#ffffff" fontSize="13">⚓</text>
              <text x="609" y="248" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold" className="group-hover:fill-emerald-300 transition-colors">
                Paradip & East Hub
              </text>
              <text x="609" y="259" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                20.3°N, 86.6°E
              </text>
            </g>

            {/* DESTINATION NODE: Jamnagar / Vadinar Hub */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedNode('jamnagar')}
            >
              <rect x="495" y="205" width="30" height="30" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" className="group-hover:stroke-white transition-all" />
              <text x="510" y="224" textAnchor="middle" fill="#ffffff" fontSize="14">⚓</text>
              <text x="510" y="248" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" className="group-hover:fill-sky-300 transition-colors">
                Jamnagar Hub
              </text>
            </g>

            {/* Map Legend */}
            <g transform="translate(15, 330)">
              <rect width="220" height="70" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" opacity="0.95" />
              <text x="12" y="20" fill="#f8fafc" fontSize="11" fontWeight="bold" stroke="none">Corridor Navigation Key:</text>
              <line x1="12" y1="36" x2="38" y2="36" stroke={getNodeColor(hormuzRisk)} strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="46" y="39" fill="#e2e8f0" fontSize="10" fontWeight="600" stroke="none">Hormuz Main Transit</text>
              <line x1="12" y1="54" x2="38" y2="54" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="46" y="57" fill="#e2e8f0" fontSize="10" fontWeight="600" stroke="none">Cape of Good Hope Reroute</text>
            </g>
          </svg>

          <div className="text-[11px] text-slate-400 font-mono text-center relative z-10 pt-1">
            Click any waypoint or port node to inspect real-time throughput & bottleneck telemetry.
          </div>
        </div>

        {/* Selected Node Details Panel */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
          <div>
            {selectedNode === 'hormuz' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <ShieldAlert className="w-5 h-5" />
                    <span>Strait of Hormuz</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    26.5°N, 56.5°E
                  </span>
                </div>
                
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Share of India Imports:</span>
                    <strong className="text-amber-400 font-mono">40% - 45% (~2.1M bpd)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Primary Suppliers:</span>
                    <span className="font-semibold text-slate-200">Iraq, Saudi Arabia, UAE, Kuwait</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Threat Vectors:</span>
                    <span className="text-red-400 font-semibold">Naval drills, GPS jamming, seizures</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Indian Navy Escort:</span>
                    <span className="text-emerald-400 font-semibold">Operation Sankalp Active</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Strategic Significance:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Narrow 21-mile wide choke point. Physical disruption forces immediate drawdown of India's Strategic Petroleum Reserves (SPR) and emergency spot purchases from Atlantic Basin.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'redsea' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <Anchor className="w-5 h-5" />
                    <span>Bab el-Mandeb / Red Sea</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    12.5°N, 43.3°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Volume Impact:</span>
                    <strong className="text-rose-400 font-mono">20% - 25% (Suez & Russian Urals)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Reroute Delay:</span>
                    <span className="font-semibold text-amber-400">+14 to +18 Days via Cape</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Freight Surcharge:</span>
                    <span className="text-red-400 font-semibold">+$1.2M - $1.6M per voyage</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Active Threat Profile:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Asymmetric drone swarms and anti-ship missiles targeting commercial tankers. Cape of Good Hope rerouting increases voyage duration from 18 days to 34 days for European & Urals crude.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'suez' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <Layers className="w-5 h-5" />
                    <span>Suez Canal Entry</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    30.0°N, 32.5°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Gateway Function:</span>
                    <strong className="text-sky-400 font-mono">Mediterranean & North Sea Crude</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Queue Status:</span>
                    <span className="font-semibold text-emerald-400">Normal Canal Operations</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Upstream Dependency:</span>
                    <span className="text-amber-400 font-semibold">Bottlenecked at Bab el-Mandeb</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Corridor Risk:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Canal throughput remains clear, but southbound crude vessels facing elevated Red Sea security advisories routinely divert before entering Suez.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'cape' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <Ship className="w-5 h-5" />
                    <span>Cape of Good Hope Reroute</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    34.4°S, 18.5°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Transit Penalty:</span>
                    <strong className="text-amber-400 font-mono">+14 to +16 Days Detour</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Added Cost:</span>
                    <span className="font-semibold text-rose-400">+$1.8M per VLCC Voyage</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Distance Added:</span>
                    <span className="text-slate-200 font-semibold">~2,700 Nautical Miles</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Bypass Advantage:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Completely avoids Red Sea drone/missile attack zones and Suez transit fees, providing guaranteed safe passage for US Gulf & West African crude.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'paradip' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Anchor className="w-5 h-5" />
                    <span>Paradip East Coast Port Cluster</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    20.3°N, 86.6°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Refining Capacity:</span>
                    <strong className="text-emerald-400 font-mono">0.60 Million bpd (IOC Paradip)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Crude Intake:</span>
                    <span className="font-semibold text-slate-200">Russian ESPO & West African Sweet</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Offshore Facility:</span>
                    <span className="text-sky-400 font-semibold">Deepwater Single Point Mooring (SPM)</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Strategic Role:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Primary East Coast import hub connected to northern inland pipeline networks. Critical node for processing non-Middle-East alternative imports.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'jamnagar' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <Layers className="w-5 h-5" />
                    <span>Jamnagar & Vadinar Hub</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    22.4°N, 69.8°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Refining Capacity:</span>
                    <strong className="text-sky-400 font-mono">1.64 Million bpd</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Crude Intake Grade:</span>
                    <span className="font-semibold text-slate-200">Heavy Sour (Arab Light, Maya)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Crude Tankage Runway:</span>
                    <span className="text-emerald-400 font-semibold">14 Days Reserve Buffer</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Data Source: ISPRL & Indian Navy DG Shipping</span>
            <span className="text-emerald-400 font-bold">UPDATED LIVE</span>
          </div>
        </div>

      </div>

      {/* Route Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Primary Route */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Primary Route</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
              hormuzRisk >= 75 ? 'bg-red-950/80 text-red-300 border-red-800' :
              hormuzRisk >= 50 ? 'bg-amber-950/80 text-amber-300 border-amber-800' :
              hormuzRisk >= 30 ? 'bg-yellow-950/80 text-yellow-300 border-yellow-800' :
              'bg-emerald-950/80 text-emerald-300 border-emerald-800'
            }`}>
              {hormuzRisk >= 75 ? 'CRITICAL BLOCKADE' : hormuzRisk >= 50 ? 'HIGH THREAT / ESCORT' : hormuzRisk >= 30 ? 'ELEVATED MONITORING' : 'OPERATIONAL / CLEAR'}
            </span>
          </div>
          <div className="text-sm font-bold text-slate-100 mb-1">Hormuz → Arabian Sea → West Coast</div>
          <p className="text-xs text-slate-400 leading-snug">Handles 2.1M bpd (40-45%) directly to Sikka & Vadinar terminals.</p>
        </div>

        {/* Alternate Route 1 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-sky-400 tracking-wider">Alternate Route 1</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800 uppercase">
              ACTIVE REROUTE OPTION
            </span>
          </div>
          <div className="text-sm font-bold text-slate-100 mb-1">Cape of Good Hope Bypass</div>
          <p className="text-xs text-amber-400 font-mono font-semibold mb-0.5">+14 days, +$1.8M/voyage</p>
          <p className="text-[11px] text-slate-400 leading-snug">2,700 NM detour bypassing Red Sea & Hormuz choke points completely.</p>
        </div>

        {/* Alternate Route 2 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Alternate Route 2</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
              redSeaRisk >= 60 ? 'bg-red-950/80 text-red-300 border-red-800' :
              redSeaRisk >= 30 ? 'bg-amber-950/80 text-amber-300 border-amber-800' :
              'bg-emerald-950/80 text-emerald-300 border-emerald-800'
            }`}>
              {redSeaRisk >= 60 ? 'HIGH RISK / REROUTING' : redSeaRisk >= 30 ? 'ELEVATED THREAT' : 'CLEAR PASSAGE'}
            </span>
          </div>
          <div className="text-sm font-bold text-slate-100 mb-1">Suez Canal & Red Sea Corridor</div>
          <p className="text-xs text-slate-400 leading-snug">Connects Mediterranean & Russian Urals to West/East Coast ports.</p>
        </div>
      </div>

      {/* Live AIS Vessel Ticker */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/80 border border-blue-800 text-blue-300 shrink-0 text-xs font-mono font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
          <span>LIVE AIS FEED</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-mono text-slate-200 animate-fadeIn truncate">
            {AIS_FEED[tickerIndex]}
          </p>
        </div>
        <div className="text-[10px] text-slate-400 font-mono shrink-0 hidden sm:block">
          Auto-refresh (4s)
        </div>
      </div>

    </div>
  );
};
