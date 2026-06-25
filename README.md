# job

A job search platform that helps users find jobs matching their skill set and location, and generates personalized learning roadmaps for the skills they still need to pick up to qualify for the roles they want.

Built on the [Fusion Starter](https://github.com/BuilderIO/fusion-starter) template — React + TypeScript on the client, Express on the server, sharing types between both, and deployable to Netlify.

## Features

- 🔍 **Skill & location-based job search** — find jobs that match your existing skill set and preferred location
- 🗺️ **Skill roadmaps** — get a personalized learning path for the skills you're missing for a target role
- ⚡ Fast, modern UI built with React, Tailwind, and shadcn/ui

> ⚠️ The feature list above reflects the project's intent. Add specifics here as they're implemented — e.g. how matching works, what the roadmap data looks like, which job sources are used — so this section stays accurate.

## Tech stack

- **Client:** React 18, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui (Radix UI primitives), TanStack Query, React Hook Form + Zod, Framer Motion, Recharts, React Three Fiber
- **Server:** Express 5, served via Vite in dev and as a standalone Node build in production
- **Shared:** a `shared/` package for types/utilities used by both client and server
- **Auth/data:** Firebase
- **Deployment:** Netlify (with Netlify Functions via `serverless-http`)
- **Tooling:** pnpm, Vitest, Prettier, TypeScript

## Project structure

```
.
├── client/              # React frontend
├── server/              # Express backend
├── shared/               # Shared types/utilities between client and server
├── netlify/functions/    # Netlify serverless function handlers
├── public/               # Static assets
├── .builder/rules/       # Builder.io rules/config
├── vite.config.ts        # Client build config
├── vite.config.server.ts # Server build config
├── netlify.toml          # Netlify deploy config
└── tailwind.config.ts    # Tailwind config
```

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- [pnpm](https://pnpm.io/) (this repo uses a pinned pnpm version — see `packageManager` in `package.json`)

### Install

```bash
pnpm install
```

### Configure environment variables

Copy `.env` (or create one) at the project root with your Firebase and any other required config:

```bash
cp .env.example .env   # if an example file exists; otherwise create .env manually
```

### Run in development

```bash
pnpm dev
```

This starts the Vite dev server (client + Express API together).

### Build for production

```bash
pnpm build
```

This runs both `build:client` and `build:server`.

### Run the production build

```bash
pnpm start
```

### Run tests

```bash
pnpm test
```

### Type-check

```bash
pnpm typecheck
```

### Format code

```bash
pnpm format.fix
```

## Deployment

This project is configured for [Netlify](https://www.netlify.com/), with serverless functions in `netlify/functions/` and settings in `netlify.toml`. Connect the repo to Netlify and it should build using the `build` script automatically.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a pull request

## License

No license file is currently included. Add one (MIT, etc.) if you intend others to use or contribute to this project.
