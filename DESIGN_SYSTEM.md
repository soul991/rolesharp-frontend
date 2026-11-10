# RoleSharp 2.0 — Design System Specification

**Version**: 2.0.0  
**Status**: Authoritative Reference  
**Date**: November 10, 2026

---

## 1. Design Philosophy: The Editorial Career Workbench

RoleSharp 2.0 is designed around a single core conviction: **Career applications are high-stakes legal-grade documents, not social media posts.**

The visual identity combines the **literary authority of an editorial publishing house** with the **precision and speed of a modern developer tool**. Every surface, typeface, and micro-interaction communicates evidence, integrity, and verified competence.

### Core Tenets
1. **Quiet Chrome, Rich Content**: Navigation, sidebars, and toolbars recede into calm neutrals. The candidate's work and real career evidence carry the color and focus.
2. **Document Invariance**: Executive resumes, cover letters, and diagnostic dockets are rendered on physical white paper (`#FFFFFF`) with crisp typography across both light and dark themes.
3. **No Decorative AI Clichés**: Zero purple/blue neon glows, zero floating glass blobs, zero tracked uppercase eyebrows, and zero gamified vanity bars.
4. **Authentic Evidence Anchoring**: Every diagnostic finding, metric, and interview talking point is anchored to an exact excerpt from the candidate's verified history.

---

## 2. Color System & Surface Hierarchy

The color architecture uses a 3-layer token model: **Primitives** → **Semantics** → **Components**.

### 2.1 Dark Theme (Primary Operating Mode)
- **Base Background (`--rs-bg`)**: `#0A0F1A` (Deep Midnight Slate, 0% purple, neutral slate tint)
- **Primary Surface (`--rs-surface`)**: `#111827` (Structural panel background)
- **Elevated Surface (`--rs-surface-2`)**: `#1F2937` (Dropdowns, modals, hover states)
- **Subtle Surface (`--rs-surface-3`)**: `#374151` (Active pills, subtle card insets)
- **Primary Ink (`--rs-ink`)**: `#F9FAFB` (High-contrast pure reading text)
- **Secondary / Muted Ink (`--rs-muted`)**: `#9CA3AF` (Supporting metadata, captions)
- **Hairline Border (`--rs-line`)**: `rgba(255, 255, 255, 0.08)` (Subtle separation)
- **Active Border (`--rs-line-strong`)**: `rgba(255, 255, 255, 0.16)` (Hovered or focused borders)
- **Brand Accent (`--rs-blue`)**: `#3B82F6` (Precision Cobalt Blue, 4.5:1+ contrast on dark)
- **Paper Canvas (`--rs-paper`)**: `#FFFFFF` (Invariant crisp sheet)
- **Paper Ink (`--rs-paper-ink`)**: `#111827` (Deep charcoal ink on paper)

### 2.2 Light Theme (Warm Editorial Mode)
- **Base Background (`--rs-bg`)**: `#F8F7F4` (Warm Archival Linen)
- **Primary Surface (`--rs-surface`)**: `#FFFFFF` (Crisp paper panels)
- **Elevated Surface (`--rs-surface-2`)**: `#F1EFEA` (Controls, input backgrounds)
- **Subtle Surface (`--rs-surface-3`)**: `#E5E3DD` (Active pills, borders)
- **Primary Ink (`--rs-ink`)**: `#0F172A` (Rich midnight charcoal)
- **Secondary / Muted Ink (`--rs-muted`)**: `#576579` (Cool slate metadata)
- **Hairline Border (`--rs-line`)**: `#E2E8F0` (Quiet separation)
- **Active Border (`--rs-line-strong`)**: `#CBD5E1` (Hovered or focused borders)
- **Brand Accent (`--rs-blue`)**: `#1D4ED8` (Deep Royal Blue, 7:1+ contrast on light)
- **Paper Canvas (`--rs-paper`)**: `#FFFFFF`
- **Paper Ink (`--rs-paper-ink`)**: `#0F172A`

### 2.3 Semantic Status Roles & Background Tints
- **Success / Grounded (`--rs-green`)**: `#10B981` (Dark) / `#059669` (Light)  
  *Subtle Tint (`--rs-green-subtle`)*: `rgba(16, 185, 129, 0.12)` (Dark) / `rgba(5, 150, 105, 0.08)` (Light)
- **Warning / Notice (`--rs-amber`)**: `#F59E0B` (Dark) / `#B45309` (Light)  
  *Subtle Tint (`--rs-amber-subtle`)*: `rgba(245, 158, 11, 0.12)` (Dark) / `rgba(180, 83, 9, 0.08)` (Light)
