# Split App

A Vite + React + TypeScript starter for a shareable split-planning experience.

## Public preview

Temporary preview: https://a480edf5219942.lhr.life/

This preview is served through a temporary tunnel and remains available while the local preview process is running.

## Run locally

```bash
npm install
npm run dev
```

## Validate and build

```bash
npm run lint
npm run build
```

The production output is written to `dist/`. This project can be deployed directly to Vercel, Netlify, or another static host.

## Project structure

```text
Split App/
├─ public/          Static assets
├─ src/             React application source
├─ index.html       HTML entry point
├─ vite.config.ts   Vite and public-host configuration
├─ vercel.json      Vercel build configuration
└─ package.json     Scripts and dependencies
```

## Deploy to Vercel

1. Import this repository into Vercel.
2. Keep the framework preset as Vite.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.

## GitHub

Initialize and publish from this folder:

```bash
git init
git add .
git commit -m "Start Split App"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
