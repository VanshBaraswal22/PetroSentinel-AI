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
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-900" />
            India Maritime Crude Corridor Supply Map
          </h2>
          <p className="text-xs text-slate-500">
            Real-time geopolitical chokepoint monitor tracking 88.6% of India's daily 4.8M bpd crude imports
          </p>
        </div>

        {/* Tanker Volume Indicator */}
        <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-mono transition-all ${
          isHighHormuz 
            ? 'bg-red-50 text-red-700 border-red-200 animate-pulse shadow-sm' 
            : 'bg-slate-100 text-slate-800 border-slate-200'
        }`}>
          <Ship className={`w-4 h-4 ${isHighHormuz ? 'text-red-600 animate-bounce' : 'text-blue-900'}`} />
          <div>
            <span className="font-bold">~18 VLCCs/day</span>
            <span className="text-[10px] block opacity-80">Hormuz Indian Crude Flow</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-2 relative bg-slate-50 rounded-xl border border-slate-200 p-4 min-h-[400px] flex flex-col justify-between overflow-hidden">
          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

          {/* SVG Map Graphics */}
          <svg viewBox="0 0 800 450" width="100%" preserveAspectRatio="xMidYMid meet" className="w-full h-full relative z-10 select-none">
            
            {/* World Coastlines Stylized Path */}
            <g fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
              {/* Arabian Peninsula & Gulf */}
              <path d="M 120 180 Q 150 140 220 160 T 290 190 T 320 220 T 260 280 T 200 320 T 150 250 Z" fill="#e2e8f0" opacity="0.6" />
              {/* India West Coast & Peninsula */}
              <path d="M 460 150 L 520 210 L 550 290 L 570 340 L 600 330 L 620 280 L 650 220 L 620 160 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
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
              stroke="#0284c7"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 60 410 Q 300 440 610 220"
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.6"
            />

            {/* WAYPOINT 1: Strait of Hormuz (26.5°N, 56.5°E) */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedNode('hormuz')}
            >
              <circle cx="280" cy="180" r="18" fill={getNodeColor(hormuzRisk)} opacity="0.2" className="animate-ping" />
              <circle cx="280" cy="180" r="12" fill="#ffffff" stroke={getNodeColor(hormuzRisk)} strokeWidth="3" />
              <text x="280" y="184" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {hormuzRisk}
              </text>
              <text x="280" y="156" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                Strait of Hormuz
              </text>
              <text x="280" y="142" textAnchor="middle" fill="#d97706" fontSize="9" fontWeight="semibold" fontFamily="monospace">
                26.5°N, 56.5°E
              </text>
            </g>

            {/* WAYPOINT 2: Bab el-Mandeb / Red Sea (12.5°N, 43.3°E) */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedNode('redsea')}
            >
              <circle cx="130" cy="250" r="18" fill={getNodeColor(redSeaRisk)} opacity="0.2" className="animate-ping" />
              <circle cx="130" cy="250" r="12" fill="#ffffff" stroke={getNodeColor(redSeaRisk)} strokeWidth="3" />
              <text x="130" y="254" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {redSeaRisk}
              </text>
              <text x="130" y="278" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                Bab el-Mandeb / Red Sea
              </text>
              <text x="130" y="291" textAnchor="middle" fill="#d97706" fontSize="9" fontWeight="semibold" fontFamily="monospace">
                12.5°N, 43.3°E
              </text>
            </g>

            {/* WAYPOINT 3: Suez Canal Entry Point (30°N, 32.5°E) */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedNode('suez')}
            >
              <circle cx="70" cy="180" r="10" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
              <text x="70" y="183" textAnchor="middle" fill="#0284c7" fontSize="8" fontWeight="bold">SZ</text>
              <text x="70" y="162" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                Suez Canal
              </text>
              <text x="70" y="150" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
                30.0°N, 32.5°E
              </text>
            </g>

            {/* WAYPOINT 4: Cape of Good Hope Reroute (34.4°S, 18.5°E) */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedNode('cape')}
            >
              <circle cx="60" cy="410" r="12" fill="#ffffff" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
              <text x="60" y="414" textAnchor="middle" fill="#0284c7" fontSize="9" fontWeight="bold">↪</text>
              <text x="120" y="412" textAnchor="start" fill="#0284c7" fontSize="10" fontWeight="bold">
                Cape of Good Hope
              </text>
              <text x="120" y="424" textAnchor="start" fill="#64748b" fontSize="8" fontFamily="monospace">
                34.4°S, 18.5°E (Alternate Bypass)
              </text>
            </g>

            {/* WAYPOINT 5: Paradip & East Coast Port Cluster (20.3°N, 86.6°E) */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedNode('paradip')}
            >
              <rect x="595" y="205" width="28" height="28" rx="6" fill="#059669" stroke="#10b981" strokeWidth="2" />
              <text x="609" y="223" textAnchor="middle" fill="#ffffff" fontSize="13">⚓</text>
              <text x="609" y="248" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">
                Paradip & East Hub
              </text>
              <text x="609" y="259" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
                20.3°N, 86.6°E
              </text>
            </g>

            {/* DESTINATION NODE: Jamnagar / Vadinar Hub */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedNode('jamnagar')}
            >
              <rect x="495" y="205" width="30" height="30" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="510" y="224" textAnchor="middle" fill="#ffffff" fontSize="14">⚓</text>
              <text x="510" y="248" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">
                Jamnagar Hub
              </text>
            </g>

            {/* Map Legend */}
            <g transform="translate(15, 335)" fill="#ffffff" stroke="#e2e8f0">
              <rect width="210" height="60" rx="6" opacity="0.95" />
              <text x="10" y="16" fill="#0f172a" fontSize="9" fontWeight="bold">Corridor Navigation Key:</text>
              <line x1="10" y1="28" x2="35" y2="28" stroke={getNodeColor(hormuzRisk)} strokeWidth="2" strokeDasharray="3 2" />
              <text x="42" y="31" fill="#475569" fontSize="8">Hormuz Main Transit</text>
              <line x1="10" y1="44" x2="35" y2="44" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
              <text x="42" y="47" fill="#475569" fontSize="8">Cape of Good Hope Reroute</text>
            </g>
          </svg>

          <div className="text-[11px] text-slate-500 font-mono text-center relative z-10 pt-1">
            Click any waypoint or port node to inspect real-time throughput & bottleneck telemetry.
          </div>
        </div>

        {/* Selected Node Details Panel */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col justify-between">
          <div>
            {selectedNode === 'hormuz' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-amber-700 font-bold">
                    <ShieldAlert className="w-5 h-5" />
                    <span>Strait of Hormuz</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    26.5°N, 56.5°E
                  </span>
                </div>
                
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Share of India Imports:</span>
                    <strong className="text-amber-700 font-mono">40% - 45% (~2.1M bpd)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Primary Suppliers:</span>
                    <span className="font-semibold text-slate-800">Iraq, Saudi Arabia, UAE, Kuwait</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Threat Vectors:</span>
                    <span className="text-red-600 font-semibold">Naval drills, GPS jamming, seizures</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Indian Navy Escort:</span>
                    <span className="text-emerald-700 font-semibold">Operation Sankalp Active</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Strategic Significance:</span>
                  <p className="text-slate-700 leading-relaxed">
                    Narrow 21-mile wide choke point. Physical disruption forces immediate drawdown of India's Strategic Petroleum Reserves (SPR) and emergency spot purchases from Atlantic Basin.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'redsea' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-rose-600 font-bold">
                    <Anchor className="w-5 h-5" />
                    <span>Bab el-Mandeb / Red Sea</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    12.5°N, 43.3°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Volume Impact:</span>
                    <strong className="text-rose-700 font-mono">20% - 25% (Suez & Russian Urals)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Reroute Delay:</span>
                    <span className="font-semibold text-amber-700">+14 to +18 Days via Cape</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Freight Surcharge:</span>
                    <span className="text-red-600 font-semibold">+$1.2M - $1.6M per voyage</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Active Threat Profile:</span>
                  <p className="text-slate-700 leading-relaxed">
                    Asymmetric drone swarms and anti-ship missiles targeting commercial tankers. Cape of Good Hope rerouting increases voyage duration from 18 days to 34 days for European & Urals crude.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'suez' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-sky-700 font-bold">
                    <Layers className="w-5 h-5" />
                    <span>Suez Canal Entry</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    30.0°N, 32.5°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Gateway Function:</span>
                    <strong className="text-sky-700 font-mono">Mediterranean & North Sea Crude</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Queue Status:</span>
                    <span className="font-semibold text-emerald-700">Normal Canal Operations</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Upstream Dependency:</span>
                    <span className="text-amber-700 font-semibold">Bottlenecked at Bab el-Mandeb</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Corridor Risk:</span>
                  <p className="text-slate-700 leading-relaxed">
                    Canal throughput remains clear, but southbound crude vessels facing elevated Red Sea security advisories routinely divert before entering Suez.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'cape' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-sky-700 font-bold">
                    <Ship className="w-5 h-5" />
                    <span>Cape of Good Hope Reroute</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    34.4°S, 18.5°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Transit Penalty:</span>
                    <strong className="text-amber-700 font-mono">+14 to +16 Days Detour</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Added Cost:</span>
                    <span className="font-semibold text-rose-700">+$1.8M per VLCC Voyage</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Distance Added:</span>
                    <span className="text-slate-800 font-semibold">~2,700 Nautical Miles</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Bypass Advantage:</span>
                  <p className="text-slate-700 leading-relaxed">
                    Completely avoids Red Sea drone/missile attack zones and Suez transit fees, providing guaranteed safe passage for US Gulf & West African crude.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'paradip' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Anchor className="w-5 h-5" />
                    <span>Paradip East Coast Port Cluster</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    20.3°N, 86.6°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Refining Capacity:</span>
                    <strong className="text-emerald-700 font-mono">0.60 Million bpd (IOC Paradip)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Crude Intake:</span>
                    <span className="font-semibold text-slate-800">Russian ESPO & West African Sweet</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Offshore Facility:</span>
                    <span className="text-sky-700 font-semibold">Deepwater Single Point Mooring (SPM)</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Strategic Role:</span>
                  <p className="text-slate-700 leading-relaxed">
                    Primary East Coast import hub connected to northern inland pipeline networks. Critical node for processing non-Middle-East alternative imports.
                  </p>
                </div>
              </div>
            )}

            {selectedNode === 'jamnagar' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-sky-700 font-bold">
                    <Layers className="w-5 h-5" />
                    <span>Jamnagar & Vadinar Hub</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    22.4°N, 69.8°E
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Refining Capacity:</span>
                    <strong className="text-sky-700 font-mono">1.64 Million bpd</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Crude Intake Grade:</span>
                    <span className="font-semibold text-slate-800">Heavy Sour (Arab Light, Maya)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500">Crude Tankage Runway:</span>
                    <span className="text-emerald-700 font-semibold">14 Days Reserve Buffer</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>Data Source: ISPRL & Indian Navy DG Shipping</span>
            <span className="text-emerald-700 font-bold">UPDATED LIVE</span>
          </div>
        </div>

      </div>

      {/* Route Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Primary Route */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Primary Route</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
              hormuzRisk >= 75 ? 'bg-red-50 text-red-700 border-red-200' :
              hormuzRisk >= 50 ? 'bg-amber-50 text-amber-800 border-amber-200' :
              hormuzRisk >= 30 ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
              'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {hormuzRisk >= 75 ? 'CRITICAL BLOCKADE' : hormuzRisk >= 50 ? 'HIGH THREAT / ESCORT' : hormuzRisk >= 30 ? 'ELEVATED MONITORING' : 'OPERATIONAL / CLEAR'}
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 mb-1">Hormuz → Arabian Sea → West Coast</div>
          <p className="text-xs text-slate-500 leading-snug">Handles 2.1M bpd (40-45%) directly to Sikka & Vadinar terminals.</p>
        </div>

        {/* Alternate Route 1 */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-sky-700 tracking-wider">Alternate Route 1</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 uppercase">
              ACTIVE REROUTE OPTION
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 mb-1">Cape of Good Hope Bypass</div>
          <p className="text-xs text-amber-700 font-mono font-semibold mb-0.5">+14 days, +$1.8M/voyage</p>
          <p className="text-[11px] text-slate-500 leading-snug">2,700 NM detour bypassing Red Sea & Hormuz choke points completely.</p>
        </div>

        {/* Alternate Route 2 */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Alternate Route 2</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
              redSeaRisk >= 60 ? 'bg-red-50 text-red-700 border-red-200' :
              redSeaRisk >= 30 ? 'bg-amber-50 text-amber-800 border-amber-200' :
              'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {redSeaRisk >= 60 ? 'HIGH RISK / REROUTING' : redSeaRisk >= 30 ? 'ELEVATED THREAT' : 'CLEAR PASSAGE'}
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 mb-1">Suez Canal & Red Sea Corridor</div>
          <p className="text-xs text-slate-500 leading-snug">Connects Mediterranean & Russian Urals to West/East Coast ports.</p>
        </div>
      </div>

      {/* Live AIS Vessel Ticker */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 shrink-0 text-xs font-mono font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse text-blue-900" />
          <span>LIVE AIS FEED</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-mono text-slate-800 animate-fadeIn truncate">
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