- **Error / Danger (`--rs-red`)**: `#EF4444` (Dark) / `#DC2626` (Light)  
  *Subtle Tint (`--rs-red-subtle`)*: `rgba(239, 68, 68, 0.12)` (Dark) / `rgba(220, 38, 38, 0.08)` (Light)
- **Info / Mode (`--rs-blue`)**: `#3B82F6` (Dark) / `#1D4ED8` (Light)  
  *Subtle Tint (`--rs-blue-subtle`)*: `rgba(59, 130, 246, 0.12)` (Dark) / `rgba(29, 78, 216, 0.08)` (Light)

---

## 3. Typographic System & Font Roles

RoleSharp pairs an **authoritative editorial serif** with an **ergonomic geometric sans** and **tabular monospace**.

### 3.1 Type Families
- **Display & Editorial (`--font-display`, `--font-serif`)**: `"Newsreader"`, `"Playfair Display"`, Georgia, serif  
  *Role*: Macro page titles, editorial quotes, brand statements, landing hero headlines.
- **Interface & Body (`--font-body`, `--font-sans`)**: `"Inter"`, system-ui, -apple-system, sans-serif  
  *Role*: Navigation, buttons, form inputs, table content, documentation, standard interface prose. `--font-sans` is provided as an exact semantic alias to `--font-body`.
- **Code & Tabular Numbers (`--font-mono`)**: `"JetBrains Mono"`, SFMono-Regular, Menlo, monospace  
  *Role*: ATS percentages, latency scores, line citations, credit counters, date stamps (`tabular-nums`).

### 3.2 Type Scale
| Token | Font Size | Line Height | Letter Spacing | Weight | Typical Usage |
|---|---|---|---|---|---|
| `text-display-2xl` | `44px` (2.75rem) | `1.1` | `-0.03em` | 600 | Marketing Hero headline |
| `text-display-xl` | `36px` (2.25rem) | `1.15` | `-0.025em` | 600 | Workspace Section titles |
| `text-heading-lg` | `26px` (1.625rem) | `1.2` | `-0.02em` | 600 | Major Card and Studio titles |
| `text-heading-md` | `20px` (1.25rem) | `1.3` | `-0.015em` | 600 | Subsections, Modal headers |
| `text-body-lg` | `16px` (1.0rem) | `1.55` | `0` | 400 | Lead paragraphs, instructions |
| `text-body-md` | `14px` (0.875rem) | `1.5` | `0` | 400/500 | Standard UI text, list rows |
| `text-caption` | `12.5px` (0.78rem) | `1.4` | `0` | 500/600 | Metadata, helper labels, table heads |
| `text-micro` | `11px` (0.6875rem) | `1.3` | `0.02em` | 600 | Status dots, concise badges (sentence-case) |

---

## 4. Spatial Rhythm & Geometry

- **Base Grid Unit**: `4px`
- **Component Padding Scale**:
  - `p-xs`: `4px`
  - `p-sm`: `8px`
  - `p-md`: `12px` – `16px`
  - `p-lg`: `20px` – `24px`
  - `p-xl`: `32px` – `40px`
- **Corner Radii Tokens**:
  - Small / Controls (`--radius-sm`): `6px`
  - Medium / Cards (`--radius-md`): `10px`
  - Large / Panels (`--radius-lg`): `16px`
  - Full / Pills (`--radius-pill`): `9999px` (Badges, pills, circular ends)
- **Elevation & Shadows**:
  - Light mode: `0 4px 12px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.08)`
  - Dark mode: `0 12px 36px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)`
  - Floating Paper: `0 16px 40px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)`

---

## 5. Motion & Interaction Architecture

- **Timing Curves**:
  - Standard ease: `cubic-bezier(0.16, 1, 0.3, 1)`
  - Spring pop: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Durations**:
  - Interactive hover/tap: `120ms`
  - Expansions, dropdowns, tabs: `200ms`
  - Page/Modal entrances: `280ms`
- **Strict Reduced Motion**: `@media (prefers-reduced-motion: reduce)` immediately turns off all transitions and keyframe motion across all components.

---

## 6. Responsive Breakpoints

| Breakpoint | Width | Layout Behavior |
|---|---|---|
| **Desktop Ultra** | `>= 1440px` | Max-width capped at 1380px, expanded gutters, dual-column editors |
| **Desktop Standard** | `1024px – 1439px` | Sticky 240px sidebar, full feature density |
| **Tablet Landscape** | `768px – 1023px` | Collapsible sidebar, adaptive 2-column or stacked layout |
| **Tablet Portrait** | `640px – 767px` | Mobile drawer navigation, full-width cards, wrapped button bars |
| **Mobile Standard** | `390px – 639px` | Single-column fluid layout, 16px gutters, bottom safe areas |
| **Narrow Mobile** | `< 390px` | Compact button groups, stacked action bars |
