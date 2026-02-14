# Legal TechTrumps

A Top Trumps-style evaluation platform for legal technology solutions. Rate, compare, and battle-test legal tech products across standardised criteria — all presented as collectible cards with tier rankings.

## Features

- **Dashboard Cards** — Each solution is a flippable Top Trumps card with a coloured tier border (Legendary, Epic, Rare, Common). Front face shows all 7 general ratings at a glance; back face shows evaluation area scores, strengths/weaknesses, and actions.
- **Battle Mode** — Pick two solutions and face them off head-to-head. Cards display side-by-side with stat-by-stat win/loss highlighting and a crown on the winner.
- **Tier System** — Solutions are automatically ranked based on their overall power rating:
  - 🟡 **Legendary** (≥ 4.5) — Gold border
  - 🟣 **Epic** (≥ 3.5) — Purple border
  - 🔵 **Rare** (≥ 2.5) — Blue border
  - ⚪ **Common** (< 2.5) — Grey border
- **Shortlist** — Star your top picks for quick filtering.
- **Detailed Solution Pages** — Full breakdowns with radar charts, bar charts, rating history, and editable scores.
- **Import/Export** — Back up your data as JSON or share it between machines.
- **LocalStorage Persistence** — Everything saves automatically in your browser.

## Tech Stack

React 19 · TypeScript · Vite 7 · React Router 7 · Recharts · Plain CSS with custom properties

## Setup

```bash
git clone https://github.com/KilgoreHerring/LegalTechTrumps.git
cd LegalTechTrumps
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Adding a New Solution

1. Click **+ Add Solution** in the header.
2. Fill in the basics:
   - **Name** — The product name (e.g. "Legora")
   - **Category** — Pick from 11 legal tech categories (Legal AI, Contract Negotiation, Document Automation, etc.)
   - **Description** — Brief overview of what it does
   - **USP** — Its unique selling point
   - **Vendor** — Name, website, and contact email
   - **Logo URL** — A direct link to the product logo (displayed on the card)
3. Select which **Evaluation Areas** apply to this solution (up to 6 areas like Contract Review, Legal Research, Document Automation, etc.)
4. Save — the solution appears on the dashboard as an unrated card.

## Rating a Solution

### General Ratings (the 7 stats on every card)

From the solution's detail page, rate each of these on a 1–5 scale:

| Criterion | What to consider |
|-----------|-----------------|
| **UI & UX** | Interface quality, ease of use, design |
| **Accuracy** | Reliability of outputs and analysis |
| **Speed** | Performance and responsiveness |
| **Integrations** | Available connections to other tools |
| **Customer Support** | Vendor responsiveness and helpfulness |
| **Pricing** | Value for money, pricing transparency |
| **Security** | Certifications, data protection, compliance |

These 7 scores determine the card's **Power Rating** (the weighted average shown prominently on the front) and its **tier ranking**.

### Evaluation Area Ratings (deep-dive scoring)

Each evaluation area has its own set of specific features to rate (also 1–5). For example, "Contract and Document Review" has 11 features including AI Clause Identification, Risk Flagging, Redlining, and Bulk Processing.

Area scores appear on the **back of the card** and feed into the Battle Mode comparisons.

### Rating Tips

- **0 = Not rated** — leave at 0 if you haven't evaluated that criterion yet
- **1 = Poor**, **2 = Below Average**, **3 = Average**, **4 = Good**, **5 = Excellent**
- All rating changes are tracked in the solution's history with timestamps
- Set a **Next Review Date** to remind yourself to re-evaluate

## Data

All data lives in your browser's localStorage under the key `legal-tech-eval-solutions`. Use **Settings → Export** to download a JSON backup, and **Settings → Import** to restore it.

## Project Structure

```
src/
├── components/        # UI components (cards, forms, charts, layout)
├── context/           # React Context + useReducer state management
├── data/              # Category, criteria, and evaluation area definitions
├── hooks/             # Custom hooks (solutions, comparison, filtering)
├── pages/             # Route pages (Dashboard, Solution, Comparison, Settings)
├── types/             # TypeScript type definitions
└── utils/             # Scoring, filtering, and storage utilities
```

## License

MIT
