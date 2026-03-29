import { useState, useMemo } from "react";

const DATA = [
  { tier: "Tier 1: $100M+ Volume", tierColor: "#22c55e", categories: [
    { name: "2028 Presidential Race", parent: "Politics (1,638 mkts, $2.2B total)", volume: "$922.9M (Dem Nominee) + $459.7M (Winner) + 118 election mkts ($1.7B)",
      analysis: "Verified Mar 27. Dem Nominee at $922.9M (up from $907M earlier cite). Winner at $459.7M. 2028 Election tag: 118 markets, $1.7B aggregate. Coverage comprehensive — gaps are structural derivatives.",
      removed: "Debate performance (subjective). Fundraising (quarterly too infrequent).",
      existing: ["Dem Nominee 2028 ($922.9M, 44+ outcomes)", "Rep Nominee 2028", "Presidential Winner ($459.7M, 36 outcomes)", "Candidate announcements", "Approval ratings (daily)"],
      gaps: [
        { idea: "VP Nominee Markets (Dem + Rep)", rationale: "5-10% of $1.8B+ = $90-180M. Single largest gap.", impact: "high", effort: "low", estVolume: "$90-180M" },
        { idea: "Primary State-by-State Winners", rationale: "Sequential engagement Jan-Mar.", impact: "high", effort: "medium", estVolume: "$50-100M" },
        { idea: "Polling Threshold Markets (RCP leads)", rationale: "Trades on the info layer that moves larger markets.", impact: "medium", effort: "low", estVolume: "$5-20M" },
      ] },
    { name: "Fed & Monetary Policy", parent: "Fed tag: 740 mkts, $70.7M. Interest Rates: 133 mkts, $538.4M.", volume: "Fed Chair ($338M) + 133 Interest Rate mkts ($538.4M) incl BOJ, ECB, BOE, BOC, SNB",
      analysis: "Verified Mar 27. Fed tag: 740 markets, $70.7M. Fed Rates: 129 markets, $71.1M. Interest Rates: 133 markets, $538.4M. ECB, BOJ, BOE, BOC, SNB decision markets ALL ALREADY EXIST. Emergency rate cut market ('Fed emergency rate cut before 2027?') ALREADY EXISTS.",
      removed: "ECB/BOJ/BOE expansion (ALREADY EXISTS). Emergency rate action (ALREADY EXISTS — 'Fed emergency rate cut before 2027?' is live). Balance sheet/QT (too narrow).",
      existing: ["Fed Chair ($338M)", "Per-meeting decisions (8x/yr)", "Rate cut timing", "ECB rate hike 2026", "BOJ Decision in April", "BOE rate hike 2026", "BOC rate hike 2026", "SNB decision in March", "Fed emergency rate cut before 2027", "740 Fed-tagged markets total"],
      gaps: [
        { idea: "Dot Plot / SEP Markets", rationale: "SEP moves markets as much as rate decisions. Quarterly. Not currently covered despite 740 Fed markets.", impact: "medium", effort: "medium", estVolume: "$5-15M/release" },
      ] },
    { name: "Iran / Middle East / Geopolitics", parent: "Geopolitics", volume: "$127M (strikes) + 500+ markets",
      analysis: "Well-covered. 500+ markets. Polymarket reactive.",
      existing: ["Iran strikes ($127M+)", "Ukraine ($25M+)", "China/Taiwan ($11M+)", "201 Trade War", "Trump diplomatic"],
      gaps: [
        { idea: "Tariff Rate on Specific Decision Dates", rationale: "Tariff policy dynamic post-SCOTUS.", impact: "high", effort: "low", estVolume: "$10-30M/decision" },
        { idea: "Sanctions Package Markets", rationale: "Binary, scheduled. Not covered.", impact: "medium", effort: "medium", estVolume: "$5-15M" },
      ], removed: "Oil price reaction (hard to resolve). Most other ideas overlap existing." },
    { name: "Crypto Price Markets", parent: "Crypto", volume: "5,399 tagged markets, $105.2M tag vol. Bitcoin alone: 1,708 mkts, $103.2M. 3,315 5-min markets.",
      analysis: "CORRECTED Mar 27: 5,399 markets (not 242 — previous count was subcategory grid, not tag total). Bitcoin alone has 1,708 markets. 3,315 5-minute markets exist. 7 assets across all timeframes. This is by far the most developed category on the platform. Marginal gains from additional markets are negligible.",
      removed: "Liquidation events, funding rates, DeFi TVL, BTC dominance — all removed. Category is extremely mature.",
      existing: ["5,399 tagged markets ($105.2M)", "BTC (1,708 mkts), ETH, SOL, XRP, DOGE, BNB, MSTR", "3,315 five-minute markets", "All timeframes: 5m/15m/1hr/4hr/daily/weekly/monthly/yearly", "Up/down, above/below, range, hit price formats", "101+ pre-market token markets", "ATH, top performer, ETFs"],
      gaps: [
        { idea: "Mid-Cap Altcoins (ADA, AVAX, LINK)", rationale: "Each adds $5-15M. Diminishing returns.", impact: "medium", effort: "low", estVolume: "$5-15M/token" },
        { idea: "Meme Coins (PEPE, WIF, BONK)", rationale: "Demo overlap. Volatile.", impact: "medium", effort: "low", estVolume: "$5-20M/token" },
      ] },
    { name: "Sports", parent: "Sports", volume: "$120M+ 24hr, ~40% of platform",
      analysis: "Volume engine. Massive gaps in player props, futures, league expansion. NOTE: Player props face highest regulatory risk (CFTC Advisory Mar 12 2026 flagged individual performance contracts).",
      existing: ["NBA/NFL/NCAA/MLB/Soccer outcomes", "Championships, spreads, totals", "Tennis, Esports, Olympics, Parlays"],
      gaps: [
        { idea: "Player Props — Per-Game O/U", rationale: "Highest-volume sportsbook segment. ⚠️ CFTC flagged individual performance as 'viewed more skeptically.'", impact: "high", effort: "medium", estVolume: "$100M+/yr" },
        { idea: "Player Props — Season Average O/U", rationale: "Long-duration. Less manipulation risk than per-game.", impact: "high", effort: "medium", estVolume: "$20-50M/yr" },
        { idea: "NHL Full Coverage", rationale: "4th major US sport, zero coverage.", impact: "high", effort: "medium", estVolume: "$30-80M/yr" },
        { idea: "Golf Tournament Markets", rationale: "Top-5 betting handle.", impact: "high", effort: "medium", estVolume: "$20-50M/yr" },
        { idea: "MLB Deeper (K props, HR props)", rationale: "Partnership launched. 162-game cadence.", impact: "high", effort: "low", estVolume: "$50-100M/yr" },
        { idea: "Award Markets (MVP, ROY, Cy Young)", rationale: "Season-long, all leagues. Lower reg risk (media voting).", impact: "high", effort: "low", estVolume: "$20-50M/yr" },
        { idea: "Win Total O/U", rationale: "Sportsbook staple. Aggregate/extended = more defensible per CFTC.", impact: "high", effort: "low", estVolume: "$20-40M/yr" },
        { idea: "Division / Conference Winners", rationale: "Middle tier.", impact: "medium", effort: "low", estVolume: "$10-20M/yr" },
        { idea: "In-Game Live Markets", rationale: "5-min crypto → sports. ⚠️ Highest reg risk + technically hard.", impact: "high", effort: "hard", estVolume: "$50-100M+" },
        { idea: "Transfer / Free Agency", rationale: "Multi-outcome, offseason.", impact: "medium", effort: "medium", estVolume: "$5-15M" },
        { idea: "Draft Position", rationale: "Draft night spectacle.", impact: "medium", effort: "low", estVolume: "$10-20M" },
      ] },
  ]},
  { tier: "Tier 2: $10M-$100M Volume", tierColor: "#eab308", categories: [
    { name: "Pop Culture / Entertainment", parent: "Culture", volume: "372 tagged markets, $149.1M total volume. RECLASSIFIED from Tier 3.",
      analysis: "CORRECTED Mar 27: Previously classified Tier 3 at '<$5M.' Actual tag volume is $149.1M across 372 markets — firmly Tier 2. Individual markets skew low but long tail aggregates to significant volume. Elon tweet markets ($16.4M+) are tagged here. Note: Polymarket's most active Culture market is 'Will Jesus Christ return before 2027?' which illustrates the breadth of this category.",
      existing: ["372 tagged markets ($149.1M total)", "Oscars, Grammys, Eurovision", "GTA VI, MrBeast, Taylor Swift", "Elon tweet counts (also under Mentions)", "Movies, Reality TV, YouTube, Courts", "Aliens, celebrities"],
      gaps: [
        { idea: "Streaming Viewership (Netflix, Spotify)", rationale: "Fan communities drive volume.", impact: "medium", effort: "medium", estVolume: "$3-8M/show" },
        { idea: "Box Office Opening Weekend Revenue", rationale: "Clean Monday resolution.", impact: "medium", effort: "low", estVolume: "$2-5M/release" },
        { idea: "Video Game Review Scores (Metacritic)", rationale: "Perfect binary. Gaming audience.", impact: "medium", effort: "low", estVolume: "$2-5M/title" },
      ] },
    { name: "Government Shutdown / Congress", parent: "Politics", volume: "613 tagged markets, $4.4M tag vol. Main shutdown: $53.5M. Duration: $23.5M.",
      analysis: "613 tagged markets. Note: tag volume ($4.4M) captures active market exposure; individual resolved markets like the main shutdown ($53.5M) and duration ($23.5M) add to historical volume.",
      removed: "Speaker markets (exist). Individual bill passage (too low vol).",
      existing: ["613 tagged markets", "Shutdown yes/no ($53.5M historical)", "Duration ($23.5M)", "DHS shutdown", "Speaker vacancy ($32.6K)", "Individual bills (ACA $29K, Epstein $71K)"],
      gaps: [
        { idea: "Reconciliation / Omnibus Passage", rationale: "Mega-bills affect taxes, spending, deficit.", impact: "high", effort: "medium", estVolume: "$15-30M" },
        { idea: "Debt Ceiling Markets", rationale: "Distinct from shutdown. Historically most market-moving.", impact: "high", effort: "low", estVolume: "$10-30M" },
        { idea: "Congressional Approval / Generic Ballot", rationale: "Midterm equivalent of presidential approval.", impact: "medium", effort: "low", estVolume: "$5-10M" },
      ] },
    { name: "Ukraine / Russia", parent: "Geopolitics", volume: "$25M+ comprehensive",
      existing: ["Ceasefire ($25M+)", "Peace deal, territorial", "Security guarantees", "Greenland/Arctic"],
      gaps: [
        { idea: "Aid Package Approval", rationale: "Bridges US politics + geopolitics.", impact: "medium", effort: "low", estVolume: "$5-15M" },
        { idea: "NATO Membership / Pathway", rationale: "Distinct diplomatic track.", impact: "medium", effort: "low", estVolume: "$3-8M" },
      ] },
    { name: "Elon Musk / Tweet & Mention Markets", parent: "Mentions", volume: "130 markets, $16.4M. $3-8M per window.",
      analysis: "130 markets with custom xtracker infra. Format works for Musk specifically (40-50/day, high variance).",
      removed: "'More public figures' (most too low-variance). Engagement markets (gameable).",
      existing: ["Elon tweet count — 2-day/weekly/monthly", "xtracker.polymarket.com", "WH briefing mentions", "SOTU mentions ($17M+)"],
      gaps: [
        { idea: "Trump Truth Social Post Count", rationale: "Only other figure with comparable variance.", impact: "high", effort: "medium", estVolume: "$15-25M/yr" },
        { idea: "Earnings Call Mention Markets", rationale: "Same format, new context.", impact: "medium", effort: "low", estVolume: "$8-20M/yr" },
      ] },
    { name: "Finance (Stocks/Indices/Commodities)", parent: "Finance", volume: "264+ markets, 14 subcategories",
      analysis: "264+ markets across Stocks (113), Indices (45), Commodities (36), Earnings (10-14), IPOs (33), Fed Rates (25), Forex (6), Acquisitions (11), Collectibles, Treasuries.",
      removed: "Index rebalance (too obscure). Housing data (exists under Real Estate).",
      existing: ["Stocks (113)", "Indices (45)", "Commodities (36)", "Earnings (10-14)", "IPOs (33, SpaceX $60M+)", "Fed Rates (25)", "Forex (6)", "Acquisitions (11)"],
      gaps: [
        { idea: "Earnings Revenue/EPS Range Markets", rationale: "Beyond beat/miss. Options already price — smaller audience.", impact: "medium", effort: "medium", estVolume: "$5-10M/season" },
        { idea: "Mortgage Rate Thresholds (recurring cadence)", rationale: "101 Mortgage markets exist but need recurring weekly-cadence format.", impact: "medium", effort: "low", estVolume: "$3-8M" },
        { idea: "IPO First-Day Price", rationale: "Beyond yes/no.", impact: "medium", effort: "low", estVolume: "$3-8M/IPO" },
      ] },
    { name: "2026 Midterms", parent: "Elections", volume: "$18M+ aggregate. Individual races $0-$6K.",
      analysis: "Fragmentation problem. 435 thin markets. Aggregated markets concentrate liquidity.",
      removed: "Margin-of-victory (can't fix fragmentation). Turnout (too niche).",
      existing: ["Senate/House control", "435 House races (thin)", "Ballot measures", "Combo markets"],
      gaps: [
        { idea: "Net Seats Gained/Lost Range", rationale: "How media discusses midterms.", impact: "high", effort: "medium", estVolume: "$10-30M" },
        { idea: "Toss-Up Race Bundle", rationale: "Single liquid swing-seat market.", impact: "high", effort: "medium", estVolume: "$5-15M" },
        { idea: "Senate Seat Count Range", rationale: "Filibuster proximity matters.", impact: "medium", effort: "low", estVolume: "$5-10M" },
      ] },
    { name: "Economy (Macro Data)", parent: "Economy", volume: "270 markets, $77.1M. Intl data exists.",
      analysis: "Verified Mar 27: 270 markets, $77.1M confirmed. International data (Germany GDP, Eurozone inflation, BOC, ECB) all exist. Very well-developed.",
      removed: "International macro (ALREADY EXISTS). Trade deficit (covered).",
      existing: ["270 markets ($77.1M)", "130 CPI ($4.6M)", "Jobs/NFP", "GDP", "Recession ($874K)", "33 Global Rates", "Eurozone/Germany/BOC", "41 Macro Indicators", "Housing (9)", "Tax (8)", "TSA (8)", "Macro Dashboard"],
      gaps: [
        { idea: "PCE Inflation Markets", rationale: "Fed's preferred measure. Monthly.", impact: "medium", effort: "low", estVolume: "$2-5M/release" },
        { idea: "Jobs Report Sub-Components", rationale: "Wage growth, sector breakdowns.", impact: "low", effort: "low", estVolume: "$1-3M" },
      ] },
  ]},
  { tier: "Tier 3: $1M-$10M Volume", tierColor: "#a855f7", categories: [
    { name: "Tech / AI", parent: "AI tag: 470 mkts, $21.1M. Tech separate.", volume: "470 AI-tagged markets, $21.1M. Own top-level nav item.",
      analysis: "CORRECTED Mar 27: 470 markets (not 243). $21.1M volume. AI has its own nav item with monthly rankings at 3 positions, capability-specific (coding, math), company subtags. Best AI model March at $9M. Most active: Anthropic at 99% for best model end of March.",
      removed: "Product launch dates (most not uncertain enough).",
      existing: ["470 AI-tagged markets ($21.1M)", "Best AI model #1/#2/#3 monthly ($9M)", "Coding/Math rankings", "Style Control variants", "Claude 5, GPT-5 release", "Company subtags (OpenAI, Anthropic, Google, xAI, DeepSeek)"],
      gaps: [
        { idea: "AI Benchmark Score Markets", rationale: "Objective vs subjective. Narrower audience.", impact: "medium", effort: "medium", estVolume: "$2-5M/release" },
        { idea: "AI Regulation / Policy Markets", rationale: "EU AI Act enforcement, US federal legislation.", impact: "medium", effort: "low", estVolume: "$3-8M" },
        { idea: "AI Fundraising Milestones", rationale: "Will OpenAI close at >$300B?", impact: "medium", effort: "low", estVolume: "$2-5M/round" },
      ] },
    { name: "Weather / Climate & Science", parent: "Climate & Science", volume: "440+ markets. 515 Weather. 147 Climate ($15.1M).",
      analysis: "440+ markets. Hurricanes, intl cities, earthquakes, pandemics, space, natural disasters, precipitation all exist. Well-developed.",
      removed: "City expansion (already happening). Hurricane markets broadly (exist — gap is per-storm only).",
      existing: ["174 Daily Temp (intl)", "213 Weather", "Hurricanes (Cat 4 landfall, named storm)", "17 Space", "6 Earthquake", "10 Pandemic", "11 Natural Disaster", "Precipitation", "Global Temp records"],
      gaps: [
        { idea: "Per-Storm Hurricane Tracking", rationale: "Categorical exists, per-storm doesn't.", impact: "medium", effort: "medium", estVolume: "$2-5M/storm" },
        { idea: "Seasonal Hurricane Count Range", rationale: "NOAA forecast anchor.", impact: "medium", effort: "low", estVolume: "$2-5M" },
      ] },
  ]},
  { tier: "Tier 4: New & Reclassified", tierColor: "#ef4444", categories: [
    { name: "🏥 Health & Biotech", parent: "GENUINELY NEW — only true new category", volume: "ZERO markets. 40+ PDUFA dates/yr. Est. $50-150M annual.",
      analysis: "Confirmed as the ONLY genuinely new category absent from Polymarket. Zero FDA, clinical trial, or drug approval markets exist. 40+ PDUFA dates/yr. Entire tracking ecosystem exists. Brings new user segment.",
      existing: [],
      gaps: [
        { idea: "FDA Drug Approval (PDUFA dates)", rationale: "40+/yr. Known dates. Binary. Stock moves 20-50%.", impact: "high", effort: "hard", estVolume: "$3-10M/major PDUFA" },
        { idea: "ADCOMM Vote Markets", rationale: "Precedes PDUFA. Public webcast. Two events per drug.", impact: "high", effort: "hard", estVolume: "$1-5M/ADCOMM" },
        { idea: "Clinical Trial Phase 3 Readouts", rationale: "Known timelines. ClinicalTrials.gov. Higher insider risk.", impact: "high", effort: "hard", estVolume: "$2-8M/readout" },
        { idea: "WHO Declarations", rationale: "Binary, global. Irregular but massive.", impact: "medium", effort: "medium", estVolume: "$2-10M/crisis" },
      ] },
    { name: "⚖️ Legal & Courts", parent: "RECLASSIFIED — exists (105 SCOTUS mkts, $2M+)", volume: "105 SCOTUS markets, $2.0M. Tariff case $9M+ cross-platform.",
      analysis: "NOT new. 105 SCOTUS markets exist. Opportunity is promotion to top-level nav and expanding into criminal trials.",
      existing: ["105 SCOTUS markets ($2.0M)", "Trump v. Slaughter FTC", "Tariff rulings ($9M+ cross-platform)", "Sports event contract case", "Supreme Court vacancy"],
      gaps: [
        { idea: "Criminal Trial Verdict Markets", rationale: "SCOTUS exists but criminal verdicts absent. Cleanest binary.", impact: "high", effort: "medium", estVolume: "$3-10M/trial" },
        { idea: "Promote Courts/Legal to Top-Level Nav", rationale: "Visibility = volume. AI was promoted similarly.", impact: "high", effort: "low", estVolume: "Structural" },
      ] },
    { name: "🏠 Real Estate & Housing", parent: "RECLASSIFIED — exists (120 Housing + 110 RE + 101 Mortgage)", volume: "110 RE ($19.1M) + 120 Housing + 101 Mortgage. City-level home values exist.",
      analysis: "NOT new. 330+ markets across tags but fragmented and low per-market volume. Opportunity is national aggregates + nav promotion.",
      existing: ["110 Real Estate ($19.1M)", "120 Housing (city-level home values)", "101 Mortgage (30yr rate thresholds)", "City: Chicago ($15.5K), LA ($1.7K), DC ($2.8K)"],
      gaps: [
        { idea: "National Aggregate Markets + Promote to Nav", rationale: "City-level too granular. National concentrates attention.", impact: "high", effort: "low", estVolume: "$5-15M" },
        { idea: "Monthly Data Release Cadence Markets", rationale: "Tie to Freddie Mac weekly / NAR monthly like CPI monthly.", impact: "medium", effort: "low", estVolume: "$2-5M/release" },
      ] },
    { name: "🚀 Space & Aerospace", parent: "SUBCATEGORY — 17 Space mkts under Climate & Science", volume: "17 Space + SpaceX IPO $60M+ (Finance)",
      existing: ["17 Space markets", "SpaceX IPO ($60M+)", "SpaceX ticker symbol"],
      gaps: [
        { idea: "Starship Flight Milestones", rationale: "Binary, exact date. Perfect demo.", impact: "high", effort: "low", estVolume: "$3-8M/flight" },
        { idea: "Artemis / Moon Landing Timeline", rationale: "Multi-year sustained.", impact: "medium", effort: "low", estVolume: "$2-5M" },
      ] },
  ]},
];

