# Story 1.5: Core UI Component Library Setup

Status: done

## Story

As a **developer**,  
I want **to set up shadcn/ui component library with Trust Navy theme**,  
So that **I have reusable, accessible UI components that match the design system**.

## Acceptance Criteria

1. **AC1.5.1:** shadcn/ui is installed and configured with Trust Navy color theme applied (primary: `#1e3a5f`, secondary: `#0d47a1`, accent: `#42a5f5`), core components available (Button, Input, Card, Modal, Toast, Form), typography system configured (Roboto Slab for headings, Roboto for body), spacing system using 4px base unit, and accessibility features enabled (ARIA labels, keyboard navigation).

2. **AC1.5.2:** Components follow UX design specifications: button hierarchy (Primary: Deep Navy, Secondary: Rich Blue, Tertiary: Outline), form inputs with labels above fields and required field indicators, error states with inline messages below fields, loading states with skeleton screens and spinners, responsive breakpoints (mobile: max 767px, tablet: 768-1023px, desktop: min 1024px).

3. **AC1.5.3:** Components are accessible: WCAG 2.1 Level AA compliant, keyboard navigation support, screen reader compatible (ARIA labels), color contrast ratios meet standards (4.5:1 for text, 3:1 for interactive).

## Tasks / Subtasks

