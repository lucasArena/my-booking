# My Booking

My Booking is a React + TypeScript single-page application for browsing premium properties, booking new stays, and managing existing reservations through an intuitive drawer-driven workflow.

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Yarn 1 (Classic)

### Installation

1. Clone this repository.
2. Install dependencies:

   ```bash
   yarn install
   ```

3. Launch the development server:

   ```bash
   yarn dev
   ```

4. Navigate to `http://localhost:5173` (default Vite port) to explore the app.

### Environment

The project boots with mock property data located in `tests/mocks/Property.mock.ts`. Replace this source or connect real APIs inside the `PropertyProviderComponent` when integrating with a backend.

## Available Scripts

| Command        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `yarn dev`     | Run the Vite development server with hot module reloading. |
| `yarn build`   | Type-check and generate a production build inside `dist/`. |
| `yarn preview` | Serve the production build locally.                        |
| `yarn lint`    | Execute ESLint across the project.                         |
| `yarn test`    | Start Vitest in watch mode.                                |
| `yarn cy:run`  | Execute the Cypress end-to-end suite in headless mode.     |

## Highlights

- **Curated stay discovery** – explore featured properties, filter them by stay dates, and launch booking flows without leaving the page.
- **In-place booking confirmation** – review property details, validate selected nights, and confirm the stay from a responsive confirmation drawer.
- **Self-service booking management** – list upcoming reservations, reschedule stays, or cancel directly in the My Bookings screen using a dedicated management drawer.
- **Reusable design system** – component library based on Material UI, custom hooks, and layered modules that separate domain entities, application utilities, and presentation concerns.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tooling:** Vite 7 with the official React plugin (Fast Refresh)
- **UI library:** Material UI 7 with Emotion styling
- **Date handling:** date-fns & MUI X Date Pickers
- **Routing:** React Router DOM 7
- **Notifications:** React Toastify
- **State & utilities:** Custom context providers (`Application`, `Property`) and helper utilities in `/src/application/utils`
- **Testing:** Vitest 2 with React Testing Library and user-event and Cypress

## Architecture Overview

The project follows a lightweight hexagonal-inspired structure that keeps UI, domain models, and orchestration logic isolated:

- `cypress` - Folder for end to end tests
- `src/domain` – strongly typed entities and DTO contracts (`Property`, `Booking`, `Client`).
- `src/application` – cross-cutting utilities (date formatting, random IDs, overlap validation) and the routing configuration.
- `src/presentation`
  - `components` – reusable UI units (containers, data display, inputs, feedback, providers).
  - `drawers` – booking confirmation and management drawers implemented with Material UI.
  - `hooks` – feature-specific logic (`UseBooking`, `UseProperty`, `UseFetch`).
  - `screens` – top-level pages (Home, Booking Search, My Bookings).
- `tests` – Folder for unit tests covering components, drawers, providers, and utilities.

### Directory Snapshot

```text
cypress/
  e2e/
src/
  application/
  domain/
  presentation/
tests/
  application/
  presentation/
  mocks/
```

Aliases configured in `vite.config.ts` allow concise imports such as `@/presentation/...` and `@/tests/...` across the app and test suites.

## Core Features

1. **Booking search** – sticky filter panel powered by the date range field, property cards sourced from the context API, and a confirmation drawer for finalizing bookings.
2. **My Bookings** – lists aggregated reservations grouped by property, supports cancellation and date changes, and adapts drawer placement for mobile vs. desktop breakpoints.
3. **Context-managed state** – `PropertyProviderComponent` stores property inventory, handles booking mutations, and exposes availability queries with date-overlap validation.

## Testing Strategy

- **Component & drawer tests** live under `tests/presentation/...` and validate rendering, user flows, and integration with mocked hooks.
- **Utility tests** under `tests/application/utils` ensure deterministic helpers for formatting, parsing, and overlap checks.

Run the unit test suite anytime:

```bash
yarn test
```

Run the end-to-end Cypress flow (ensure the dev server is running on `http://localhost:5173`):

```bash
yarn cy:run
```

## Design Notes & Extensibility

- Swap the mock property dataset for real API calls by adjusting the `PropertyProviderComponent.rules.ts` hooks.
- Inject additional screens by extending `RoutesConfig` inside `src/application/routes/Routes.tsx`.
- Style customisations live next to components (e.g., `.styles.ts` + `.rules.ts` pattern) to keep styling and logic modular.
- Path aliases are defined in `tsconfig.app.json` and `vite.config.ts`; update both when introducing new top-level directories.

## Future Improvements

- Persist bookings across sessions using local storage or a backend API.
- Add authentication and role management for multi-user scenarios.
- Integrate analytics around booking funnel conversion.

---

Made with love by Lucas Arena ❤️
