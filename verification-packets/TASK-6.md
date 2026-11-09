# Task Verification Packet: TASK-6

## 1. Task Metadata
- **Task ID**: TASK-6
- **Title**: Billing, Superdesign Pricing Section, Settings & Controlled Auto Apply Review Queue
- **Base Commit SHA**: `f15d7c8b818c072ceb486fa83330568e417ff50e`
- **Task Commit SHA**: `9c8c617b30c444e030afc40ff446feea480ed014`
- **Branch**: `main`
- **Framework Specification**: React 19 (`19.3.1`) + React DOM (`19.3.1`) + TypeScript (`5.7.2`) + Vite (`6.4.6`)
- **Working Tree Cleanliness**: Clean (confirmed via `git status`)
- **Changed Files Manifest**:
  - `src/components/pricing/PricingSection.tsx` (**Superdesign Pricing Section pattern**: monthly vs annual toggle with 20% discount badge, student discount banner, 3 tiered plan cards [Starter, Professional, Executive], transparent feature breakdown, refund guarantee assurance)
  - `src/pages/PricingPage.tsx` (`/pricing`: marketing pricing page embedding `PricingSection` + interactive 4-item FAQ accordion)
  - `src/pages/BillingPage.tsx` (`/billing`: workspace subscription portal, active plan card, quota progress bars for tailored resumes and auto applies, credit balance wallet, payment card details, invoice history from `/api/account/billing`)
  - `src/pages/AutoApplyPage.tsx` (`/auto-apply`: ethical outbound queue, verified recipient pathway check, send-only mailbox assurance, cryptographic SHA payload preview, explicit human approval modal, 5 receipt states)
  - `src/pages/SettingsPage.tsx` (`/settings`: personal profile identity, regional ATS conventions override for 7 global markets, notification preferences, interface theme toggle)
  - `src/pages/ToolsCataloguePage.tsx` (`/tools`: directory of 12 tools and workflows across Check, Tailor, Prepare, Apply, Track with category filter pills and live search)
  - `src/pages/AboutPage.tsx` (`/about`: evidence-first principles, scoring disclosure, no-hallucination manifesto, clean-room engineering values)
  - `src/pages/HelpPage.tsx` (`/help`: knowledge base guides, regional conventions handbook, ATS mythbusters accordion)
  - `src/pages/LegalPage.tsx` (`/privacy`, `/terms`: versioned legal documents [Terms 2026-v2 & Privacy 2026-v2], anti-scraping charter, retention schedule)
  - `src/App.tsx` (all 18 routes from `ROUTE_MATRIX.md` wired and active)
  - `vite.config.ts` (optimized manual chunk splitting for vendor libraries)
  - `src/test/BillingAutoApply.test.tsx` (8 automated tests covering PricingSection, BillingPage, AutoApplyPage, SettingsPage, and ToolsCataloguePage)

---

## 2. Stated Scope & Out-of-Scope
- **In-Scope**:
  - Implementation of Superdesign Pricing Section (`src/components/pricing/PricingSection.tsx`).
  - Implementation of Public Pricing (`/pricing`) and Workspace Billing (`/billing`).
  - Implementation of Controlled Auto Apply Queue (`/auto-apply`) with strict safety and explicit human approval modal.
  - Implementation of Settings (`/settings`), Tools Catalogue (`/tools`), About (`/about`), Help (`/help`), and Legal (`/privacy`, `/terms`).
  - Automated tests passing across all 6 test suites (`31/31 passed`).
  - Strict typecheck passing (`tsc --noEmit` 0 errors).
  - Production build passing (`vite build` in 2.70s with 0 warnings).
  - Direct live browser inspection via Chrome DevTools MCP.
- **Explicitly Out-of-Scope for TASK-6**:
  - Final GitHub repository release creation and public publication (Task 7).

---

