# RoleSharp 2.0 — Open Product & Architecture Questions

This document records ambiguities and product-level discrepancies uncovered during the clean-room research phase that must remain honest, uninvented, and flagged:

1. **Canonical Billing & Entitlement Source**:
   - *Observation*: Public marketing and pricing snapshots vary on free tailored resume limits (1 vs 3) and premium limits.
   - *Resolution*: The frontend hardcodes zero pricing or quota numbers. All allowances, plan limits, remaining credits, and student pricing are fetched dynamically from `GET /api/me`.

2. **Interview Studio: Voice AI vs Static 6-Q&A Rehearsal**:
   - *Observation*: Some marketing copy refers to Live Voice AI, whereas the explicit Interview Prep route documentation describes 6 resume-grounded questions with model answers.
   - *Resolution*: Implement the grounded 6-Q&A preparation flow first. Live microphone/voice coaching UI is conditionally rendered only when a feature flag (`voice_interview_enabled`) is present in `/api/me`.

3. **Application Tracker Status Set**:
   - *Observation*: Many generic job trackers use "withdrawn", but the verified backend contract enum strictly defines: `saved | applied | interview | offer | rejected`.
   - *Resolution*: Strictly preserve the 5 verified backend statuses. Do not add `withdrawn` or remap it to `rejected` without a confirmed backend migration.

4. **Cover Letter Job Description Input**:
   - *Observation*: Public marketing suggests job-description tailoring for cover letters, but the verified production handler `POST /api/cover` only takes `{ resumeId, company, role, tone }`.
   - *Resolution*: The UI honestly connects to `POST /api/cover` without inventing a fake JD-binding parameter.

5. **Deployment Topology & Proxy Routing**:
   - *Observation*: Backend route handlers are Next.js handlers (`app/api/**`). In development and production, requests should route via same-origin proxy or relative paths (`/api/*`) to avoid cross-origin cookie restrictions.
