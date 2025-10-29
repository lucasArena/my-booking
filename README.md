# My Booking

My Booking is a React + TypeScript single-page application for browsing properties, booking new stays, and managing existing bookings.

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

3. Run mock server:

   ```bash
   yarn server
   ```

4. Launch the development server:

   ```bash
   yarn dev
   ```

5. Navigate to `http://localhost:5173` (default Vite port) to explore the app.

## Available Scripts

| Command        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `yarn dev`     | Run the Vite development server with hot module reloading. |
| `yarn build`   | Type-check and generate a production build inside `dist/`. |
| `yarn preview` | Serve the production build locally.                        |
| `yarn lint`    | Execute ESLint across the project.                         |
| `yarn test`    | Start Vitest in watch mode.                                |
| `yarn cy:run`  | Execute the Cypress end-to-end suite in headless mode.     |

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tooling:** Vite 7 with the official React plugin (Fast Refresh)
- **UI library:** Material UI 7 with Emotion styling
- **Date handling:** date-fns & MUI X Date Pickers
- **Routing:** React Router DOM 7
- **Notifications:** React Toastify
- **State & utilities:** Custom context providers (`Application`, `Property`)
- **Testing:** Vitest 2 with React Testing Library and user-event and Cypress

## Architecture Overview

The project follows a lightweight hexagonal-inspired structure that keeps UI, domain models, and orchestration logic isolated:

- `server` - Folder for all the mock server structure
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
server/
cypress/
  e2e/
src/
  application/
  domain/
  infra/
  presentation/
  services/
tests/
  application/
  presentation/
  mocks/
```

Aliases configured in `vite.config.ts` allow concise imports such as `@/presentation/...` and `@/tests/...` across the app and test suites.

## Core Features

1. **Booking search** – sticky filter panel powered by the date range field, property cards sourced from the mock api using json-server.
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

## Future Improvements

- Persist bookings across sessions using local storage or a backend API.
- Add authentication and role management for multi-user scenarios.

---

Made with love by Lucas Arena ❤️
