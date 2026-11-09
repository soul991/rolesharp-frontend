# RoleSharp 2.0 — Route & Screen Matrix

This matrix maps all 25 registered URL paths, 24 unique page components, and the original 18 core visual concept requirements to exact frontend routes, layout wrappers, accessibility requirements, and real backend API endpoints.

## Inventory Breakdown
- **Registered URL Paths**: 25 routes (`/`, `/tools`, `/pricing`, `/about`, `/help`, `/login`, `/signup`, `/onboarding`, `/dashboard`, `/resumes`, `/resume-builder`, `/checker`, `/tailor`, `/jobs`, `/daily-matches`, `/tracker`, `/cover-letter`, `/cover-letter-analyzer`, `/linkedin`, `/interview`, `/auto-apply`, `/billing`, `/settings`, `/privacy`, `/terms`).
- **Unique Page Components**: 24 components (`LandingPage`, `ToolsCataloguePage`, `PricingPage`, `AboutPage`, `HelpPage`, `LoginPage`, `SignupPage`, `OnboardingPage`, `DashboardPage`, `MyResumesPage`, `ResumeBuilderPage`, `ATSCheckerPage`, `ResumeTailorPage`, `JobFinderPage`, `DailyMatchesPage`, `TrackerPage`, `CoverLetterPage`, `CoverLetterAnalyzerPage`, `LinkedInOptimizerPage`, `InterviewStudioPage`, `AutoApplyPage`, `BillingPage`, `SettingsPage`, `LegalPage` [serving `/privacy` and `/terms`]).
- **Core Requirements Concept Screens**: 18 primary functional screens specified in original product PRD.
- **Superdesign Signature Patterns**: 5 interaction components (`ResumeWritingAnimation`, `AnimatedStepper`, `InteractiveCardStack`, `AnimatedList`, `PricingSection`).
- **Lifecycle Product Stages**: 5 career velocity modules (Check, Tailor, Prepare, Apply, Track).

---

| # | Route | Category | Screen Title / Inventory Ref | Primary APIs | Key Components & Superdesign Patterns |
|---|---|---|---|---|---|
| 01 | `/` | Public | Landing Page (`01 — Marketing`) | None (Public) | Circular theme transition, kinetic brand statement, interactive evidence review stage, tools catalogue |
| 02 | `/tools` | Public | Free Career Tools Catalogue | `/api/me` (optional) | Categorized tool directory (Check, Tailor, Prepare, Apply, Track) |
| 03 | `/pricing` | Public | Pricing & Student Access | `/api/me` | **Superdesign Pricing Section** with monthly/annual toggle, student offer, dynamic feature allowances |
| 04 | `/about` | Public | About & Methodology | None | Evidence-first principles, scoring disclosure, no-hallucination manifesto |
| 05 | `/help` | Public | Help Center & FAQ | None | Searchable workflow guides, country guidance manual, ATS mythbusters |
| 06 | `/login` | Public/Auth | Sign In (`05 — Public / Sign in`) | `POST /api/auth/login` | Email/password form, rate-limit handling, reset link |
| 07 | `/signup` | Public/Auth | Create Account & Legal Terms | `POST /api/auth/signup` | Legal version acceptance checkboxes, role preferences, email verification notice |
| 08 | `/onboarding` | Authenticated | Onboarding Wizard | `GET/POST /api/onboarding` | **Superdesign Animated Stepper** (Profile, Target Role, Experience, Resume Import, Review) |
| 09 | `/dashboard` | Authenticated | Workspace Overview (`02 — App / Overview`) | `GET /api/workspace-overview`, `GET /api/me` | Career summary, Next best action card, pipeline counts, tool quick-launch |
| 10 | `/resumes` | Authenticated | My Resumes & Versions | `GET/POST/PATCH/DELETE /api/resume/*` | Version list, duplicate, rename, delete, PDF/DOCX download buttons |
| 11 | `/resume-builder` | Authenticated | Resume Builder (`06 — App / Resume Builder`) | `GET/POST /api/resume/*`, `POST /api/improve` | Structured section editor, live resume preview sheet, **Superdesign Interactive Card Stack** for templates |
| 12 | `/checker` | Authenticated | ATS Analyzer (`03 — App / ATS Analyzer`) | `POST /api/check-resume/upload`, `POST /api/check-resume` | Multipart upload (PDF/DOCX/TXT), diagnostic dimensions, evidence gap list, before/after diff |
| 13 | `/tailor` | Authenticated | Job-Specific Tailoring | `POST /api/generate`, `GET /api/resume/{id}` | Target job context, grounded diff review, **Superdesign Resume Writing Animation** during generation |
| 14 | `/jobs` | Authenticated | Job Discovery & Matches | `GET /api/jobs`, `GET /api/job-matches` | Filterable listings, source posting link, freshness indicator, save to tracker |
| 15 | `/daily-matches` | Authenticated | Daily Matches Digest | `GET /api/daily-matches` | Compatibility score vs Evidence confidence labels, daily batch inspector |
| 16 | `/tracker` | Authenticated | Application Tracker (`04 — App / Tracker`) | `GET/POST/PATCH/DELETE /api/applications/*` | 5-column pipeline (`saved`, `applied`, `interview`, `offer`, `rejected`), activity log, notes modal |
| 17 | `/cover-letter` | Authenticated | Cover Letter Generator | `POST /api/cover` | Source resume picker, company/role inputs, **Superdesign Animated List** tone selector (`formal`, `warm`, `direct`), editable draft |
| 18 | `/cover-letter-analyzer` | Authenticated | Cover Letter Diagnostic | `POST /api/cover-letter-analyzer` | In-memory text analysis: length, personalization, proof, clichés, closing review |
| 19 | `/linkedin` | Authenticated | LinkedIn Profile Optimizer | `POST /api/linkedin` | Text paste input (no scraping), headline/about diagnosis, ordered action fixes |
| 20 | `/interview` | Authenticated | Interview Practice Studio | `POST /api/interview` | 6 role/resume-grounded Q&A prompts, model answers, evidence linkages, rehearsal checklist |
| 21 | `/auto-apply` | Authenticated | Controlled Auto Apply Queue | `GET /api/application-packages`, `POST /api/application-packages/approve` | Posting eligibility check, send-only mailbox status, immutable package preview, one-time approval |
| 22 | `/billing` | Authenticated | Subscription, Credits & History | `GET /api/me`, `GET /api/account/billing` | Canonical plan details, usage quotas, invoice history, payment provider integration |
| 23 | `/settings` | Authenticated | Profile & Account Settings | `GET /api/me`, `POST /api/auth/logout` | Career preferences, country conventions override, theme preference, logout |
| 24 | `/privacy`, `/terms` | Public | Legal Documents & Retention | `GET /api/me` (versioned) | Full privacy policy, terms of service, consent disclosures |