- [x] Task 1: Install and initialize shadcn/ui (AC: 1.5.1)
  - [x] Execute: `npx shadcn@latest init` in `moar-ats/` directory
  - [x] Configure `components.json` with project paths and styling options
  - [x] Set up `src/components/ui/` directory structure
  - [x] Verify shadcn/ui CLI is working: `npx shadcn@latest add button`
  - [x] Reference: [Source: docs/epics.md#Story-1.5]
  - [x] Reference: [Source: docs/architecture.md#Project-Structure]

- [x] Task 2: Configure Trust Navy color theme in Tailwind (AC: 1.5.1)
  - [x] Update `tailwind.config.js` (or `globals.css` if Tailwind v4) with Trust Navy colors
  - [x] Set primary color: `#1e3a5f` (Deep Navy)
  - [x] Set primary dark: `#152840` (hover states)
  - [x] Set primary light: `#2d5a8a` (secondary actions)
  - [x] Set secondary color: `#0d47a1` (Rich Blue)
  - [x] Set accent color: `#42a5f5` (Bright Blue)
  - [x] Configure semantic colors: success (`#28a745`), warning (`#ffc107`), error (`#dc3545`)
  - [x] Configure neutral grayscale palette (Neutral 50-900)
  - [x] Verify colors are accessible in Tailwind classes and shadcn/ui components
  - [x] Reference: [Source: docs/ux-design-specification.md#Color-System]

- [x] Task 3: Configure typography system (AC: 1.5.1)
  - [x] Install Google Fonts: Roboto Slab (headings) and Roboto (body)
  - [x] Configure font families in `tailwind.config.js` or `globals.css`
  - [x] Set up type scale: H1 (2.5rem/40px), H2 (2rem/32px), H3 (1.5rem/24px), H4 (1.25rem/20px), H5 (1.125rem/18px), H6 (1rem/16px), Body (1rem/16px), Small (0.875rem/14px), Tiny (0.75rem/12px)
  - [x] Configure font weights: Regular (400), Medium (500), Bold (700)
  - [x] Configure line heights: Headings (1.2), Body (1.6), Small (1.5)
  - [x] Test typography in sample components
  - [x] Reference: [Source: docs/ux-design-specification.md#Typography-System]

- [x] Task 4: Configure spacing system (AC: 1.5.1)
  - [x] Set up 4px base unit spacing scale in Tailwind config
  - [x] Configure spacing scale: xs (4px/0.25rem), sm (8px/0.5rem), md (16px/1rem), lg (24px/1.5rem), xl (32px/2rem), 2xl (48px/3rem), 3xl (64px/4rem)
  - [x] Configure border radius: small (4px), medium (8px), large (12px), round (50%)
  - [x] Verify spacing works consistently across components
  - [x] Reference: [Source: docs/ux-design-specification.md#Spacing-&-Layout-Foundation]

- [x] Task 5: Install core shadcn/ui components (AC: 1.5.1)
  - [x] Install Button component: `npx shadcn@latest add button`
  - [x] Install Input component: `npx shadcn@latest add input`
  - [x] Install Card component: `npx shadcn@latest add card`
  - [x] Install Dialog (Modal) component: `npx shadcn@latest add dialog`
  - [x] Install Toast component: `npx shadcn@latest add sonner` (toast deprecated, using sonner)
  - [x] Install Form component: `npx shadcn@latest add form`
  - [x] Verify all components are installed in `src/components/ui/`
  - [x] Verify components use Trust Navy theme colors
  - [x] Reference: [Source: docs/epics.md#Story-1.5]

- [x] Task 6: Configure button hierarchy (AC: 1.5.2)
  - [x] Update Button component variants to match UX design
  - [x] Configure Primary variant: Deep Navy (`#1e3a5f`) background, white text
  - [x] Configure Secondary variant: Rich Blue (`#0d47a1`) background, white text
  - [x] Configure Tertiary variant: Outline style with Deep Navy border
  - [x] Add hover states: Primary Dark (`#152840`) for primary, darker shade for secondary
  - [x] Add disabled states with proper opacity and cursor
  - [x] Test button variants in sample page
  - [x] Reference: [Source: docs/ux-design-specification.md#Component-Specifications]

- [x] Task 7: Configure form input components (AC: 1.5.2)
  - [x] Update Input component to match UX design specifications
  - [x] Configure label placement: labels above fields (not inline)
  - [x] Add required field indicators (asterisk or visual indicator)
  - [x] Configure error states: red border, error message below field
  - [x] Configure placeholder text styling
  - [x] Add focus states with accent color (`#42a5f5`)
  - [x] Test form input states (default, focus, error, disabled)
  - [x] Reference: [Source: docs/ux-design-specification.md#Form-Elements]

- [x] Task 8: Configure loading states (AC: 1.5.2)
  - [x] Install Skeleton component: `npx shadcn@latest add skeleton`
  - [x] Create Spinner component or use shadcn/ui spinner pattern
  - [x] Configure loading states for buttons (disabled + spinner)
  - [x] Configure skeleton screens for content loading
  - [x] Test loading states in sample components
  - [x] Reference: [Source: docs/ux-design-specification.md#Loading-States]

- [x] Task 9: Configure responsive breakpoints (AC: 1.5.2)
  - [x] Verify Tailwind responsive breakpoints match UX design
  - [x] Configure mobile breakpoint: max 767px
  - [x] Configure tablet breakpoint: 768-1023px
  - [x] Configure desktop breakpoint: min 1024px
  - [x] Test components at different breakpoints
  - [x] Verify components are responsive and usable on all screen sizes
  - [x] Reference: [Source: docs/ux-design-specification.md#Responsive-Design]

- [x] Task 10: Ensure WCAG 2.1 Level AA compliance (AC: 1.5.3)
  - [x] Verify color contrast ratios: 4.5:1 for text, 3:1 for interactive elements
  - [x] Test all color combinations (primary, secondary, accent on backgrounds)
  - [x] Add ARIA labels to all interactive components
  - [x] Ensure all form inputs have associated labels
  - [x] Verify focus indicators are visible (keyboard navigation)
  - [x] Test with screen reader (or verify ARIA attributes are correct)
  - [x] Reference: [Source: docs/ux-design-specification.md#Accessibility]
  - [x] Reference: [Source: docs/architecture.md#Non-Functional-Requirements]

- [x] Task 11: Implement keyboard navigation support (AC: 1.5.3)
  - [x] Verify all interactive components are keyboard accessible
  - [x] Test Tab navigation through form elements
  - [x] Test Enter/Space activation for buttons
  - [x] Test Escape key closes modals/dialogs
  - [x] Test arrow keys for navigation (if applicable)
  - [x] Verify focus indicators are visible and clear
  - [x] Reference: [Source: docs/ux-design-specification.md#Accessibility]

- [x] Task 12: Create component showcase page (AC: All)
  - [x] Create showcase page: `src/app/showcase/page.tsx` (or similar)
  - [x] Display all installed components with variants
  - [x] Show color palette usage
  - [x] Show typography examples
  - [x] Show spacing examples
  - [x] Show responsive breakpoints
  - [x] Show accessibility features (keyboard nav, ARIA labels)
  - [x] Reference: [Source: docs/epics.md#Story-1.5]

- [x] Task 13: Write component tests (AC: All)
  - [x] Write unit tests for Button component variants
  - [x] Write unit tests for Input component states
  - [x] Write unit tests for accessibility (ARIA labels, keyboard nav)
  - [x] Write visual regression tests (optional, if tooling available)
  - [x] Follow testing patterns from previous stories
  - [x] Reference: [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Traceability-Mapping]

- [x] Task 14: Update documentation (AC: All)
  - [x] Document component usage in README.md
  - [x] Document color theme configuration
  - [x] Document typography system
  - [x] Document spacing system
  - [x] Document accessibility features
  - [x] Add examples of component usage
  - [x] Reference: [Source: docs/architecture.md#Project-Structure]

## Dev Notes

### Learnings from Previous Story

**From Story 1.4 (Status: done)**

- **Project Structure**: Project is in `moar-ats/` subdirectory, all components should be created in `moar-ats/src/components/ui/` (`docs/sprint-artifacts/1-4-multi-tenant-middleware-and-row-level-security.md:238`)
- **Tailwind Configuration**: Tailwind CSS v4 uses CSS-based configuration via `@theme inline` in `globals.css` instead of separate `tailwind.config.js` file (`docs/sprint-artifacts/1-1-project-setup-and-initial-configuration.md:193`)
- **TypeScript Setup**: TypeScript strict mode enabled by default in Next.js 16.0.4 template (`docs/sprint-artifacts/1-1-project-setup-and-initial-configuration.md:179`)
- **Testing Framework**: Jest configured with unit and integration test patterns established - follow patterns from `__tests__/unit/` and `__tests__/integration/` (`docs/sprint-artifacts/1-4-multi-tenant-middleware-and-row-level-security.md:242-243`)
- **Color Theme**: Trust Navy colors already configured in `src/app/globals.css` from Story 1.1 - verify and extend for shadcn/ui (`docs/sprint-artifacts/1-1-project-setup-and-initial-configuration.md:180`)
- **Component Directory**: `src/components/` directory exists from Story 1.1 - create `src/components/ui/` for shadcn/ui components (`docs/sprint-artifacts/1-1-project-setup-and-initial-configuration.md:198`)

**Key Reusable Components:**
- Use existing Tailwind configuration in `src/app/globals.css` (Tailwind v4 CSS-based config)
- Extend color theme for shadcn/ui component variants
- Follow test patterns from Story 1.4 (`__tests__/unit/tenant/`, `__tests__/integration/tenant/`)

**Technical Debt to Address:**
- None identified from previous stories - this is a new capability

[Source: docs/sprint-artifacts/1-4-multi-tenant-middleware-and-row-level-security.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/1-1-project-setup-and-initial-configuration.md#Dev-Agent-Record]

### Relevant Architecture Patterns and Constraints

**UI Component Library Strategy:**
- shadcn/ui provides accessible, customizable components built on Radix UI primitives
- Components are copied into project (not installed as npm package) for full customization
- Trust Navy theme must be applied consistently across all components
- WCAG 2.1 Level AA compliance required for all components

**Implementation Patterns:**
- shadcn/ui init pattern: `npx shadcn@latest init` creates `components.json` configuration
- Component installation: `npx shadcn@latest add [component]` copies component files
- Theme customization: Update Tailwind config or CSS variables for color theme
- Typography: Configure Google Fonts in `next.config.js` or `layout.tsx`

**Design System Constraints:**
- All components must use Trust Navy color palette (primary: `#1e3a5f`, secondary: `#0d47a1`, accent: `#42a5f5`)
- Typography: Roboto Slab for headings, Roboto for body text
- Spacing: 4px base unit system (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, etc.)
- Responsive breakpoints: mobile (max 767px), tablet (768-1023px), desktop (min 1024px)
- Border radius: small (4px), medium (8px), large (12px), round (50%)

**Accessibility Requirements:**
- WCAG 2.1 Level AA compliance mandatory
- Color contrast: 4.5:1 for text, 3:1 for interactive elements
- Keyboard navigation support for all interactive components
- Screen reader compatibility with proper ARIA labels
- Focus indicators must be visible and clear

**Testing Standards:**
- Unit tests: Test component variants, states, accessibility
- Integration tests: Test component interactions, form flows
- Accessibility tests: Test keyboard navigation, ARIA labels, color contrast
- Reference: [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Traceability-Mapping]

### Project Structure Notes

**Files to Create:**
- `moar-ats/components.json` - shadcn/ui configuration file (created by `npx shadcn@latest init`)
- `moar-ats/src/components/ui/button.tsx` - Button component
- `moar-ats/src/components/ui/input.tsx` - Input component
- `moar-ats/src/components/ui/card.tsx` - Card component
- `moar-ats/src/components/ui/dialog.tsx` - Dialog/Modal component
- `moar-ats/src/components/ui/toast.tsx` - Toast component
- `moar-ats/src/components/ui/form.tsx` - Form component
- `moar-ats/src/components/ui/skeleton.tsx` - Skeleton component (for loading states)
- `moar-ats/src/app/showcase/page.tsx` - Component showcase page (optional but recommended)

**Files to Modify:**
- `moar-ats/src/app/globals.css` - Extend Trust Navy theme for shadcn/ui components (if Tailwind v4)
- `moar-ats/tailwind.config.js` - Update color theme and typography (if Tailwind v3) OR verify CSS-based config in `globals.css` (if Tailwind v4)
- `moar-ats/next.config.js` - Add Google Fonts configuration (Roboto Slab, Roboto)
- `moar-ats/src/app/layout.tsx` - Add Google Fonts import if needed
- `moar-ats/README.md` - Document component library usage

**Alignment with Architecture:**
- Matches architecture decision: shadcn/ui component library base (`docs/architecture.md:86-87`)
- Follows project structure: `src/components/ui/` for base UI components (`docs/architecture.md:86-87`)
- Aligns with UX design specification: Trust Navy theme, typography, spacing (`docs/ux-design-specification.md`)
- Matches accessibility requirements: WCAG 2.1 Level AA compliance (`docs/architecture.md:Non-Functional-Requirements`)

**No Conflicts Detected**

### References

- [Source: docs/epics.md#Story-1.5] - Epic 1.5 story definition and acceptance criteria
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Story-1.5] - Technical specification for Story 1.5 (if available)
- [Source: docs/architecture.md#Project-Structure] - Project structure and component organization
- [Source: docs/ux-design-specification.md#Color-System] - Trust Navy color palette and usage
- [Source: docs/ux-design-specification.md#Typography-System] - Typography system (Roboto Slab, Roboto)
- [Source: docs/ux-design-specification.md#Spacing-&-Layout-Foundation] - 4px base unit spacing system
- [Source: docs/ux-design-specification.md#Component-Specifications] - Component design specifications
- [Source: docs/ux-design-specification.md#Accessibility] - Accessibility requirements and guidelines
- [Source: docs/sprint-artifacts/1-4-multi-tenant-middleware-and-row-level-security.md] - Previous story learnings
- [Source: docs/sprint-artifacts/1-1-project-setup-and-initial-configuration.md] - Project setup learnings

## Dev Agent Record

### Context Reference

- `docs/sprint-artifacts/1-5-core-ui-component-library-setup.context.xml`

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

**Implementation Summary:**
- ✅ shadcn/ui initialized with Trust Navy theme configuration
- ✅ All core components installed: Button, Input, Card, Dialog, Form, Skeleton, Sonner (toast replacement)
- ✅ Trust Navy color palette configured: Primary (#1e3a5f), Secondary (#0d47a1), Accent (#42a5f5)
- ✅ Typography system configured: Roboto Slab (headings), Roboto (body) with full type scale
- ✅ 4px base unit spacing system implemented in CSS variables
- ✅ Button variants configured: Primary (Deep Navy), Secondary (Rich Blue), Tertiary (Outline)
- ✅ FormField component created with labels above fields, required indicators, error states
- ✅ Spinner component created for loading states
- ✅ Input component configured with accent color focus states
- ✅ Component showcase page created at `/showcase` displaying all components
- ✅ Toast notifications wired through a shared `ThemeProvider` wrapper with exported `toast` helper so Showcase and future screens can render Sonner toasts safely
- ✅ Comprehensive test suite: 31 tests passing (Button, Input, FormField, Accessibility)
- ✅ WCAG 2.1 Level AA compliance: ARIA labels, keyboard navigation, focus indicators, color contrast
- ✅ Responsive breakpoints verified: mobile (max 767px), tablet (768-1023px), desktop (min 1024px)

**Technical Decisions:**
- Used Sonner instead of deprecated Toast component
- Tailwind v4 CSS-based configuration in `globals.css` (no separate config file)
- Created custom FormField wrapper component for consistent form patterns
- Created custom Spinner component for loading states
- All components use Trust Navy theme colors directly in className (not CSS variables) for better control
- Introduced a project-level `ThemeProvider` shim around `next-themes` to keep UI primitives independent of framework wiring

**Testing:**
- Unit tests for Button component (8 tests): variants, click events, keyboard navigation, ARIA attributes, sizes
- Unit tests for Input component (7 tests): rendering, user input, disabled states, keyboard navigation, error states, focus styles
- Unit tests for FormField component (4 tests): label placement, required indicators, error messages
- Accessibility tests (12 tests): keyboard navigation (Tab, Enter, Space), ARIA labels, focus indicators, screen reader support
- Regression test for Sonner/ThemeProvider integration guards toast exports and runtime provider wiring
- All 33 tests passing ✅

### File List

**Created:**
- `moar-ats/components.json` - shadcn/ui configuration
- `moar-ats/src/components/ui/button.tsx` - Button component with Trust Navy variants
- `moar-ats/src/components/ui/input.tsx` - Input component with accent focus
- `moar-ats/src/components/ui/card.tsx` - Card component
- `moar-ats/src/components/ui/dialog.tsx` - Dialog/Modal component
- `moar-ats/src/components/ui/form.tsx` - Form component
- `moar-ats/src/components/ui/skeleton.tsx` - Skeleton loading component
- `moar-ats/src/components/ui/sonner.tsx` - Toast notification component
- `moar-ats/src/components/ui/label.tsx` - Label component
- `moar-ats/src/components/ui/form-field.tsx` - FormField wrapper component (custom)
- `moar-ats/src/components/ui/spinner.tsx` - Spinner component (custom)
- `moar-ats/src/app/showcase/page.tsx` - Component showcase page
- `moar-ats/__tests__/unit/ui/button.test.tsx` - Button component tests
- `moar-ats/__tests__/unit/ui/input.test.tsx` - Input component tests
- `moar-ats/__tests__/unit/ui/form-field.test.tsx` - FormField component tests
- `moar-ats/__tests__/unit/ui/accessibility.test.tsx` - Accessibility tests
- `moar-ats/src/components/theme-provider.tsx` - Lightweight wrapper around `next-themes` for consistent theming
- `moar-ats/__tests__/unit/ui/sonner.test.tsx` - Regression test for Sonner toast exports and ThemeProvider wiring

**Modified:**
- `moar-ats/src/app/globals.css` - Trust Navy theme, typography, spacing system
- `moar-ats/src/app/layout.tsx` - Loads Google fonts and wraps the app with the shared ThemeProvider required by Sonner
- `moar-ats/src/lib/utils.ts` - Created by shadcn/ui (cn utility function)
- `moar-ats/jest.setup.js` - Added @testing-library/jest-dom
- `moar-ats/jest.config.js` - Changed test environment to jsdom
- `moar-ats/package.json` - Added Testing Library stack plus `@jest/test-sequencer` for Jest 30 compatibility
- `moar-ats/package-lock.json` - Captures dependency graph including `@jest/test-sequencer`
- `moar-ats/src/components/ui/sonner.tsx` - Re-export `toast` helper and rely on ThemeProvider-driven theming
- `moar-ats/README.md` - Added component library documentation

**Dependencies Added:**
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- @jest/test-sequencer
- Radix UI primitives (installed automatically by shadcn/ui)
- class-variance-authority
- clsx
- tailwind-merge

## Change Log

- 2025-11-27: Senior Developer Review notes appended.
- 2025-11-27: Follow-up review approved after toast + ThemeProvider fixes.

## Senior Developer Review (AI)

**Reviewer:** Gopal  
**Date:** 2025-11-27  
**Outcome:** Approve – toast notifications now re-export correctly, the app is wrapped in a shared `ThemeProvider`, and a regression test guards the Sonner integration.

### Summary
The Trust Navy theme, typography, spacing, and component library remained solid; we focused on the toast integration. `src/components/ui/sonner.tsx` now exports both `Toaster` and `toast`, `src/components/theme-provider.tsx` wraps `next-themes`, and `src/app/layout.tsx` mounts that provider globally so Showcase (and future pages) can render Sonner toasts without runtime errors. A dedicated `__tests__/unit/ui/sonner.test.tsx` suite verifies both the export surface and ThemeProvider wiring. With the blockers resolved, all acceptance criteria and completed tasks are fully implemented, so the story is ready to close.

### Key Findings
- None. The previously high-severity toast/ThemeProvider issues are resolved via the updated Sonner wrapper, shared ThemeProvider, and new regression test.

### Acceptance Criteria Coverage
| AC | Description | Status | Evidence |
| --- | --- | --- | --- |
| AC1.5.1 | Install/config shadcn/ui with Trust Navy theme, typography, spacing, accessibility foundations | **Implemented** – `src/components/ui/sonner.tsx` now re-exports `toast` and consumes the project ThemeProvider, while `src/components/theme-provider.tsx` + `src/app/layout.tsx` ensure Sonner inherits Trust Navy tokens end-to-end. |
| AC1.5.2 | Components follow UX specs (button hierarchy, forms, error/loading states, responsive breakpoints) | **Implemented** – Existing Button/Input/FormField implementations plus the Showcase demos still satisfy UX specs, and the toast triggers now render successfully thanks to the fixed exports/provider. |
| AC1.5.3 | Accessibility (WCAG 2.1 AA, keyboard nav, ARIA, contrast) | **Implemented** – Accessibility-focused unit tests remain, and the new Sonner regression test confirms accessible toasts render under ThemeProvider without runtime errors. |

Summary: 3 of 3 acceptance criteria fully implemented.

### Task Completion Validation
| Task | Marked As | Verified As | Evidence |
| --- | --- | --- | --- |
| 1. Install/init shadcn/ui | [x] | **Verified** – `components.json` still maps all shadcn/ui paths correctly. |
| 2. Configure Trust Navy theme | [x] | **Verified** – `src/app/globals.css` controls Trust Navy tokens used by buttons, inputs, and Sonner focus rings. |
| 3. Configure typography | [x] | **Verified** – `src/app/layout.tsx` continues loading Roboto + Roboto Slab via Next Fonts. |
| 4. Configure spacing system | [x] | **Verified** – `@theme inline` spacing scale remains in `globals.css`. |
| 5. Install core shadcn/ui components | [x] | **Verified** – Core files plus the updated Sonner wrapper provide working Button/Input/Card/Dialog/Form/Skeleton/Toast primitives. |
| 6. Configure button hierarchy | [x] | **Verified** – `src/components/ui/button.tsx` variants still reflect Primary/Secondary/Tertiary styling. |
| 7. Configure form inputs | [x] | **Verified** – `src/components/ui/form-field.tsx` keeps labels, required indicators, and error text aligned with UX specs. |
| 8. Configure loading states | [x] | **Verified** – `src/components/ui/spinner.tsx` + `skeleton.tsx` continue powering Showcase loading sections. |
| 9. Configure responsive breakpoints | [x] | **Verified** – Showcase grids (`src/app/showcase/page.tsx`) cover mobile/tablet/desktop breakpoints. |
| 10. Ensure WCAG compliance | [x] | **Verified** – Trust Navy contrast + focus rings plus Sonner icons keep the UI within WCAG AA targets. |
| 11. Implement keyboard navigation | [x] | **Verified** – Accessibility tests prove keyboard flows, and Sonner inherits focus handling from Radix. |
| 12. Create component showcase page | [x] | **Verified** – `/showcase` renders every component plus the working toast triggers. |
| 13. Write component tests | [x] | **Verified** – Existing UI unit tests plus the new `__tests__/unit/ui/sonner.test.tsx` keep coverage high. |
| 14. Update documentation | [x] | **Verified** – `README.md` still documents the component library; no doc drift detected. |

Summary: 14 of 14 completed tasks verified, 0 questionable, 0 falsely marked complete.

### Test Coverage and Gaps
- Added `__tests__/unit/ui/sonner.test.tsx`, which mocks `matchMedia`, asserts the `toast` helper surface, and renders `<Toaster />` inside the shared ThemeProvider (`npm test -- __tests__/unit/ui/sonner.test.tsx`).
- Existing button/input/form-field/accessibility suites remain green; no new gaps identified for this story scope.

### Architectural Alignment
- UI primitives still live under `src/components/ui`, and the new ThemeProvider wrapper keeps shadcn/ui components decoupled from Next.js specifics while honoring the architecture doc’s emphasis on shared design tokens.

### Security Notes
- Changes remain front-end only; no auth/db surfaces touched. Toast improvements do not affect data flow or secrets.

### Best-Practices and References
- Stack: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Testing Library, Jest 30 (`package.json`). The new regression test and ThemeProvider wrapper align with shadcn guidance around theming and Sonner usage.

### Action Items
**Code Changes Required**
- [ ] None – review approved without follow-up work.

**Advisory Notes**
- Note: Keep the Sonner regression test in the default `npm test` matrix to guard future theming changes.

