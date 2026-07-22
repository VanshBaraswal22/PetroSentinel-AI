export interface ThreatBreakdown {
  hormuz_details: string;
  red_sea_details: string;
  opec_details: string;
}

export interface RiskAnalysisResponse {
  overall_risk_score: number;
  hormuz_risk: number;
  red_sea_risk: number;
  opec_risk: number;
  primary_threat_vector: string;
  summary_sentence?: string;
  risk_momentum?: 'RISING' | 'STABLE' | 'FALLING';
  affected_refineries?: string[];
  threat_breakdown?: ThreatBreakdown;
  indian_refinery_impact?: string;
  recommended_mitigation?: string[];
  processed_at?: string;
  detection_lead_time_hours?: number;
  market_impact_description?: string;
}

export interface ImpactResponse {
  scenario: string;
  spr_survival_days: number;
  brent_crude_surge_pct: string;
  pump_price_impact_inr: string;
  refinery_slowdown_pct: string;
  gdp_drag_pct: string;
  critical_operational_bottleneck: string;
  days_to_stabilize: string;
  immediate_actions: string[];
  model_assumptions: string[];
}

export interface LogisticsAlternative {
  rank: number;
  supplier_name: string;
  volume_m_bbls: string;
  cost_delta_per_bbl: string;
  transit_time_days: string;
  port_refinery_compatibility: string;
  confidence_score: string;
  time_to_execute: string;
  source: string;
  crude_grade: string;
  transit_time_delta: string;
  estimated_spot_premium: string;
  compatible_refineries: string[];
  activation_steps: string[];
  strategic_advantage: string;
  risk_caveat: string;
}

export interface LogisticsResponse {
  alternatives: LogisticsAlternative[];
}

export interface SampleNewsFeed {
  id: string;
  title: string;
  category: 'Hormuz' | 'Red Sea' | 'OPEC+' | 'Combined' | 'Normal';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  text: string;
  detection_lead_time_hours?: number;
  market_impact_description?: string;
}

export interface HistoricalRecord {
  id: string;
  timestamp: string;
  feedTitle: string;
  overall_risk_score: number;
  hormuz_risk: number;
  red_sea_risk: number;
  opec_risk: number;
  primary_threat_vector: string;
  detection_lead_time_hours?: number;
  market_impact_description?: string;
}
