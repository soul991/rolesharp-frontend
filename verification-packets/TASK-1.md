# Task Verification Packet: TASK-1

## 1. Task Metadata
- **Task ID**: TASK-1
- **Title**: Design System Foundation, Tokens, Theme Reveal, Landing Page & App Shell
- **Base Commit SHA**: `6ce39548cd549e4b85827a13ff0a12bacc432244`
- **Task Commit SHA**: `920563bea2d9d571a71d3fb84b31807023834cd4`
- **Branch**: `main`
- **Framework Specification**: React 19 (`19.3.1`) + React DOM (`19.3.1`) + TypeScript (`5.7.2`) + Vite (`6.4.6`)
- **Working Tree Cleanliness**: Clean (confirmed via `git status`)
- **Changed Files Manifest**:
  - `src/styles/tokens.css` (semantic design tokens for light & dark palettes)
  - `src/styles/global.css` (global styles, circular View Transitions, typography, accessibility helpers)
  - `src/context/ThemeContext.tsx` (circular click-origin theme toggle, localStorage persistence)
  - `src/router/RouterContext.tsx` (typed client router supporting all matrix routes)
  - `src/context/AuthContext.tsx` (session and entitlement state)
  - `src/api/types.ts` (typed data models)
  - `src/components/common/Button.tsx`, `StatusBadge.tsx`, `ScoreRing.tsx`, `Navbar.tsx`, `Footer.tsx`, `AppShell.tsx`
  - `src/components/landing/KineticBrandStatement.tsx` (word-by-word kinetic promotional quote)
  - `src/components/landing/EvidenceReviewStage.tsx` (interactive 3-state evidence/gap review stage)
  - `src/pages/LandingPage.tsx` (public landing page)
  - `src/pages/DashboardPage.tsx` (authenticated workspace overview)
  - `src/test/LandingPage.test.tsx` (Vitest unit tests)
  - `src/test/setup.ts` (test setup)
  - `index.html`, `vite.config.ts`, `tsconfig.json`, `package.json`

---

## 2. Stated Scope & Out-of-Scope
- **In-Scope**:
  - Scaffolding Vite + React + TypeScript in clean root.
  - Implementation of light and dark semantic token system from Section 3 of master prompt.
  - Circular click-origin View Transition theme toggle with instant fallback.
  - Landing Page with exact kinetic quote:
    1. “Do you know what it takes to secure a job rather than Degree and Skills?”
    2. “well!”
    3. “A perfect resume that explains you more than yourself!!”
    4. “So, choose RoleSharp to tailor your resume.”
  - Interactive Evidence Review Stage with 3 user-controlled states (`evidence`, `gap`, `edit`) and highlight transitions.
  - App Shell with 240px desktop sidebar, mobile bottom nav, topbar breadcrumbs.
  - Representative authenticated workspace page (`/dashboard`).
- **Explicitly Out-of-Scope for TASK-1**:
  - Full multi-step onboarding wizard implementation (Task 2).
  - Full ATS file parser and asynchronous resume writing animation (Task 3).
  - Full 5-column drag-and-drop tracker (Task 4).
  - Full Superdesign pricing & billing subscription modal (Task 6).

---

## 3. Authoritative Acceptance Criteria
1. **Typography & Hierarchy**:
   - `Space Grotesk` display typography for headlines and brand mark.
   - `DM Sans` for body, navigation, and controls.
   - `Playfair Display` for editorial accents in kinetic statement.
   - Distinct hierarchy between eyebrow, display, h1, h2, body, and micro-metadata.
2. **Palette & Contrast**:
   - Dark mode canvas `#061426`, surfaces `#0C213A`/`#112943`, text `#EFF5FF`, lines `#26415F`.
   - Light mode canvas `#F3F2EE`, surfaces `#FAF9F6`/`#ECEBE6`, text `#10243E`, lines `#D5DFEA`.
   - Document paper surface maintains invariant paper feel in both modes.
3. **Landing Page Signature**:
   - Exact promotional quote sequence present with word-by-word kinetic animation and reduced-motion static fallback.
   - Evidence review stage enables user-controlled state switching between Evidence, Gap, and Suggested edit.
4. **Theme Toggle**:
   - Toggles between light and dark modes with circular View Transition when supported.
   - Persists `rolesharp-theme` in `localStorage`.
5. **App Shell**:
   - Desktop 240px sidebar navigation with 4 functional groups.
   - Collapses to mobile hamburger and bottom navigation on viewports <= 768px.
6. **Code Quality & Testing**:
   - `npm run typecheck` passes with 0 errors.
   - `npm test` passes.
   - `npm run build` succeeds cleanly.
   - Chrome DevTools MCP live inspection reports 0 console errors and proper DOM layout.

---

## 4. Local Preview & Independent Verification Commands
- **Local Preview URL**: `http://127.0.0.1:5173/` and `http://127.0.0.1:5173/dashboard`
- **Verify Running Dev Server**: Dev server is active on port 5173.
- **Commands the Supervisor can run independently**:
  ```bash
  npm run typecheck
  npm test
  npm run build
  ```
- **Live Chrome DevTools MCP Scenarios to Exercise**:
  1. Open `http://127.0.0.1:5173/` via DevTools MCP `navigate_page`.
  2. Inspect rendered DOM via `take_snapshot`.
  3. Click theme toggle button to verify theme transition to `light`.
  4. Verify `document.documentElement.dataset.theme` is `"light"`.
  5. Click Evidence Review tabs (`Evidence review`, `Role gap`, `Suggested edit`) and verify active highlight changes.
  6. Navigate to `http://127.0.0.1:5173/dashboard` and verify authenticated workspace layout.
  7. Check `list_console_messages` for 0 uncaught exceptions.
