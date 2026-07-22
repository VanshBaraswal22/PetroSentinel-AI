import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SignalProcessor } from './components/SignalProcessor';
import { MaritimeMap } from './components/MaritimeMap';
import { RefineryAndSPR } from './components/RefineryAndSPR';
import { HistoricalLog } from './components/HistoricalLog';
import { ExecBrief } from './components/ExecBrief';
import { ArchitectureView } from './components/ArchitectureView';
import { ApiDocsModal } from './components/ApiDocsModal';
import { ScenarioImpactView } from './components/ScenarioImpactView';
import { RiskAnalysisResponse, HistoricalRecord } from './types';
import { SAMPLE_FEEDS } from './data/sampleFeeds';
import { ShieldCheck, Activity, Globe2, Radio, Server, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'processor' | 'map' | 'reserves' | 'impact' | 'history' | 'api' | 'exec-brief' | 'architecture'>('processor');
  const [isApiOnline, setIsApiOnline] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<RiskAnalysisResponse | null>(null);
  // Seed history with initial sample records
  const [history, setHistory] = useState<HistoricalRecord[]>([
    {
      id: 'rec-init-1',
      timestamp: '09:15:00',
      feedTitle: SAMPLE_FEEDS[1].title,
      overall_risk_score: 82,
      hormuz_risk: 45,
      red_sea_risk: 90,
      opec_risk: 35,
      primary_threat_vector: 'Bab el-Mandeb Drone Strike on India-Bound Tanker',
      detection_lead_time_hours: SAMPLE_FEEDS[1].detection_lead_time_hours,
      market_impact_description: SAMPLE_FEEDS[1].market_impact_description
    },
    {
      id: 'rec-init-2',
      timestamp: '08:30:00',
      feedTitle: SAMPLE_FEEDS[2].title,
      overall_risk_score: 65,
      hormuz_risk: 30,
      red_sea_risk: 25,
      opec_risk: 85,
      primary_threat_vector: 'OPEC+ Surprise 1.5M bpd Quota Cut & OSP Hike',
      detection_lead_time_hours: SAMPLE_FEEDS[2].detection_lead_time_hours,
      market_impact_description: SAMPLE_FEEDS[2].market_impact_description
    },
    {
      id: 'rec-init-3',
      timestamp: '07:45:00',
      feedTitle: SAMPLE_FEEDS[4].title,
      overall_risk_score: 72,
      hormuz_risk: 40,
      red_sea_risk: 30,
      opec_risk: 78,
      primary_threat_vector: 'Sanctions-Driven Supply Shock (Secondary OFAC Sanctions)',
      detection_lead_time_hours: SAMPLE_FEEDS[4].detection_lead_time_hours,
      market_impact_description: SAMPLE_FEEDS[4].market_impact_description
    }
  ]);

  // Check health and run initial analysis on first mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          setIsApiOnline(true);
        }
      } catch (e) {
        console.warn('Backend health check error:', e);
        setIsApiOnline(false);
      }
    };

    checkBackend();
    
    // Auto-analyze default initial sample feed
    handleAnalyzeFeed(SAMPLE_FEEDS[0].text, SAMPLE_FEEDS[0].title);
  }, []);

  const handleAnalyzeFeed = async (text: string, title?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data: RiskAnalysisResponse = await response.json();
      setCurrentResult(data);

      // Add to historical record with detection lead time metric
      const recordTitle = title || (text.length > 40 ? text.substring(0, 40) + '...' : text);
      const matchingFeed = SAMPLE_FEEDS.find(f => f.title === recordTitle || f.text === text);
      const leadHours = data.detection_lead_time_hours || matchingFeed?.detection_lead_time_hours || Math.round(12 + (data.overall_risk_score * 0.15));
      const marketDesc = data.market_impact_description || matchingFeed?.market_impact_description || `Brent crude moved +${(data.overall_risk_score * 0.08).toFixed(1)}%`;

      const newRecord: HistoricalRecord = {
        id: `rec-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        feedTitle: recordTitle,
        overall_risk_score: data.overall_risk_score,
        hormuz_risk: data.hormuz_risk,
        red_sea_risk: data.red_sea_risk,
        opec_risk: data.opec_risk,
        primary_threat_vector: data.primary_threat_vector,
        detection_lead_time_hours: leadHours,
        market_impact_description: marketDesc
      };

      setHistory(prev => [newRecord, ...prev]);

    } catch (err: any) {
      console.error('Error analyzing feed:', err);
      setError(err?.message || 'Failed to connect to risk signal backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* Sticky Top Bar & Navigation */}
      <div>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isApiOnline={isApiOnline}
          overallScore={currentResult ? currentResult.overall_risk_score : null}
        />

        {/* Main Content View Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'processor' && (
            <SignalProcessor
              currentResult={currentResult}
              onAnalyze={(txt) => handleAnalyzeFeed(txt)}
              isLoading={isLoading}
              error={error}
            />
          )}

          {activeTab === 'map' && (
            <MaritimeMap
              hormuzRisk={currentResult ? currentResult.hormuz_risk : 50}
              redSeaRisk={currentResult ? currentResult.red_sea_risk : 50}
              opecRisk={currentResult ? currentResult.opec_risk : 50}
            />
          )}

          {activeTab === 'reserves' && (
            <RefineryAndSPR
              overallScore={currentResult ? currentResult.overall_risk_score : null}
            />
          )}

          {activeTab === 'impact' && (
            <ScenarioImpactView initialSubTab="macro" />
          )}

          {activeTab === 'history' && (
            <HistoricalLog
              history={history}
            />
          )}

          {activeTab === 'exec-brief' && (
            <ExecBrief currentResult={currentResult} history={history} />
          )}

          {activeTab === 'architecture' && (
            <ArchitectureView />
          )}

          {activeTab === 'api' && (
            <ApiDocsModal />
          )}
        </main>
      </div>

      <footer className="border-t border-slate-800 bg-slate-900/90 py-5 mt-12 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-slate-200">India Energy Security & Supply Disruption Command System</span>
            <span className="text-slate-600">|</span>
            <span>Ministry of Petroleum and Natural Gas, New Delhi</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
            <span>Import Dependency: <strong className="text-amber-400">88.6%</strong></span>
            <span>SPR Buffer: <strong className="text-emerald-400">5.33 MMT</strong></span>
            <span>Corridors: <strong className="text-sky-400">Hormuz • Bab-el-Mandeb • OPEC+</strong></span>
            <span>Powered by: <strong className="text-blue-400">Gemini AI</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
