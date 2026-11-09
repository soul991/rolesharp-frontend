# RoleSharp 2.0 — Executive Career Advancement Studio

RoleSharp 2.0 is a clean-room, evidence-grounded career advancement studio built with **React 19**, **TypeScript**, and **Vite**.

Designed as a premium editorial career platform rather than a generic SaaS AI dashboard, RoleSharp replaces robotic AI-slop, unevidenced resume claims, and aggressive bot automation with verified career trajectories, deterministic ATS diagnostics, and human-in-the-loop application dispatching.

---

## 1. Architectural Principles & Clean-Room Standard

- **Clean-Room Engineering**: Completely authored from scratch with zero legacy frontend inheritance, zero copied styles, and zero unverified dependencies.
- **Evidence-First Guarantee**: RoleSharp never fabricates achievements, falsifies employer titles, or hallucinates metrics. All calibrated bullet points are anchored strictly to verified candidate history.
- **Independent Ethical Scoring**: Fit / Compatibility scores and Evidence Confidence metrics are strictly independent. RoleSharp never frames compatibility as an interview or hiring guarantee.
- **Zero-Scraping Integrity**: RoleSharp rejects unauthorized scraping, account credential harvesting, and captcha circumvention. All profile optimizations are client-applied, and outbound applications require explicit one-time human approval.
- **Invariant Paper Preview Surfaces**: Document previews (`/tailor`, `/resume-builder`, `/cover-letter`, `/interview`) strictly maintain invariant `#FFFFFF` paper backgrounds with `#172B48` ink in both light and dark themes to guarantee print and ATS parsing fidelity.

---

## 2. The 5 Superdesign Interaction Patterns

RoleSharp integrates five signature Superdesign interaction patterns designed to elevate candidate agency and transparency:

| # | Pattern | Component Path | Screen Integration | Interaction Highlights |
|---|---|---|---|---|
| 1 | **Resume Writing Animation** | `src/components/resume/ResumeWritingAnimation.tsx` | `/tailor` | Progressive line reveal on invariant white paper sheet with moving pen nib cursor, realistic typing cadence, and live 0–100% calibration progress. |
| 2 | **Animated Stepper** | `src/components/common/AnimatedStepper.tsx` | `/onboarding` | Continuous track with active progress fill, completed checkmarks, current step amber ring, and accessible ARIA attributes across 6 onboarding stages. |
| 3 | **Interactive Card Stack** | `src/components/resume/TemplateCardStack.tsx` | `/resume-builder` | 3D perspective deck cycling between 4 ATS-tested templates (Classic Editorial, Modern Executive, Technical Depth, Compact Single-Page) with hover fan-out. |
| 4 | **Animated List** | `src/components/common/AnimatedList.tsx` | `/cover-letter` | Accessible radiogroup with keyboard navigation (`Enter`/`Space`), active checkmark badge, and subtle hover translation for selecting tones (`formal`, `warm`, `direct`). |
| 5 | **Pricing Section** | `src/components/pricing/PricingSection.tsx` | `/pricing`, `/billing` | Monthly/annual billing toggle with 20% discount badge, student discount banner (50% off for `.edu`), 3 tiered plan cards, and interactive FAQ accordion. |

---

## 3. Comprehensive Route & Screen Matrix (25 Registered Routes / 24 Unique Page Components)

RoleSharp organizes the entire candidate journey into five distinct stages of career velocity across 25 registered URL paths (rendered via 24 unique page components, addressing the original 18 core product concept screens):

- **Registered URL Routes**: 25 routes (`/`, `/dashboard`, `/login`, `/signup`, `/onboarding`, `/checker`, `/cover-letter-analyzer`, `/tailor`, `/resume-builder`, `/resumes`, `/cover-letter`, `/linkedin`, `/interview`, `/auto-apply`, `/jobs`, `/daily-matches`, `/tracker`, `/pricing`, `/billing`, `/settings`, `/tools`, `/about`, `/help`, `/privacy`, `/terms`).
- **Unique Page Components**: 24 components (`LandingPage`, `DashboardPage`, `LoginPage`, `SignupPage`, `OnboardingPage`, `ATSCheckerPage`, `CoverLetterAnalyzerPage`, `ResumeTailorPage`, `ResumeBuilderPage`, `MyResumesPage`, `CoverLetterPage`, `LinkedInOptimizerPage`, `InterviewStudioPage`, `AutoApplyPage`, `JobFinderPage`, `DailyMatchesPage`, `TrackerPage`, `PricingPage`, `BillingPage`, `SettingsPage`, `ToolsCataloguePage`, `AboutPage`, `HelpPage`, `LegalPage`).
- **Core Product Screens**: 18 functional requirements screens defined in initial product PRD.

### Check (Diagnostics & Validation)
- `/checker` — **In-Memory ATS Analyzer**: Multipart file upload (PDF/DOCX/TXT), 88/100 score ring, 4 category breakdowns (Formatting Safety, Metric Density, Keyword Coverage, Executive Voice), and anchored evidence gaps.
- `/cover-letter-analyzer` — **Cover Letter Diagnostics**: In-memory text audit checking length (250–400 words), quantified evidence ratio, company alignment, and cliché/buzzword detection.

