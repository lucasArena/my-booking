# My Booking

My Booking is a React + TypeScript single-page application for browsing properties, booking new stays, and managing existing bookings.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tooling:** Vite 7 with the official React plugin (Fast Refresh)
- **UI library:** Material UI 7 with Emotion styling
- **Date handling:** date-fns & MUI X Date Pickers
- **Routing:** React Router DOM 7
- **Notifications:** React Toastify
- **State & utilities:** Custom context providers (`Application`, `Property`)
- **Testing:** Vitest 2 with React Testing Library and user-event and Cypress

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

## Testing Strategy

The project includes two complementary automated suites that cover both fast feedback and user flows end-to-end.

### Vitest unit & integration tests

- Source files live in `tests/application/...` and `tests/presentation/...`, mirroring the production folder structure for easy discoverability.
- The suite runs against a JSDOM environment with React Testing Library, so no browser is required.

#### Run the suite

```bash
yarn test
```

- Executes `vitest run` once in CI-friendly mode.
- Optional developer loops:
  - `yarn vitest --watch` keeps Vitest running interactively.
  - `yarn vitest run --coverage` generates Istanbul coverage reports inside `coverage/`.

### Cypress end-to-end tests

- Specs live in `cypress/e2e`, covering booking creation, updates, cancellations, and list views.
- Tests expect the mock API (`yarn server`) and the Vite dev server (`yarn dev`) to be running locally at `http://localhost:5173`.

#### Run the suite headless

```bash
yarn cy:run
```

- Uses the shared `cypress.config.cjs` configuration in CI/headless mode.
- For local debugging, launch the interactive runner with `yarn cypress open --config-file cypress.config.cjs` after starting the dev servers.

## Future Improvements

- Persist bookings across sessions using local storage or a backend API.
- Add authentication and role management for multi-user scenarios.

---

Made with love by Lucas Arena ❤️
