# RoleSharp 2.0 — API Integration Map

This map defines typed contract boundaries between UI components and backend services based on the source-verified snapshot (`docs/API_CONTRACTS.md` and Notion snapshot).

---

## 1. Authentication & Session Boundary
- **Session Architecture**: HTTP-only, secure, encrypted JWE cookies.
- **Client Storage Policy**: No JWTs, session tokens, or credentials in `localStorage` or `sessionStorage`. Only user UI preferences (e.g. `rolesharp-theme`) are saved locally.
- **Endpoints**:
  - `GET /api/me`: Returns `{ authenticated: boolean, user?: User, plans?: PlanDetails, features: FeatureGrants, limits: Quotas, usage: UsageMetrics, credits: CreditBalance, legalVersions: LegalMetadata }`.
  - `POST /api/auth/login`: `{ email, password }` → Sets session cookie. Handles 401 (Invalid), 403 (Unverified / Suspended), 429 (Rate limit).
  - `POST /api/auth/signup`: `{ email, password, acceptedLegalVersions: string[], locationPreferences? }` → Returns 201 with verification requirement.
  - `POST /api/auth/logout`: Clears session cookie and redirects.

---

## 2. Resume & Diagnostics Pipeline
- **File Upload**:
  - `POST /api/check-resume/upload`: `multipart/form-data` with `file` (PDF/DOCX/TXT <= 5MB). Response: `{ filename, size, text, wordCount }`.
- **Diagnostics**:
  - `POST /api/check-resume`: `{ resumeText: string (80-30,000), targetRole?, targetCompany?, roleSlug?, jdText? (<=20,000), country?, companyType? }`.
  - Response: `{ overallScore: number, dimensions: { parseability, layoutRisk, keywordCoverage, evidenceStrength, roleFit }, gaps: EvidenceGap[], recruiterFeedback: string[] }`.
- **Generation & Tailoring**:
  - `POST /api/generate`: `{ profile: StructuredProfile, companySlug?, roleSlug?, companyNameRaw?, roleTitleRaw?, jdText?, deviceId?, template? }`.
  - Production response: `HTTP 202 Accepted` `{ resumeId: string, jobId: string, status: "processing" }`.
  - Polling contract: Client polls `GET /api/resume/{id}` until HTTP 200 or HTTP 422 (`generation_failed`). No fake percentage progress.
- **Resume CRUD & Exports**:
  - `GET /api/resumes`: Lists user's saved resumes `{ id, name, updatedAt, role, template }[]`.
  - `GET /api/resume/{id}`: Returns full `ResumeDocument`.
  - `PATCH /api/resume/{id}`: `{ name: string }`.
  - `DELETE /api/resume/{id}`: Removes resume.
  - `POST /api/resume/{id}`: Duplicates resume.
  - `GET /api/resume/{id}/pdf`: Downloads PDF.
  - `GET /api/resume/{id}/docx`: Downloads DOCX.
  - `POST /api/improve`: `{ bullet: string (3-400), targetRole?, targetCompany?, idempotencyKey? }` → `{ improvedBullet: string, rationale: string }`.

---

## 3. Job Opportunities & Application Tracker
- **Search & Matches**:
  - `GET /api/jobs?q=&country=&type=&remote=&sort=&page=&limit`: Returns `{ jobs: JobOpportunity[], total: number, page: number, totalPages: number, hasResume: boolean }`.
  - `GET /api/job-matches`: Returns matched opportunities with evidence confidence rationale.
  - `GET /api/daily-matches`: Returns daily digest of up to 10 verified opportunities.
- **Application Tracker**:
  - `GET /api/applications`: Returns `{ applications: ApplicationItem[] }`.
  - Status Enum: Strictly `saved | applied | interview | offer | rejected`. (No invented `withdrawn` state).
  - `POST /api/applications`: `{ company, role, status?, jobUrl?, notes?, resumeId?, resumeVariantLabel?, jobId?, provider?, compensation? }`.
  - `PATCH /api/applications/{id}`: Partial update.
  - `DELETE /api/applications/{id}`: Delete application record.

---

## 4. Preparation Tools
- **Cover Letter**:
  - `POST /api/cover`: `{ resumeId: string, company?: string, role?: string, tone: "formal" | "warm" | "direct" }`. Notice: The backend handler does NOT accept a job description.
  - `POST /api/cover-letter-analyzer`: `{ letter: string (80-20,000), targetCompany?, targetRole? }`. Memory-only analysis.
- **LinkedIn Optimizer**:
  - `POST /api/linkedin`: `{ resumeId: string }` → Generates optimized headline and About drafts grounded in resume facts.
- **Interview Studio**:
  - `POST /api/interview`: `{ resumeId: string, useCredit?: boolean }` → Generates 6 grounded interview questions, model answers, and evidence linkages.

---

## 5. Controlled Auto Apply & Mailbox Boundaries
- **Packages & Approval**:
  - `GET /api/application-packages`: Lists pending email applications.
  - `POST /api/application-packages/approve`: `{ packageId: string, selectedRecipient: string }`.
  - Non-negotiable safety: Eligible ONLY when job posting specifies email destination; requires send-only mailbox grant; immutable package preview; one-time approval; unknown outcome is terminal (no auto-retry).
- **Billing**:
  - `GET /api/account/billing`: Payment history only. Canonical plan/quotas are read from `/api/me`.
