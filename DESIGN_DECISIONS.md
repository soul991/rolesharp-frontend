# RoleSharp 2.0 — Design Decisions & Rationale

## 1. Visual Mission: Editorial Career-Application Studio
RoleSharp is designed as an integrated, precision career workspace, not an AI resume template factory or generic SaaS dashboard.
- **Tone**: Modern, confident, human, precise, warm, and technically capable.
- **Palette Identity**:
  - Dark Mode: Midnight navy canvas (`#061426`), deep blue surfaces (`#0C213A`, `#112943`), hairline borders (`#26415F`), ice blue typography (`#EFF5FF`), and warm amber accents (`#F2C96D`).
  - Light Mode: Warm paper canvas (`#F3F2EE`), ivory surfaces (`#FAF9F6`), soft hairline borders (`#D5DFEA`), ink text (`#10243E`), and deep navy headers (`#123B7A`).
  - Document/Paper Invariance: In both themes, resume preview sheets remain an authentic ivory/white paper surface (`#FFFFFF` / `#F7F6F0`) with crisp ink typography (`#172B48`).

## 2. Typographic Hierarchy
Generic SaaS interfaces over-rely on Inter with uniform sizes and weights. RoleSharp establishes four distinct typographic roles:
1. **Display & Headings**: `Space Grotesk` (weights 600–700, tight tracking `-0.055em` to `-0.065em`, balanced wrapping).
2. **Body & Controls**: `DM Sans` (weights 400, 500, 600, 700; comfortable line measures `48ch`–`65ch`).
3. **Editorial Accent**: `Playfair Display` (italic 500, restrained use in brand statements and featured quotes).
4. **Data & Metadata**: `Geist Mono` (numeric scores, dates, status codes, micro-metadata).

## 3. Preservation of Landing-Page Signature
Directly ports and elevates the user-refined reference:
- **Circular Theme Reveal**: Originating from the toggle button coordinates using the View Transitions API with seamless instant fallback for older browsers or `prefers-reduced-motion`.
- **Word-by-Word Kinetic Brand Sequence**:
  1. *“Do you know what it takes to secure a job rather than Degree and Skills?”*
  2. *“well!”*
  3. *“A perfect resume that explains you more than yourself!!”*
  4. *“So, choose RoleSharp to tailor your resume.”*
- **Interactive Evidence Review Stage**: Hands-on tabs (`Evidence review`, `Role gap`, `Suggested edit`) demonstrating evidence-linked resume analysis with real highlight transitions.

## 4. Superdesign Integration & Adaptation
All five requested Superdesign patterns are adapted into RoleSharp semantic design tokens:
1. **Resume Writing Animation**: Light paper sheet, progressive line reveal (header, contacts, summary, bullets), restrained pen/nib motion, linked directly to asynchronous generation states with reduced-motion static fallback.
2. **Animated Stepper**: Directional transitions, real validation gates, completed check states, accessible `aria-current="step"`.
3. **Animated List**: Option selection for tones, templates, and filter tags with keyboard arrow selection and hover pause.
4. **Interactive Card Stack**: Layered preview cards for resume templates with explicit Previous/Next buttons, touch controls, and grid view alternative.
5. **Pricing & Billing**: Clear comparison cards, monthly/annual toggle, student offer disclosure, data driven by canonical `/api/me`.
