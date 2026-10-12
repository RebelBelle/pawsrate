# PawsRate Design Guidance

## Purpose

PawsRate is a personal learning project for tracking pet food preferences: what a pet tried, their reaction, and useful notes. Keep the interface and implementation small, readable, and consistent.

## Current implementation

- React components live in `src/components`, with routed screens in `src/pages`.
- `src/styles/_tokens.scss` is the source of truth for implemented colors, typography, spacing, radii, shadows, and motion timings. It includes system dark-mode overrides.
- `src/styles/styles.scss` loads shared tokens, mixins, animations, and global component styles. Card and food-rating drawer styles currently remain beside their components.
- Styles use global SCSS, not SCSS modules. Avoid broad selectors that unintentionally change other components.
- Open Props is installed, but its stylesheet import is currently disabled.
- Tokens Studio and automatic Figma synchronization are not connected.

## Visual discipline

- Reuse existing semantic tokens and scale steps before adding visual values. Add a token only for a distinct reusable need.
- Keep foundational values in `_tokens.scss`. Do not use local aliases merely to rename an existing token.
- Reuse shared components before creating similar controls. Use Lucide for icons.
- Preserve the existing class vocabulary; keep selectors short and nesting shallow.
- Check contrast, keyboard focus, labels, and mobile layouts when changing UI. Passing lint does not establish accessibility.
- Current inline styles and scattered literals are cleanup work, not patterns to extend.

## Prototype boundaries

Login navigates to the dashboard without authentication. Signup and password reset are not implemented. Food-rating Save is not connected to persistence. Dashboard metrics, testimonials, and trust counts are sample content, not verified product claims.

Do not add a backend, authentication service, or persistence framework without an agreed requirement.

## Design references and future work

The original Figma reference was the **PawsRate** file, **PawsRate - Concept** page, extracted May 8, 2026. The previous version of this document contains that historical extraction in Git history. It is not a synchronized token specification; its values differ from the current implementation.

Kristina-Lemasson and Basal-Instinct guide the development workflow and token discipline. Builder.io PupDine is a future visual reference. Introduce selected theme ideas and components only after the baseline cleanup, translating them into PawsRate's shared tokens and primitives.

When the Figma loop is established, document the actual token mapping and ownership here. Avoid maintaining a second manually copied token catalog.
