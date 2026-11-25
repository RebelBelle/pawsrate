# PawsRate Plan

PawsRate is a learning project for recording food preferences: what a pet tried, their reaction, and useful notes. Keep the product small enough to support deliberate engineering and design-system practice.

## 1. Style Foundation Cleanup

**Problem:** the initial visual work established useful global partials and tokens, but some older styles, unused animation code, raw visual values, and overlapping card/dashboard rules remain.

**System limits:** styles are global SCSS compiled by Vite. `_tokens.scss` is the sole implemented token source; Open Props is installed but not loaded. The app has no component-library or token-build pipeline.

**Rules:** use semantic tokens for reusable visual roles; keep layout measurements local when they are not a shared role; retain only selectors and tokens with a current purpose; preserve the existing global-SCSS approach.

**Done when:** token roles are clear and used consistently, dead animation and legacy styles are removed, raw reusable visual values are tokenized or deliberately localized, and light and dark themes have been reviewed on implemented screens.

**Open questions:** should Open Props remain an optional reference, or should its stylesheet be adopted for a defined, limited role?

## 2. Retire the PupDine Reference

**Problem:** PupDine was used as a temporary visual reference, and keeping it as an active dependency would blur ownership of PawsRate’s design decisions.

**Built:** PawsRate now carries the selected Home and Sign In ideas: responsive two-column structure, feature-card and reminder patterns, brand gradients, auth controls, checkbox sizing, and button elevation. Create Account follows PawsRate’s matching auth pattern.

**System limits:** PupDine has no usable Create Account, dashboard, or pet-record screen to adapt. PawsRate imports no PupDine code, assets, packages, or styles.

**Rules:** PawsRate’s tokens, global SCSS, and product context are now the source of truth. Future visual work starts from PawsRate user tasks rather than from PupDine.

**Done when:** desktop and mobile visual QA confirms the adopted patterns, dark mode has been reviewed as its own theme, and the PupDine directory can be deleted without affecting PawsRate.

**Open questions:** none. Food ratings, dashboard, and pet records need original PawsRate direction.

## 3. Food Records

**Problem:** the rating drawer accepts a food and reaction but discards it, so the core task cannot be completed.

**System limits:** authentication, storage, and server APIs do not exist. Prototype sample content must not appear to be saved user data.

**Rules:** define the smallest record shape needed for a food, reaction, date, and note before choosing storage. Keep the first persistence choice reversible and local unless a real account requirement changes that boundary.

**Done when:** a user can add, review, edit, and remove their own food records, with clear empty and error states.

**Open questions:** should the first version use local browser storage, and should food type remain part of the first record shape?

## 4. Useful Pet Overview

**Problem:** the dashboard is still placeholder content, so it does not help a user revisit food preferences.

**System limits:** its content must follow the records actually available; it cannot claim trends or metrics that the prototype does not compute.

**Rules:** build from confirmed user tasks and saved-record states. Reuse the cleaned foundations and avoid dashboard-specific abstractions until a repeated need is proven.

**Done when:** the overview helps a user find recent records and understand their pet's preferences without sample metrics standing in for real data.

**Open questions:** which record filters or summaries are useful enough for the first working version?

## 5. Account Boundary

**Problem:** sign-in, account creation, password reset, and sign-out are present only as prototype navigation.

**System limits:** a real account system adds security, privacy, and data-migration requirements beyond the current local prototype.

**Rules:** decide whether multi-device data and real accounts are needed before selecting an authentication provider or backend. Do not present prototype navigation as authentication.

**Done when:** the chosen account boundary is documented and the application behavior matches it.

**Open questions:** is PawsRate intended to remain a local personal tracker, or does it need user accounts and synchronized data?

## 6. Design-to-Code Workflow

**Problem:** tokens are hand-maintained and Figma synchronization is not connected, so design and implementation can drift.

**System limits:** Tokens Studio and Figma automation are not configured. A small project should not add a build pipeline without a repeatable use case.

**Rules:** establish token naming, ownership, and one manual synchronization pass before automating anything. Keep the code token source authoritative until a replacement workflow is proven.

**Done when:** a small, repeatable Figma-to-code and code-to-Figma exercise can update a shared token set without ambiguous ownership.

**Open questions:** which tokens and component states belong in the first Figma exercise?

## Later

- Review the planned system dark theme after the light foundation is clean.
- Add automated tests when records or persistence introduce behavior that needs regression coverage.