## 3. Authoritative Acceptance Criteria
1. **Superdesign Pricing Section (`src/components/pricing/PricingSection.tsx` & `/pricing`)**:
   - Monthly and annual billing interval switch with dynamic price adjustment ($24 -> $19/mo) and "SAVE 20%" badge.
   - Student discount banner offering 50% off for verified `.edu` emails.
   - 3 distinct plan tiers: Starter ($0), Professional ($19-$24, popular amber border & badge), Executive ($39-$49).
   - Trust assurances: 7-day refund guarantee, 1-click cancellation, zero data selling.
   - Interactive FAQ accordion expanding answers upon click.
2. **Workspace Billing Portal (`/billing`)**:
   - Displays active plan ("Professional Suite") with renewal date and feature list.
   - Resource consumption progress bars: Tailored Resumes (6/20) and Auto Apply packages (2/5).
   - Available Credit Wallet displaying 15 credits with +5 bonus callout and "Add Credits" action.
   - Payment method card displaying Visa ending in 4242 with SSL PCI-DSS assurance.
   - Invoice history table matching `GET /api/account/billing` with download receipt actions.
3. **Controlled Auto Apply Review Queue (`/auto-apply`)**:
   - Recipient Evidence verification check: explicitly documents why package is eligible.
   - Send-only mailbox assurance (alex.morgan@lattice.io, zero inbox read permissions).
   - Cryptographic SHA-anchored payload review (subject line, recipient email, PDF resume SHA, cover letter preview, expiration timestamp).
   - One-time human approval modal with warning notice and explicit "Approve & Dispatch Now" action.
   - Real-time receipt state transitions (`queued` -> `accepted by provider [delivery unverified]`).
   - Terminal unknown outcome handling with employer career page link.
4. **Settings, Tools Catalogue & Auxiliary Pages**:
   - `/settings`: Profile inputs, 7-market regional convention selector, notification checkboxes, and theme toggle.
   - `/tools`: 12 tools categorized across Check, Tailor, Prepare, Apply, Track with category pills and live search.
   - `/about`: Anti-hallucination manifesto, ethical scoring disclosure, clean-room values.
   - `/help`: Knowledge base guides and ATS mythbusters accordion.
   - `/privacy` & `/terms`: Tabbed legal agreements with version 2026-v2 active.
5. **Code Quality, Testing & Build**:
   - `npm run typecheck` passes with 0 errors.
   - `npm test` passes all 31 tests across 6 test suites.
   - `npm run build` succeeds cleanly in < 3s with 0 warnings.
   - Chrome DevTools MCP live inspection reports 0 console errors and 0 uncaught exceptions.

---

## 4. Local Preview & Independent Verification Commands
- **Local Preview URLs**:
  - `http://127.0.0.1:5173/pricing`
  - `http://127.0.0.1:5173/billing`
  - `http://127.0.0.1:5173/auto-apply`
  - `http://127.0.0.1:5173/settings`
  - `http://127.0.0.1:5173/tools`
- **Verify Running Dev Server**: Dev server is active on `http://127.0.0.1:5173/`.
- **Commands the Supervisor can run independently**:
  ```bash
  npm run typecheck
  npm test
  npm run build
  ```
- **Live Chrome DevTools MCP Scenarios to Exercise**:
  1. Open `http://127.0.0.1:5173/pricing` via DevTools MCP `navigate_page`. Switch between Monthly and Annual billing. Click an FAQ accordion item to expand it.
  2. Open `http://127.0.0.1:5173/billing`. Inspect active plan, usage progress bars, credit balance, and invoices.
  3. Open `http://127.0.0.1:5173/auto-apply`. Inspect queued packages. Click "Review & One-Time Approve Dispatch", inspect modal warning, and click "Approve & Dispatch Now". Verify state transitions to "Accepted by Provider".
  4. Open `http://127.0.0.1:5173/settings`. Inspect profile inputs and country dropdown.
  5. Open `http://127.0.0.1:5173/tools`. Filter by category "Check" and test search filter with "Cover Letter".
  6. Check `list_console_messages` for 0 uncaught exceptions.