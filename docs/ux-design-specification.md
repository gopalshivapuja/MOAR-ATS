# MOAR ATS UX Design Specification

_Created on 2025-11-25 by Gopal_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

MOAR ATS is the AI-native applicant tracking system for India-first GCC tenants. The UX design will leverage the existing MOAR Advisory brand kit from moaradvisory.in, ensuring consistent brand identity across recruiter and candidate portals while delivering a professional yet approachable experience that builds trust through transparency and explainable AI.

**Brand Foundation:** Using MOAR Advisory brand kit (logo, colors, fonts, design elements, UI components) from moaradvisory.in

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Decision:** Using MOAR Advisory brand kit and design system from moaradvisory.in

**Rationale:** 
- Ensures brand consistency across MOAR Advisory's digital presence
- Leverages existing brand assets (logo, colors, fonts, UI components)
- Reduces design system creation effort
- Maintains familiar visual identity for internal users

**Brand Source:** moaradvisory.in website design system

**Components Available:**
- Logo and brand assets
- Color palette (primary, secondary, semantic colors)
- Typography system (font families, type scale)
- Existing UI components and patterns
- Design tokens and spacing system

**Customization Needs:**
- Adapt existing components for ATS-specific workflows (pipeline view, candidate cards, AI explanation panels)
- Add gamification elements while maintaining brand consistency
- Ensure accessibility compliance (WCAG 2.1 AA)

---

## 2. Core User Experience

### 2.1 Defining Experience

**Core Experience:** Recruiter pipeline view - the primary workspace where recruiters spend most of their day managing candidates through hiring stages with AI assistance.

**Primary User Actions:**
1. Post jobs and manage job postings
2. Review applicants in pipeline view (Kanban-style)
3. Shortlist candidates with AI-assisted scoring
4. Communicate with candidates (email, scheduling)
5. Move candidates through workflow stages
6. Override/correct AI decisions when needed

**Critical Interaction:** Resume scoring and shortlisting with human-in-the-loop - must be accurate, explainable, and correctable.

**Candidate Experience:** Seamless LinkedIn OAuth login with auto-fill, minimal friction application process.

**Desired Emotional Response:**
- Efficient and productive (AI speeds up work without taking over)
- Power to take control (easy to override AI decisions)
- Gamified (keeps energy high, makes progress visible)

**Platform:** Web (Next.js/React) - responsive for desktop, tablet, and mobile

### 2.2 Inspiration Analysis

**Apps Users Already Love:**

**For Recruiters:**
- **LinkedIn:** Card-based layouts, clean professional aesthetic, familiar navigation, pipeline views
- **Office 365 / Google Workspace:** Productivity-focused toolbars, familiar design language, integrated workflows
- **WhatsApp:** Simple, fast communication, status indicators, conversational patterns

**For Candidates:**
- **LinkedIn:** Professional, trustworthy interface, familiar job application patterns
- **ChatGPT:** Conversational AI, clear explainable responses, human-in-the-loop corrections
- **WhatsApp:** Simple, minimal interface, fast communication

**UX Patterns to Apply:**
- Familiar navigation (LinkedIn-style)
- Card-based candidate views (LinkedIn)
- Conversational AI explanations (ChatGPT-style)
- Simple, fast communication (WhatsApp-style)
- Productivity-focused toolbars (Office 365/Google Workspace)
- Gamification elements to maintain high energy

---

## 3. Visual Foundation

### 3.1 Color System

**Brand Source:** MOAR Advisory brand kit from moaradvisory.in

**Selected Theme:** Theme 2 - Trust Navy

**Rationale:** Authoritative, sophisticated, and reliable - perfect for enterprise B2B ATS with compliance focus. The deep navy conveys trust and professionalism while maintaining modern appeal.

**Color Palette:**

