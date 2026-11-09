# RoleSharp 2.0 — Visual Refresh Implementation Plan & Bounded Task Sequencing

**Execution Model**: Phased, bounded task execution with independent Quality Supervisor verification after each task.  
**Date**: November 10, 2026

---

## 1. Architectural Strategy

To transform RoleSharp 2.0 into an authentic, editorial, high-performance product interface without risking regression or downtime, the visual refresh is structured into 7 coherent, bounded tasks.

Each task adheres to:
1. **Zero Functional Regression**: All existing API contracts, request payloads, session persistence, and offline fallback mechanisms remain strictly intact.
2. **Quality Verification Gate**: Each task runs `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and live DevTools MCP browser inspection.
3. **Independent Supervisor Approval**: A fresh, isolated Supervisor instance inspects each task commit and issues an authoritative verdict before moving to the subsequent task.

---

## 2. Bounded Task Sequencing

### Task B1: Design System Foundation, Tokens, Typography & Shared Components
- **Objective**: Establish the core token architecture, font loading, global styling rules, and foundational shared components.
- **Scope**:
  - Update `src/styles/tokens.css` with 3-tier token architecture (Primitives, Semantics, Components).
  - Update `src/styles/global.css` with Hallmark Floor rules, typography classes, and `:focus-visible` states.
  - Refine `src/components/common/Button.tsx`: Remove inline arbitrary styles, add semantic variants (`primary`, `secondary`, `ghost`, `danger`, `subtle`), ensure 44px touch targets.
  - Refine `src/components/common/StatusBadge.tsx`: Minimalist, unslop status badges with authentic semantic colors and optional status dots.
  - Refine `src/components/common/ScoreRing.tsx`: Elegant, high-precision radial metric indicator with tabular typography.
  - Refine `src/components/common/Navbar.tsx` & `Footer.tsx`: Clean, editorial public header and footer.
- **Verification Gate**: Typecheck, lint, full unit tests, live inspection of tokens.

### Task B2: Public Marketing Experience
- **Routes**: `/`, `/tools`, `/pricing`, `/about`, `/help`, `/login`, `/signup`
- **Scope**:
  - `LandingPage.tsx`: Implement the editorial hero with high-character display typography, refined Evidence Review stage, and kinetic brand statement.
  - `ToolsCataloguePage.tsx`: Elegant categorised tool directory.
  - `PricingPage.tsx` & `PricingSection.tsx`: Crisp tiered pricing cards with monthly/annual switch and highlighted student guarantee.
  - `AboutPage.tsx` & `HelpPage.tsx`: Clean editorial manifesto and structured FAQ accordions.
  - `LoginPage.tsx` & `SignupPage.tsx`: Minimalist, focused authentication cards.
- **Verification Gate**: DevTools MCP snapshot on desktop, tablet, and mobile; full test suite.

### Task B3: Application Shell & Workspace Overview
- **Routes**: `/dashboard`, global application shell
- **Scope**:
  - `AppShell.tsx`: Redesign sidebar navigation with quiet hairline borders, sentence-case group headers (zero uppercase tracking), crafted brand mark, and streamlined topbar with breadcrumb navigation.
  - `DashboardPage.tsx`: Refined candidate career overview, pipeline counts, next-best-action recommendation docket, and quick tool launcher.
- **Verification Gate**: Responsive sidebar toggling, dark/light theme switching, 0 console errors.

### Task B4: Resume & Document Workspaces
- **Routes**: `/resumes`, `/resume-builder`, `/tailor`, `/checker`
- **Scope**:
  - `MyResumesPage.tsx`: Version cards with ATS score indicators, duplicate, delete, and download controls.
  - `ResumeBuilderPage.tsx`: Split layout with structured section inputs and live invariant `#FFFFFF` paper preview canvas.
  - `ResumeTailorPage.tsx`: Job-specific tailoring with grounded diff inspector and refined `ResumeWritingAnimation`.
  - `ATSCheckerPage.tsx`: Streamlined upload docket (PDF/DOCX/TXT), high-precision score ring, dimension breakdown, and grounded gap citations.
- **Verification Gate**: File upload handling, demo persona toggle, local heuristic fallback disclosure, full test suite.

### Task B5: Preparation Tools & Interview Rehearsal
- **Routes**: `/interview`, `/linkedin`, `/cover-letter`, `/cover-letter-analyzer`
- **Scope**:
  - `InterviewStudioPage.tsx`: Executive Practice Studio with progress tracker, distraction-free rehearsal timer, and STAR answer docket.
  - `LinkedInOptimizerPage.tsx`: Anti-scraping optimizer with clean recruiter preview and headline/about diagnostic checklist.
  - `CoverLetterPage.tsx`: Tone-adaptive letter synthesis with `AnimatedList`.
  - `CoverLetterAnalyzerPage.tsx`: In-memory diagnostic redline view with cliché detection highlights and brevity meters.
- **Verification Gate**: Saved resume contract, credit reconciliation, sample persona isolation, test suite.

### Task B6: Opportunities, Application Tracker & Auto Apply
- **Routes**: `/jobs`, `/daily-matches`, `/tracker`, `/auto-apply`
- **Scope**:
  - `JobFinderPage.tsx`: High-density job table with search, role filters, and detail drawer.
  - `DailyMatchesPage.tsx`: Curated matches with clear compatibility vs confidence scores.
  - `TrackerPage.tsx`: 5-column Kanban board with clean card geometry, drag-and-drop feedback, and status transitions.
  - `AutoApplyPage.tsx`: Controlled Outbound Queue with immutable review docket and one-time confirmation modal.
- **Verification Gate**: Drag-and-drop state updates, local storage persistence, approval modal dispatches.

### Task B7: Account, Billing, Settings, Accessibility & Final Parity
- **Routes**: `/billing`, `/settings`, `/onboarding`, `/privacy`, `/terms`
- **Scope**:
  - `BillingPage.tsx`: Subscription details, usage quotas, and invoice history table.
  - `SettingsPage.tsx`: Tabbed preferences for profile, localization, theme, and security.
  - `OnboardingPage.tsx`: Multi-step wizard with smooth `AnimatedStepper` transitions.
  - Final full-route accessibility sweep: keyboard tab order, ARIA attributes, contrast ratios across both light and dark themes.
  - Master Git release parity confirmation.
- **Verification Gate**: Final full quality check suite (`typecheck`, `lint`, `test`, `build`), complete 25-route QA report, final Supervisor GREEN sign-off.
