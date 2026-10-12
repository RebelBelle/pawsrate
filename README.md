# PawsRate

A React + Vite prototype for tracking pet food preferences, using TypeScript, Lucide icons, and global SCSS. Open Props is installed, but its stylesheet import is currently disabled.

## Setup

Use Node 24 (`.nvmrc`). Run `npm ci` to install locked dependencies, then `npm run dev` to start the app at http://localhost:5173.

## Verification

- `npm run check`: check formatting, JavaScript/TypeScript lint, SCSS lint, types, and the production build
- `npm run format`: format maintained files
- `npm run lint:fix`: apply supported code fixes
- `npm run lint:css:fix`: apply supported stylesheet fixes
- `npm run build`: check types and build into `dist/`
- `npm run preview`: preview the production build

## Structure

- `src/App.tsx`: routing
- `src/pages/`: page components
- `src/components/`: shared components
- `src/styles/styles.scss`: global stylesheet entry point
- `src/styles/_tokens.scss`: implemented visual tokens
- `src/styles/_card.scss`: shared card styles
- `src/styles/_drawer.scss`: shared drawer styles
- `src/styles/_rating.scss` and `_button.scss`: shared rating-choice and button styles
- `src/styles/_form.scss`: form fields, layouts, and form-panel styles
- `src/styles/_check-radio.scss`: checkbox styles; shared home for radio styles when needed
- `src/styles/_hero.scss` and `_utilities.scss`: hero layout and shared utilities
- `src/styles/_mixins.scss` and `_animations.scss`: shared style helpers

Vite compiles SCSS. Do not run a separate Sass watcher or edit generated CSS/maps. Build output and generated source CSS are ignored.

Read `AGENTS.md` for working rules and `DESIGN.md` for the existing Figma reference. Authentication and food-rating persistence remain prototype work.
