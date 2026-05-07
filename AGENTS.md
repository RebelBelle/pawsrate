# AGENTS.md

## Stack
- React + Vite
- TypeScript
- Lucide Icons

---

## Core Principles
- Prefer small, focused components and small diffs
- Follow existing project patterns before introducing new ones
- Reuse existing utilities/components before creating new ones
- Keep logic simple and readable
- Avoid premature abstraction
- Do not refactor unrelated code
- Prefer editing existing files over creating new abstractions

---

## Project Structure
- All SCSS is centralized and organized in `src/styles`
- Do not colocate `.scss` files with components
- Component folders should contain only TypeScript/React files

---

## Styling Rules
- Prefer existing CSS variables, Open Props variables, shared tokens, SCSS mixins, and utilities when available
- Prefer simple, maintainable CSS over overly clever abstractions
- Keep spacing, radii, typography, and overall styling consistent with existing patterns
- Prefer short, readable class names (e.g. `.btn-primary`, `.card-title`)
- Avoid deeply nested or overly verbose naming unless already established in the codebase
- Avoid duplicating existing style patterns
- Avoid hardcoded colors when suitable variables exist
- Use existing SCSS structure and conventions
- Create mixins/utilities only for clearly repeated patterns
- Avoid one-off variables, tokens, or abstractions

---

## Components
- Components live in `src/components`
- Keep components small and composable
- Prefer composition over prop-heavy APIs
- Co-locate component-specific helpers/types when appropriate
- Avoid large or mixed-responsibility files
- Prefer extending existing components over creating near-duplicates

---

## Dependencies
Do not add new heavy dependencies without approval.

Ask before adding:
- UI frameworks
- state management libraries
- date libraries
- charting libraries
- large utility libraries

---

## Safety and Permissions

Allowed without asking:
- Read/search files
- List files/directories
- Run prettier/eslint
- Run TypeScript checks
- Run single vitest tests

Ask first:
- Package installs
- Git push
- File deletion or chmod
- Large refactors
- Schema or API changes

---

## Existing Architecture
- See `App.tsx` for routing structure
- Follow existing folder and naming conventions
- Do not reorganize files unless requested

---

## Documentation
- Keep `README.md` updated when meaningful structural or setup changes are made
- Do not update README for minor or unrelated code changes
- Keep documentation minimal and manually intentional

---

## Accessibility
- Use semantic HTML and accessible labels
- Ensure keyboard accessibility where relevant
- Avoid color-only communication

---

## When Stuck
- Ask a concise clarifying question
- Propose a short implementation plan
- Explain tradeoffs briefly
- Avoid large speculative changes