- **Primary:** `#1e3a5f` (Deep Navy) - Main actions, key elements, headers
- **Primary Dark:** `#152840` - Hover states, emphasis
- **Primary Light:** `#2d5a8a` - Secondary actions, links
- **Secondary:** `#0d47a1` (Rich Blue) - Supporting actions, accents
- **Accent:** `#42a5f5` (Bright Blue) - Highlights, CTAs, interactive elements
- **Success:** `#28a745` - Success states, positive feedback
- **Success Light:** `#d4edda` - Success backgrounds
- **Warning:** `#ffc107` - Warning states, attention needed
- **Error:** `#dc3545` - Error states, destructive actions
- **Error Light:** `#f8d7da` - Error backgrounds

**Neutral Grayscale:**
- **Neutral 50:** `#f9fafb` - Backgrounds, subtle areas
- **Neutral 100:** `#f3f4f6` - Card backgrounds, dividers
- **Neutral 200:** `#e5e7eb` - Borders, subtle separators
- **Neutral 300:** `#d1d5db` - Disabled states, inactive elements
- **Neutral 500:** `#6b7280` - Secondary text, placeholders
- **Neutral 700:** `#374151` - Body text, primary content
- **Neutral 900:** `#111827` - Headings, emphasis text

**Semantic Color Usage:**
- Primary: Buttons, links, active states, brand elements
- Secondary: Supporting buttons, secondary navigation
- Accent: CTAs, highlights, gamification elements, AI indicators
- Success: Completed actions, positive feedback, shortlisted candidates
- Warning: Attention needed, pending reviews, AI confidence warnings
- Error: Errors, rejected candidates, critical alerts

**Interactive Visualizations:**

- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

### 3.2 Typography System

**Font Families (from moaradvisory.in):**

- **Headings:** Roboto Slab (serif) - Professional, authoritative
- **Body Text:** Roboto (sans-serif) - Clean, readable, modern
- **Alternative:** Poppins (sans-serif) - Available for special use cases

**Type Scale:**

- **H1:** 2.5rem (40px) - Page titles, hero headings
- **H2:** 2rem (32px) - Section headings
- **H3:** 1.5rem (24px) - Subsection headings
- **H4:** 1.25rem (20px) - Card titles, component headings
- **H5:** 1.125rem (18px) - Small headings
- **H6:** 1rem (16px) - Smallest headings
- **Body:** 1rem (16px) - Default body text
- **Small:** 0.875rem (14px) - Secondary text, captions
- **Tiny:** 0.75rem (12px) - Labels, metadata

**Font Weights:**
- **Regular (400):** Body text, default
- **Medium (500):** Buttons, emphasis
- **Bold (700):** Headings, strong emphasis

**Line Heights:**
- **Headings:** 1.2 - Tight, impactful
- **Body:** 1.6 - Comfortable reading
- **Small Text:** 1.5 - Compact but readable

### 3.3 Spacing & Layout Foundation

**Base Unit:** 4px system (all spacing multiples of 4)

**Spacing Scale:**
- **xs:** 4px (0.25rem) - Tight spacing, icon padding
- **sm:** 8px (0.5rem) - Small gaps, compact layouts
- **md:** 16px (1rem) - Default spacing, comfortable gaps
- **lg:** 24px (1.5rem) - Section spacing, card padding
- **xl:** 32px (2rem) - Large gaps, major sections
- **2xl:** 48px (3rem) - Hero spacing, page sections
- **3xl:** 64px (4rem) - Maximum spacing, major breaks

**Layout Grid:**
- **Desktop:** 12-column grid, max-width 1400px
- **Tablet:** 8-column grid, max-width 1024px
- **Mobile:** 4-column grid, full width with padding

**Container Widths:**
- **Full:** 100% width
- **Wide:** 1400px max (main content)
- **Content:** 1200px max (text content)
- **Narrow:** 800px max (forms, focused content)

**Border Radius:**
- **Small:** 4px - Buttons, inputs
- **Medium:** 8px - Cards, containers
- **Large:** 12px - Modals, major containers
- **Round:** 50% - Avatars, circular elements

---

