import { useState, useMemo } from "react";

const ASSESS = [
  { id: 1, idea: "VP Nominee Markets", tier: "T1", category: "Presidential", vol: "$90-180M", regRisk: "low", woc: "high", effort: "low",
    regDetail: "Political event contracts won court approval in Oct 2024 (Kalshi v. CFTC). VP speculation is derivative of the most-established prediction market category. No unique regulatory concern.",
    wocDetail: "Prediction markets outperformed polls in 2024 — correctly calling 6/7 swing states and 24/27 Senate races. VP markets extend this proven information aggregation. Political operatives, donors, and media could use VP market pricing as a real-time signal of perceived ticket strength.",
    evidence: ["2024 presidential market: $3.3B volume (Polymarket)", "Dem Nominee 2028: $922.9M as of Mar 27 2026", "2028 Election tag: 118 markets, $1.7B aggregate", "VP selection drove weeks of media coverage in 2024", "PredictIt historically had VP markets with strong engagement", "No regulatory challenge to existing nominee markets"] },
  { id: 2, idea: "Primary State-by-State Winners", tier: "T1", category: "Presidential", vol: "$50-100M", regRisk: "low", woc: "high", effort: "med",
    regDetail: "Same regulatory footing as existing election markets. PredictIt operated state primary markets for years.",
    wocDetail: "State-level primary prediction is where crowd wisdom adds the most value — national polls don't capture state dynamics, delegate math, or ground-game effects. Primary markets provided leading signals of Biden withdrawal pressure weeks before announcement in 2024.",
    evidence: ["PredictIt had deep state primary coverage", "National polls failed to predict Iowa/NH outcomes in multiple cycles", "Sequential engagement Jan-Mar", "Certified state results = unambiguous resolution"] },
  { id: 3, idea: "Player Props — Per-Game O/U", tier: "T1", category: "Sports", vol: "$100M+/yr", regRisk: "high", woc: "low", effort: "med",
    regDetail: "HIGHEST REGULATORY RISK. CFTC Advisory (Mar 12 2026) specifically states individual player performance contracts 'may be viewed more skeptically.' Bipartisan 'Prediction Markets Are Gambling Act' (Schiff/Curtis, Mar 2026) seeks to ban sports contracts. Arizona criminal charges against Kalshi. CFTC flagged concerns about 'players throwing games or altering their personal performance.'",
    wocDetail: "Low WoC benefit. Sportsbooks (FanDuel, DraftKings) already price player props with high efficiency. Prediction market pricing would not produce meaningfully better information. Value proposition is access and format, not information quality.",
    evidence: ["CFTC Staff Advisory No. 26-08 (Mar 12 2026): individual performance viewed skeptically", "Prediction Markets Are Gambling Act introduced Mar 2026", "Arizona AG criminal charges against Kalshi (Mar 17 2026)", "CFTC ANPRM (Mar 16 2026) asks about manipulation susceptibility", "Kalshi preemptively blocking athletes from trading (Mar 23 2026)", "Player props are highest-volume sportsbook segment"] },
  { id: 4, idea: "Player Props — Season Average O/U", tier: "T1", category: "Sports", vol: "$20-50M/yr", regRisk: "medium", woc: "low", effort: "med",
    regDetail: "Lower risk than per-game. CFTC Advisory notes 'aggregate performance over extended period' is more acceptable — reduces single-actor manipulation. Still under sports regulatory scrutiny.",
    wocDetail: "Marginal. Season-long markets aggregate more info but sportsbooks already price season props.",
    evidence: ["CFTC Advisory: aggregate/extended-period = more defensible", "Season averages resolve on final regular season game", "Less susceptible to single-game manipulation"] },
  { id: 5, idea: "NHL / Golf / League Expansion", tier: "T1", category: "Sports", vol: "$50-130M/yr", regRisk: "high", woc: "low", effort: "med",
    regDetail: "Same regulatory risk as all sports. CFTC ANPRM and state challenges apply across all categories. Gambling Act would ban all sports contracts.",
    wocDetail: "Low. Sportsbooks already cover with deep liquidity.",
    evidence: ["NHL: 4th major US sport, zero Polymarket coverage", "Golf: top-5 betting handle", "All subject to same regulatory uncertainty as existing sports"] },
  { id: 6, idea: "Award Markets (MVP, ROY, Cy Young)", tier: "T1", category: "Sports", vol: "$20-50M/yr", regRisk: "medium", woc: "medium", effort: "low",
    regDetail: "Lower risk than game outcomes. Resolve based on media member voting, not game results. Less susceptible to athlete manipulation. CFTC has not specifically flagged award markets.",
    wocDetail: "Moderate. Prediction markets could provide useful consensus signal on MVP races. Sportsbooks offer but with less efficient pricing.",
    evidence: ["Awards resolve via media voting (BBWAA)", "Less susceptible to manipulation", "Season-long duration = sustained engagement"] },
  { id: 7, idea: "Win Total O/U", tier: "T1", category: "Sports", vol: "$20-40M/yr", regRisk: "medium", woc: "medium", effort: "low",
    regDetail: "Moderate. Win totals aggregate across entire season. CFTC Advisory notes aggregate/extended-period = more defensible.",
    wocDetail: "Moderate. Season-long totals aggregate injury info, roster changes, schedule strength. Tradeable positions create dynamic consensus tracker.",
    evidence: ["CFTC Advisory: aggregate extended period = more defensible", "162-game MLB / 82-game NBA = many data points", "Sportsbook staple with proven demand"] },
  { id: 8, idea: "In-Game Live Markets", tier: "T1", category: "Sports", vol: "$50-100M+", regRisk: "high", woc: "low", effort: "hard",
    regDetail: "Very high risk. Combines manipulation concerns with ultra-short duration. A player could intentionally affect a Q1 outcome. CFTC flagged single-actor manipulation.",
    wocDetail: "Very low. Entertainment product, not information aggregation.",
    evidence: ["CFTC: single-actor manipulation = most skeptical", "Combines two high-risk features", "Technically challenging"] },
  { id: 9, idea: "Reconciliation / Omnibus Passage", tier: "T2", category: "Congress", vol: "$15-30M", regRisk: "low", woc: "high", effort: "med",
    regDetail: "Legislative markets well-established. Shutdown markets ($53.5M historical) operate without challenge. Same resolution mechanics.",
    wocDetail: "High. Aggregates info from lobbyists, Hill staffers, analysts. Financial markets could use this signal to hedge policy risk.",
    evidence: ["Gov Shutdown: 613 tagged markets, $53.5M+ historical on main market", "Reconciliation affects taxes, spending, deficit", "Official congressional vote records = clean resolution"] },
  { id: 10, idea: "Debt Ceiling Markets", tier: "T2", category: "Congress", vol: "$10-30M", regRisk: "low", woc: "high", effort: "low",
    regDetail: "Same footing as shutdown markets. Legislative/fiscal event. Clean Treasury resolution.",
    wocDetail: "Very high. 2011 crisis led to first US credit downgrade. No efficient mechanism to trade this specific probability. Bond traders and portfolio managers could use the signal.",
    evidence: ["2011 crisis: first US credit downgrade, S&P 500 -17%", "2023 crisis: Treasury bill yield spikes", "No existing derivative cleanly isolates debt ceiling probability"] },
  { id: 11, idea: "Trump Truth Social Post Count", tier: "T2", category: "Mentions", vol: "$15-25M/yr", regRisk: "low", woc: "medium", effort: "med",
    regDetail: "Least controversial category. Elon tweet markets ($16.4M, 130 markets) well-established. No manipulation, gambling, or insider trading concern.",
    wocDetail: "Moderate. Presidential social media activity correlates with policy direction. Unusual posting patterns often precede major announcements.",
    evidence: ["Elon tweet markets: $16.4M vol, 130 active markets", "Custom xtracker.polymarket.com infrastructure exists", "Polymarket published 'Tweet Quant' quantitative newsletter", "Trump posting patterns correlate with policy activity"] },
  { id: 12, idea: "Net Seats Gained/Lost (Midterms)", tier: "T2", category: "Elections", vol: "$10-30M", regRisk: "low", woc: "high", effort: "med",
    regDetail: "Election markets most legally validated category after 2024 Kalshi court victory.",
    wocDetail: "Very high. Aggregating crowd wisdom across 435 races into single number = real-time midterm forecast. Campaigns, PACs, media could use for resource allocation. Currently only exists via slowly-updating pundit models.",
    evidence: ["Individual House races: $0-$6K each — fragmentation problem", "Media discusses midterms as 'net seats gained'", "2024 markets proved superior to polls and pundit forecasts"] },
  { id: 13, idea: "FDA Drug Approval (PDUFA dates)", tier: "T4", category: "Health & Biotech", vol: "$50-150M/yr", regRisk: "medium", woc: "high", effort: "hard",
    regDetail: "Moderate risk — insider trading concern (FDA reviewers, pharma employees may have MNPI). CFTC ANPRM asks about insider info treatment. But same risk exists in biotech stock trading (regulated by SEC). Would need robust surveillance and restricted-person policies.",
    wocDetail: "Very high — potentially highest WoC-value new category. Genuinely uncertain events where crowd probability adds unique value. PDUFA.bio's ODIN AI scores 93.6% TIER_1 accuracy — proves demand for probabilistic forecasting. Signal could inform investment decisions, clinical priorities, patient access planning.",
    evidence: ["40+ PDUFA dates/year with known exact dates", "Q1 2026: 8 major PDUFA events", "FDA approves >90% of drugs at TIER_1 status", "Stock moves 20-50%+ on PDUFA day", "PDUFA.bio ODIN AI: 93.6% TIER_1 accuracy", "Tracking ecosystem: fdatracker.com, pdufa.bio, biopharmawatch.com, RTTNews, CatalystAlert", "ZERO FDA/clinical trial markets on Polymarket", "Resolution: FDA.gov official announcements — unambiguous"] },
  { id: 14, idea: "ADCOMM Vote Markets", tier: "T4", category: "Health & Biotech", vol: "$10-50M/yr", regRisk: "medium", woc: "high", effort: "hard",
    regDetail: "Same insider concerns as PDUFA but ADCOMM meetings are public webcasts — reduces risk. More defensible than PDUFA outcome markets.",
    wocDetail: "High. ADCOMM recommendations strongly influence FDA final decisions. Market aggregates expert opinion on clinical data quality and safety signals.",
    evidence: ["ADCOMM votes precede PDUFA by weeks — two events per drug", "Public webcasts — votes happen live", "Favorable recommendation strongly predicts approval"] },
  { id: 15, idea: "Clinical Trial Phase 3 Readouts", tier: "T4", category: "Health & Biotech", vol: "$20-80M/yr", regRisk: "high", woc: "high", effort: "hard",
    regDetail: "Higher insider risk — investigators, CRO employees, DSMB members may know results before announcement. SEC already monitors biotech stock trading around readouts. Would require robust surveillance.",
    wocDetail: "Very high. Drug development ~10% success rate Phase 1 to approval. Crowd-sourced Phase 3 probability could inform investment, pipeline prioritization, patient planning.",
    evidence: ["Phase 3: ~60% success rate (genuinely uncertain)", "Known timelines via ClinicalTrials.gov", "Billions in company value at stake per readout", "SEC already monitors biotech trading around readouts"] },
  { id: 16, idea: "Criminal Trial Verdict Markets", tier: "T4", category: "Legal & Courts", vol: "$3-10M/trial", regRisk: "medium", woc: "medium", effort: "med",
    regDetail: "Moderate ethical concern — 'betting on justice.' But 105 SCOTUS markets already exist ($2.0M) without controversy. Best suited to white-collar and public-interest cases, not violent crime.",
    wocDetail: "Moderate. FantasySCOTUS shows crowd predictions can outperform individual experts. Useful for legal strategy and media planning.",
    evidence: ["105 SCOTUS markets already on Polymarket ($2.0M)", "Tariff case: $9M+ combined cross-platform", "FantasySCOTUS demonstrates crowd accuracy", "Kalshi has SCOTUS & Courts category"] },
  { id: 17, idea: "Promote Courts/Legal to Top-Level Nav", tier: "T4", category: "Legal & Courts", vol: "Structural", regRisk: "low", woc: "high", effort: "low",
    regDetail: "No additional risk — markets already exist. UI change only.",
    wocDetail: "High. Visibility = volume = information quality. AI was promoted from subtag to nav item. Same treatment could unlock existing 105 markets.",
    evidence: ["105 SCOTUS markets active", "AI promoted from subtag to top-level nav", "Kalshi already has dedicated Courts section"] },
  { id: 18, idea: "National Housing Aggregates + Nav Promotion", tier: "T4", category: "Real Estate", vol: "$5-15M + structural", regRisk: "low", woc: "medium", effort: "low",
    regDetail: "No regulatory concern. Economic indicator markets = least controversial category. Resolution via Freddie Mac, NAR, S&P.",
    wocDetail: "Moderate. Mortgage rate prediction aggregates expectations from agents, brokers, buyers, economists. Practical value for homebuyer timing decisions. But existing sources already provide authoritative data.",
    evidence: ["110 Real Estate tagged ($19.1M) + 120 Housing + 101 Mortgage markets exist", "City-level markets too granular ($1.7-15.5K each)", "Mortgage thresholds already have resolution infrastructure (Freddie Mac PMMS)", "330+ markets scattered across multiple tags — promotion concentrates attention"] },
  { id: 19, idea: "Tariff Rate Decision Markets", tier: "T1", category: "Geopolitics", vol: "$10-30M/decision", regRisk: "medium", woc: "high", effort: "low",
    regDetail: "Moderate insider risk — government officials in trade negotiations may have advance knowledge. CFTC ANPRM asks about insider info. But SCOTUS tariff market already exists at $9M+ without enforcement.",
    wocDetail: "High. Tariff decisions affect supply chains, consumer prices, international trade. Real-time signal for importers, manufacturers to hedge. No efficient existing mechanism.",
    evidence: ["SCOTUS tariff ruling: $9M+ cross-platform", "SCOTUS struck down legal basis for 2025 tariffs (Feb 2026)", "201 Trade War markets prove demand", "Government insider risk — CFTC asking in ANPRM"] },
  { id: 20, idea: "Starship Flight Milestones", tier: "T4", category: "Space", vol: "$3-8M/flight", regRisk: "low", woc: "medium", effort: "low",
    regDetail: "No regulatory concern. Binary physical events. SpaceX announces schedules publicly.",
    wocDetail: "Moderate. Aggregates info from aerospace engineers and analysts. Less economically actionable but high engagement.",
    evidence: ["17 Space markets under Climate & Science", "SpaceX IPO: $60M+ under Finance", "Starship flights: scheduled, binary, massively covered"] },
];

