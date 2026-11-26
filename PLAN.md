# PawsRate Plan

PawsRate is a learning project for recording food preferences: what a pet tried, their reaction, and useful notes. Keep the product small enough to support deliberate engineering and design-system practice.

## 1. Style Foundation Cleanup

**Problem:** the initial visual work established useful global partials and tokens, but some older styles, unused animation code, raw visual values, and overlapping card/dashboard rules remain.

**System limits:** styles are global SCSS compiled by Vite. `_tokens.scss` is the sole implemented token source; Open Props is installed but not loaded. The app has no component-library or token-build pipeline.

**Rules:** use semantic tokens for reusable visual roles; keep layout measurements local when they are not a shared role; retain only selectors and tokens with a current purpose; preserve the existing global-SCSS approach.

**Done when:** token roles are clear and used consistently, dead animation and legacy styles are removed, raw reusable visual values are tokenized or deliberately localized, and light and dark themes have been reviewed on implemented screens.

**Open questions:** should Open Props remain an optional reference, or should its stylesheet be adopted for a defined, limited role?

## 2. Account Boundary

**Problem:** sign-in, account creation, password reset, and sign-out are present only as prototype navigation.

**System limits:** a real account system adds security, privacy, and data-migration requirements beyond the current local prototype.

**Rules:** decide whether multi-device data and real accounts are needed before selecting an authentication provider or backend. Do not present prototype navigation as authentication.

**Done when:** the chosen account boundary is documented and the application behavior matches it.

**Open questions:** is PawsRate intended to remain a local personal tracker, or does it need user accounts and synchronized data?

## Minimum for a Working App

- **Pet profile:** Create a pet profile and associate each food record with one; decide whether v1 supports multiple pets.
- **Durable data:** Choose reversible local-first storage; keep profiles and food records after reloads; validate required fields and surface save/load failures.
- **Core verification:** Verify profile creation, reload persistence, and core food-log flows after storage is added.

## Later

- Let users enter an estimated age, a birthdate, or leave age unknown; calculate age from birthdate for future insights and recommendations.
- Review the planned system dark theme after the light foundation is clean.
- Add automated tests when records or persistence introduce behavior that needs regression coverage.