## 4. Design Direction

### 4.1 Chosen Design Approach

**Selected Direction:** Direction 1 - Dense Dashboard

**Rationale:** Information-rich layout optimized for power users who need lots of context at once. Perfect for recruiters who spend their entire day in the system managing pipelines, reviewing candidates, and making decisions quickly.

**Layout Structure:**
- **3-column layout:** Sidebar (Navigation) + Main Content (Pipeline) + AI Panel (Co-pilot)
- **Persistent sidebar navigation:** Always visible for quick access
- **Kanban board:** 4-column pipeline view (Applied → Screening → Interview → Offer)
- **AI Co-pilot panel:** Persistent sidebar showing AI insights, scores, and suggested actions

**Key Characteristics:**
- **Layout:** 3-column with persistent AI panel
- **Density:** High - Maximum information visible without overwhelming
- **Navigation:** Persistent sidebar navigation
- **Primary Action Prominence:** High - Clear CTAs and AI suggestions
- **Visual Weight:** Balanced - Professional with clear hierarchy

**Best For:**
- Power users and experienced recruiters
- Data-heavy workflows requiring lots of context
- Teams that need to see AI insights alongside pipeline
- Fast-paced recruiting environments

**Design Philosophy:**
"Professional & Efficient" - Everything a recruiter needs is visible at once, with AI assistance always accessible but not intrusive. The layout supports rapid decision-making while maintaining clarity.

**User Notes:**
- User confirmed this direction feels right
- UI changes can be made during testing phase (iterative design approach)
- Design will evolve based on real user feedback and usage patterns

**Interactive Mockups:**

- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)

---

## 5. User Journey Flows

### 5.1 Critical User Paths

**Primary Recruiter Journey: Post Job → Review → Shortlist → Schedule → Offer**

**Journey Goal:** Complete end-to-end hiring workflow from job posting to offer acceptance

**Flow Steps:**

1. **Post Job**
   - User sees: Job creation form with AI-assisted JD drafting
   - User does: Fills job details, reviews AI-suggested JD, publishes job
   - System responds: Job posted, candidate portal live, AI ready to process applications

2. **Receive Applications**
   - User sees: Applications appear in "Applied" column of pipeline
   - User does: Views incoming applications, sees AI scores appear automatically
   - System responds: AI parses resumes, scores candidates, displays scores with explanations

3. **AI Ranks & Explains**
   - User sees: AI scores (0-100) with human-readable rationales in AI Co-pilot panel
   - User does: Reviews AI explanations, can override scores, can prompt AI for corrections
   - System responds: Rankings update, explanations refine based on user feedback

4. **Recruiter Reviews & Shortlists**
   - User sees: Candidate cards in Kanban columns with AI scores and insights
   - User does: Drags candidates between stages, reviews full profiles, accepts/rejects AI suggestions
   - System responds: Candidates move through pipeline, AI learns from recruiter decisions

5. **Schedule Interviews**
   - User sees: Calendar integration, candidate availability, suggested time slots
   - User does: Selects interview time, sends calendar invite, confirms with candidate
   - System responds: Calendar syncs, reminders sent, status updates automatically

6. **Make Offer**
   - User sees: Offer creation form, approval workflow, candidate response tracking
   - User does: Creates offer letter, sends to candidate, tracks acceptance
   - System responds: Offer sent, status tracked, candidate moves to "Hired" stage

**Decision Points:**
- AI score threshold: Recruiter can set minimum AI score for auto-shortlisting
- Override AI: Recruiter can always override AI scores with manual adjustments
- Interview scheduling: Recruiter chooses time slots, candidate confirms
- Offer approval: Multi-level approval workflow (hiring manager → TA leader → finance)

**Error States:**
- AI parsing fails: Shows error message, allows manual resume entry
- Calendar sync fails: Shows warning, allows manual scheduling
- Candidate declines: Moves to "Declined" stage, recruiter notified

