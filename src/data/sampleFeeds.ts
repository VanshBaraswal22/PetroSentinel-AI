import { SampleNewsFeed } from '../types';

export const SAMPLE_FEEDS: SampleNewsFeed[] = [
  {
    id: 'hormuz-drill',
    title: 'Hormuz Live-Fire Naval Drill & Tanker GPS Jamming',
    category: 'Hormuz',
    severity: 'CRITICAL',
    detection_lead_time_hours: 18,
    market_impact_description: 'Brent crude surged +7.2%',
    text: `BREAKING MARITIME ALERT: Iranian Naval Forces have initiated unannounced live-fire missile exercises near the Strait of Hormuz. Oman Maritime Security Center confirms GPS interference and armed speedboats approaching two loaded Very Large Crude Carriers (VLCCs) 12 nautical miles off Qeshm Island. Indian Ministry of External Affairs advises all Indian-flagged oil tankers to maintain continuous VHF comms with Indian Navy Operation Sankalp escorts. Strait of Hormuz handles 44% of India's daily 4.8 Million barrels/day crude imports from Saudi Arabia, Iraq, UAE, and Kuwait.`
  },
  {
    id: 'redsea-attack',
    title: 'Bab el-Mandeb Drone Strike on India-Bound Tanker',
    category: 'Red Sea',
    severity: 'HIGH',
    detection_lead_time_hours: 14,
    market_impact_description: 'Red Sea tanker freight spiked +28%',
    text: `SECURITY ALERT: Houthi forces launched a multi-drone and anti-ship missile attack on commercial shipping in the Southern Red Sea near Bab-el-Mandeb. UKMTO reports a Liberian-flagged crude vessel transporting Russian Ural crude bound for India's west coast sustained minor superstructure damage. Major container and tanker fleets have suspended Suez transits, diverting around the Cape of Good Hope—adding 14-18 transit days and an estimated $1.4 Million in added bunker fuel and insurance premiums per voyage to Indian ports.`
  },
  {
    id: 'opec-cut',
    title: 'OPEC+ Surprise 1.5M bpd Quota Cut & OSP Hike',
    category: 'OPEC+',
    severity: 'MODERATE',
    detection_lead_time_hours: 22,
    market_impact_description: 'Saudi OSP hiked +$2.40/bbl',
    text: `VIENNA BRIEFING: OPEC+ delegates announced an unannounced voluntary production cut of 1.5 Million barrels per day starting next month, led by Saudi Arabia and Iraq. Saudi Aramco simultaneously raised Official Selling Prices (OSPs) for Arab Light crude to Asian buyers by $2.40/bbl above the Oman/Dubai average benchmark. Brent crude surged 4.2% to $88.50/bbl. Economists warn the move could increase India's annual crude import bill by over $11.5 Billion.`
  },
  {
    id: 'combined-crisis',
    title: 'Combined Hormuz Escalation + Bab el-Mandeb Blockade',
    category: 'Combined',
    severity: 'CRITICAL',
    detection_lead_time_hours: 26,
    market_impact_description: 'Middle East spot premiums jumped +$5.80/bbl',
    text: `GLOBAL ENERGY EMERGENCY: Strait of Hormuz tanker transits have ground to a near-standstill following military clashes in the Persian Gulf. Concurrently, heavy drone swarms over Bab-el-Mandeb have forced 85% of Suez-bound crude tankers to halt or reroute around Africa. OPEC+ ministers declined emergency output hikes, insisting supply targets remain unchanged. India's Cabinet Committee on Security convened an emergency session to review Strategic Petroleum Reserve (SPR) drawdowns at Padur, Mangalore, and Visakhapatnam.`
  },
  {
    id: 'sanctions-shock',
    title: 'Sanctions-Driven Supply Shock (No Physical Blockade)',
    category: 'OPEC+',
    severity: 'HIGH',
    detection_lead_time_hours: 16,
    market_impact_description: 'Urals-Dubai discount widened +18%',
    text: `A scenario where US Treasury OFAC imposes secondary sanctions on Iranian oil exports and Venezuela simultaneously, forcing Indian refiners to drop sanctioned barrels overnight. No physical blockade. Pure policy-driven supply shock affecting ~8% of India's import basket.`
  },
  {
    id: 'russia-disruption',
    title: 'Russia-India Supply Corridor Disruption',
    category: 'Combined',
    severity: 'HIGH',
    detection_lead_time_hours: 12,
    market_impact_description: 'Baltic tanker charter rates rose +45%',
    text: `A scenario where G7 nations enforce the $60/barrel Russia oil price cap more aggressively, with insurance and shipping companies withdrawing services for Russian ESPO and Urals crude bound for India. Russia accounts for 19% of India's current imports. Shipping insurance costs spike 400%.`
  },
  {
    id: 'normalisation-signal',
    title: 'Normalisation Signal (Risk De-escalation)',
    category: 'Normal',
    severity: 'LOW',
    detection_lead_time_hours: 10,
    market_impact_description: 'Brent crude dropped -$6.00/bbl',
    text: `A scenario where Iran and Saudi Arabia announce a diplomatic breakthrough mediated by China, followed by OPEC+ agreeing to a 500,000 bpd supply increase. Houthi ceasefire negotiations resume. Brent falls $6/bbl. This tests whether the AI correctly scores risk as FALLING, not rising.`
  },
  {
    id: 'normal-ops',
    title: 'Normal Operational Transits & Stable Crude Flows',
    category: 'Normal',
    severity: 'LOW',
    detection_lead_time_hours: 8,
    market_impact_description: 'Asian crude benchmarks held flat (±0.2%)',
    text: `DAILY MARITIME INTELLIGENCE FEED: Strait of Hormuz transits are proceeding normally with standard traffic density and regular naval patrols. Bab-el-Mandeb passage reports stable commercial maritime flow with international naval task forces providing active escorts. OPEC+ members report full compliance with scheduled supply quotas, keeping Brent crude steady at $74.20/bbl. Import shipments to Jamnagar, Vadinar, and Kochi refining complexes are arriving on schedule.`
  }
];

