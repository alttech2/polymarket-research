# Polymarket Market Expansion Research

A data-driven analysis of Polymarket's existing market coverage and strategic expansion opportunities. This project identifies gaps across all major categories, scores candidates on regulatory risk, wisdom-of-crowds informational value, and estimated attainable volume, and delivers a prioritized action plan.

The **Market Intelligence Framework** synthesizes these findings and presents a framework designed to systematically identify, evaluate, and act on future market creation / expansion opportunities.

## Interactive Dashboards

This repo contains two interactive React dashboards:

- **Gap Analysis** — Maps existing coverage across every Polymarket category (verified against live data, March 27, 2026) and identifies specific expansion opportunities ranked by tier, impact, and effort. Includes expandable analysis, existing market inventories, and a shortlist feature.
- **Assessment Matrix** — Scores high-impact candidates across three dimensions: regulatory risk (assessed against 5 specific Q1 2026 regulatory actions), wisdom-of-crowds value, and estimated attainable volume. Each row expands to show full regulatory analysis, WoC justification, and numbered evidence points. Sortable and filterable.

## Documents

The `docs/` folder contains four documents:

| Document | Purpose |
|---|---|
| `01_Gap_Analysis_Summary.docx` | Process, methodology (tag-based counting), core findings ranked by tier |
| `02_Assessment_Matrix_Summary.docx` | Scoring criteria, regulatory landscape (CFTC ANPRM, Staff Advisory, Gambling Act), findings by risk-return profile |
| `03_Strategic_Recommendations.docx` | Identifies and prioritizes market expansion opportunities across Polymarket's existing categories and one genuinely new category |
| `04_Market_Intelligence_Framework.docx` | A four-component framework designed to systematically identify, evaluate, and act on market creation and expansion opportunities |

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

## Summary
This analysis identifies and prioritizes market expansion opportunities across Polymarket’s existing categories and one genuinely new category. The platform currently hosts 5,399 crypto markets, 1,638 political markets ($2.2B), 470 AI markets, 372 culture markets ($149.1M), 270 economy markets ($77.1M), 440+ weather/climate markets, and 133 interest rate markets ($538.4M). Within this landscape, the highest-value expansion opportunities fall into three patterns: (1) structural derivatives of proven high-volume markets, (2) selective extension into sports formats with defensible regulatory positioning, and (3) one genuinely new category that brings a new user segment and 40+ known-date binary events per year.

## Key Findings

The highest-value, lowest-risk expansion path runs through political derivatives and a new Health & Biotech category. Together, these represent an estimated $235-545M in attainable volume with Low to Medium regulatory risk, clean resolution sources, and high wisdom-of-crowds informational value. Both bring genuine forecasting utility: political markets have demonstrated accuracy superior to polling, and PDUFA markets would aggregate dispersed biotech expertise into actionable consensus signals.

Sports expansion represents the largest raw volume opportunity ($270-490M/yr across all formats) but carries regulatory risk that requires a phased approach. Aggregate and extended-period formats—season win totals, award markets, season-average props—align with the CFTC Staff Advisory’s stated preference and should proceed first ($70-160M/yr, medium risk). Per-game player props and in-game live markets ($200-330M/yr) should be deferred until the regulatory trajectory clarifies through the CFTC ANPRM comment period (closing April 30, 2026) and the fate of the bipartisan Prediction Markets Are Gambling Act.

Two structural changes—promoting Courts/Legal and Real Estate/Housing to top-level navigation—can be implemented immediately at zero cost, increasing the visibility of 435+ existing markets that are currently scattered across subtags. These are the simplest, most risk-free actions available.

**The bottom line**: Political derivatives and the Health & Biotech category should be pursued immediately, expansion of the sports category should be conducted according to regulatory defensibility, and exposure to existing "underexposed" categories can be solved through simple navigation changes. This approach seeks to maximize volume while maintaining the platform’s regulatory positioning during a period of active legislative and enforcement scrutiny.

## Methodology

The **Gap Analysis** maps Polymarket’s existing market coverage across all categories, identifies specific expansion opportunities, and ranks them according to estimated attainable volume, perceived impact, implementation effort, and existing coverage. The research catalogued market counts and aggregate volumes across every major Polymarket category, then systematically identified gaps where new market types could generate meaningful additional volume.

The **Assessment Matrix** evaluates high-impact market expansion candidates across dimensions that went beyond the basic Gap Analysis. These dimensions were regulatory risk, wisdom-of-crowds informational value, and estimated attainable volume. The analysis incorporates the latest regulatory developments, including the CFTC’s Advance Notice of Proposed Rulemaking (March 16, 2026), Staff Advisory No. 26-08 (March 12, 2026), the bipartisan Prediction Markets Are Gambling Act (Schiff/Curtis, March 2026), and Arizona’s criminal charges against Kalshi (March 17, 2026).

The **Market Intelligence Framework** synthesizes and expands upon the above findings to present a four-component framework designed to systematically identify, evaluate, and act on market creation and expansion opportunities. It seeks to transform the comprehensive analysis into a repeatable, ongoing process.

## Tech Stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 6
- No additional UI libraries — components are self-contained with inline styles

## License

This research is provided as-is for informational purposes. Not financial or legal advice.
