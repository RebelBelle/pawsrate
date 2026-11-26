# PawsRate Plan

PawsRate is a learning project for recording food preferences: what a pet tried, their reaction, and useful notes. Keep the product small enough to support deliberate engineering and design-system practice.

## 1. Style Foundation Cleanup

**Problem:** the initial visual work established useful global partials and tokens, but some older styles, unused animation code, raw visual values, and overlapping card/dashboard rules remain.

**System limits:** styles are global SCSS compiled by Vite. `_tokens.scss` is the sole implemented token source; Open Props is installed but not loaded. The app has no component-library or token-build pipeline.

**Rules:** use semantic tokens for reusable visual roles; keep layout measurements local when they are not a shared role; retain only selectors and tokens with a current purpose; preserve the existing global-SCSS approach.

**Done when:** token roles are clear and used consistently, dead animation and legacy styles are removed, raw reusable visual values are tokenized or deliberately localized, and light and dark themes have been reviewed on implemented screens.

**Open questions:** should Open Props remain an optional reference, or should its stylesheet be adopted for a defined, limited role?

## 2. Food Records

**Problem:** the rating drawer accepts a food and reaction but discards it, so the core task cannot be completed.

**System limits:** authentication, storage, and server APIs do not exist. Prototype sample content must not appear to be saved user data.

**Rules:** define the smallest record shape needed for a food, reaction, date, and note before choosing storage. Keep the first persistence choice reversible and local unless a real account requirement changes that boundary.

**Done when:** a user can add, review, edit, and remove their own food records, with clear empty and error states.

**Open questions:** should the first version use local browser storage, and should food type remain part of the first record shape?

## 3. Account Boundary

**Problem:** sign-in, account creation, password reset, and sign-out are present only as prototype navigation.

**System limits:** a real account system adds security, privacy, and data-migration requirements beyond the current local prototype.

**Rules:** decide whether multi-device data and real accounts are needed before selecting an authentication provider or backend. Do not present prototype navigation as authentication.

**Done when:** the chosen account boundary is documented and the application behavior matches it.

**Open questions:** is PawsRate intended to remain a local personal tracker, or does it need user accounts and synchronized data?

## Minimum for a Working App

- **Pet profile:** Let users set up and edit a pet; associate each food record with one. Decide whether v1 supports multiple pets.
- **Durable data:** Keep profiles and food records after reloads; validate required fields and surface save/load failures.
- **Core verification:** Check profile setup, record add/edit/delete, reload persistence, search, and filters.

## Later

- Let users enter an estimated age, a birthdate, or leave age unknown; calculate age from birthdate for future insights and recommendations.
- Support editing a food's rating, date, and notes, plus deletion; decide whether name/brand stays fixed so renaming creates a new entry.
- Review the planned system dark theme after the light foundation is clean.
- Add automated tests when records or persistence introduce behavior that needs regression coverage.
