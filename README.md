# Polymarket Market Expansion Research

A data-driven analysis of Polymarket's existing market coverage and strategic expansion opportunities. This project identifies gaps across all major categories, scores candidates on regulatory risk, wisdom-of-crowds informational value, and estimated attainable volume, and delivers a prioritized action plan.

## Interactive Dashboards

This repo contains two interactive React dashboards:

- **Gap Analysis** — Maps existing coverage across every Polymarket category (verified against live data, March 27, 2026) and identifies specific expansion opportunities ranked by tier, impact, and effort. Includes expandable analysis, existing market inventories, and a shortlist feature.
- **Assessment Matrix** — Scores 20 high-impact candidates across three dimensions: regulatory risk (assessed against 5 specific Q1 2026 regulatory actions), wisdom-of-crowds value, and estimated attainable volume. Each row expands to show full regulatory analysis, WoC justification, and numbered evidence points. Sortable and filterable.

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

## Key Findings



## Methodology



## Tech Stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 6
- No additional UI libraries — components are self-contained with inline styles

## License

This research is provided as-is for informational purposes. Not financial or legal advice.