const RS = { low: { bg: "#22c55e22", border: "#22c55e", text: "#22c55e", label: "Low" }, medium: { bg: "#eab30822", border: "#eab308", text: "#eab308", label: "Med" }, high: { bg: "#ef444422", border: "#ef4444", text: "#ef4444", label: "High" } };
const WS = { low: { bg: "#4b556322", text: "#9ca3af", label: "Low" }, medium: { bg: "#6366f122", text: "#818cf8", label: "Med" }, high: { bg: "#8b5cf622", text: "#a78bfa", label: "High" } };
const TC = { T1: "#22c55e", T2: "#eab308", T3: "#a855f7", T4: "#ef4444" };

export default function App() {
  const [expanded, setExpanded] = useState(null);
  const [sortBy, setSortBy] = useState("vol");
  const [filterReg, setFilterReg] = useState("all");

  const sorted = useMemo(() => {
    let items = [...ASSESS];
    if (filterReg !== "all") items = items.filter(a => a.regRisk === filterReg);
    if (sortBy === "reg") return items.sort((a, b) => ({ low: 0, medium: 1, high: 2 })[a.regRisk] - ({ low: 0, medium: 1, high: 2 })[b.regRisk]);
    if (sortBy === "woc") return items.sort((a, b) => ({ high: 0, medium: 1, low: 2 })[a.woc] - ({ high: 0, medium: 1, low: 2 })[b.woc]);
    return items;
  }, [sortBy, filterReg]);

  return (
    <div style={{ fontFamily: "'IBM Plex Mono','JetBrains Mono',monospace", background: "#08080e", color: "#d4d4d8", minHeight: "100vh", padding: 20 }}>
      

      <div style={{ borderBottom: "1px solid #1a1a2a", paddingBottom: 14, marginBottom: 16 }}>
        <h1 style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Polymarket Assessment Matrix</h1>
        <p style={{ fontSize: 11, color: "#71717a", margin: "6px 0 0", lineHeight: 1.6 }}>
          {sorted.length} high-impact candidates · Regulatory risk, WoC value, est. volume · All figures verified Mar 27, 2026 (tag-based counting)
        </p>
        <p style={{ fontSize: 10, color: "#555", margin: "4px 0 0", lineHeight: 1.5, fontStyle: "italic" }}>
          Regulatory analysis incorporates: CFTC ANPRM (Mar 16 2026), Staff Advisory No. 26-08 (Mar 12 2026), Prediction Markets Are Gambling Act (Schiff/Curtis, Mar 2026), Arizona criminal charges (Mar 17 2026), CFTC Enforcement Advisory on insider trading (Feb 2026).
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 3 }}>
          <span style={{ fontSize: 9, color: "#555", marginRight: 4, lineHeight: "22px" }}>SORT:</span>
          {[{ k: "vol", l: "By volume" }, { k: "reg", l: "By reg. risk" }, { k: "woc", l: "By WoC value" }].map((s) => (
            <button key={s.k} onClick={() => setSortBy(s.k)} style={{ padding: "4px 10px", borderRadius: 4, fontSize: 9, fontFamily: "inherit", border: `1px solid ${sortBy === s.k ? "#6366f1" : "#222"}`, background: sortBy === s.k ? "#6366f1" : "transparent", color: sortBy === s.k ? "#fff" : "#71717a", cursor: "pointer" }}>{s.l}</button>
          ))}
        </div>
        <div style={{ width: 1, height: 16, background: "#222" }} />
        <div style={{ display: "flex", gap: 3 }}>
          <span style={{ fontSize: 9, color: "#555", marginRight: 4, lineHeight: "22px" }}>REG RISK:</span>
          {["all", "low", "medium", "high"].map((f) => (
            <button key={f} onClick={() => setFilterReg(f)} style={{ padding: "3px 9px", borderRadius: 3, fontSize: 9, fontFamily: "inherit", border: "none", cursor: "pointer", background: filterReg === f ? (RS[f]?.bg || "#6366f1") : "#1a1a2a", color: filterReg === f ? (RS[f]?.text || "#fff") : "#71717a", fontWeight: 500 }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 90px 70px 70px 70px 20px", gap: 8, padding: "6px 14px", fontSize: 9, color: "#555", letterSpacing: "0.04em", borderBottom: "1px solid #1a1a2a", marginBottom: 4 }}>
        <span>CANDIDATE</span><span>EST. VOLUME</span><span>REG RISK</span><span>WoC VALUE</span><span>EFFORT</span><span></span>
      </div>

      {sorted.map((a) => {
        const isOpen = expanded === a.id;
        return (
          <div key={a.id} style={{ background: isOpen ? "#0e0e18" : "#0e0e16", border: `1px solid ${isOpen ? "#6366f133" : "#1a1a2a"}`, borderRadius: 6, marginBottom: 4, overflow: "hidden" }}>
            <div onClick={() => setExpanded(isOpen ? null : a.id)} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 90px 70px 70px 70px 20px", gap: 8, padding: "10px 14px", alignItems: "center", cursor: "pointer" }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(99,102,241,0.04)"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 9, color: TC[a.tier], fontWeight: 600, flexShrink: 0 }}>{a.tier}</span>
                  <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.idea}</span>
                </div>
                <div style={{ fontSize: 9, color: "#555", marginTop: 1 }}>{a.category}</div>
              </div>
              <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 500 }}>{a.vol}</span>
              <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: RS[a.regRisk].bg, color: RS[a.regRisk].text, fontWeight: 500, textAlign: "center" }}>{RS[a.regRisk].label}</span>
              <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: WS[a.woc].bg, color: WS[a.woc].text, fontWeight: 500, textAlign: "center" }}>{WS[a.woc].label}</span>
              <span style={{ fontSize: 9, textAlign: "center" }}>{a.effort === "low" ? "🟢" : a.effort === "med" ? "🟡" : "🔴"}</span>
              <span style={{ fontSize: 11, color: "#555", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }}>▶</span>
            </div>
            {isOpen && (
              <div style={{ padding: "0 14px 14px", borderTop: "1px solid #1a1a2a" }}>
                <div style={{ marginTop: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 500, color: RS[a.regRisk].text, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: RS[a.regRisk].border }} />Regulatory risk: {RS[a.regRisk].label}
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.6, padding: "8px 10px", background: "#111118", borderRadius: 6, borderLeft: `2px solid ${RS[a.regRisk].border}` }}>{a.regDetail}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 500, color: WS[a.woc].text, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: WS[a.woc].text }} />Wisdom-of-crowds value: {WS[a.woc].label}
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.6, padding: "8px 10px", background: "#111118", borderRadius: 6, borderLeft: `2px solid ${WS[a.woc].text}` }}>{a.wocDetail}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: "#71717a", marginBottom: 6 }}>Evidence ({a.evidence.length} points)</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {a.evidence.map((e, i) => (
                      <div key={i} style={{ fontSize: 11, color: "#71717a", lineHeight: 1.5, padding: "4px 0 4px 12px", borderLeft: "1px solid #1a1a2a", position: "relative" }}>
                        <span style={{ position: "absolute", left: -3, top: 8, width: 5, height: 5, borderRadius: "50%", background: "#333" }} />{e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: 24, padding: 14, background: "#0e0e16", border: "1px solid #1a1a2a", borderRadius: 8, fontSize: 10, color: "#555", lineHeight: 1.8 }}>
        <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, color: "#71717a", marginBottom: 6 }}>Methodology</div>
        <div><span style={{ color: "#9ca3af" }}>Data collection</span> — market counts and volumes sourced from Polymarket prediction tag pages. Tag totals are used (not subcategory grid counts) because markets are cross-tagged across categories, and tag totals represent total exposure. All figures verified March 27, 2026.</div>
        <div><span style={{ color: "#9ca3af" }}>Regulatory risk</span> — assessed against CFTC ANPRM (Mar 16 2026), Staff Advisory No. 26-08 (Mar 12 2026), Prediction Markets Are Gambling Act (Schiff/Curtis, Mar 2026), Arizona criminal charges (Mar 17 2026), CFTC Enforcement Advisory on insider trading (Feb 2026).</div>
        <div><span style={{ color: "#9ca3af" }}>Wisdom-of-crowds value</span> — does crowd-sourced probability produce useful signal beyond existing sources? Scored on: (1) information dispersion, (2) genuine uncertainty, (3) actionability, (4) absence of efficient alternatives.</div>
        <div><span style={{ color: "#9ca3af" }}>Estimated volume</span> — derived from comparable existing markets, traditional analogs (sportsbook handle, options volume), and audience estimates. All figures are estimates, not forecasts.</div>
      </div>
    </div>
  );
}
