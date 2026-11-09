# RoleSharp 2.0 — Live Browser QA & DevTools Audit Report

## Inspection Standard & Test Configuration
- **Application URL**: `http://127.0.0.1:5173/`
- **Audit Tool**: Chrome DevTools MCP (`navigate_page`, `evaluate_script`, `list_console_messages`, `resize_page`)
- **Viewports Tested**:
  - Desktop: `1440 × 900`
  - Tablet Landscape: `1024 × 768`
  - Tablet Portrait: `768 × 1024`
  - Mobile: `390 × 844` (and 375px overflow bounds)
- **Theme Modes**: Dark (`#061426` canvas) and Light (`#F3F2EE` ivory canvas) with `localStorage['rolesharp-theme']` persistence.
- **Document Sheet Invariance**: White paper `#FFFFFF` preview background with `#172B48` ink preserved across both themes.

---

## Complete 25-Route Audit Matrix

| # | Route | Page Component | Viewport Resiliency | Dark/Light Themes | Overflow | Console Errors | Audit Level | Key Interaction / Behavioral Findings |
|---|---|---|---|---|---|---|---|---|
| 01 | `/` | `LandingPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Circular View Transition theme toggle, 4-stage kinetic brand statement timer, interactive evidence review carousel, tool catalogue links. |
| 02 | `/dashboard` | `DashboardPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Overview metric rings, quick action links, active pipeline count cards, one-click tool navigation. |
| 03 | `/login` | `LoginPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Email/password validation, credential fill, submission state, demo account quick-fill button. |
| 04 | `/signup` | `SignupPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Legal agreement checkboxes (Terms 2026-v2, Privacy Policy 2026-v2), password confirmation, student verification query param. |
| 05 | `/onboarding` | `OnboardingPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | **Superdesign Animated Stepper**: 6 stages, progress track fill, target role input, country convention picker, +5 credit wallet activation. |
| 06 | `/checker` | `ATSCheckerPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Multipart upload area, text paste tab, diagnostic score ring (88/100), 4 dimension bars, evidence gap list, `POST /api/check-resume` dispatch. |
| 07 | `/cover-letter-analyzer` | `CoverLetterAnalyzerPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Length/brevity calculator, quantified metric density detector, cliché scanner, `POST /api/cover-letter-analyzer` non-blocking dispatch. |
| 08 | `/tailor` | `ResumeTailorPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Target job context input, **Superdesign Resume Writing Animation** (moving pen nib cursor, progressive line reveal), bullet-by-bullet diff accept/reject. |
| 09 | `/resume-builder` | `ResumeBuilderPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Section editor (Experience, Skills, Education), **Superdesign Interactive Card Stack** cycling 4 ATS templates, invariant live paper preview. |
| 10 | `/resumes` | `MyResumesPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Document workspace cards, search filter, version badges, duplicate resume action, download PDF/DOCX toasts. |
| 11 | `/cover-letter` | `CoverLetterPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | **Superdesign Animated List Tone Selector** (`formal`, `warm`, `direct`), keyboard navigation (`Enter`/`Space`), draft synthesizer, editable paper preview. |
| 12 | `/linkedin` | `LinkedInOptimizerPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Saved resume selector (`res_master_01`), headline studio with 220-char live counter, About section hook, recruiter boolean card, `POST /api/linkedin` dispatch. |
| 13 | `/interview` | `InterviewStudioPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | 6 grounded STAR question cards, answer clipboard copy, interactive stopwatch (2:00 timer with start/pause/reset), `POST /api/interview` regenerate trigger. |
| 14 | `/auto-apply` | `AutoApplyPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Recipient evidence provenance check, send-only mailbox assurance (`alex.morgan@lattice.io`), SHA-256 package anchor, explicit approval modal, terminal unknown outcome. |
| 15 | `/jobs` | `JobFinderPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Opportunity query search, country/type/remote filters, freshness badges, external ATS source linkouts, save-to-tracker action. |
| 16 | `/daily-matches` | `DailyMatchesPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Dual independent scoring badges (Role Fit % and Evidence Confidence), matched bullet breakdown, daily campaign pause/resume toggle. |
| 17 | `/tracker` | `TrackerPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | 5 Kanban columns (`saved`, `applied`, `interview`, `offer`, `rejected`), HTML5 drag-and-drop, accessible stage dropdown selector, add opportunity modal, `applicationsApi` backend sync. |
| 18 | `/pricing` | `PricingPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | **Superdesign Pricing Section**: Monthly/Annual switcher ($24 -> $19/mo, Save 20% badge), 50% `.edu` student banner, 3 plan cards, FAQ accordion toggle. |
| 19 | `/billing` | `BillingPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Active plan status ("Professional Suite"), quota consumption progress bars (resumes 6/20, auto apply 2/5), credit wallet (15 credits), invoice history table with receipts. |
| 20 | `/settings` | `SettingsPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Profile identity form, 7-market regional ATS convention selector (US, UK, EU, CA, AU, IN, SG), notification frequency preferences, theme switcher. |
| 21 | `/tools` | `ToolsCataloguePage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Searchable directory of all 12 operational career modules, category filter tabs (All, Diagnostics, Preparation, Pipeline), one-click route launcher. |
| 22 | `/about` | `AboutPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Render & Navigation** | Clean-room architectural manifesto, anti-hallucination engineering principles, algorithmic disclosure standards, back navigation. |
| 23 | `/help` | `HelpPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Full Interactive** | Knowledge base search filter, FAQ expandable accordions, ATS parser mythbusters guide, regional convention breakdown. |
| 24 | `/privacy` | `LegalPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Render & Navigation** | Versioned Privacy Policy (2026-v2), zero-data-retention disclosure for diagnostic tools, anti-scraping charter, tab switcher to Terms. |
| 25 | `/terms` | `LegalPage` | 1440, 1024, 768, 390 | Verified Both | None (0px) | 0 | **Render & Navigation** | Versioned Terms of Service (2026-v2), subscription renewal terms, send-only mailbox acceptable use policy, tab switcher to Privacy. |

---

## Viewport Breakdown & Responsive Verification
1. **Desktop (`1440 × 900`)**:
   - Sidebar renders permanently attached on the left (`240px` width) for workspace routes.
   - 5-column Kanban on `/tracker` renders with smooth horizontal scroll containment.
   - Master-detail two-column split layouts operational on `/cover-letter`, `/linkedin`, `/interview`, `/tailor`.
2. **Tablet Landscape (`1024 × 768`)**:
   - Sidebar and workspace grids scale responsively.
   - 3-column pricing deck snaps cleanly without horizontal truncation.
3. **Tablet Portrait (`768 × 1024`)**:
   - Desktop sidebar collapses into accessible mobile drawer.
   - Top action bars wrap gracefully. Touch target heights meet min `44px` requirement.
4. **Mobile (`390 × 844`)**:
   - Navigation collapses to top hamburger bar with animated navigation drawer.
   - Cards switch to single-column stacking with full-width primary action buttons.
   - Verified zero horizontal page overflow (`scrollWidth === clientWidth`) across all 25 routes.
