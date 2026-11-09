# Task Verification Packet: TASK-2

## 1. Task Metadata
- **Task ID**: TASK-2
- **Title**: Authentication, Legal Terms Acceptance & Onboarding Wizard with Superdesign Animated Stepper
- **Base Commit SHA**: `9407b1b695b5c817625ef82e4e9b1494f57db217`
- **Task Commit SHA**: `e62eca94da85d590c169efa9f403186f43df8ed6`
- **Branch**: `main`
- **Framework Specification**: React 19 (`19.3.1`) + React DOM (`19.3.1`) + TypeScript (`5.7.2`) + Vite (`6.4.6`)
- **Working Tree Cleanliness**: Clean (confirmed via `git status`)
- **Changed Files Manifest**:
  - `src/components/common/AnimatedStepper.tsx` (Superdesign Animated Stepper with continuous track, active progress fill, completed checkmarks, current step ring, accessible labeling)
  - `src/pages/LoginPage.tsx` (Sign in page with email/password, quick test account autofill, error alert banner, no-scrape guarantee banner, accessible form labeling)
  - `src/pages/SignupPage.tsx` (Registration page with email/password/confirm, country dropdown, mandatory legal checkboxes for Terms 2026-v2 & Privacy Policy, no-scrape acknowledgment, validation)
  - `src/pages/OnboardingPage.tsx` (6-stage precision career studio onboarding wizard utilizing `AnimatedStepper`: Identity & Contact, Target Role & Seniority Tier, Regional Hiring Conventions, Work Environment & Logistics, Resume Source / Master Evidence Base, Review & Studio Activation with one-time +5 credit checklist claim)
  - `src/App.tsx` (wired routes `/login`, `/signup`, `/onboarding`)
  - `src/test/AuthOnboarding.test.tsx` (automated Vitest test suite for login, signup legal validation, stepper state progression, and onboarding wizard walkthrough)
  - `screenshots/task-2-login.png` (verified screenshot of `/login`)
  - `screenshots/task-2-signup.png` (verified screenshot of `/signup`)
  - `screenshots/task-2-onboarding-step1.png` (verified screenshot of `/onboarding` Step 1 Identity)
  - `screenshots/task-2-onboarding-step6.png` (verified screenshot of `/onboarding` Step 6 Activation)
  - `screenshots/task-2-onboarding-mobile-390.png` (verified screenshot of mobile 390px responsive onboarding)

---

## 2. Stated Scope & Out-of-Scope
- **In-Scope**:
  - Implementation of `/login` with verified session authentication adapter.
  - Implementation of `/signup` with explicit legal terms acceptance (`2026-v2`) and anti-scraping acknowledgment.
  - Implementation of `/onboarding` with 6-stage wizard using **Superdesign Animated Stepper**.
  - Implementation of one-time bonus credit claim (+5 credits) on completing onboarding.
  - Mobile responsiveness verification at 390px and desktop at 1440px.
  - Integration and unit tests passing in Vitest (`6/6 passed`).
  - Strict typecheck passing (`tsc --noEmit` 0 errors).
  - Production build passing (`vite build` clean in 2.08s).
  - Direct live browser inspection via Chrome DevTools MCP.
- **Explicitly Out-of-Scope for TASK-2**:
  - Full ATS file upload parser and asynchronous resume writing animation (Task 3).
  - Full 5-column drag-and-drop tracker (Task 4).
  - Full Superdesign pricing & billing subscription modal (Task 6).

---

## 3. Authoritative Acceptance Criteria
1. **Superdesign Animated Stepper**:
   - Continuous connecting track with active progress bar width transition (`var(--rs-ease)`).
   - Completed steps show checkmark icon with `var(--rs-blue-strong)` fill.
   - Current active step features an amber ring and active pill styling.
   - Screen-reader accessible with `aria-label="Progress Stepper"` and `aria-current="step"`.
   - Allows backward step click navigation for completed steps.
2. **Authentication Pages (`/login`, `/signup`)**:
   - `/login` supports email and password input, quick test account autofill, clear validation, and navigation to `/dashboard`.
   - `/signup` requires mandatory acceptance of Terms of Service (`2026-v2`) and Privacy Policy before account creation can succeed.
   - Displays clear legal assurance that RoleSharp does not scrape third-party accounts or hallucinate candidate credentials.
3. **Onboarding Wizard (`/onboarding`)**:
   - 6 sequential stages:
     1. Identity: Full legal/professional name, headline, phone, LinkedIn profile link.
     2. Target Role: Primary target title and 5-tier seniority calibration.
     3. Regional Hiring Conventions: Country selection (US, UK, CA, DE, IN, SG) with documented CV/resume conventions and strict ATS toggle.
     4. Work Environment & Logistics: Acceptable work modes (Remote, Hybrid, On-site), visa sponsorship requirement, relocation openness.
     5. Resume Source: Option to upload existing document (PDF/DOCX/TXT up to 5MB) or start in structured builder.
     6. Review & Activation: Review configured parameters, claim one-time onboarding bonus (+5 credits), activate studio, and navigate to `/dashboard`.
4. **Code Quality, Testing & Build**:
   - `npm run typecheck` passes with 0 errors.
   - `npm test` passes all tests (`src/test/LandingPage.test.tsx` and `src/test/AuthOnboarding.test.tsx`).
   - `npm run build` succeeds cleanly.
   - Chrome DevTools MCP live inspection reports 0 console errors and proper DOM layout.

---

## 4. Local Preview & Independent Verification Commands
- **Local Preview URLs**:
  - `http://127.0.0.1:5173/login`
  - `http://127.0.0.1:5173/signup`
  - `http://127.0.0.1:5173/onboarding`
- **Verify Running Dev Server**: Dev server is active on `http://127.0.0.1:5173/`.
- **Commands the Supervisor can run independently**:
  ```bash
  npm run typecheck
  npm test
  npm run build
  ```
- **Live Chrome DevTools MCP Scenarios to Exercise**:
  1. Open `http://127.0.0.1:5173/login` via DevTools MCP `navigate_page`.
  2. Inspect rendered DOM via `take_snapshot`. Click "Autofill Alex Morgan" and verify input values update.
  3. Click "Sign In to Workspace" and verify navigation to `http://127.0.0.1:5173/dashboard`.
  4. Navigate to `http://127.0.0.1:5173/signup`. Verify terms checkbox requirements and country select.
  5. Navigate to `http://127.0.0.1:5173/onboarding`. Verify Animated Stepper renders with Step 1 active.
  6. Click "Continue" through steps 1 to 6. Verify each step transitions smoothly and completed steps update with checkmarks.
  7. On Step 6 (Activation), verify bonus credit callout (+5 credits) and click "Activate Studio & Claim Credits".
  8. Check `list_console_messages` to verify zero unhandled exceptions.