**Success State:**
- Candidate accepts offer: Moves to "Hired", pipeline updated, compliance logs generated

---

**Primary Candidate Journey: Apply → Track → Schedule → Decision**

**Journey Goal:** Seamless application experience with full transparency

**Flow Steps:**

1. **Apply via LinkedIn OAuth**
   - User sees: "Apply with LinkedIn" button on job posting
   - User does: Clicks LinkedIn OAuth, grants permissions
   - System responds: Auto-fills profile data, shows pre-filled application form

2. **Complete Application**
   - User sees: Pre-filled form with LinkedIn data, upload CV option, missing fields highlighted
   - User does: Reviews pre-filled data, uploads CV, fills any missing information, submits
   - System responds: Application submitted, confirmation message, application ID provided

3. **Track Application Status**
   - User sees: Application timeline showing current stage (Applied → Screening → Interview → Offer)
   - User does: Logs into candidate portal, views status, sees what's next
   - System responds: Real-time status updates, clear next steps, timeline visualization

4. **Schedule Interview**
   - User sees: Interview invite with calendar picker, recruiter availability shown
   - User does: Selects preferred time slot, confirms interview
   - System responds: Calendar invite sent, reminders scheduled, status updated

5. **Receive Decision**
   - User sees: Offer letter or rejection notification with feedback
   - User does: Accepts/declines offer, or views rejection feedback
   - System responds: Status updated, next steps provided, data export available (DPDP/GDPR)

**Decision Points:**
- Time slot selection: Candidate chooses from available slots
- Offer response: Candidate accepts or declines with optional feedback

**Error States:**
- LinkedIn OAuth fails: Shows alternative email application option
- File upload fails: Shows error, allows retry with file size guidance
- Interview scheduling conflict: Shows alternative slots

**Success State:**
- Application complete: Confirmation shown, candidate can track progress
- Interview scheduled: Confirmation with calendar details
- Offer accepted: Welcome message, onboarding next steps

---

**Compliance Journey: Export Evidence Pack**

**Journey Goal:** One-click compliance evidence generation

**Flow Steps:**

1. **Access Compliance Dashboard**
   - User sees: Compliance dashboard with export options
   - User does: Navigates to compliance section, selects export type
   - System responds: Shows available evidence packs (audit logs, consent records, decision rationales)

2. **Generate Evidence Pack**
   - User sees: Export options (date range, candidate selection, evidence types)
   - User does: Selects parameters, clicks "Generate Evidence Pack"
   - System responds: Pack generated, shows download link, includes all required documentation

3. **Download & Review**
   - User sees: Downloadable ZIP file with structured documents
   - User does: Downloads pack, reviews contents
   - System responds: Pack includes JSON/CSV exports, PDF summaries, audit trail logs

**Success State:**
- Evidence pack downloaded: Complete, structured, audit-ready documentation

---

## 6. Component Library

### 6.1 Component Strategy

**Design System Base:** MOAR Advisory brand kit from moaradvisory.in

**Components from Design System (if available):**
- Buttons (primary, secondary, outline, disabled states)
- Form inputs (text, select, textarea, checkboxes, radio buttons)
- Cards and containers
- Navigation menus
- Typography components
- Icons and icon library
- Modal/dialog components
- Alerts and notifications

**Custom Components Needed for ATS:**

1. **Candidate Card**
   - Purpose: Display candidate information in pipeline view
   - Anatomy: Avatar, name, role, AI score badge, quick actions
   - States: Default, hover, selected, loading, error
   - Variants: Compact (pipeline), Detailed (profile view), Grid (gallery view)
   - Behavior: Click to view details, drag to move between stages
   - Accessibility: Keyboard navigable, screen reader announces candidate info

2. **AI Score Badge**
   - Purpose: Display AI-generated resume score with explanation
   - Anatomy: Score number (0-100), color indicator, explanation tooltip
   - States: Default, hover (shows explanation), override mode
   - Variants: Small (card), Medium (profile), Large (detail view)
   - Behavior: Click to see full AI explanation, override to adjust score
   - Accessibility: ARIA label includes score and explanation

