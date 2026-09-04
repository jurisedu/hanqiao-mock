# HanQiao 汉桥 · platform mockup

Interactive mockup of the GACEE Chinese learning platform (learn.gacee.org), built from the HanQiao feasibility and architecture plan. Every screen renders sample data; nothing is stored.

- Roles: learner (`/learn`), teacher (`/teach`), operations (`/ops`), school admin (`/school`), enterprise HR (`/enterprise`), certificate verification (`/certificate/[id]`), app showcase (`/app`), sign-in (`/login`).
- Languages: 中文 · English · Kiswahili, switchable on every page (`lib/i18n.tsx`, strings inline as `t3(zh, en, sw)`).
- 3D: `components/Globe3D.tsx` (three-segment network globe) and `components/Constellation3D.tsx` (knowledge map coloured by calibrated mastery), both three.js.
- Concepts shown: Agent roster and four-layer memory, TIDAR KAG provenance and abstention, two-agent grading with teacher sign-off, propose → approve → execute with hash chain, three-level live degradation, offline packs and shared devices, library linked to publishing and Future Academy, AgentOps traces, compliance register, seat billing.

```bash
npm install
npm run dev
```

GACEE × Juris&Edu AI Technology · preview only.
