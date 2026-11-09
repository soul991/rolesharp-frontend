# RoleSharp 2.0 — Design System Specification

## 1. Design Tokens & Color Palettes

### Dark Theme (Default)
| Token Name | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Canvas Background | `--rs-bg` | `#061426` | Root page background |
| Primary Surface | `--rs-surface` | `#0C213A` | Cards, panels, headers |
| Secondary Surface | `--rs-surface-2` | `#112943` | Active tabs, nested wells, inputs |
| Raised Surface | `--rs-surface-3` | `#193653` | Popovers, modals, dropdowns |
| Paper Canvas | `--rs-paper` | `#F7F6F0` | Resume document preview sheet |
| Paper Ink | `--rs-paper-ink` | `#172B48` | Resume document text |
| Primary Ink | `--rs-ink` | `#EFF5FF` | Highest emphasis headlines & labels |
| Muted Ink | `--rs-muted` | `#A9BAD1` | Supporting copy, descriptions |
| Hairline Border | `--rs-line` | `#26415F` | Clean separation borders |
| Action Blue | `--rs-blue` | `#9FC3F2` | Interactive links, badges, highlights |
| Strong Blue | `--rs-blue-strong` | `#5B9BFF` | Active borders, focus rings |
| Blue Ink | `--rs-blue-ink` | `#071A33` | Text on blue buttons |
| Amber Accent | `--rs-amber` | `#F2C96D` | Brand accents, key focus indicators |
| Emerald Success | `--rs-green` | `#34D399` | Success badges, verification marks |
| Crimson Danger | `--rs-red` | `#F87171` | Error alerts, destructive actions |
| Elevation Shadow | `--rs-shadow` | `0 24px 60px rgba(0,0,0,0.32)` | Modals, floating sheets |

### Light Theme
| Token Name | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Canvas Background | `--rs-bg` | `#F3F2EE` | Warm ivory root page background |
| Primary Surface | `--rs-surface` | `#FAF9F6` | Cards, panels, headers |
| Secondary Surface | `--rs-surface-2` | `#ECEBE6` | Active tabs, wells, inputs |
| Raised Surface | `--rs-surface-3` | `#E3E5E8` | Modals, dropdowns |
| Paper Canvas | `--rs-paper` | `#FFFFFF` | Crisp white resume document preview |
| Paper Ink | `--rs-paper-ink` | `#172B48` | Resume document text |
| Primary Ink | `--rs-ink` | `#10243E` | Deep navy headings & primary text |
| Muted Ink | `--rs-muted` | `#52647A` | Slate body copy |
| Hairline Border | `--rs-line` | `#D5DFEA` | Soft separation borders |
| Action Blue | `--rs-blue` | `#123B7A` | Deep blue interactive controls |
| Strong Blue | `--rs-blue-strong` | `#2458A6` | Active borders, focus rings |
| Blue Ink | `--rs-blue-ink` | `#FFFFFF` | Text on blue buttons |
| Amber Accent | `--rs-amber` | `#A96A0B` | Warm golden accents |
| Emerald Success | `--rs-green` | `#047857` | Verified checkmarks, success tags |
| Crimson Danger | `--rs-red` | `#DC2626` | Error alerts |
| Elevation Shadow | `--rs-shadow` | `0 24px 60px rgba(14,33,58,0.12)` | Subtle depth shadows |

---

## 2. Typography System

### Type Families
- **Display**: `"Space Grotesk", system-ui, sans-serif`
  - Used for: Brand mark, page headlines (`h1`, `h2`), large metric callouts, card headers.
  - Tracking: `-0.055em` to `-0.065em` on large sizes.
- **Body & Interface**: `"DM Sans", system-ui, sans-serif`
  - Used for: Primary paragraphs, navigation links, buttons, form controls, table data.
  - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
- **Editorial Accent**: `"Playfair Display", Georgia, serif`
  - Used for: Selected brand statements, featured quotes, reflective callouts.
  - Style: Italic 500.
- **Data & Micro-Metadata**: `"Geist Mono", "SF Mono", monospace`
  - Used for: ATS scores, numeric IDs, file hashes, timestamps, keyboard shortcuts.

### Scale & Hierarchy
| Level | Font Size | Line Height | Weight | Font Role |
|---|---|---|---|---|
| Display Hero | `clamp(2.5rem, 4.5vw, 4.25rem)` | 1.02 | 650–700 | Space Grotesk |
| H1 Page Title | `clamp(1.85rem, 3.2vw, 2.75rem)` | 1.1 | 650 | Space Grotesk |
| H2 Section Heading | `clamp(1.35rem, 2.2vw, 1.85rem)` | 1.2 | 650 | Space Grotesk |
| H3 Card Title | `1.05rem`–`1.2rem` | 1.3 | 600 | Space Grotesk |
| Body Large (Lede) | `clamp(1rem, 1.25vw, 1.15rem)` | 1.65 | 400 | DM Sans |
| Body Base | `0.9rem`–`0.95rem` (14px–15px) | 1.55 | 400–500 | DM Sans |
| Small / Helper | `0.8rem`–`0.85rem` (12px–13px) | 1.45 | 500 | DM Sans |
| Caption / Eyebrow | `0.7rem` (11px) | 1.2 | 700–800 | DM Sans (uppercase, tracked) |
| Score Callout | `2.25rem`–`3rem` | 1.0 | 700 | Space Grotesk / Geist Mono |

---

## 3. Layout Grid & Spacing
- **Base Grid**: 4px increment scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px).
- **Containers**:
  - Marketing: `width: min(1240px, calc(100% - 48px)); margin: 0 auto;`
  - Workspace Shell: 240px persistent sidebar + fluid 12-column content area (`max-width: 1400px`).
  - Mobile: `calc(100% - 32px)` with full-bleed bottom navigation.
- **Border Radii**:
  - Buttons / Controls: `8px`–`10px`
  - Cards & Content Wells: `12px`–`14px`
  - Modals & Floating Stages: `16px`–`18px`
  - Badges / Pills: `9999px`

---

## 4. Component Primitives
- **Button**: Variants: `primary`, `secondary` (ghost/bordered), `subtle`, `danger`. States: Default, Hover, Active, Focus-Visible, Disabled, Loading (animated ring). Minimum touch target: 44px × 44px.
- **TextField / TextArea**: Bordered with `--rs-line`, transitioning to `--rs-blue-strong` on focus. Error state triggers `--rs-red` border with accessible `aria-invalid` and `aria-describedby`.
- **StatusBadge**: Semantic color pairs (Success: green/tint; Warning: amber/tint; Info: blue/tint; Neutral: muted/surface).
- **ScoreRing**: SVG circle progress ring showing calibrated score (0–100) with honest dimension breakdown (Parseability, Structure, Keywords, Evidence).
- **EvidenceCard**: Interactive card with source citation badge, recommendation explanation, and grounded diff comparison.

---

## 5. Motion Language & Reduced-Motion Contracts
- **Easing Standard**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy spring deceleration).
- **Theme Reveal**: Circular clip-path originating from clicked button coordinates via View Transitions API (480ms duration).
- **Word-by-Word Sequence**: Staggered rise and fade with strict static fallback when `prefers-reduced-motion: reduce` is detected.
- **Document Writing Animation**: Smooth line-by-line reveal tracking an animated vector nib during real backend generation; instant static layout when reduced motion is preferred.
