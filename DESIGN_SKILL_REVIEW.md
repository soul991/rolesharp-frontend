# RoleSharp 2.0 — Design Skill Review & Architectural Framework

**Execution Phase**: Phase B — Complete Frontend Design Transformation  
**Date**: November 10, 2026  
**Auditor**: Independent Lead Product Designer & Senior Frontend Engineer

---

## 1. Overview of Mandatory & Supporting Skills

In accordance with Phase B requirements, an exhaustive discovery across the local skill registry (`C:\Users\hyper\.agents\skills`, `C:\Users\hyper\.gemini\config\skills`, `C:\Users\hyper\.gemini\antigravity\skills`) was conducted. All five mandatory design-review skills were located, analyzed, and integrated into our design transformation workflow.

| Skill Name | Canonical Disk Path | Status | Core Philosophy & Applied Directive |
|---|---|---|---|
| **1. Unslop** | `C:\Users\hyper\.agents\skills\unslop\SKILL.md` | **ACTIVE** | Eliminates generic AI tropes (purple/blue neon gradients, glowing cards, uppercase tracked labels, emojis as icons). Enforces 4px spatial rhythm, hairline borders (6-10% opacity), quiet chrome, and "one bright element" focal point. |
| **2. Impeccable** | `C:\Users\hyper\.agents\skills\impeccable\SKILL.md` | **ACTIVE** | Enforces surface modal discipline: **Persuade** for public marketing (bold, editorial, distinctive) vs **Operate** for workspaces (scanability, high data density, quiet restraint, native feel). Zero shortcuts, complete production deliverables. |
| **3. Hallmark** | `C:\Users\hyper\.gemini\config\skills\hallmark\SKILL.md` | **ACTIVE** | Implements "The Floor": All colors/fonts through `:root` tokens; never `transition: all`; never animate layout properties (`width`/`height`/`top`/`left`); `overflow-x: clip`; mandatory `:focus-visible`; `prefers-reduced-motion` fallbacks; no invented metrics; no uppercase tracked eyebrows. |
| **4. UI UX Pro Max** | `C:\Users\hyper\.agents\skills\ui-ux-pro-max\SKILL.md` | **ACTIVE** | Provides typographic pairing models, ergonomic tabular density, WCAG 2.1 AA/AAA contrast ratios, state-machine feedback, and responsive layout constraints (1440px / 1024px / 768px / 390px / 375px). |
| **5. Taste (design-taste-frontend)** | `C:\Users\hyper\.gemini\config\skills\design-taste-frontend\SKILL.md` | **ACTIVE** | Distilled from 247 curated gallery sites. Eliminates generic centered SaaS templates and repetitive cards; applies editorial typography, authentic material metaphors (ink, paper, steel, slate), and intentional composition. |

### Supporting Frontend & UX Skills Loaded
- **Superdesign** (`C:\Users\hyper\.agents\skills\superdesign\SKILL.md`): Component composition, animated lists, stepper patterns, document previews.
- **Web Design Guidelines** (`C:\Users\hyper\.agents\skills\web-design-guidelines\SKILL.md`): Keyboard navigation, accessible form labeling, touch targets (>= 44px).
- **Frontend Design Guidance** (`C:\Users\hyper\.gemini\antigravity\skills\frontend-design\SKILL.md`): Visual hierarchy, typography pairing, micro-interactions.

---

## 2. Synthesis of Rules & Applied Design Standards

### 2.1 Spatial Rhythm & Layout Grid
- **4px Spatial Increment**: All margins, paddings, gaps, and component dimensions adhere strictly to multiples of 4px (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80).
- **Surface Padding Rules**:
  - Compact sidebar items & toolbars: 8px – 12px
  - Form controls & interactive pills: 10px – 14px
  - Content cards & workspace panels: 20px – 24px
  - Page gutters & application headers: 24px – 32px
- **Layout Capping**: Full containers capped and centered at `1380px` max-width. Gutters expand gracefully on ultra-wide viewports (>1440px) without stretching text lines into unreadable widths.

### 2.2 Color & Surface Hierarchy
- **Palette Identity**: Editorial Navy & Deep Slate with Warm Ivory / Crisp Chalk Light surfaces.
  - Light theme base: `#F9F8F6` (warm archival linen) with `#FFFFFF` crisp elevated paper cards and hairlines `#E5E3DD`.
  - Dark theme base: `#090D14` (deep midnight slate) with `#111722` structural workspace panels and quiet hairlines `rgba(255, 255, 255, 0.08)`.
- **Primary Brand Accent**: `#1E3A8A` (Deep Royal Navy in Light) / `#3B82F6` (Refined Precision Blue in Dark).
- **Semantic Accents**:
  - Success / Grounded: `#059669` (Emerald)
  - Warning / Verification Notice: `#D97706` (Warm Ochre / Amber)
  - Error / Missing Requirement: `#DC2626` (Crimson)
  - Info / Metadata: `#64748B` (Cool Slate)
- **Slop Bans**:
  - Zero purple-to-blue neon gradients.
  - Zero glowing borders or blurred colored light leaks.
  - Zero glassmorphism on dense productivity surfaces (only subtle 2% tints where deliberate).

### 2.3 Typographic System
- **Display Headings**: High-character serif or clean geometric editorial display (`Newsreader` / `Playfair` / `Instrument Serif` for editorial emphasis, paired with `Plus Jakarta Sans` / `Inter` for interface structure).
- **Interface & Body Face**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif.
- **Code & Numeric Tabular Face**: `JetBrains Mono`, `Fira Code`, monospace with `font-variant-numeric: tabular-nums`.
- **Anti-Slop Typography Rules**:
  - No tracked uppercase eyebrow labels (`text-[10px] uppercase tracking-widest font-bold`).
  - Labels and tags use standard sentence or lower case, proportional to context.
  - No random mixing of weights. Headings use 600 or 700; body uses 400 or 500.

### 2.4 Motion & Interaction Standards
- **Explicit Property Transitions**: Transitions explicitly declare animated properties (`transform`, `opacity`, `background-color`, `border-color`, `color`, `box-shadow`). Never `transition: all`.
- **Timing & Curves**:
  - Fast feedback (hover, focus): `120ms - 150ms ease-out`
  - Medium feedback (accordion, tabs, drawers): `200ms - 250ms cubic-bezier(0.16, 1, 0.3, 1)`
  - Exit transitions: `150ms ease-in`
- **Accessibility**: All keyframe animations and transitions wrapped with `@media (prefers-reduced-motion: reduce) { ... }` fallbacks.
- **Focus Rings**: High-contrast, instantly visible `:focus-visible` rings (`2px solid var(--rs-blue)` with `2px offset`).

---

## 3. Review Checklist for Implementation Phases

- [x] All 5 mandatory design skills loaded and analyzed.
- [x] Design token taxonomy established across light and dark themes.
- [x] Anti-slop bans documented and active in design audit.
- [x] Mode separation (Persuade vs Operate) strictly enforced across the 25 routes.