const IS = { high: { bg: "#22c55e", text: "#fff" }, medium: { bg: "#ca8a04", text: "#fff" }, low: { bg: "#4b5563", text: "#d1d5db" } };
const EL = { low: "🟢 Low", medium: "🟡 Med", hard: "🔴 Hard" };

export default function App() {
  const [exp, setExp] = useState(null);
  const [fi, setFi] = useState("all");
  const [vm, setVm] = useState("by_tier");
  const [st, setSt] = useState(new Set());
  const [sa, setSa] = useState(new Set());
  const ts = (id) => setSt((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const ta = (nm) => setSa((p) => { const n = new Set(p); n.has(nm) ? n.delete(nm) : n.add(nm); return n; });

  const ag = useMemo(() => DATA.flatMap((t) => t.categories.flatMap((c) =>
    c.gaps.filter((g) => fi === "all" || g.impact === fi).map((g) => ({ ...g, cn: c.name, p: c.parent, tc: t.tierColor, id: `${c.name}::${g.idea}` }))
  )), [fi]);
  const sg = ag.filter((g) => st.has(g.id));
  const tc = DATA.map((t) => ({ l: t.tier.split(":")[0], c: t.tierColor, n: t.categories.reduce((s, c) => s + c.gaps.filter((g) => fi === "all" || g.impact === fi).length, 0) }));

  const G = (g, cn) => { const id = `${cn}::${g.idea}`; const s = st.has(id); return (
    <div key={g.idea} style={{ background: "#111118", border: `1px solid ${s ? "#eab308" : "#1a1a2a"}`, borderRadius: 6, padding: "10px 12px", borderLeft: `3px solid ${IS[g.impact].bg}` }}
      onMouseOver={(e) => { if (!s) e.currentTarget.style.borderColor = "#6366f1"; }} onMouseOut={(e) => { if (!s) e.currentTarget.style.borderColor = s ? "#eab308" : "#1a1a2a"; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={(e) => { e.stopPropagation(); ts(id); }} style={{ cursor: "pointer", background: "none", border: "none", fontSize: 15, padding: 2 }}>{s ? "★" : "☆"}</button>
            <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#fff" }}>{g.idea}</span>
          </div>
          <div style={{ fontSize: 11, color: "#71717a", marginTop: 4, lineHeight: 1.5, paddingLeft: 26 }}>{g.rationale}</div>
          {g.estVolume && <div style={{ fontSize: 10, color: "#6366f1", marginTop: 4, paddingLeft: 26, fontWeight: 500 }}>Est. volume: {g.estVolume}</div>}
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 8, flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, fontWeight: 600, background: IS[g.impact].bg, color: IS[g.impact].text }}>{g.impact.toUpperCase()}</span>
          <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, background: "#1a1a2a", color: "#71717a" }}>{EL[g.effort]}</span>
        </div>
      </div>
    </div>
  ); };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono','JetBrains Mono',monospace", background: "#08080e", color: "#d4d4d8", minHeight: "100vh", padding: 20 }}>
      

      <div style={{ borderBottom: "1px solid #1a1a2a", paddingBottom: 14, marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Polymarket Gap Analysis</h1>
        <p style={{ fontSize: 11, color: "#71717a", margin: "6px 0 0", lineHeight: 1.6 }}>
          {ag.length} opportunities · All figures verified Mar 27, 2026 · Market counts use tag-based totals (captures cross-tagged markets) rather than subcategory page counts
        </p>
        <p style={{ fontSize: 10, color: "#555", margin: "4px 0 0", lineHeight: 1.5, fontStyle: "italic" }}>
          Methodology: Market counts and volumes sourced from Polymarket prediction tag pages (e.g., /predictions/crypto, /predictions/ai). Tag totals are larger than subcategory grid counts because markets can be tagged across multiple categories. We use tag-based counting as it represents total market exposure per category.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {tc.map((t) => (<div key={t.l} style={{ background: "#0e0e16", border: "1px solid #1a1a2a", borderRadius: 6, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.c }} /><span style={{ fontSize: 10, color: "#71717a" }}>{t.l}</span><span style={{ fontSize: 12, fontWeight: 600, color: t.c }}>{t.n}</span>
        </div>))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 3 }}>
          {[{ k: "by_tier", l: "By volume tier" }, { k: "all_gaps", l: "All gaps" }, { k: "starred", l: `★ Shortlist (${sg.length})` }].map((m) => (
            <button key={m.k} onClick={() => setVm(m.k)} style={{ padding: "5px 12px", borderRadius: 5, fontSize: 10, fontFamily: "inherit", border: `1px solid ${vm === m.k ? "#6366f1" : "#222"}`, background: vm === m.k ? "#6366f1" : "transparent", color: vm === m.k ? "#fff" : "#71717a", fontWeight: vm === m.k ? 600 : 400, cursor: "pointer" }}>{m.l}</button>
          ))}
        </div>
        <div style={{ width: 1, height: 16, background: "#222" }} />
        <div style={{ display: "flex", gap: 3 }}>
          <span style={{ fontSize: 9, color: "#555", marginRight: 2, lineHeight: "22px" }}>IMPACT:</span>
          {["all", "high", "medium", "low"].map((f) => (
            <button key={f} onClick={() => setFi(f)} style={{ padding: "3px 9px", borderRadius: 3, fontSize: 9, fontFamily: "inherit", border: "none", cursor: "pointer", background: fi === f ? (IS[f]?.bg || "#6366f1") : "#1a1a2a", color: fi === f ? (IS[f]?.text || "#fff") : "#71717a", fontWeight: 500 }}>{f}</button>
          ))}
        </div>
      </div>

      {vm === "by_tier" && DATA.map((tier) => (
        <div key={tier.tier} style={{ marginBottom: 24 }}>
          <div style={{ borderLeft: `3px solid ${tier.tierColor}`, paddingLeft: 10, marginBottom: 10 }}>
            <h2 style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 14, fontWeight: 700, color: tier.tierColor, margin: 0 }}>{tier.tier}</h2>
          </div>
          {tier.categories.map((cat) => {
            const io = exp === cat.name; const fg = cat.gaps.filter((g) => fi === "all" || g.impact === fi);
            if (!fg.length && fi !== "all") return null;
            return (
              <div key={cat.name} style={{ background: "#0e0e16", border: "1px solid #1a1a2a", borderRadius: 8, marginBottom: 6, overflow: "hidden" }}>
                <div onClick={() => setExp(io ? null : cat.name)} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", padding: "10px 14px", gap: 12, cursor: "pointer" }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(99,102,241,0.06)"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff" }}>{cat.name}</span>
                      <span style={{ fontSize: 9, color: "#555", background: "#1a1a2a", padding: "1px 6px", borderRadius: 3 }}>{cat.parent.length > 55 ? cat.parent.slice(0, 55) + "…" : cat.parent}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.volume}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    {cat.existing.length > 0 && <span style={{ fontSize: 10, color: "#71717a" }}>{cat.existing.length}</span>}
                    <span style={{ fontSize: 10, color: tier.tierColor, fontWeight: 600 }}>{fg.length} gap{fg.length !== 1 ? "s" : ""}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#555", transition: "transform 0.2s", transform: io ? "rotate(90deg)" : "none" }}>▶</span>
                </div>
                {io && (
                  <div style={{ padding: "0 14px 14px", borderTop: "1px solid #1a1a2a" }}>
                    {cat.analysis && <div style={{ marginTop: 10, marginBottom: 12 }}>
                      <button onClick={(e) => { e.stopPropagation(); ta(cat.name); }} style={{ cursor: "pointer", fontSize: 10, color: "#6366f1", background: "none", border: "1px solid #6366f133", padding: "2px 8px", borderRadius: 3, fontFamily: "inherit" }}>
                        {sa.has(cat.name) ? "▾ Hide analysis" : "▸ Show analysis"}
                      </button>
                      {sa.has(cat.name) && <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.6, marginTop: 8, padding: "8px 10px", background: "#111118", borderRadius: 6, borderLeft: "2px solid #6366f1" }}>
                        {cat.analysis}
                        {cat.removed && <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #1a1a2a" }}><span style={{ color: "#ef4444", fontWeight: 500, fontSize: 10 }}>REMOVED: </span><span style={{ color: "#71717a" }}>{cat.removed}</span></div>}
                      </div>}
                    </div>}
                    {cat.existing.length > 0 && <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.06em", marginBottom: 6 }}>WHAT EXISTS TODAY</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {cat.existing.map((e) => <span key={e} style={{ fontSize: 10, color: "#71717a", background: "#111118", padding: "4px 8px", borderRadius: 4, border: "1px solid #1a1a2a", lineHeight: 1.3 }}>{e}</span>)}
                      </div>
                    </div>}
                    <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.06em", marginBottom: 6 }}>{!cat.existing.length ? "PROPOSED MARKETS" : "EXPANSION OPPORTUNITIES"} ({fg.length})</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{fg.map((g) => G(g, cat.name))}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {vm === "all_gaps" && <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 10, color: "#555", marginBottom: 8 }}>{ag.length} total · by volume tier</div>
        {ag.map((g) => (
          <div key={g.id} style={{ display: "grid", gridTemplateColumns: "22px minmax(0,130px) minmax(0,1fr) auto auto", alignItems: "center", gap: 8, background: "#0e0e16", border: `1px solid ${st.has(g.id) ? "#eab308" : "#1a1a2a"}`, borderRadius: 5, padding: "7px 10px" }}>
            <button onClick={() => ts(g.id)} style={{ cursor: "pointer", background: "none", border: "none", fontSize: 13 }}>{st.has(g.id) ? "★" : "☆"}</button>
            <div style={{ overflow: "hidden" }}><div style={{ fontSize: 10, color: g.tc, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.cn}</div></div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 11, color: "#e4e4e7", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.idea}</div>
              <div style={{ fontSize: 9, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.rationale}</div>
            </div>
            <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, fontWeight: 600, background: IS[g.impact].bg, color: IS[g.impact].text, whiteSpace: "nowrap" }}>{g.impact.toUpperCase()}</span>
            <span style={{ fontSize: 9 }}>{g.effort === "low" ? "🟢" : g.effort === "medium" ? "🟡" : "🔴"}</span>
          </div>
        ))}
      </div>}

      {vm === "starred" && <div>
        {!sg.length ? <div style={{ textAlign: "center", padding: 40, color: "#555", fontSize: 12 }}>Click ☆ to shortlist.</div> :
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 10, color: "#eab308", marginBottom: 4 }}>★ {sg.length} shortlisted</div>
          {sg.map((g) => (
            <div key={g.id} style={{ background: "#0e0e16", border: "1px solid #eab30844", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${IS[g.impact].bg}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => ts(g.id)} style={{ cursor: "pointer", background: "none", border: "none", fontSize: 15, padding: 2 }}>★</button>
                    <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff" }}>{g.idea}</span>
                  </div>
                  <div style={{ fontSize: 10, color: g.tc, marginTop: 2, paddingLeft: 26 }}>{g.cn}</div>
                  <div style={{ fontSize: 11, color: "#71717a", marginTop: 4, lineHeight: 1.5, paddingLeft: 26 }}>{g.rationale}</div>
                  {g.estVolume && <div style={{ fontSize: 10, color: "#6366f1", marginTop: 4, paddingLeft: 26, fontWeight: 500 }}>Est. volume: {g.estVolume}</div>}
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, fontWeight: 600, background: IS[g.impact].bg, color: IS[g.impact].text }}>{g.impact.toUpperCase()}</span>
                  <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, background: "#1a1a2a", color: "#71717a" }}>{EL[g.effort]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>}
    </div>
  );
}
