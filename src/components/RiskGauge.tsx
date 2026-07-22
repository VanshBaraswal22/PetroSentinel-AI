import React from 'react';
import { AlertTriangle, Flame, ShieldAlert, Waves, DollarSign } from 'lucide-react';

interface RiskGaugeProps {
  score: number;
  label: string;
  subtitle: string;
  icon: 'overall' | 'hormuz' | 'redsea' | 'opec';
  highlightDetails?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  label,
  subtitle,
  icon,
  highlightDetails
}) => {
  const getSeverityLevel = (val: number) => {
    if (val >= 70) {
      return { 
        text: 'HIGH RISK', 
        color: 'text-red-400', 
        badgeBg: 'bg-red-600 text-white rounded-full', 
        cardBorder: 'border-slate-800', 
        bar: 'bg-red-500' 
      };
    }
    if (val >= 40) {
      return { 
        text: 'MODERATE RISK', 
        color: 'text-amber-400', 
        badgeBg: 'bg-amber-600 text-white rounded-full', 
        cardBorder: 'border-slate-800', 
        bar: 'bg-amber-500' 
      };
    }
    return { 
      text: 'LOW/STABLE', 
      color: 'text-emerald-400', 
      badgeBg: 'bg-emerald-600 text-white rounded-full', 
      cardBorder: 'border-slate-800', 
      bar: 'bg-emerald-500' 
    };
  };

  const severity = getSeverityLevel(score);

  const renderIcon = () => {
    switch (icon) {
      case 'hormuz':
        return <Flame className={`w-5 h-5 ${severity.color}`} />;
      case 'redsea':
        return <Waves className={`w-5 h-5 ${severity.color}`} />;
      case 'opec':
        return <DollarSign className={`w-5 h-5 ${severity.color}`} />;
      default:
        return <ShieldAlert className={`w-5 h-5 ${severity.color}`} />;
    }
  };

  return (
    <div className={`p-5 md:p-6 rounded-xl border bg-slate-900 shadow-sm transition-all hover:border-slate-700 ${severity.cardBorder}`}>
      <div className="flex items-start justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 leading-tight">{label}</h3>
            <p className="text-xs text-slate-300 font-medium mt-0.5">{subtitle}</p>
          </div>
        </div>

        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 shrink-0 ${severity.badgeBg}`}>
          {severity.text}
        </span>
      </div>

      {/* Numeric Score and Meter Bar */}
      <div className="mt-3">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-300">Disruption Probability</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black ${severity.color}`}>
              {score}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 100</span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-700 ${severity.bar}`}
            style={{ width: `${Math.max(3, score)}%` }}
          />
        </div>
      </div>

      {/* Details snippet */}
      {highlightDetails && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-200 leading-relaxed font-medium">
          <span className="text-slate-300 text-[10px] uppercase font-bold block mb-0.5">Key Observation:</span>
          {highlightDetails}
        </div>
      )}
    </div>
  );
};
