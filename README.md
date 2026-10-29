# Smart Class Hall

Smart Class Hall is an educational web application for discovering, creating,
organizing, and sharing English-learning resources. The platform supports
resources for English levels A1 through C1 and provides a simple space where
learners can browse recommendations, save favorites, and contribute their own
materials.

## Designers

Smart Class Hall was designed by:

- **Christopher Díaz**
- **Juan Andrés Velásquez**

Both designers are students at **CESDE**.

## Features

- Browse recommended and user-created books, texts, audio, and video resources.
- Filter resources by type and English level.
- Search resources by title, description, or source.
- Add resources with a title, type, level, description, and external link.
- Mark resources as favorites.
- Store created resources and favorites in the browser's local storage.
- Navigate through the application's home, resource, bookmark, profile, and
  documentation pages.
- Switch between light and dark themes and collapse the main sidebar.

## Technology

- React
- React Router
- Vite
- Tailwind CSS
- ESLint

## Project structure

```text
src/
├── api/                         # API integration space
├── assets/                      # Static images and other assets
├── components/
│   ├── layout/                  # Shared application shell and navigation
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   └── ui/                 # Shared layout controls
│   └── pages/                   # Presentational components grouped by page
│       ├── BrowseResources/
│       ├── CreateResourcePanel/
│       └── HomePage/
├── pages/                       # Route-level page components and state
├── router/                      # Application route definitions
├── App.jsx                      # Shared application shell
└── main.jsx                     # Application entry point
```

Route-level page components live in `src/pages`. Their presentational
components live in the corresponding folder under `src/components/pages`,
which keeps page state and UI composition separate while preserving the
existing architecture.

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

### Run the linter

```bash
npm run lint
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Data storage

Created resources and favorites are currently stored in the browser using
`localStorage`. Clearing the browser's site data removes those locally stored
items. The application is structured so that a server-backed API can be added
later.

## Contact

For questions about Smart Class Hall, contact
`jvelasquezan1@cesde.net`.
