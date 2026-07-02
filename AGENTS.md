# AGENTS.md

## Core Principles

- Prefer consistency over cleverness
- Prefer small diffs over big, unnecessary changes
- Reuse existing components whenever possible
- Keep logic simple and readable
- Keep files small and focused
- Avoid over-engineering
- Match existing code style before introducing new patterns, unless the existing code style is poor

---

## Tech Stack

- React
- Vite
- TypeScript
- SCSS modules
- Lucide icons
- Tokens Studio (not hooked up yet, but will be soon)
- GitHub

---

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with zero warnings allowed
npm run type-check   # Run TypeScript type checking
npm run format       # Format TS/TSX/SCSS/CSS with Prettier
```

---

## Components

Components live in `src/components`

### Prefer
- One component per folder
- Extending existing components over creating near-duplicates
- Composition over inheritance
- Controlled inputs
- Reusable shared primitives

### Avoid
- Large or mixed-responsibility files
- Prop-heavy APIs
- Colocating `.scss` files with components
- Duplicate variants
- One-off utility classes

---

## Styling Rules

Styles live in `src/styles`

### Prefer
- Existing CSS variables, Open Props variables, shared tokens, SCSS mixins, and utilities when available
- Simple, maintainable CSS over overly clever abstractions
- Consistent spacing, radii, typography, and overall styling
- Short, readable class names (e.g. `.btn-primary`, `.card-title`)
- Alphabetical property ordering
- Creation of mixins/utilities only for clearly repeated patterns

### Avoid
- Deeply-nested or overly verbose naming unless already established in the codebase
- Duplicating existing style patterns
- Hardcoded colors when suitable variables exist
- One-off variables, tokens, or abstractions

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

## AI Workflow Rules

Before coding:
- Check for existing similar components
- Reuse patterns already present, unless pattern is bad: then suggest an improved pattern

Before finishing:
- Check TypeScript types
- Check responsiveness
- Check accessibility
- Remove dead code/comments

---

## When Stuck

- Ask a concise clarifying question
- Propose a short implementation plan
- Explain tradeoffs briefly
- Avoid large speculative changes