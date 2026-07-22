import React, { useState } from 'react';
import { Radio, AlertTriangle, Copy, Check, Sparkles, RefreshCw, Terminal, ArrowRight, ShieldAlert, Cpu, Newspaper, Ship, Scale, TrendingUp, Layers } from 'lucide-react';
import { SAMPLE_FEEDS } from '../data/sampleFeeds';
import { RiskAnalysisResponse, SampleNewsFeed } from '../types';
import { RiskGauge } from './RiskGauge';

interface SignalProcessorProps {
  currentResult: RiskAnalysisResponse | null;
  onAnalyze: (text: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const SignalProcessor: React.FC<SignalProcessorProps> = ({
  currentResult,
  onAnalyze,
  isLoading,
  error
}) => {
  const [inputText, setInputText] = useState<string>(SAMPLE_FEEDS[0].text);
  const [selectedFeedId, setSelectedFeedId] = useState<string>(SAMPLE_FEEDS[0].id);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'raw_json'>('dashboard');

  const handleSelectSample = (feed: SampleNewsFeed) => {
    setSelectedFeedId(feed.id);
    setInputText(feed.text);
  };

  const handleRunAnalysis = async () => {
    if (!inputText.trim()) return;
    await onAnalyze(inputText);
  };

  // Exact 5-field JSON payload requested by user prompt
  const rawFormattedJson = currentResult ? JSON.stringify({
    overall_risk_score: currentResult.overall_risk_score,
    hormuz_risk: currentResult.hormuz_risk,
    red_sea_risk: currentResult.red_sea_risk,
    opec_risk: currentResult.opec_risk,
    primary_threat_vector: currentResult.primary_threat_vector,
    risk_momentum: currentResult.risk_momentum,
    affected_refineries: currentResult.affected_refineries
  }, null, 2) : '';

  const handleCopyJson = () => {
    if (!rawFormattedJson) return;
    navigator.clipboard.writeText(rawFormattedJson);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const getSummarySentence = (result: RiskAnalysisResponse) => {
    if (result.summary_sentence) return result.summary_sentence;
    const score = result.overall_risk_score;
    const level = score >= 70 ? 'HIGH' : score >= 40 ? 'MODERATE' : 'LOW';
    let driver = 'tensions across key energy transit corridors';
    if (result.hormuz_risk >= result.red_sea_risk && result.hormuz_risk >= result.opec_risk) {
      driver = 'tensions in the Strait of Hormuz';
    } else if (result.red_sea_risk >= result.opec_risk) {
      driver = 'threats in the Red Sea / Bab el-Mandeb';
    } else if (result.opec_risk > 30) {
      driver = 'OPEC+ supply targets and quota restrictions';
    }
    return `India imports 88% of its crude oil. Right now, disruption risk is ${level} (${score}/100), driven mainly by ${driver}.`;
  };

  // Client-side detection of intelligence sources in input text
  const lowerText = inputText.toLowerCase();
  const detectedSources = [
    {
      id: 'news',
      label: 'News/Wire Feed',
      icon: Newspaper,
      isActive: lowerText.length > 0 && (
        ['breaking', 'alert', 'report', 'reuters', 'bloomberg', 'news', 'press', 'briefing', 'statement', 'official', 'media', 'intelligence', 'confirmed', 'ukmto'].some(k => lowerText.includes(k)) || lowerText.length > 10
      ),
      subLabel: 'Live Media Wire'
    },
    {
      id: 'ais',
      label: 'Simulated AIS Vessel Data',
      icon: Ship,
      isActive: ['ais', 'vessel', 'tanker', 'vlcc', 'ship', 'maritime', 'transit', 'nautical', 'speedboats', 'position', 'gps', 'tracking', 'cargo', 'bunkers', 'escort', 'sea', 'strait', 'corridor', 'fleet', 'houthi', 'naval', 'qeshm', 'island', 'liberian'].some(k => lowerText.includes(k)),
      subLabel: 'Corridor AIS Tracking'
    },
    {
      id: 'sanctions',
      label: 'Sanctions Registry',
      icon: Scale,
      isActive: ['sanction', 'ofac', 'treasury', 'g7', 'price cap', 'secondary', 'restriction', 'embargo', 'policy', 'enforcement', 'ban', 'prohibit', 'compliance', 'legal', 'iranian', 'venezuela', 'russian'].some(k => lowerText.includes(k)),
      subLabel: 'G7/OFAC Registry'
    },
    {
      id: 'commodity',
      label: 'Commodity Price Feed',
      icon: TrendingUp,
      isActive: ['brent', 'crude', 'osp', 'price', 'barrel', 'bbl', 'spot', 'benchmark', 'premium', 'discount', 'opec', 'market', 'quota', 'cost', 'freight', '$', '%', 'surged', 'hike'].some(k => lowerText.includes(k)),
      subLabel: 'ICE Brent / Spot Feed'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Ingestion Control Center */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200">
              <Cpu className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">Signal Ingestion Feed</h2>
              <p className="text-xs text-slate-600 mt-1">
                Paste shipping alerts or geopolitical news to calculate disruption scores.
              </p>
            </div>
          </div>

          {/* Preset Buttons Header */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-700 font-bold uppercase tracking-wider mr-1">Presets:</span>
            {SAMPLE_FEEDS.map((feed) => (
              <button
                key={feed.id}
                onClick={() => handleSelectSample(feed)}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-all border min-h-[44px] flex items-center justify-center ${
                  selectedFeedId === feed.id
                    ? 'bg-[#1e3a8a] text-white border-blue-900 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {feed.category}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area Input */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSelectedFeedId('custom');
              }}
              rows={3}
              placeholder="Paste raw news feeds, shipping alerts, or geopolitical intelligence text here..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white font-mono leading-relaxed whitespace-pre-wrap break-words resize-none transition-all"
            />
            <div className="absolute bottom-2.5 right-2.5 text-xs text-slate-500 font-mono bg-slate-200/70 px-2 py-0.5 rounded">
              {inputText.length} chars
            </div>
          </div>

          {/* Signal Sources Strip - Multi-Source Intelligence Fusion */}
          <div className="bg-slate-50/90 border border-slate-200 rounded-lg p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-900" />
                <span>Multi-Source Signal Intelligence Fusion</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {detectedSources.filter(s => s.isActive).length} / 4 Intelligence Streams Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {detectedSources.map((source) => {
                const Icon = source.icon;
                return (
                  <div
                    key={source.id}
                    className={`flex items-center gap-2 p-2 rounded-md border text-xs transition-all ${
                      source.isActive
                        ? 'bg-white border-blue-900 text-slate-900 font-bold shadow-2xs ring-1 ring-blue-900/20'
                        : 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md shrink-0 ${
                      source.isActive ? 'bg-[#1e3a8a] text-white shadow-2xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] leading-tight truncate">{source.label}</div>
                      <div className={`text-[9px] font-mono leading-none mt-0.5 truncate ${
                        source.isActive ? 'text-emerald-700 font-extrabold' : 'text-slate-400'
                      }`}>
                        {source.isActive ? '● Active Stream' : '○ Standby'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-700 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-900 animate-ping"></span>
              <span>Scanning key vulnerabilities: <strong className="text-slate-900">Hormuz</strong>, <strong className="text-slate-900">Red Sea</strong>, <strong className="text-slate-900">OPEC+</strong></span>
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isLoading || !inputText.trim()}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px] ${
                isLoading || !inputText.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  : 'bg-[#1e3a8a] hover:bg-blue-900 text-white active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Processing Signal via Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Calculate Risk Disruption Score</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* ANALYSIS RESULTS SECTION */}
      {currentResult && (
        <div className="space-y-6">
          
          {/* Header Bar with View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">AI Risk Assessment Output</h3>
              <span className="text-xs text-slate-600 font-semibold">
                ({currentResult.processed_at ? new Date(currentResult.processed_at).toLocaleTimeString() : 'Just now'})
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  viewMode === 'dashboard'
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Visual Dashboard
              </button>
              <button
                onClick={() => setViewMode('raw_json')}
                className={`px-3 py-1 rounded text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                  viewMode === 'raw_json'
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Raw JSON Object
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: VISUAL DASHBOARD */}
          {viewMode === 'dashboard' ? (
            <div className="space-y-6">
              {/* PLAIN-ENGLISH SUMMARY BANNER */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-3.5 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-blue-900 shrink-0" />
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {getSummarySentence(currentResult)}
                </p>
              </div>

              {/* THE FOUR RISK SCORE CARDS FIRST */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                <RiskGauge
                  score={currentResult.overall_risk_score}
                  label="Overall Import Disruption"
                  subtitle="Composite Risk Score"
                  icon="overall"
                  highlightDetails="Calculated weighted vulnerability based on 88% import dependency."
                />

                <RiskGauge
                  score={currentResult.hormuz_risk}
                  label="Strait of Hormuz"
                  subtitle="40-45% India Imports"
                  icon="hormuz"
                  highlightDetails={currentResult.threat_breakdown?.hormuz_details}
                />

                <RiskGauge
                  score={currentResult.red_sea_risk}
                  label="Red Sea / Bab el-Mandeb"
                  subtitle="Drone & Missile Threat"
                  icon="redsea"
                  highlightDetails={currentResult.threat_breakdown?.red_sea_details}
                />

                <RiskGauge
                  score={currentResult.opec_risk}
                  label="OPEC+ Supply Target"
                  subtitle="Production & Pricing"
                  icon="opec"
                  highlightDetails={currentResult.threat_breakdown?.opec_details}
                />

              </div>

              {/* PRIMARY THREAT VECTOR BANNER BELOW CARDS */}
              <div className={`${
                currentResult.overall_risk_score >= 70 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white border-slate-200'
              } border rounded-xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
                <div className="flex items-start md:items-center gap-4 flex-1">
                  <div className={`p-3 rounded-lg border shrink-0 ${
                    currentResult.overall_risk_score >= 70 
                      ? 'bg-red-100 border-red-200 text-red-600' 
                      : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                        currentResult.overall_risk_score >= 70 
                          ? 'bg-red-600 text-white' 
                          : 'bg-blue-900 text-white'
                      }`}>
                        PRIMARY THREAT VECTOR
                      </span>
                      <span className="text-xs text-slate-600 font-semibold">Ministry Alert Advisory</span>
                    </div>
                    <p className="text-base font-bold text-slate-900 leading-snug">
                      "{currentResult.primary_threat_vector}"
                    </p>
                  </div>
                </div>

                {/* Additional Risk Data */}
                <div className="flex flex-col gap-2 shrink-0 md:items-end">
                  {currentResult.risk_momentum && (
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-600">Momentum:</span>
                      <span className={`px-2.5 py-0.5 rounded-full ${
                        currentResult.risk_momentum === 'RISING' && currentResult.overall_risk_score >= 70
                          ? 'bg-red-600 text-white' 
                          : 'bg-amber-600 text-white'
                      }`}>
                        {currentResult.risk_momentum}
                      </span>
                    </div>
                  )}
                  {currentResult.affected_refineries && currentResult.affected_refineries.length > 0 && (
                    <div className="flex flex-col md:items-end gap-1 text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-600">Exposed Refineries:</span>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {currentResult.affected_refineries.map((ref, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 text-xs font-bold">
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* VIEW MODE 2: RAW JSON OUTPUT OBJECT */
            <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-xs text-slate-900 font-bold">
                  <Terminal className="w-4 h-4 text-blue-900" />
                  <span>Exact Raw JSON Response (Schema Conforming)</span>
                </div>

                <button
                  onClick={handleCopyJson}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 font-semibold flex items-center gap-1.5 transition-all min-h-[44px]"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" />
                      <span>Copy Raw JSON</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono whitespace-pre-wrap break-words overflow-x-auto leading-relaxed">
                {rawFormattedJson}
              </pre>

              <div className="text-xs text-slate-600 font-medium">
                This exact JSON payload can be consumed by automated pipelines, curl scripts, or downstream Ministry command systems.
              </div>
            </div>
          )}

          {/* Recommended Mitigations List BELOW cards and threat vector */}
          {currentResult.recommended_mitigation && currentResult.recommended_mitigation.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-900" /> Recommended Action Playbook for Taskforce
              </h4>
              <ul className="space-y-2.5">
                {currentResult.recommended_mitigation.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-800 flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200 font-medium">
                    <span className="text-blue-900 font-bold shrink-0">0{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
