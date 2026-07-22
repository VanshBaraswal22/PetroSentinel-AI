# PetroSentinel-AI
> **AI-Driven Energy Supply Chain Resilience Monitor | ET AI Hackathon 2026**

---

## Problem Statement

India imports over 88% of its crude oil requirements, leaving national energy security vulnerable to geopolitical disruptions across critical maritime chokepoints like the Strait of Hormuz and Bab-el-Mandeb. **PetroSentinel-AI** provides real-time signal analysis, disruption risk scoring, and interactive scenario modeling to safeguard national supply chains and strategic petroleum reserves.

---

## Key Features

- **Live Signal Risk Scoring**: AI-powered analysis of news feeds, maritime advisories, and geopolitical events with sub-day detection lead times.
- **Interactive Maritime Supply Corridor Map**: Live tracking and vulnerability monitoring across Hormuz, Red Sea, Suez, and Cape of Good Hope transit routes.
- **Digital Twin & Macro Scenario Modeller**: Interactive stress testing for supply cuts, crude price surges (Brent shock), and pump price impact simulations.
- **SPR & Refinery Intelligence**: Real-time depletion curve projections for Indian Strategic Petroleum Reserves (ISPRL) and refinery exposure rankings.
- **Executive Brief Generator**: Instant, policy-ready PDF and structured brief reports for national security and energy ministry cabinet briefings.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Recharts, Framer Motion / Motion, Lucide Icons
- **Backend & AI Engine**: Express (Node.js), Gemini API (@google/genai SDK), Structured JSON Schema Outputs

---

## Run Locally

### 1. Clone & Install
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
