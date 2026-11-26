# PawsRate Plan

PawsRate is a learning project for recording food preferences: what a pet tried, their reaction, and useful notes. Keep the product small enough to support deliberate engineering and design-system practice.

## 1. Style Foundation Cleanup

**Problem:** the initial visual work established useful global partials and tokens, but some older styles, unused animation code, raw visual values, and overlapping card/dashboard rules remain.

**System limits:** styles are global SCSS compiled by Vite. `_tokens.scss` is the sole implemented token source; the app has no component-library or token-build pipeline.

**Rules:** use semantic tokens for reusable visual roles; keep layout measurements local when they are not a shared role; retain only selectors and tokens with a current purpose; preserve the existing global-SCSS approach.

**Done when:** token roles are clear and used consistently, dead animation and legacy styles are removed, raw reusable visual values are tokenized or deliberately localized, and light and dark themes have been reviewed on implemented screens.

**Open questions:** should Open Props remain an optional reference, or should its stylesheet be adopted for a defined, limited role?

## 2. Account Boundary

**Problem:** sign-in, account creation, password reset, and sign-out are present only as prototype navigation.

**System limits:** a real account system adds security, privacy, and data-migration requirements beyond the current local prototype.

**Rules:** decide whether multi-device data and real accounts are needed before selecting an authentication provider or backend. Do not present prototype navigation as authentication.

**Done when:** the chosen account boundary is documented and the application behavior matches it.

**Open questions:** is PawsRate intended to remain a local personal tracker, or does it need user accounts and synchronized data?

## Curated Pet food Database

### Slice 1 — Schema, Brand Dictionary & Strict Validator

"Create a strict TypeScript interface and Zod schema (src/types/petFood.ts) for our curated pet food catalog. Fields must include: id (deterministic slug formatted as ${brandSlug}-${normalizedName}-${foodTypeSlug}), brand, brandSlug, productName, species (dog | cat), foodType (Dry Kibble | Wet Food | Raw | Treat), primaryProteins (string array), lifeStage (puppy | adult | senior | all), tags (e.g., grain-free), searchAliases, and verified (boolean).
Create src/data/brands.json mapping canonical brand names to their slugs and common spelling aliases (e.g., "Hill's Science Diet" matching "Hills", "Hill's", "Science Diet").
Build a Node validation script (npm run validate:foods) that checks src/data/petFoods.json and fails with a non-zero exit code if it detects: schema/enum violations, unmapped brand names, non-deterministic or duplicate id slugs, unnormalized smart quotes/Unicode characters, leftover weight/packaging tokens (lb, oz, kg, canned, pouch, bag) inside productName, or >85% fuzzy string similarity within the same brandSlug and foodType."

### Slice 2 — Normalized Seed Dataset (Top 50 Core SKUs)

"Populate src/data/petFoods.json with 50 real dog food products across Dry Kibble, Wet Food, Raw, and Treat using only canonical brands from src/data/brands.json. Strip all bag weights, packaging types, and marketing fluff (Grain-Free, Formula, All Life Stages) from productName, moving dietary attributes into tags and lifeStage. Populate primaryProteins and searchAliases for each item, then run npm run validate:foods to verify zero errors."

### Slice 3 — Client-Side Search & Drawer Autocomplete Wiring

"Wire the 'Food Name or Brand' input in the 'Rate a New Food' drawer to a client-side search utility over src/data/petFoods.json. Normalize both the query and dataset fields (lowercase, strip punctuation/apostrophes, normalize & to and) and match across brand, productName, searchAliases, and primaryProteins. When the user selects a suggestion, store the foodId on the log entry and auto-populate the Food Type dropdown if it hasn't been manually selected yet."

### Slice 4 — Custom Fallback & CLI Batch Importer

"Add a 'Can't find it? Add custom food' option at the bottom of the autocomplete dropdown that lets the user enter a custom food name/brand, saving it to localStorage with verified: false so logging is never blocked. Also build a CLI batch importer (scripts/import-foods.js) that accepts a raw JSON/CSV file, maps brand aliases to canonical names, strips weight/packaging strings via regex, flags >85% fuzzy duplicates for manual review, generates deterministic slug IDs, and validates the merged output with npm run validate:foods."

## Minimum for a Working App

- **Pet profile:** Create a pet profile and associate each food record with one; decide whether v1 supports multiple pets.
- **Durable data:** Choose reversible local-first storage; keep profiles and food records after reloads; validate required fields and surface save/load failures.
- **Core verification:** Verify profile creation, reload persistence, and core food-log flows after storage is added.

## Later

- Let users enter an estimated age, a birthdate, or leave age unknown; calculate age from birthdate for future insights and recommendations.
- Review the planned system dark theme after the light foundation is clean.
- Add automated tests when records or persistence introduce behavior that needs regression coverage.
- Relevant Reminders / Watchlist (Optional)
-- Short, food-specific notes like "Check stomach reaction after salmon topper" or "Reorder freeze-dried treats"—replacing leftover unrelated placeholders.
-- Why it matters: A small checklist or reminder strip is helpful only when tied to the pet's food routine. Keeping it tight helps you practice scope restraint—knowing what to cut so the food log stays front and center.