3. **AI Co-pilot Panel**
   - Purpose: Persistent sidebar showing AI insights and suggestions
   - Anatomy: Header, insight cards, action buttons, override controls
   - States: Collapsed, expanded, loading, error
   - Variants: Sidebar (desktop), Bottom sheet (mobile), Modal (tablet)
   - Behavior: Auto-updates with candidate selection, shows relevant insights
   - Accessibility: Keyboard accessible, screen reader announces insights

4. **Pipeline Kanban Column**
   - Purpose: Organize candidates by workflow stage
   - Anatomy: Column header, candidate cards, drop zone, stage actions
   - States: Default, drag-over, full (warns when too many candidates)
   - Variants: 4-column (standard), Custom (configurable stages)
   - Behavior: Drag-and-drop candidates, auto-save on drop
   - Accessibility: Keyboard navigation between columns, ARIA live regions for updates

5. **AI Explanation Card**
   - Purpose: Show human-readable AI decision rationale
   - Anatomy: Title, explanation text, confidence indicator, override button
   - States: Default, expanded (full explanation), overridden (shows override reason)
   - Variants: Inline (within card), Panel (dedicated section), Modal (detailed view)
   - Behavior: Expandable, editable (for corrections), savable
   - Accessibility: Full explanation available to screen readers, editable with keyboard

6. **Gamification Progress Indicator**
   - Purpose: Show pipeline progress and achievements
   - Anatomy: Progress bar, milestone markers, achievement badges
   - States: In-progress, completed, locked
   - Variants: Horizontal (pipeline), Circular (profile), Badge (achievements)
   - Behavior: Updates in real-time, celebrates milestones
   - Accessibility: Progress announced to screen readers, keyboard accessible

7. **LinkedIn OAuth Button**
   - Purpose: One-click LinkedIn authentication for candidates
   - Anatomy: LinkedIn logo, "Apply with LinkedIn" text, loading state
   - States: Default, hover, loading, success, error
   - Variants: Primary (hero), Secondary (inline), Compact (mobile)
   - Behavior: Initiates OAuth flow, auto-fills profile data
   - Accessibility: Clear label, keyboard accessible, loading state announced

8. **Application Timeline**
   - Purpose: Show candidate application progress
   - Anatomy: Timeline steps, current stage indicator, completed stages, upcoming stages
   - States: Active, completed, pending, error
   - Variants: Horizontal (desktop), Vertical (mobile), Compact (card)
   - Behavior: Updates in real-time, clickable for details
   - Accessibility: Timeline steps announced, current stage clearly indicated

9. **Compliance Evidence Export**
   - Purpose: Generate and download compliance evidence packs
   - Anatomy: Export options, date range picker, file type selector, download button
   - States: Default, generating, ready, error
   - Variants: Quick export (presets), Custom export (full options)
   - Behavior: Generates structured export, shows progress, provides download
   - Accessibility: Form labels, progress announcements, download confirmation

**Components Requiring Heavy Customization:**

- **Form Components:** Adapt for ATS-specific fields (job posting, candidate profile, offer letter)
- **Data Tables:** Customize for candidate lists with sorting, filtering, bulk actions
- **Charts/Graphs:** Customize for pipeline analytics, AI adoption metrics
- **Navigation:** Adapt for ATS-specific sections (pipeline, jobs, candidates, compliance)

---

## 7. UX Pattern Decisions

### 7.1 Consistency Rules

**Button Hierarchy:**

- **Primary Action:** Deep Navy (`#1e3a5f`) background, white text, bold weight - Main CTAs (Post Job, Shortlist Candidate, Send Offer)
- **Secondary Action:** Rich Blue (`#0d47a1`) background, white text - Supporting actions (Save Draft, Export, Filter)
- **Tertiary Action:** Outline style, Deep Navy border and text - Less prominent actions (Cancel, View Details)
- **Destructive Action:** Red (`#dc3545`) background, white text - Delete, Reject, Remove actions
- **AI Action:** Bright Blue (`#42a5f5`) background, white text - AI-specific actions (Override AI, Correct AI, Regenerate Score)

