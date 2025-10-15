# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**madrasah-ai** is a Next.js 15 application built with TypeScript, React 19, Tailwind CSS 4, and DaisyUI. It uses the App Router architecture introduced in Next.js 13+ and Jotai for state management.

## Tech Stack

- **Framework**: Next.js 15.5.5 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x (strict mode enabled)
- **Styling**: Tailwind CSS 4.1.14 with DaisyUI 5.3.2
- **State Management**: Jotai 2.15.0
- **Linting**: ESLint 9 with Next.js TypeScript rules

## Development Commands

**Note**: This project uses **pnpm** as the package manager.

### Development Server
```bash
pnpm dev
# Runs on http://localhost:3000
```

### Build
```bash
pnpm build
# Creates production build in .next/
```

### Production Server
```bash
pnpm start
# Runs production server (requires build first)
```

### Linting
```bash
pnpm lint
# Runs ESLint with Next.js core-web-vitals and TypeScript rules
```

### Install Dependencies
```bash
pnpm install
```

## Architecture

### Directory Structure
```
src/
  app/              # Next.js App Router pages and layouts
    layout.tsx      # Root layout with metadata
    page.tsx        # Home page
    globals.css     # Global styles with Tailwind CSS imports
    favicon.ico     # App favicon
public/             # Static assets (SVG icons)
```

### Path Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json)

### Styling Configuration
- **Tailwind CSS 4**: Uses new `@import "tailwindcss"` syntax in globals.css
- **DaisyUI**: Configured as a plugin with light (default) and dark (prefers-dark) themes
- **PostCSS**: Uses `@tailwindcss/postcss` plugin

### TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- JSX: preserve (handled by Next.js)
- Incremental compilation enabled

### ESLint Configuration
- Extends: `next/core-web-vitals`, `next/typescript`
- Ignores: node_modules, .next, out, build, next-env.d.ts
- Uses FlatCompat for ESLint 9 compatibility

## Key Implementation Details

### App Router
This project uses Next.js App Router (not Pages Router). All routes are defined in the `src/app/` directory.

### Server/Client Components
By default, all components in the app directory are Server Components. Use `"use client"` directive for client components that need interactivity, hooks, or browser APIs.

### State Management with Jotai
Jotai is installed for state management. Use atoms for global state:
- Import from `jotai`
- Create atoms with `atom(initialValue)`
- Use `useAtom`, `useAtomValue`, or `useSetAtom` in client components

### Styling Approach
- Use Tailwind utility classes for styling
- DaisyUI components are available (button, card, navbar, etc.)
- Access to both light and dark themes via DaisyUI configuration

## Important Notes

- This is a fresh Next.js project bootstrapped with create-next-app
- **Always use pnpm** for package management (not npm or yarn)
- Image optimization is available via `next/image`
- Font optimization uses next/font (Geist font family configured)
