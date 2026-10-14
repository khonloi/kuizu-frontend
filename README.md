# Kuizu Frontend (v2)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.x-brightgreen.svg?style=flat-square&logo=node.js)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/next.js-v16.3-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-v19.2-61DAFB.svg?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.9-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/tests-162%20passed%20%28100%25%29-green.svg?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Accessibility: WCAG 2.1 AA](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-purple.svg?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Styling: Vanilla CSS](https://img.shields.io/badge/styling-vanilla%20css%20%2B%20modules-blueviolet.svg?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=prettier)](https://prettier.io)

An enterprise-grade, state-of-the-art frontend application uniting **Duolingo-style self-paced gamified curriculum mastery** with **Kahoot-style real-time big-screen multiplayer arena battles**. Engineered with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript** in strict mode, **Zustand 5**, **TanStack Query 5**, **Socket.IO Client**, and an accessible **Zero-Runtime Vanilla CSS Design System**.

---

## Table of Contents

- [Architectural Highlights](#architectural-highlights)
- [System Architecture & Data Flow](#system-architecture--data-flow)
- [Tech Stack](#tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Prerequisites](#prerequisites)
- [Installation & Getting Started](#installation--getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Core Application Features](#core-application-features)
  - [1. Duolingo Quest Engine (5 Exercise Types)](#1-duolingo-quest-engine-5-exercise-types)
  - [2. Multiplayer Arena Battles (Kahoot Architecture)](#2-multiplayer-arena-battles-kahoot-architecture)
  - [3. Gamification Economy & Weekly Leagues](#3-gamification-economy--weekly-leagues)
- [Design System & UI Primitives](#design-system--ui-primitives)
- [State Management & Data Flow Architecture](#state-management--data-flow-architecture)
- [Sensory Audio & Tactile Engine](#sensory-audio--tactile-engine)
- [Security, Edge Route Guarding & SEO](#security-edge-route-guarding--seo)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Production Build & Deployment](#production-build--deployment)
- [License](#license)

---

## Architectural Highlights

- **Next.js 16 App Router & Turbopack**: High-performance compilation and streaming SSR leveraging React 19 server/client components and React Compiler optimizations.
- **Server-Side Edge Route Guard (`proxy.ts`)**: Implements Next.js 16 edge proxy convention for zero-flash server-side session authentication checks without deprecated middleware overhead.
- **Offline Demo Simulator & Real-time Sockets**: Dual-mode WebSocket architecture. When connected to `kuizu-backend`, it facilitates live multiplayer classroom rounds. When disconnected or in demo mode (`NEXT_PUBLIC_DEMO_MODE=true`), an intelligent in-browser mock simulator handles room generation, simulated player joins, countdown ticks, and round scoring seamlessly.
- **Procedural Web Audio Synthesis Engine**: Custom Web Audio API synthesizer ([`audio-engine.ts`](src/lib/audio-engine.ts)) producing instant procedural chords, tactile pops, error tones, and victory fanfares without downloading heavy audio asset files.
- **Accessible Zero-Runtime Design System**: 20 meticulously crafted UI primitives constructed with pure Vanilla CSS, CSS Modules, and custom tokens ([`tokens.css`](src/styles/tokens.css)). Zero Tailwind runtime overhead.
- **Mathematical Sine-Wave Curriculum**: Dynamic curriculum path algorithm rendering animated sinusoidal learning nodes, checkpoints, and unit headers with responsive SVG connector paths.
- **Full WCAG 2.1 AA Compliance**: Focus trapping in modal dialogs, visible keyboard `:focus-visible` rings, ARIA live region status announcements, and automatic motion reduction for `prefers-reduced-motion`.

---

## System Architecture & Data Flow

```mermaid
graph TD
    User[Learner / Host Browser] --> NextServer[Next.js 16 App Router]
    NextServer --> EdgeProxy[Edge Proxy Guard (proxy.ts)]
    
    subgraph "Client Runtime Architecture"
        EdgeProxy --> Router[Page Routing & Layouts]
        Router --> UI[Design System Primitives (20 Components)]
        
        Router --> StateLayer[Client State Layer]
        StateLayer --> ZustandAuth[Zustand: Auth Store]
        StateLayer --> ZustandGame[Zustand: Arena Game Store]
        StateLayer --> ZustandAudio[Zustand: Audio Synth Store]
        StateLayer --> ReactQuery[TanStack React Query Cache]
        
        Router --> Engines[Interactive Engines]
        Engines --> LessonRunner[Duolingo Quest Engine (5 Exercise Types)]
        Engines --> ArenaSocket[Multiplayer Arena Engine]
        Engines --> AudioEngine[Procedural Web Audio API Synth]
        Engines --> Confetti[Canvas Confetti Particles]
    end

    subgraph "External Backend Services"
        ReactQuery -->|REST API /api/v1| BackendAPI[Kuizu NestJS Backend]
        ArenaSocket -->|WebSocket WSS| SocketGateway[Kuizu Socket.IO Gateway]
        ArenaSocket -.->|Fallback Simulation| MockHandler[In-Browser Offline Simulator]
    end
```

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (16.3) | App Router, Server Components, Turbopack, and Dynamic SEO metadata |
| **UI Library** | [React](https://react.dev/) (19.2) | Modern component architecture, hooks, and transitions |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (5.9) | Strict compile-time type-safety across all components, props, and schemas |
| **Client State** | [Zustand](https://github.com/pmndrs/zustand) (5.x) | Lightweight reactive state slices for auth, soundboard, and game arena |
| **Server State & Cache**| [TanStack React Query](https://tanstack.com/query) (5.x) | Declarative asynchronous caching, stale-while-revalidate, and prefetching |
| **Realtime Engine** | [Socket.IO Client](https://socket.io/) (4.8) | Bidirectional WebSocket communication with live room management |
| **Audio Engine** | Procedural [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Pure mathematical synth generating low-latency UI sound effects |
| **Styling** | Vanilla CSS & CSS Modules | Zero-runtime CSS variables token system, glassmorphism, and 3D buttons |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) | Consistent, lightweight SVG icon system |
| **Testing** | [Vitest](https://vitest.dev/) (4.x) & [Testing Library](https://testing-library.com/) | 145 unit and component integration tests with `jsdom` |
| **Linter & Formatting**| [ESLint 9](https://eslint.org/), [Prettier](https://prettier.io/) | Automated code cleanliness and deterministic formatting |

---

## Project Directory Structure

```text
kuizu-frontend/
├── public/                    # Static brand assets, favicon, and demo media
├── src/
│   ├── app/                   # Next.js 16 App Router routes
│   │   ├── (app)/             # Authenticated shell layout (Sidebar + StatsBar)
│   │   │   ├── design-system/ # Interactive live component library showcase
│   │   │   ├── leaderboard/   # Diamond League standings with promotion zones
│   │   │   ├── learn/         # Duolingo curriculum sine-wave quest map
│   │   │   ├── profile/       # Player showcase matrix & stats / Guest CTA card
│   │   │   ├── shop/          # Power-up store (Heart refill, Streak freeze)
│   │   │   └── layout.tsx     # Three-column desktop layout with sticky navigation
│   │   ├── (auth)/            # Authentication portal layouts
│   │   │   ├── login/         # Email/username login screen with returnUrl support
│   │   │   └── register/      # Profile registration with client-side Zod validation
│   │   ├── (learn)/           # Focused distraction-free quest runner
│   │   │   └── lesson/        # Dynamic quest route (/lesson/[slug]/[id])
│   │   ├── arena/             # Multiplayer Kahoot Arena portal
│   │   │   ├── host/          # Big-screen projector mode (PIN, QR, bar chart, podium)
│   │   │   ├── join/          # Responsive PIN and nickname entry screen
│   │   │   └── play/          # Live player gamepad controller with unjoined session guard
│   │   ├── error.tsx          # Client-side error boundary with recovery action
│   │   ├── global-error.tsx   # Root layout error boundary
│   │   ├── globals.css        # Reset, root typography, and viewport heights
│   │   ├── layout.tsx         # Root HTML layout with Google Outfit/Nunito fonts
│   │   ├── loading.tsx        # Top-level route transition skeleton
│   │   ├── manifest.ts        # PWA Web App Manifest
│   │   ├── not-found.tsx      # Accessible 404 page
│   │   ├── robots.ts          # Search engine crawler directives
│   │   └── sitemap.ts         # Automated dynamic XML sitemap generator
│   ├── components/            # Reusable UI component architecture
│   │   ├── layout/            # Shell components: Sidebar, MobileNav, StatsBar
│   │   └── ui/                # 20 standalone accessible UI primitives
│   │       ├── accordion/     # Accessible expandable disclosure
│   │       ├── avatar/        # User avatar with status ring indicators
│   │       ├── badge/         # Visual status pills and tier badges
│   │       ├── button/        # Duolingo 3D tactile buttons (primary, kahoot, duo)
│   │       ├── card/          # Elevation-based container card
│   │       ├── checkbox/      # Accessible custom checkbox control
│   │       ├── divider/       # Horizontal/vertical semantic separators
│   │       ├── drawer/        # Lesson feedback bottom slider (success/error)
│   │       ├── input/         # Floating label accessible text field
│   │       ├── modal/         # Focus-trapped dialog overlay with ESC dismiss
│   │       ├── progress-bar/  # Smooth animated progress indicator
│   │       ├── select/        # Accessible custom dropdown select
│   │       ├── skeleton/      # Content placeholder loading animation
│   │       ├── stack/         # Flexbox layout utility component
│   │       ├── switch/        # Accessible toggle switch
│   │       ├── tabs/          # Accessible tabbed navigation
│   │       ├── textarea/      # Multi-line text entry
│   │       ├── toast/         # Transient alert notification provider
│   │       └── tooltip/       # Contextual hover/focus micro-tips
│   ├── features/              # Domain-specific feature modules
│   │   ├── arena/             # Host dashboard, QR code, countdown clock, Kahoot tiles
│   │   ├── auth/              # Auth guard wrapper and session listeners
│   │   ├── gamification/      # Heart refill modals, gem stash, streak counter
│   │   ├── landing/           # Hero section, curriculum preview, sticky CTA bar
│   │   └── learn/             # Sine-wave path, exercise runners, feedback drawers
│   ├── hooks/                 # Custom React hooks & React Query abstractions
│   ├── lib/                   # Core browser utilities
│   │   ├── api.ts             # Type-safe Fetch HTTP transport wrapper
│   │   ├── audio-engine.ts    # Procedural Web Audio API synth soundboard
│   │   ├── confetti.ts        # Canvas Confetti victory celebration burst
│   │   └── socket.ts          # Resilient Socket.IO singleton manager
│   ├── mock/                  # Offline sample courses, quizzes, and local state handler
│   ├── providers/             # Global Context Providers (QueryProvider, AuthProvider)
│   ├── stores/                # Zustand global state slices
│   │   ├── audio.store.ts     # Sound effects volume & mute toggle
│   │   ├── auth.store.ts      # Authenticated user state, XP, hearts, gems
│   │   └── game.store.ts      # Real-time room PIN, players, questions, podium
│   ├── styles/                # CSS variables tokens & micro-animations
│   │   ├── tokens.css         # Duolingo & Kahoot curated color tokens and radii
│   │   └── animations.css     # Tactile button push, wiggle, and celebration keyframes
│   └── proxy.ts               # Next.js 16 Edge Proxy for server route guarding
├── vitest.config.ts           # Vitest unit test runner configuration
└── package.json               # NPM package manifest & scripts
```

---

## Prerequisites

Ensure your development environment meets the following specifications:

- **Node.js**: `v20.x` or higher (`v22.x` recommended)
- **Package Manager**: [pnpm](https://pnpm.io/) (`v9.x+`) or [npm](https://www.npmjs.com/)
- **Backend Service**: Running instance of `kuizu-backend` on port `4000` (or leave default to run in automatic offline demo simulator mode).

---

## Installation & Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kuizu-frontend.git
cd kuizu-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to create your local `.env.local` configuration:

```bash
cp .env.example .env.local
```

Configure your parameters (see [Environment Configuration](#environment-configuration)).

### 4. Run Development Server with Turbopack

```bash
npm run dev
```

Navigate to `http://localhost:3001` in your browser.

---

## Environment Configuration

| Variable | Type | Default | Description |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `string` | `http://localhost:3001` | Canonical public URL for Open Graph and metadata |
| `NEXT_PUBLIC_API_URL` | `string` | `/api` | Base path for REST API calls (proxied via Next.js) |
| `NEXT_PUBLIC_SOCKET_URL`| `string` | `http://localhost:4000` | Backend Socket.IO WebSocket gateway server URL |
| `BACKEND_INTERNAL_URL` | `string` | `http://localhost:4000` | Target URL for server-side API proxying and rewrites |
| `NEXT_PUBLIC_DEMO_MODE` | `boolean`| `false` | When `true`, enables offline simulator for standalone demos |

---

## Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start development server with Turbopack on port `3001` |
| `npm run build` | Validate types, compile routes, and generate optimized production bundle |
| `npm run start` | Launch production Next.js server from compiled `.next` output |
| `npm run lint` | Execute ESLint inspection across all components and pages |
| `npm test` | Run complete Vitest suite (145 tests across 42 files) in single-run mode |
| `npm run test:watch` | Run Vitest in interactive watch mode for component TDD |
| `npm run test:cov` | Generate detailed component code coverage report |

---

## Core Application Features

### 1. Duolingo Quest Engine (5 Exercise Types)

The learning runner ([`lesson-runner.tsx`](src/features/learn/lesson-runner.tsx)) replicates Duolingo's tactile learning loop across 5 exercise templates:

1. **Multiple Choice**: Select from 4 answer options with instant sensory audio feedback.
2. **Translate Exercise**: Assemble translated sentences from a selectable interactive word bank token pool.
3. **Fill-in-the-Blank**: Choose the appropriate vocabulary token to complete sentence gaps.
4. **Match Pairs**: Rapid-fire matching of foreign terms with native definitions with mismatch animations.
5. **Listen & Type**: Audio pronunciation player (normal and slow turtle speed) with transcription input.

Each exercise features:
- **Immediate Sensory Feedback**: Green/Red bottom feedback drawer with contextual advice.
- **Heart System**: Incorrect answers deplete 1 of 5 quest hearts. At 0 hearts, prompts refill via gems.
- **XP Progression**: Successful lesson completion triggers confetti fireworks and awards experience points.

### 2. Multiplayer Arena Battles (Kahoot Architecture)

The multiplayer arena supports two synchronized viewpoints:

#### Projector Host Screen (`/arena/host`)
- **Lobby Phase**: Displays a giant 6-digit PIN and dynamic SVG QR code for mobile joining.
- **Question Phase**: Synchronized radial countdown timer clock with live answered player counter.
- **Reveal Phase**: Animated 4-color bar chart displaying live answer distribution across the room.
- **Podium Ceremony**: 3D Olympic podium celebrating 1st, 2nd, and 3rd place winners with confetti bursts.

#### Mobile Gamepad Screen (`/arena/play`)
- 4 iconic tactile Kahoot buttons (Red Triangle, Blue Diamond, Yellow Circle, Green Square).
- Speed-decay scoring formula: awards up to 1000 base points + speed bonuses + consecutive streak bonuses.
- Real-time round results with points earned and personal standing rank.

### 3. Gamification Economy & Weekly Leagues

- **Day Streaks**: Animated flame counter with automated streak freeze protection.
- **Gems Stash**: Digital currency earned through quests, used to purchase heart refills and streak freezes.
- **Diamond League Leaderboard**: Weekly tier rankings with visual promotion (top 20%) and demotion (bottom 20%) cutoff thresholds.

---

## Design System & UI Primitives

Kuizu features a custom, zero-dependency Design System built with Vanilla CSS variables and 3D tactile buttons:

| Component | Path | Key Capabilities |
| :--- | :--- | :--- |
| `Button` | [`src/components/ui/button.tsx`](src/components/ui/button.tsx) | 3D push depth, loading spinners, variants (`duo`, `kahoot`, `secondary`, `danger`) |
| `Card` | [`src/components/ui/card.tsx`](src/components/ui/card.tsx) | Elevation borders, padding variants, interactive hover states |
| `Modal` | [`src/components/ui/modal.tsx`](src/components/ui/modal.tsx) | Focus trap, body scroll lock, backdrop blur, ESC key dismiss |
| `Drawer` | [`src/components/ui/drawer.tsx`](src/components/ui/drawer.tsx) | Bottom sliding sheet for exercise evaluation (Success green / Error red) |
| `ProgressBar` | [`src/components/ui/progress-bar.tsx`](src/components/ui/progress-bar.tsx) | Dual-tone animated filling bar with shimmer highlight |
| `Badge` | [`src/components/ui/badge.tsx`](src/components/ui/badge.tsx) | Gamification status tags (XP, League tiers, Streak indicators) |
| `Avatar` | [`src/components/ui/avatar.tsx`](src/components/ui/avatar.tsx) | Fallback initials, image avatars, and league rank rings |
| `Toast` | [`src/components/ui/toast.tsx`](src/components/ui/toast.tsx) | Floating notification toast stack with auto-dismiss |

---

## State Management & Data Flow Architecture

The application cleanly separates client state, server cache, and real-time multiplayer state:

1. **`useAuthStore` ([`auth.store.ts`](src/stores/auth.store.ts))**: Manages the current authenticated profile, quest hearts, gems, streak counter, and synchronized cookies (`kuizu_session`).
2. **`useGameStore` ([`game.store.ts`](src/stores/game.store.ts))**: Manages multiplayer arena room state (PIN, players list, active question, answer distribution, podium).
3. **`useAudioStore` ([`audio.store.ts`](src/stores/audio.store.ts))**: Controls global sound effects mute state and audio synthesizer triggers.
4. **TanStack Query Hooks**: Declarative server-state hooks with automatic caching:
   - `useCoursesQuery`: Retrieves all available language courses.
   - `useCourseQuery(slug)`: Fetches curriculum structure for a specific course.
   - `useCompletedLessonsQuery`: Tracks completed lesson progress.
   - `useLeaderboardQuery`: Caches competitive league standings.

---

## Sensory Audio & Tactile Engine

Rather than forcing users to download heavy audio files over slow connections, Kuizu features an embedded procedural synthesizer using the browser's native **Web Audio API** ([`src/lib/audio-engine.ts`](src/lib/audio-engine.ts)):

```typescript
// Procedural Pop Sound (FM Frequency Sweep)
osc.frequency.setValueAtTime(600, ctx.currentTime);
osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

// Procedural Correct Fanfare (Major Triad: C5 - E5 - G5)
playTone(523.25, 0.1); // C5
playTone(659.25, 0.1); // E5
playTone(783.99, 0.25); // G5
```

- **Zero Asset Latency**: Sound plays with 0ms buffering delay.
- **Mute Safe**: Automatically respects user mute preferences and system audio policies.
- **Canvas Fireworks**: Victory events trigger high-performance canvas confetti bursts ([`src/lib/confetti.ts`](src/lib/confetti.ts)).

---

## Security, Edge Route Guarding & SEO

- **Edge Route Proxy Guard ([`src/proxy.ts`](src/proxy.ts))**: Utilizes Next.js 16 Edge Proxy to enforce session validation before rendering protected views.
- **Guest-First Architecture**: Routes like `/profile` gracefully display guest onboarding cards when logged out, allowing public exploration without jarring redirects.
- **Enterprise Security Headers**: Strict Content Security Policy, HSTS, frame-ancestors restriction, and anti-MIME sniffing configured in [`next.config.ts`](next.config.ts).
- **Automated Dynamic SEO**:
  - Open Graph & Twitter Summary Cards defined in [`src/app/layout.tsx`](src/app/layout.tsx).
  - Dynamic XML Sitemap generator ([`src/app/sitemap.ts`](src/app/sitemap.ts)) excluding internal tooling.
  - Search engine directives ([`src/app/robots.ts`](src/app/robots.ts)) disallowing arena gamepads and private paths.

---

## Testing & Quality Assurance

Kuizu Frontend maintains a **100% test pass rate** with 145 tests across 42 test suites using [Vitest](https://vitest.dev/) and `@testing-library/react`:

```bash
# Execute full test suite
npm test

# Run tests in interactive watch mode
npm run test:watch

# Generate test coverage report
npm run test:cov
```

### Test Coverage Highlights

- **UI Primitives Suite (`src/components/ui/__tests__/*`)**: Validates accessibility, keyboard interactions, focus management, and rendering across all 20 UI primitives.
- **Exercise Engine Suite (`src/features/learn/__tests__/*`)**: Validates Multiple Choice, Translate, Match Pairs, Fill-in-Blank, and Listen exercise evaluation logic.
- **Arena Suite (`src/features/arena/__tests__/*`)**: Tests Kahoot tile clicks, answer distribution bar charts, QR code rendering, and countdown clocks.
- **Store & Hook Suites (`src/stores/__tests__/*`, `src/features/auth/__tests__/*`)**: Tests Zustand state mutations and auth guards.

---

## Production Build & Deployment

### 1. Compile Optimized Bundle

```bash
npm run build
```

Next.js compiles all routes with Turbopack, prerendering static pages and establishing server-rendered dynamic endpoints.

### 2. Verify Linting & Types

```bash
npm run lint
```

### 3. Start Production Server

```bash
NODE_ENV=production npm run start
```

### Docker Deployment

To build a standalone production container:

```bash
docker build -t kuizu-frontend:latest .
docker run -p 3001:3001 --env-file .env.local kuizu-frontend:latest
```

---

## License

This project is licensed under the [ISC License](LICENSE).