**Feedback Patterns:**

- **Success:** Green toast notification (top-right), auto-dismiss after 3 seconds, shows checkmark icon
- **Error:** Red inline message below form field OR red toast for system errors, includes error icon and actionable message
- **Warning:** Yellow/amber alert box with warning icon, persistent until dismissed, for AI confidence warnings
- **Info:** Blue info banner or tooltip, contextual help, can be dismissed
- **Loading:** Skeleton screens for content, spinner for actions, progress bar for long operations (evidence pack generation)

**Form Patterns:**

- **Label Position:** Above input field (clear, accessible)
- **Required Field Indicator:** Asterisk (*) in label color, plus "required" text for screen readers
- **Validation Timing:** On blur (when user leaves field) - immediate feedback without being annoying
- **Error Display:** Inline below field with specific error message, red border on input
- **Help Text:** Tooltip icon next to label, shows on hover/click, accessible via keyboard

**Modal Patterns:**

- **Size Variants:**
  - Small: 400px - Confirmations, simple forms
  - Medium: 600px - Standard forms, candidate details
  - Large: 800px - Complex forms, multi-step workflows
  - Full-screen: Mobile only - Complex workflows on small screens
- **Dismiss Behavior:** Click outside to close (except for critical actions), Escape key always closes, explicit close button
- **Focus Management:** Auto-focus first input, trap focus within modal, return focus to trigger on close
- **Stacking:** Only one modal at a time, no nested modals

**Navigation Patterns:**

- **Active State Indication:** Deep Navy background, white text, left border accent
- **Breadcrumb Usage:** Shown for deep navigation (Job → Candidates → Profile), clickable to navigate back
- **Back Button Behavior:** Browser back button works, in-app back button for modal flows
- **Deep Linking:** All major views support deep links (shareable URLs), state preserved in URL

**Empty State Patterns:**

- **First Use:** Friendly illustration, clear guidance, prominent CTA to get started
- **No Results:** Helpful message explaining why, suggestions for filters/search, link to create new item
- **Cleared Content:** Undo option available for 30 seconds, confirmation before permanent deletion

**Confirmation Patterns:**

- **Delete Candidate:** Always confirm with modal, shows candidate name, irreversible action warning
- **Leave Unsaved:** Warn if form has unsaved changes, offer to save or discard
- **Irreversible Actions:** Two-step confirmation for critical actions (delete, reject offer, override AI permanently)

**Notification Patterns:**

- **Placement:** Top-right corner, stacks vertically (newest on top)
- **Duration:** Auto-dismiss after 5 seconds (success/info), 10 seconds (warnings), manual dismiss for errors
- **Stacking:** Maximum 3 visible, older ones auto-dismiss when new ones arrive
- **Priority Levels:**
  - Critical: Red, persistent until dismissed (system errors, compliance issues)
  - Important: Blue, 10-second auto-dismiss (AI overrides, status changes)
  - Info: Gray, 5-second auto-dismiss (general updates)

**Search Patterns:**

- **Trigger:** Auto-search as user types (debounced 300ms), instant results
- **Results Display:** Live results below search box, highlights matching terms, click to select
- **Filters:** Collapsible filter panel, apply filters to refine results, clear all filters button
- **No Results:** Helpful message, suggestions for alternative search terms, link to create new item

**Date/Time Patterns:**

- **Format:** Relative for recent (2 hours ago), absolute for older (Nov 25, 2025)
- **Timezone Handling:** User's local timezone, timezone indicator for scheduled interviews
- **Pickers:** Calendar dropdown for date selection, time picker for interview scheduling

**AI Interaction Patterns:**

