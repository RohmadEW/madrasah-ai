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
    layout.tsx      # Root layout with metadata and Providers wrapper
    providers.tsx   # Jotai Provider and AuthProvider wrapper
    page.tsx        # Landing page
    globals.css     # Global styles with Tailwind CSS imports
    favicon.ico     # App favicon
    login/          # Login page route
      page.tsx
    home/           # Home page route (protected)
      page.tsx
  components/       # Reusable React components
    AuthProvider.tsx # Auth middleware for route protection
  store/            # Jotai state management
    auth.ts         # Auth atoms (isAuthenticated, user)
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
- Use `atomWithStorage` from `jotai/utils` for persistent state (localStorage)

**Auth State** (src/store/auth.ts):
- `isAuthenticatedAtom`: Boolean atom with localStorage persistence
- `userAtom`: User object atom with localStorage persistence
- `authStateAtom`: Derived atom combining both states

### Authentication System
The app uses a custom authentication system with Jotai for state management:

**AuthProvider** (src/components/AuthProvider.tsx):
- Client-side route protection middleware
- Automatically redirects unauthenticated users from protected routes to `/login`
- Redirects authenticated users from `/login` to `/home`
- Protected routes defined in `PROTECTED_ROUTES` array (currently: `/home`)
- Auth routes defined in `AUTH_ROUTES` array (currently: `/login`, `/register`)

**Login Flow**:
1. User submits credentials on `/login`
2. On success: Set `isAuthenticatedAtom` and `userAtom`, then redirect to `/home`
3. On failure: Display error message

**Logout Flow**:
1. Clear `isAuthenticatedAtom` and `userAtom`
2. Redirect to `/login`

**Adding New Protected Routes**:
Update `PROTECTED_ROUTES` array in `src/components/AuthProvider.tsx`

### Styling Approach
- Use Tailwind utility classes for styling
- DaisyUI components are available (button, card, navbar, etc.)
- Access to both light and dark themes via DaisyUI configuration
- **Responsive Design**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`) for mobile-first responsive layouts
  - Mobile: base styles
  - Tablet: `sm:` (640px+)
  - Desktop: `md:` (768px+), `lg:` (1024px+)

**Common DaisyUI Components Used**:
- `btn`, `btn-primary`, `btn-outline`, `btn-lg`, `btn-md`
- `card`, `card-body`, `card-title`, `card-actions`
- `input`, `input-bordered`
- `navbar`, `dropdown`, `dropdown-end`
- `fieldset`, `fieldset-legend` (for form inputs)
- `loading`, `loading-spinner` (for loading states)
- `alert`, `alert-error`
- `stats`, `stat`, `stat-value`
- `hero`, `hero-content`
- `footer`, `footer-center`

## Important Notes

- This is a Next.js project bootstrapped with create-next-app
- **Always use pnpm** for package management (not npm or yarn)
- Image optimization is available via `next/image`
- Font optimization uses next/font (Geist font family configured)
- All pages must be wrapped with `Providers` component for Jotai and AuthProvider to work
- Use `"use client"` directive for pages that need authentication or interactivity

## Development Best Practices

### Forms and User Input
- Use DaisyUI `fieldset` and `fieldset-legend` for form inputs (instead of form-control/label)
- Show loading spinner (`loading loading-spinner`) on buttons during async operations
- Validate inputs before submitting
- Display error messages using DaisyUI `alert` component

### Responsive Design
- Always implement mobile-first responsive design
- Test layouts on multiple screen sizes (mobile, tablet, desktop)
- Use Tailwind responsive prefixes consistently:
  ```tsx
  className="text-sm sm:text-base md:text-lg"
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  className="px-4 sm:px-6 lg:px-8"
  ```

### Authentication
- Protected pages should check auth state from Jotai atoms
- Always clear auth state on logout
- Use `router.push()` for navigation after login/logout
- Display user info from `userAtom` in UI (navbar, profile, etc.)
