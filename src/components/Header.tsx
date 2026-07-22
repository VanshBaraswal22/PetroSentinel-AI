import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Radio, MapPin, Database, History, Code2, Activity, FileText, Layers, ChevronDown, ShieldCheck, Menu, X } from 'lucide-react';

export type TabType = 'processor' | 'map' | 'reserves' | 'impact' | 'logistics' | 'history' | 'api' | 'exec-brief' | 'architecture';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isApiOnline: boolean;
  overallScore: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isApiOnline,
  overallScore
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isDevOpen, setIsDevOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const devMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const utcString = now.toISOString().substring(11, 19);
      setCurrentTime(`${istString} IST (${utcString} UTC)`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (devMenuRef.current && !devMenuRef.current.contains(e.target as Node)) {
        setIsDevOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRiskBadgeColor = (score: number | null) => {
    if (score === null) return 'bg-slate-800 text-slate-400 rounded-full';
    if (score >= 70) return 'bg-red-600 text-white rounded-full animate-pulse';
    if (score >= 40) return 'bg-amber-600 text-white rounded-full';
    return 'bg-green-600 text-white rounded-full';
  };

  const isDevActive = ['architecture', 'api', 'history'].includes(activeTab);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setIsDevOpen(false);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Logo & Agency Info + Mobile Hamburger Header Row */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-lg bg-blue-900 border border-blue-700 flex items-center justify-center shadow-md">
                  <ShieldAlert className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900"></span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold tracking-widest uppercase bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50">
                    GOVT OF INDIA • MINISTRY OF PETROLEUM
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-slate-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> LIVE SIGNAL
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-extrabold text-slate-100 tracking-tight mt-0.5">
                  Energy Security & Maritime Disruption Monitor
                </h1>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 ml-2"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Key Metrics Header Stats - stacked / full width on mobile, inline on md+ */}
          <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-between md:justify-end">
            
            {/* Crude Dependency Stat */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 min-h-[44px]">
              <div className="text-left">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Crude Import Dep.</div>
                <div className="text-xs font-bold text-blue-300 font-mono">88.6%</div>
              </div>
            </div>

            {/* Overall Live Score Badge */}
            <div className={`px-3.5 py-1.5 flex items-center gap-2 transition-all min-h-[44px] ${getRiskBadgeColor(overallScore)}`}>
              <Activity className="w-4 h-4 shrink-0" />
              <div>
                <div className="text-xs uppercase font-bold tracking-wider opacity-90">Risk Index</div>
                <div className="text-xs font-mono font-extrabold">
                  {overallScore !== null ? `${overallScore} / 100` : 'AWAITING FEED'}
                </div>
              </div>
            </div>

            {/* System Time display - HIDDEN BELOW MD BREAKPOINT */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-right font-mono text-xs text-slate-300 hidden md:block min-h-[44px]">
              <div className="text-xs text-slate-400 uppercase font-semibold">System Time</div>
              <div className="text-xs">{currentTime || '00:00:00 IST'}</div>
            </div>

          </div>
        </div>

        {/* Navigation Tabs - Desktop (md+) Horizontal Tabs */}
        <div className="mt-3 hidden md:flex items-center justify-between border-t border-slate-800/80 pt-2.5">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleTabClick('processor')}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all min-h-[44px] ${
                activeTab === 'processor'
                  ? 'bg-[#1e3a8a] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <Radio className="w-4 h-4" />
              Live Signal
            </button>

            <button
              onClick={() => handleTabClick('map')}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all min-h-[44px] ${
                activeTab === 'map'
                  ? 'bg-[#1e3a8a] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Maritime Map
            </button>

            <button
              onClick={() => handleTabClick('reserves')}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all min-h-[44px] ${
                activeTab === 'reserves'
                  ? 'bg-[#1e3a8a] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              Reserves & Refineries
            </button>

            <button
              onClick={() => handleTabClick('impact')}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all min-h-[44px] ${
                activeTab === 'impact'
                  ? 'bg-[#1e3a8a] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <Activity className="w-4 h-4" />
              Scenario Impact
            </button>

            <button
              onClick={() => handleTabClick('exec-brief')}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all min-h-[44px] ${
                activeTab === 'exec-brief'
                  ? 'bg-[#1e3a8a] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              Exec Brief
            </button>
          </div>

          {/* Developer Dropdown Menu at Far Right */}
          <div className="relative shrink-0 ml-2" ref={devMenuRef}>
            <button
              onClick={() => setIsDevOpen(!isDevOpen)}
              className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-2 transition-all border min-h-[44px] ${
                isDevActive
                  ? 'bg-[#1e3a8a] text-white border-blue-700 shadow'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Code2 className="w-4 h-4 text-blue-300" />
              <span>Developer</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDevOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDevOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-1 z-50">
                <button
                  onClick={() => handleTabClick('architecture')}
                  className={`w-full px-3.5 py-2.5 text-left text-xs font-medium flex items-center gap-2.5 hover:bg-slate-800 min-h-[44px] ${
                    activeTab === 'architecture' ? 'text-blue-300 font-bold bg-slate-800/60' : 'text-slate-300'
                  }`}
                >
                  <Layers className="w-4 h-4 text-blue-400" />
                  System Architecture
                </button>

                <button
                  onClick={() => handleTabClick('api')}
                  className={`w-full px-3.5 py-2.5 text-left text-xs font-medium flex items-center gap-2.5 hover:bg-slate-800 font-mono min-h-[44px] ${
                    activeTab === 'api' ? 'text-blue-300 font-bold bg-slate-800/60' : 'text-slate-300'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-blue-400" />
                  API Documentation
                </button>

                <button
                  onClick={() => handleTabClick('history')}
                  className={`w-full px-3.5 py-2.5 text-left text-xs font-medium flex items-center gap-2.5 hover:bg-slate-800 min-h-[44px] ${
                    activeTab === 'history' ? 'text-blue-300 font-bold bg-slate-800/60' : 'text-slate-300'
                  }`}
                >
                  <History className="w-4 h-4 text-blue-400" />
                  Risk Logs & Audit
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Vertical Menu Overlay/Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => handleTabClick('processor')}
              className={`w-full px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-all min-h-[44px] ${
                activeTab === 'processor'
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'text-slate-300 bg-slate-800/60 hover:bg-slate-800'
              }`}
            >
              <Radio className="w-4 h-4 text-blue-400" />
              Live Signal Processor
            </button>

            <button
              onClick={() => handleTabClick('map')}
              className={`w-full px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-all min-h-[44px] ${
                activeTab === 'map'
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'text-slate-300 bg-slate-800/60 hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4 text-blue-400" />
              Maritime Map
            </button>

            <button
              onClick={() => handleTabClick('reserves')}
              className={`w-full px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-all min-h-[44px] ${
                activeTab === 'reserves'
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'text-slate-300 bg-slate-800/60 hover:bg-slate-800'
              }`}
            >
              <Database className="w-4 h-4 text-blue-400" />
              Reserves & Refineries
            </button>

            <button
              onClick={() => handleTabClick('impact')}
              className={`w-full px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-all min-h-[44px] ${
                activeTab === 'impact'
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'text-slate-300 bg-slate-800/60 hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4 text-blue-400" />
              Scenario Impact
            </button>

            <button
              onClick={() => handleTabClick('exec-brief')}
              className={`w-full px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-3 transition-all min-h-[44px] ${
                activeTab === 'exec-brief'
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'text-slate-300 bg-slate-800/60 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-400" />
              Exec Brief
            </button>

            <div className="pt-2 pb-1 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                Developer Tools
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => handleTabClick('architecture')}
                  className={`w-full px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all min-h-[44px] ${
                    activeTab === 'architecture'
                      ? 'bg-blue-900/60 text-blue-200 border border-blue-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Layers className="w-4 h-4 text-blue-400" />
                  System Architecture
                </button>

                <button
                  onClick={() => handleTabClick('api')}
                  className={`w-full px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all font-mono min-h-[44px] ${
                    activeTab === 'api'
                      ? 'bg-blue-900/60 text-blue-200 border border-blue-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-blue-400" />
                  API Documentation
                </button>

                <button
                  onClick={() => handleTabClick('history')}
                  className={`w-full px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all min-h-[44px] ${
                    activeTab === 'history'
                      ? 'bg-blue-900/60 text-blue-200 border border-blue-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <History className="w-4 h-4 text-blue-400" />
                  Risk Logs & Audit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Slim Context Stat Strip directly under Header - HIDDEN BELOW MD BREAKPOINT */}
      <div className="bg-slate-950/95 border-t border-slate-800 py-2 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-semibold text-slate-300 text-xs">
              India Energy Security Command
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 flex-wrap text-xs">
            <span>Import Dependency: <strong className="text-slate-200 font-extrabold">88.6%</strong></span>
            <span className="text-slate-700">•</span>
            <span>SPR Buffer: <strong className="text-slate-200 font-extrabold">5.33 MMT</strong></span>
            <span className="text-slate-700">•</span>
            <span>Corridors: <strong className="text-slate-200 font-semibold">Hormuz • Bab-el-Mandeb • OPEC+</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};