- **AI Suggestions:** Always visible but not intrusive, clear "why" explanations, easy to dismiss
- **Override AI:** One-click override button, option to provide feedback, AI learns from overrides
- **AI Confidence:** Visual indicator (color-coded badge), low confidence shows warning, high confidence shows checkmark
- **AI Corrections:** Editable explanation cards, save corrections, AI adapts based on feedback

---

## 8. Responsive Design & Accessibility

### 8.1 Responsive Strategy

**Target Devices:**
- **Desktop:** Large screens (1920px+), primary workspace for recruiters
- **Tablet:** Medium screens (768px - 1024px), on-the-go recruiters, candidate portal
- **Mobile:** Small screens (320px - 767px), candidate portal optimized, recruiter quick actions

**Breakpoint Strategy:**

- **Mobile:** max-width 767px
  - Single column layout
  - Bottom navigation (hamburger menu alternative)
  - Stacked Kanban columns (vertical scroll)
  - Full-screen modals
  - Touch-optimized targets (minimum 44px)
  
- **Tablet:** 768px - 1023px
  - 2-column layout (sidebar + main)
  - Collapsible sidebar navigation
  - 2-column Kanban board (scrollable)
  - Medium-sized modals
  - Touch and mouse support

- **Desktop:** min-width 1024px
  - 3-column layout (sidebar + main + AI panel)
  - Persistent sidebar navigation
  - 4-column Kanban board (full width)
  - Large modals, side panels
  - Mouse and keyboard optimized

**Adaptation Patterns:**

- **Navigation:**
  - Desktop: Persistent left sidebar
  - Tablet: Collapsible sidebar, hamburger menu
  - Mobile: Bottom navigation bar, hamburger menu for secondary items

- **Pipeline View:**
  - Desktop: 4-column Kanban board, all visible
  - Tablet: 2-column Kanban, horizontal scroll
  - Mobile: Single column, vertical scroll, swipe between stages

- **AI Co-pilot Panel:**
  - Desktop: Persistent right sidebar
  - Tablet: Collapsible panel, toggle button
  - Mobile: Bottom sheet, slide up from bottom

- **Candidate Cards:**
  - Desktop: Full card with all details
  - Tablet: Compact card, expand on click
  - Mobile: Minimal card, tap for details

- **Forms:**
  - Desktop: Multi-column layouts where appropriate
  - Tablet: Single column, optimized spacing
  - Mobile: Full-width inputs, larger touch targets

- **Modals:**
  - Desktop: Centered modal, max-width 800px
  - Tablet: Centered modal, max-width 90%
  - Mobile: Full-screen overlay

### 8.2 Accessibility Strategy

**Compliance Target:** WCAG 2.1 Level AA

**Rationale:** Required for enterprise customers, ensures inclusive candidate experience, legal compliance for public-facing portals

**Key Requirements:**

- **Color Contrast:**
  - Text on background: Minimum 4.5:1 ratio (normal text), 3:1 (large text)
  - Interactive elements: Minimum 3:1 ratio
  - All color combinations tested and verified

- **Keyboard Navigation:**
  - All interactive elements accessible via keyboard
  - Tab order follows visual flow
  - Focus indicators clearly visible (2px outline, Deep Navy color)
  - Skip links for main content areas

- **Screen Reader Support:**
  - Semantic HTML (headings, landmarks, lists)
  - ARIA labels for all interactive elements
  - ARIA live regions for dynamic content (AI updates, status changes)
  - Alt text for all meaningful images
  - Form labels properly associated

- **Touch Target Size:**
  - Minimum 44x44px for all interactive elements (mobile)
  - Adequate spacing between touch targets (8px minimum)

- **Error Identification:**
  - Clear, descriptive error messages
  - Errors announced to screen readers
  - Inline error messages with specific guidance
  - Error summary for forms with multiple errors

- **Form Accessibility:**
  - All inputs have associated labels
  - Required fields clearly indicated
  - Error messages associated with inputs
  - Help text accessible to screen readers

**Testing Strategy:**

