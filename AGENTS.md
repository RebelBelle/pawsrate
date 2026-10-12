# AGENTS.md

Read this file before making changes. Read [DESIGN.md](DESIGN.md) for product and visual guidance, and [README.md](README.md) for setup. Preserve unrelated local changes.

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
- Global SCSS (compiled by Vite)
- Lucide icons
- Tokens Studio and Figma synchronization are not connected
- GitHub

---

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with zero warnings allowed
npm run type-check   # Run TypeScript type checking
npm run format       # Format maintained files with Prettier
npm run format:check # Check formatting without edits
npm run lint:css     # Check SCSS and alphabetical declarations
npm run check        # Run formatting, lint, SCSS, types, and build
```

---

Use Node 24 (`.nvmrc`) and `npm ci` for locked installs. Vite compiles styles; do not run a separate Sass watcher or edit generated CSS/maps. Implemented tokens live in `src/styles/_tokens.scss`.

## Components

Components live in `src/components`

### Prefer

- Keep the current flat component layout; use one focused component per file
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

Shared styles live in `src/styles` and load through `styles.scss`. Keep related styles in focused partials.

### Prefer

- Existing CSS variables, Open Props variables, shared tokens, SCSS mixins, and utilities when available
- Simple, maintainable CSS over overly clever abstractions
- Consistent spacing, radii, typography, and overall styling
- Short, readable class names (e.g. `.btn-primary`, `.card-title`)
- Alphabetical property ordering
- Existing kebab-case and BEM class names; do not rename unrelated selectors
- Creation of mixins/utilities only for clearly repeated patterns

### Avoid

- Deeply-nested or overly verbose naming unless already established in the codebase
- Duplicating existing style patterns
- Raw visual values when suitable shared tokens exist
- One-off variables, tokens, or abstractions

---

## Safety and Permissions

Allowed without asking:

- Read/search files
- List files/directories
- Run prettier/eslint
- Run TypeScript checks
- Run the configured checks and production build

Ask first:

- Package installs
- Git push
- File deletion or chmod
- Large refactors
- Schema or API changes

---

## Existing Architecture

- See `src/App.tsx` for routing structure
- `src/main.tsx` loads the global `src/styles/styles.scss` entry point
- Authentication, account creation, password reset, and food-rating persistence are unfinished prototype behavior
- There is no configured test runner; do not assume Vitest is installed
- Follow existing folder and naming conventions
- Do not reorganize files unless requested

---

## Documentation

- Keep `README.md` updated when meaningful structural or setup changes are made
- Do not update README for minor or unrelated code changes
- Keep documentation minimal and manually intentional
- Document conventions rather than inventories of components or style partials; do not update documentation for each new file

---

## Accessibility

- Use semantic HTML and accessible labels
- Use links for navigation and buttons for actions
- Every HTML `<button>` must declare `type`: `button` for ordinary controls, `submit` for intentional form submission, and `reset` only when native reset behavior is required. Never rely on the browser default, even outside a form
- Ensure keyboard accessibility where relevant
- Avoid color-only communication

---

## UI Copy

- Say only what helps users understand the content or take the next action. Avoid helper text that repeats a label or describes an obvious control
- Use title case for short English UI labels and accessible control names, including buttons, links, fields, menus, tabs, options, and short section titles. Capitalize the first and last words and major words; keep interior articles, conjunctions, and short prepositions lowercase, as in `Rate a Food` and `Save Changes`
- Use sentence case for descriptions, headlines, instructions, placeholders, loading messages, image descriptions, and errors. Heading markup alone does not make text a short UI label
- Preserve official names, acronyms, units, user-entered text, external content, and locale conventions. Author casing in source text; do not use blanket runtime conversion or `text-transform: capitalize`
- Prefer specific Verb Object action labels, such as `Save Changes` or `Create Account`. Navigation destinations and compact selectors can use their natural names
- Write concise UI errors without a trailing period, such as `Enter a valid email address`. Preserve necessary internal punctuation; do not automatically strip punctuation from external messages
- Check visible and accessible copy during UI review; automated checks do not verify these editorial rules

---

## AI Workflow Rules

Before coding:

- Check for existing similar components
- Reuse patterns already present, unless pattern is bad: then suggest an improved pattern

Before finishing:

- Run `npm run check`
- Check responsiveness
- Check accessibility
- Remove dead code/comments within the changed scope
- Do not treat passing checks as proof of token consistency or accessibility

---

## When Stuck

- Ask a concise clarifying question
- Propose a short implementation plan
- Explain tradeoffs briefly
- Avoid large speculative changes
