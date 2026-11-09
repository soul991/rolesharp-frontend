# RoleSharp 2.0 — Design References & Visual Research

**Phase**: Phase B — Frontend Design Transformation  
**Date**: November 10, 2026  
**Auditor**: Independent Lead Product Designer

---

## 1. Connected Design Tooling Discovery

| Tool / Service | Integration Mode | Discovered Status | Applied Architectural Role |
|---|---|---|---|
| **Figma MCP Bridge** | MCP Server (`figma-bridge`) | **Available** (`unsaved-mw9cnj0n-kx33qfhx`) | Inspected connected file `RoleSharp 2.0 — Product Redesign` containing 3 pages: `01 — Product Screens`, `02 — Design System`, `03 — UX Flows`. Referenced for screen layout proportions and component anatomy. |
| **Stitch MCP** | MCP Server (`StitchMCP`) | **Available** (`projects/15045499164197540728`) | Inspected design system specifications: token architecture, 4px grid rhythm, typography scales (`headline-xl`, `headline-lg`, `body-md`, `label-sm`), and elevation structures. |
| **Canva MCP** | MCP Server (`canva`) | **Available** | Verified account readiness; reserved for editorial assets. UI code maintained directly in React/TypeScript. |
| **Superdesign** | Local Design Skill (`superdesign`) | **Available** | Source patterns for `ResumeWritingAnimation`, `AnimatedStepper`, `InteractiveCardStack`, `AnimatedList`, and `PricingSection`. |
| **Chrome DevTools MCP**| MCP Server (`chrome-devtools-mcp`) | **Available & Active** | Direct live browser rendering inspection, automated snapshot verification, responsive viewport testing, and console audit. |

---

## 2. External Architectural References & Selected Patterns

### 2.1 Editorial Career Intelligence & Typographic Authority (Stripe Press & The Atlantic)
- **Source Pattern**: Intentional contrast between an authoritative, literary serif display face for macro-statements and high-precision sans-serif for structured interface data.
- **Key Characteristics**:
  - Unslop-compliant: zero glowing gradient text, zero floating colorful orbs.
  - Generous line height and sentence-case headlines that balance naturally.
  - Deep Navy (`#0C1E3C`) and Warm Linen (`#F9F8F6`) palette.
- **Where Adapted in RoleSharp**:
  - Landing Page Hero (`/`): Replaces generic SaaS clamp text with an editorial, authoritative headline.
  - About & Manifesto Page (`/about`): Editorial manifesto layout with clear typography and no-hallucination commitments.
  - Public Pricing (`/pricing`): Clear, high-contrast typography distinguishing monthly vs annual investment.

### 2.2 Modern Productivity Workspace Chrome (Linear & Raycast)
- **Source Pattern**: Ultra-clean, distraction-free operating chrome where toolbars, borders, and navigation recede into quiet hairlines, letting user data take center stage.
- **Key Characteristics**:
  - 4px spatial rhythm throughout all list items, buttons, and headers.
  - Monochrome hairline borders (`rgba(255, 255, 255, 0.08)` in dark, `#E5E7EB` in light).
  - High-density tabular numbers with monospace alignment.
  - Meaningful status dots instead of bulky decorative badges.
- **Where Adapted in RoleSharp**:
  - Application Shell (`AppShell`): Quiet, elegant sidebar navigation without loud uppercase tracking.
  - Application Tracker (`/tracker`): 5-column Kanban board with clean card geometry, subtle drop targets, and fluid drag-and-drop feedback.
  - Daily Matches (`/daily-matches`): High-density candidate match table with precise score pills.

### 2.3 Paper & Document Canvas Ergonomics (Notion & Craft)
- **Source Pattern**: Dedicated document canvas viewport that preserves the physical metaphor of executive white paper (`#FFFFFF`), regardless of whether the surrounding workspace is dark or light.
- **Key Characteristics**:
  - Invariant white sheet background (`#FFFFFF`) with rich navy/black ink (`#111827`).
  - Realistic document drop shadows (`0 12px 32px rgba(0, 0, 0, 0.08)`).
  - Contextual zoom, pagination, and print action controls directly accessible on the canvas.
- **Where Adapted in RoleSharp**:
  - Resume Builder (`/resume-builder`): Live paper sheet with interactive section highlights.
  - Resume Tailor (`/tailor`): Side-by-side job diff and progressive resume-writing animation.
  - Cover Letter Generator (`/cover-letter`): Distraction-free draft editor with paper presentation.

### 2.4 Diagnostic Telemetry & Evidence Audits (Vercel & GitHub Actions)
- **Source Pattern**: Serious, high-integrity diagnostic dashboards that present evidence, metrics, and actionable fixes without gamified vanity graphics.
- **Key Characteristics**:
  - Clear, honest metric breakdowns (Parsing Fidelity, Layout Risk, Evidence Density, Role Fit).
  - Anchored line citations that quote source documents directly.
  - Explicit disclosures of memory-only execution and zero remote storage.
- **Where Adapted in RoleSharp**:
  - ATS Checker (`/checker`): Streamlined diagnostic report with high-precision score ring, dimension meters, and anchored gap callouts.
  - Cover Letter Analyzer (`/cover-letter-analyzer`): Real-time brevity and cliché redline inspector.
  - Controlled Auto Apply Queue (`/auto-apply`): Immutable executive dispatch packet review.

---

## 3. Adaptation Matrix

| Reference Inspiration | Original Trait | RoleSharp 2.0 Adapted Implementation |
|---|---|---|
| Stripe Press | Serif display headings | `Instrument Serif` / `Newsreader` font pairing with `Inter` body in `tokens.css` |
| Linear | Hairline borders & quiet chrome | `border: 1px solid var(--rs-line-subtle)` replacing heavy borders; no glassmorphism |
| Notion | White document canvas | Standalone `<ResumeCanvas>` container with invariant `#FFFFFF` paper and crisp typography |
| Raycast | Keyboard focus & density | High-contrast `focus-visible` rings (`2px solid var(--rs-blue)`), compact 36px controls |
| Vercel | Honest telemetry & evidence badges | Minimalist status dots (`● Grounded`, `● Offline Fallback`) replacing multi-badge clusters |