- **Automated:**
  - Lighthouse accessibility audit (target: 95+)
  - axe DevTools automated scanning
  - Color contrast checkers

- **Manual:**
  - Keyboard-only navigation testing (all workflows)
  - Screen reader testing (NVDA, JAWS, VoiceOver)
  - Zoom testing (200% browser zoom)
  - Focus management testing

- **User Testing:**
  - Test with users who have disabilities (if possible)
  - Gather feedback on accessibility barriers
  - Iterate based on real-world usage

---

## 9. Implementation Guidance

### 9.1 Completion Summary

**✅ UX Design Specification Complete!**

**What We Created Together:**

- **Design System:** MOAR Advisory brand kit from moaradvisory.in with custom ATS components
- **Visual Foundation:** Trust Navy color theme (#1e3a5f) with Roboto/Roboto Slab typography and 4px spacing system
- **Design Direction:** Dense Dashboard - 3-column layout optimized for power users with persistent AI Co-pilot panel
- **User Journeys:** 3 critical flows designed (Recruiter pipeline, Candidate application, Compliance export)
- **UX Patterns:** 10 consistency rule categories established for cohesive experience
- **Responsive Strategy:** 3 breakpoints (mobile, tablet, desktop) with adaptation patterns for all device sizes
- **Accessibility:** WCAG 2.1 Level AA compliance requirements defined

**Your Deliverables:**

- ✅ UX Design Document: `docs/ux-design-specification.md`
- ✅ Interactive Color Themes: `docs/ux-color-themes.html`
- ✅ Design Direction Mockups: `docs/ux-design-directions.html`

**Key Design Decisions:**

1. **Brand Alignment:** Using MOAR Advisory brand kit ensures consistency and reduces design effort
2. **Trust Navy Theme:** Professional, enterprise-ready color palette perfect for B2B ATS
3. **Dense Dashboard Layout:** Information-rich 3-column layout supports power users who need maximum context
4. **AI Co-pilot Panel:** Persistent sidebar keeps AI insights accessible without being intrusive
5. **Gamification Elements:** Progress indicators and achievements maintain high energy
6. **Human-in-the-Loop:** Easy AI override and correction capabilities build trust
7. **LinkedIn OAuth:** Seamless candidate application experience reduces friction

**What Happens Next:**

- **Designers** can create high-fidelity mockups from this foundation
- **Developers** can implement with clear UX guidance and rationale
- **Testers** can validate designs against this specification
- **Stakeholders** can review decisions with documented reasoning

**Iterative Design Approach:**

- ✅ UI changes can be made during testing phase
- ✅ Design will evolve based on real user feedback
- ✅ Usage patterns will inform future refinements
- ✅ A/B testing opportunities for key interactions

**Ready for:**
- Architecture workflow (with UX context)
- Epic breakdown (with UX requirements)
- Implementation (with complete design guidance)

---

## Appendix

### Related Documents

- Product Requirements: `docs/prd.md`
- Product Brief: `docs/product-brief-moar-ats.md`
- Brainstorming: `docs/bmm-brainstorming-session-2025-11-25.md`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: ux-color-themes.html
  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: ux-design-directions.html
  - Interactive HTML with 6-8 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction

### Optional Enhancement Deliverables

_This section will be populated if additional UX artifacts are generated through follow-up workflows._

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Wireframe Generation Workflow** - Create detailed wireframes from user flows
- **Figma Design Workflow** - Generate Figma files via MCP integration
- **Interactive Prototype Workflow** - Build clickable HTML prototypes
- **Component Showcase Workflow** - Create interactive component library
- **AI Frontend Prompt Workflow** - Generate prompts for v0, Lovable, Bolt, etc.
- **Solution Architecture Workflow** - Define technical architecture with UX context

### Version History

| Date     | Version | Changes                         | Author |
| -------- | ------- | ------------------------------- | ------ |
| 2025-11-25 | 1.0     | Initial UX Design Specification | Gopal  |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._

