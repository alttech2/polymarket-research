# Polymarket Market Expansion Research

A data-driven analysis of Polymarket's existing market coverage and strategic expansion opportunities. This project identifies gaps across all major categories, scores candidates on regulatory risk, wisdom-of-crowds informational value, and estimated attainable volume, and delivers a prioritized action plan.

## Interactive Dashboards

This repo contains two interactive React dashboards:

- **Gap Analysis** — Maps existing coverage across every Polymarket category (verified against live data, March 27, 2026) and identifies specific expansion opportunities ranked by tier, impact, and effort. Includes expandable analysis, existing market inventories, and a shortlist feature.
- **Assessment Matrix** — Scores 20 high-impact candidates across three dimensions: regulatory risk (assessed against 5 specific Q1 2026 regulatory actions), wisdom-of-crowds value, and estimated attainable volume. Each row expands to show full regulatory analysis, WoC justification, and numbered evidence points. Sortable and filterable.

## Documents

The `docs/` folder contains three Word documents:

| Document | Purpose |
|---|---|
| `01_Gap_Analysis_Summary.docx` | Process, methodology (tag-based counting), iterative correction table, core findings by tier |
| `02_Assessment_Matrix_Summary.docx` | Three scoring criteria, regulatory landscape (CFTC ANPRM, Staff Advisory, Gambling Act), findings by risk-return profile |
| `03_Strategic_Recommendations.docx` | Prioritized action plan: political derivatives → Health & Biotech → defensible sports → structural nav changes |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm (comes with Node.js)

### Install and Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/polymarket-research.git
cd polymarket-research

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with static files that can be deployed to any hosting provider (GitHub Pages, Vercel, Netlify, etc.).

## Key Findings

**Polymarket's coverage is far more comprehensive than commonly understood.** The platform hosts 5,399 crypto markets, 1,638 political markets ($2.2B volume), 470 AI markets, 372 culture markets ($149.1M), 270 economy markets ($77.1M), 440+ weather/climate markets, and 133 interest rate markets ($538.4M). Many categories that appeared underdeveloped already have hundreds of active markets.

**The highest-value, lowest-risk expansion path runs through political derivatives** — VP nominee markets ($90-180M), state primaries ($50-100M), aggregated midterm indices ($20-55M), and legislative outcomes ($25-60M). These combine proven legal standing, high wisdom-of-crowds value, and substantial volume potential.

**Health & Biotech is the only genuinely new category** confirmed as absent from Polymarket. 40+ FDA PDUFA dates per year provide known-date binary outcomes with 20-50% stock price moves. Estimated at $50-150M/yr once established.

**Sports markets offer the largest raw volume but face existential regulatory risk** from the CFTC Staff Advisory (March 2026), the bipartisan Prediction Markets Are Gambling Act, and state-level criminal charges. Aggregate/extended-period formats (win totals, awards) are more defensible than per-game player props.

## Methodology

- Market counts and volumes sourced from Polymarket prediction tag pages (tag-based totals, not subcategory grid counts)
- All figures verified as of March 27, 2026
- Regulatory risk assessed against: CFTC ANPRM (Mar 16, 2026), Staff Advisory No. 26-08 (Mar 12, 2026), Prediction Markets Are Gambling Act (Schiff/Curtis, Mar 2026), Arizona criminal charges (Mar 17, 2026), CFTC Enforcement Advisory on insider trading (Feb 2026)
- Volume estimates derived from comparable existing markets, traditional market analogs, and audience size estimates

## Tech Stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 6
- No additional UI libraries — components are self-contained with inline styles

## License

This research is provided as-is for informational purposes. Not financial or legal advice.
