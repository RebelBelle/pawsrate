# PawsRate: Product and Design Context

This file combines product context and visual guidance for PawsRate. Engineering conventions, UI-copy rules, and the development workflow live in [AGENTS.md](AGENTS.md); setup commands live in [README.md](README.md).

## Purpose and Audience

PawsRate is Kristina's personal learning project for tracking pet food preferences: what a pet tried, their reaction, and useful notes. It also provides a small project for refining coding practices and the future Figma-to-code workflow.

The working audience is pet owners recording food preferences. This follows the existing concept and screens; it is not a separately validated audience strategy.

The core task is to record a food and reaction, then review previous entries. Keep this task easy to understand without adding an extensive pet-care platform.

**Register:** friendly personal tracker. Prioritize clear forms, readable records, and a restrained amount of pet-related personality.

## Current Screen Structure

1. **Home (`/`):** introductory copy and a link into the sign-in flow.
2. **Sign In (`/login`):** image-led hero, email/password form, and navigation to account creation.
3. **Create Account (`/signup`):** matching hero and form, password confirmation, and navigation back to sign-in.
4. **Dashboard (`/dashboard`):** summary and activity placeholders, pet-name editing, a food-rating drawer, and a sample overview card.
5. **Settings (`/settings`):** placeholder account/settings screen.
6. **Not Found:** fallback for unmatched routes.

Login currently navigates to the dashboard without authentication. Account creation and password reset are unfinished. The food-rating drawer collects input, but Save is not connected to persistence. Dashboard metrics, testimonials, and trust counts are sample content, not verified product claims.

Preserve working behavior during small changes. Do not present prototype controls or illustrative content as completed features or factual evidence.

## Design Principles

- Make the food-tracking task clear and keep related information together.
- Establish hierarchy through typography, spacing, and purposeful emphasis.
- Use one coherent visual vocabulary across screens and responsive layouts.
- Prefer shared controls and fewer variants over independent styling for every screen.
- Keep navigation, forms, and feedback usable with a keyboard and on small screens.
- Let imagery and motion support the content without obscuring it or delaying interaction.

These principles guide implementation; they do not lock future work to every existing visual detail.

## Existing Visual Baseline

This describes the current implementation, not a completed or accessibility-certified design system. Use `src/styles/_tokens.scss` for exact foundational values and source styles for current usage; do not maintain a second token-value inventory here.

| Foundation | Existing Treatment                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| Color      | Warm coral primary, magenta accent, light neutral surfaces, and semantic status colors                 |
| Typography | Inter-first system fallback stack, shared size and weight tokens                                       |
| Layout     | Image-led auth screens and a dashboard using Grid and Flexbox                                          |
| Spacing    | Shared `--space-*` scale, with remaining inline and literal values                                     |
| Controls   | Rounded primary buttons, labeled inputs, password toggles, checkboxes, and underlined navigation links |
| Imagery    | Chihuahua hero image behind the auth layout                                                            |
| Icons      | Lucide controls and a custom decorative paw graphic                                                    |
| Motion     | Shared animation definitions, control transitions, and a sliding drawer                                |
| Elevation  | Borders, rounded surfaces, shared shadows, and overlay layers                                          |
| Theme      | System dark-mode token overrides; full screen consistency still needs review                           |

Global SCSS is loaded through `src/styles/styles.scss`. Card and drawer styles currently remain beside their components. Inline styles, scattered literals, and overlapping global selectors are cleanup work rather than patterns to extend.

## Foundations for Future Changes

### Color and Contrast

Use existing semantic roles before adding palette values. Keep foundational decisions in `_tokens.scss` and reuse the same token wherever the role is equivalent. A new token needs a distinct reusable purpose, not a one-off adjustment.

Check text, links, controls, borders, and focus treatments against their actual backgrounds in relevant states and themes. Pair meaningful rating and status colors with text or other non-color cues.

### Typography and Copy

Choose existing tokens for headings, body text, labels, and supporting copy. Keep text readable when the viewport narrows or text is enlarged. Preserve a small coherent scale rather than copying another project's exact sizes.

Use concise, direct language and apply the label, action, and error conventions in `AGENTS.md`. Do not invent testimonials, user counts, or product outcomes to fill a layout.

### Layout and Spacing

Use the shared spacing vocabulary for both margins and padding. Prefer CSS Grid for column layouts and Flexbox for aligned groups, with focused SCSS classes instead of long per-element utility strings.

Reflow naturally on narrow screens. Avoid fixed widths or heights that clip forms, prevent scrolling, or create horizontal overflow. Use a shared layout helper only when an actual repeated pattern warrants it.

### Components and Elevation

Reuse the existing Button, FormField, Checkbox, and FormPanel primitives before introducing equivalents. Keep component APIs small and variants tied to real needs.

Use borders, surface tones, radii, and shadows consistently. Cards should group a distinct concept or interaction; avoid unnecessary nested surfaces. The current Card contains sample dashboard content and should not be assumed to be a general-purpose container.

### Images, Icons, and Motion

Use supplied or approved assets, useful responsive crops, and appropriate text alternatives. Keep decorative graphics out of accessible names and use the existing icon family.

Motion should support orientation and feedback. Respect reduced-motion preferences and keep essential content available without animation. Imported animation definitions are not a requirement to use every effect.

### Interaction and Interface States

Use destination links for navigation and buttons for actions. Keep visible keyboard focus, associated form labels, and useful validation feedback. Drawers and dialogs need keyboard dismissal and managed focus when their behavior is implemented or revised.

For real asynchronous features, distinguish loading, empty, success, and error states. Keep known content visible and reserve layout space where useful. Do not disguise failed or pending requests with sample data, or add artificial loading states to static content.

## References and Decisions Still Open

- **Figma:** the original reference is the PawsRate file, PawsRate - Concept page, extracted May 8, 2026. The historical extraction remains in Git history and differs from implemented tokens; it is not a synchronized specification.
- **Workflow references:** Kristina-Lemasson and Basal-Instinct guide engineering restraint, shared foundations, and documentation structure.
- **Visual reference:** selected Builder.io PupDine theme ideas and components may be adapted after baseline cleanup. Translate their appearance into PawsRate's tokens and primitives rather than importing the full utility styling or architecture.
- **Open Props:** installed, with its stylesheet import currently disabled. Its role in base styles remains undecided; keep any adoption consistent with the existing token source of truth.
- **Figma loop:** Tokens Studio and automatic synchronization are not connected. Token mapping and ownership need to be agreed when that workflow is established.
- **Product scope:** authentication and persistence requirements remain open. Do not add services or frameworks without an agreed need.

Replace open items with confirmed decisions as work progresses. Keep this document focused on product intent and durable design guidance; do not add duplicate context files, token catalogs, or routine iteration logs.