### Tailor (Strategic Calibration)
- `/tailor` — **Job-Calibrated Tailoring Studio**: Job requirements intake, Superdesign Resume Writing Animation, and grounded before/after diff review with bullet-by-bullet accept/reject controls.
- `/resume-builder` — **Structured Resume Builder**: Section editor with Superdesign Interactive Card Stack template switcher and live ATS-compliant preview.
- `/resumes` — **Document Repository & Versions**: Master executive profile, tailored variants, duplication, and PDF/DOCX downloads.

### Prepare (Interview & Recruiter Calibration)
- `/cover-letter` — **Evidence Cover Letter Generator**: Superdesign Animated List tone selector (`formal`, `warm`, `direct`), grounded draft synthesis, and invariant white paper preview.
- `/linkedin` — **LinkedIn Profile Optimizer**: Ethical zero-scraping optimizer, headline character counter (max 220 chars), About section hook review, recruiter boolean keywords, and desktop recruiter simulation card.
- `/interview` — **Interview Practice Studio**: 6 grounded questions calibrated to verified resume metrics, STAR model answers, essential talking points, rehearsal mastery tracker, and interactive answer timer.

### Apply (Controlled Outbound Velocity)
- `/auto-apply` — **Controlled Auto Apply Review Queue**: Staged outbound email packages for verified direct-contact postings, send-only mailbox assurance (`alex.morgan@lattice.io`), cryptographic SHA256 payload preview, explicit human approval modal, and terminal unknown outcome handling.

### Track (Pipeline & Workspace Management)
- `/jobs` — **Verified Opportunities Engine**: Direct employer postings with salary ranges, freshness badges, ATS source tags (Greenhouse, Lever, Ashby), and direct outbound links.
- `/daily-matches` — **Daily Matches Digest**: 9:00 AM curated digest with independent Role Fit and Evidence Confidence badges, verified evidence breakdown, and campaign controls.
- `/tracker` — **5-Column Application Tracker**: Kanban pipeline (`saved`, `applied`, `interview`, `offer`, `rejected`), count pills, drag-and-drop, and stage progression.

### Core Public, Auth & Governance Pages
- `/` — **Editorial Landing Page**: Circular View Transition theme reveal, 4-part kinetic brand statement, interactive Evidence Review stage, and free tools catalogue.
- `/dashboard` — **Executive Workspace Hub**: Career velocity metric rings, active pipeline cards, and one-click tool quick launch.
- `/onboarding` — **Candidate Setup Wizard**: Superdesign Animated Stepper with continuous progress track and credit wallet activation.
- `/pricing` — **Superdesign Pricing & Plans**: Tiered plans, student discount verification, and transparent billing FAQ.
- `/billing` — **Workspace Subscription & Invoices**: Current plan entitlements, resource consumption quotas, credit wallet, and invoice history from `GET /api/account/billing`.
- `/settings` — **Preferences & Conventions**: Profile identity, 7-market regional ATS convention selector (US, UK, EU, CA, AU, IN, SG), notification cadences, and theme toggle.
- `/tools` — **Free Tools Directory**: Searchable catalogue of all 12 operational career modules.
- `/about` — **Manifesto & Methodology**: Clean-room engineering pillars and anti-hallucination manifesto.
- `/help` — **Knowledge Base & ATS Mythbusters**: Optimization guides and ATS parser realities.
- `/login`, `/signup` — **Authentication & Legal Terms**: Demo credentials, country convention selection, and legal checkboxes for Terms 2026-v2 and Privacy Policy 2026-v2.
- `/privacy`, `/terms` — **Legal Contracts**: Versioned policies, anti-scraping charter, and data retention schedule.

---

## 4. Design System & Typography

- **Display Typography**: `Space Grotesk` (700/800 bold, -0.03em tracking for confident modern headlines).
- **Body & Interface**: `DM Sans` (400 regular, 500 medium, 650 semi-bold for crisp UI measures).
- **Editorial Accent**: `Playfair Display` (Restrained italic styling for brand highlights).
- **Data & Metadata**: `Geist Mono` (Tabular numeric values, ATS scores, timestamps, and SHA hashes).

### Color Tokens
- **Midnight Blue Dark Canvas**: `#061426` (Surface: `#0C213A`, Raised: `#193653`, Border: `#26415F`, Text: `#EFF5FF`, Muted: `#A9BAD1`).
- **Warm Paper Light Canvas**: `#F3F2EE` (Surface: `#FAF9F6`, Raised: `#E3E5E8`, Border: `#D5DFEA`, Text: `#10243E`, Muted: `#52647A`).
- **Accent Palette**: RoleSharp Blue `#9FC3F2`, Strong Blue `#5B9BFF` / `#2458A6`, Executive Amber `#F2C96D` / `#A96A0B`, Success Green `#34D399` / `#047857`.

---

## 5. Development & Verification Commands

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
git clone https://github.com/soul991/rolesharp-frontend.git
cd rolesharp-frontend
npm install
```

### Development Server
```bash
npm run dev
# Vite dev server starts on http://127.0.0.1:5173/
```

### Automated Verification Suite
```bash
# TypeScript strict compilation check
npm run typecheck

# Linter and static analysis check
npm run lint

# Full Vitest automated test suite (33 tests across 6 suites)
npm test

# Production build with chunk optimization
npm run build
```

---

## 6. License & Compliance

© 2026 RoleSharp Technologies. All rights reserved.  
Governed by RoleSharp Terms of Service 2026-v2 and Privacy Policy 2026-v2.
