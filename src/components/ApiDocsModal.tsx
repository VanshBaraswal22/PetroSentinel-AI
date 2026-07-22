import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Globe, Send } from 'lucide-react';

export const ApiDocsModal: React.FC = () => {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const curlExample = `curl -X POST https://${window.location.host}/api/analyze \\
  -H "Content-Type: application/json" \\
  -H "X-Raw-Output: true" \\
  -d '{
    "text": "Iranian Naval Forces initiate unannounced live-fire missile exercises near the Strait of Hormuz..."
  }'`;

  const expectedResponse = `{
  "overall_risk_score": 72,
  "hormuz_risk": 80,
  "red_sea_risk": 65,
  "opec_risk": 45,
  "primary_threat_vector": "High military activity and live-fire naval exercises near the Strait of Hormuz threatening 40-45% of India crude imports."
}`;

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-blue-900" />
          <h2 className="text-lg font-bold text-slate-900">Live Risk Signal API Endpoint Documentation</h2>
        </div>
        <p className="text-xs text-slate-600">
          Programmatic access to India's Ministry of Petroleum Risk Signal Processor.
        </p>
      </div>

      {/* Endpoint Spec Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-emerald-600 text-white font-mono font-extrabold text-xs px-2.5 py-1 rounded">
            POST
          </span>
          <code className="text-blue-900 font-mono text-sm font-bold">
            /api/analyze
          </code>
        </div>

        <div className="space-y-3 text-xs text-slate-700">
          <p>
            This endpoint accepts raw text news feeds, vessel tracking alerts, or geopolitical updates and returns real-time risk scores (0-100) for India's major maritime crude corridors.
          </p>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 font-mono">
            <span className="text-slate-600 uppercase font-bold text-[10px] block">Request Headers:</span>
            <div className="text-slate-800">Content-Type: <span className="text-emerald-700 font-bold">application/json</span> or <span className="text-emerald-700 font-bold">text/plain</span></div>
            <div className="text-slate-800">X-Raw-Output: <span className="text-blue-900 font-bold">true</span> (Optional: forces raw 5-field JSON response)</div>
          </div>
        </div>

        {/* cURL Command Box */}
        <div className="space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 font-bold uppercase flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-blue-900" /> cURL Request Snippet
            </span>
            <button
              onClick={() => copyToClipboard(curlExample, setCopiedCurl)}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-700 flex items-center gap-1 transition-all"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCurl ? 'Copied' : 'Copy cURL'}</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 overflow-x-auto leading-relaxed">
            {curlExample}
          </pre>
        </div>

        {/* Response Structure Box */}
        <div className="space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 font-bold uppercase flex items-center gap-1.5">
              <Send className="w-4 h-4 text-emerald-600" /> Exact Standard JSON Response Schema
            </span>
            <button
              onClick={() => copyToClipboard(expectedResponse, setCopiedBody)}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-700 flex items-center gap-1 transition-all"
            >
              {copiedBody ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBody ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-emerald-400 overflow-x-auto leading-relaxed">
            {expectedResponse}
          </pre>
        </div>

      </div>

    </div>
  );
};
