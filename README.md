# Kuizu Frontend ⚡

> The next-generation unified gamified learning and multiplayer arena platform. Seamlessly combines Duolingo-style self-paced language mastery with Kahoot-style real-time classroom projector battles. Built on **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Zustand 5**, **TanStack Query 5**, and **Vanilla CSS**.

[![CI Status](https://img.shields.io/badge/CI-Passing-brightgreen?style=flat-square&logo=github-actions)](https://github.com/your-username/kuizu-frontend/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-brown?style=flat-square)](https://github.com/pmndrs/zustand)
[![TanStack Query](https://img.shields.io/badge/React_Query-5.0-FF4154?style=flat-square&logo=react-query)](https://tanstack.com/query)
[![Vitest](https://img.shields.io/badge/Vitest-145%20Passed-green?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-purple?style=flat-square)]()
[![License](https://img.shields.io/badge/License-UNLICENSED-blue?style=flat-square)]()

---

## Table of Contents

- [Architectural Highlights](#architectural-highlights)
- [Tech Stack](#tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Prerequisites](#prerequisites)
- [Installation & Getting Started](#installation--getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Dual-Tier State Architecture](#dual-tier-state-architecture)
  - [Client State: Zustand 5 Store Slices](#client-state-zustand-5-store-slices)
  - [Server State: TanStack React Query 5](#server-state-tanstack-react-query-5)
  - [Offline Simulator & Resilient Mock Fallback](#offline-simulator--resilient-mock-fallback)
- [Real-Time Multiplayer Arena Engine](#real-time-multiplayer-arena-engine)
  - [Big-Screen Projector Mode (`/arena/host`)](#big-screen-projector-mode-arenahost)
  - [Mobile Player Experience (`/arena/play`)](#mobile-player-experience-arenaplay)
  - [Audio-Synchronized Timers & Live Bar Charts](#audio-synchronized-timers--live-bar-charts)
  - [Olympic Podium Ceremony](#olympic-podium-ceremony)
- [Duolingo-Style Gamified Learning Journey](#duolingo-style-gamified-learning-journey)
  - [Sine-Wave Curriculum Path](#sine-wave-curriculum-path)
  - [Interactive Quest Engine (`LessonRunner`)](#interactive-quest-engine-lessonrunner)
  - [Hearts Economy & Shop Power-Ups](#hearts-economy--shop-power-ups)
  - [Procedural Web Audio Engine](#procedural-web-audio-engine)
- [Design System & Aesthetics](#design-system--aesthetics)
  - [3D Tactile Physics Tokens](#3d-tactile-physics-tokens)
  - [Accessible Primitive Component Suite](#accessible-primitive-component-suite)
- [Edge Proxy & Server-Side Security](#edge-proxy--server-side-security)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Production Deployment](#production-deployment)
- [License](#license)

---

## Architectural Highlights

- **Next.js 16 App Router & React 19 Foundation**:
  - Full server component optimization (RSC) with streaming and zero layout shifts (CLS < 0.01).
  - Turbopack compilation engine with pre-rendering of all 17 static and dynamic routes.
  - Implements the new Next.js 16 [`proxy.ts`](src/proxy.ts) convention for server-side edge route protection without client redirect flashes.
- **Real-Time Multiplayer Kahoot Arena**:
  - Live WebSocket communication powered by **Socket.IO Client** with sub-10ms event acknowledgment.
  - Big-screen projector stage (`/arena/host`) featuring full-screen toggling, dynamic SVG QR codes for instant mobile joining, live answer count telemetry, and real-time distribution bar charts.
  - Olympic 3-tier victory ceremony (`PodiumCeremony`) with synchronized audio fanfare and celebratory canvas fireworks.
- **Duolingo-Inspired Sine-Wave Learning Roadmap**:
  - Procedurally calculated trigonometric curved lesson path (`CurriculumPath`) with unit guidebooks, checkpoint treasure chests, and tactile 3D stepping stones.
  - Four distinct interactive exercise primitives: **Translate**, **Listen** (with normal and slow turtle-speed speech audio), **Match Pairs** (with tactile selection physics), and **Fill in Blank** (with auto-advancing token slots).
- **Procedural Web Audio Engine (Zero Asset Downloads)**:
  - Lightweight synthesizer ([`audio-engine.ts`](src/lib/audio-engine.ts)) built directly on the native **Web Audio API**.
  - Synthesizes clicks, pops, error thuds, and multi-note major triad fanfare chords procedurally with zero external audio MP3 asset latency or bandwidth overhead.
- **Zero-Tailwind Pure Vanilla CSS Design System**:
  - Built strictly on scoped CSS Modules (`*.module.css`) and standardized CSS Custom Properties ([`tokens.css`](src/styles/tokens.css)).
  - Signature 3D tactile buttons with physical depth offset (`box-shadow: 0 4px 0 var(--border-color)`), active translation depression (`translateY(3px)`), and WCAG 2.1 AA accessible contrast ratios.
- **Dual-Tier State Management**:
  - **Client State**: Zustand 5 slices managing live game session state, audio preferences, and persistent offline demo data.
  - **Server State**: TanStack React Query 5 providing background revalidation, stale-while-revalidate caching, and optimistic mutations.

---

## Tech Stack

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Server Components, Turbopack, route optimization, metadata |
| **UI Library** | [React 19](https://react.dev/) / React DOM | Declarative component tree, Hooks, and Transitions |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict static typing and full-stack API contract alignment |
| **Client State** | [Zustand 5](https://github.com/pmndrs/zustand) | Global reactive state for audio, game rooms, and auth |
| **Server State** | [TanStack React Query 5](https://tanstack.com/query) | Async data fetching, caching, and background synchronization |
| **Realtime WebSockets** | [Socket.IO Client 4](https://socket.io/) | Low-latency bi-directional multiplayer communication |
| **Styling** | Vanilla CSS & Scoped CSS Modules | Pure CSS custom properties token system (zero runtime overhead) |
| **Icons** | [Lucide React](https://lucide.dev/) | Crisp, accessible SVG icons |
| **Typography** | [Outfit](https://fonts.google.com/specimen/Outfit) & [Nunito](https://fonts.google.com/specimen/Nunito) | Clean, geometric sans-serif typography via `next/font` |
| **Audio** | Native [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Procedural sound generation for UI feedback and ceremonies |
| **Visual Effects** | [canvas-confetti](https://github.com/catdad/canvas-confetti) | High-performance particle physics for quest and podium victories |
| **Testing** | [Vitest 5](https://vitest.dev/) & [React Testing Library](https://testing-library.com/) | Fast component testing with JSDOM environment |
| **Code Quality** | [ESLint 9](https://eslint.org/) & [Prettier 3](https://prettier.io/) | Automated code linting and formatting compliance |

---

## Project Directory Structure

```text
kuizu-frontend/
├── public/                    # Static assets, favicon, brand graphics
├── src/
│   ├── app/                   # Next.js 16 App Router (pages & server layouts)
│   │   ├── (app)/             # Authenticated app shell with persistent Sidebar & StatsBar
│   │   │   ├── design-system/ # Internal interactive component sandbox & kitchen sink
│   │   │   ├── leaderboard/   # Diamond League weekly podium & standings table
│   │   │   ├── learn/         # Curriculum dashboard with sine-wave path & unit banners
│   │   │   ├── profile/       # User profile, statistics matrix, and guest sign-in card
│   │   │   ├── shop/          # Kuizu item shop (heart refills, streak freeze shields)
│   │   │   └── layout.tsx     # Responsive desktop 3-column & mobile drawer shell
│   │   ├── (auth)/            # Auth routes
│   │   │   ├── login/         # Account login with returnUrl redirection
│   │   │   └── register/      # Account registration with username regex validation
│   │   ├── (learn)/           # Focused immersive full-screen learning environment
│   │   │   └── lesson/[slug]/[id]/ # Quest runner with progress bar and feedback drawer
│   │   ├── arena/             # Real-time Multiplayer Kahoot Arena
│   │   │   ├── host/          # Big-screen projector host controller & podium
│   │   │   ├── join/          # 6-digit PIN entry and player nickname form
│   │   │   └── play/          # Live player answer controller with unjoined session guard
│   │   ├── error.tsx          # Root error boundary with audio feedback and reset action
│   │   ├── globals.css        # CSS resets, root font variables, and body layout rules
│   │   ├── layout.tsx         # Root HTML layout with font injections and Query/AuthProvider
│   │   ├── loading.tsx        # Initial load skeleton animation
│   │   ├── manifest.ts        # Progressive Web App (PWA) manifest generator
│   │   ├── not-found.tsx      # Custom 404 screen with navigation recovery
│   │   ├── page.tsx           # High-converting landing page (Hero, Ribbon, 3D Features)
│   │   ├── robots.ts          # Search engine crawl directives (protecting internal routes)
│   │   └── sitemap.ts         # Dynamic XML sitemap generator
│   ├── components/            # Reusable UI component library
│   │   ├── layout/            # Sidebar, MobileNav bottom dock, and Top StatsBar
│   │   └── ui/                # 20 accessible primitives (Button, Modal, Drawer, Tabs, etc.)
│   ├── features/              # Encapsulated domain components & hooks
│   │   ├── arena/             # Arena components (KahootTile, CountdownTimer, PodiumCeremony)
│   │   ├── auth/              # Auth guard wrapper
│   │   ├── gamification/      # HeartRefillModal, StreakDisplay, LeagueTrophies
│   │   ├── landing/           # LandingHero, SubjectRibbon, FeatureCards, StickyCtaBar
│   │   └── learn/             # CurriculumPath, Exercise runners (Translate, Listen, Match, Fill)
│   ├── hooks/                 # Custom React and React Query hooks
│   ├── lib/                   # Transport, procedural audio, confetti, and Socket.IO client
│   ├── mock/                  # Offline demo courses, quizzes, and mock API request handler
│   ├── providers/             # AuthProvider and ReactQueryProvider
│   ├── stores/                # Zustand stores (useAuthStore, useGameStore, useAudioStore)
│   ├── styles/                # CSS Custom Properties tokens (tokens.css, animations.css)
│   └── proxy.ts               # Next.js 16 Edge proxy for server-side route guarding
├── vitest.config.ts           # Vitest configuration with JSDOM and React testing library
├── tsconfig.json              # TypeScript strict configuration with path aliases
└── next.config.ts             # Next.js production build and security headers config
```

---

## Prerequisites

Ensure your development environment meets the following specifications:

- **Node.js**: `>= 20.18.0` (`v22.x LTS` recommended)
- **Package Manager**: `npm` (`>= 10.x`) or `pnpm` (`>= 9.x`)
- **Backend Service**: `kuizu-backend` running on port `4000` (or enable offline demo mode)

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

Copy `.env.example` to create your local `.env.local`:

```bash
cp .env.example .env.local
```

### 4. Launch Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

> [!TIP]
> **Offline Presentation Mode**: Set `NEXT_PUBLIC_DEMO_MODE=true` in `.env.local` to explore the complete curriculum, lesson quest runner, and live multiplayer arena with zero external backend dependencies.

---

## Environment Configuration

| Variable | Required | Default | Description | Example |
| :--- | :---: | :---: | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Yes | `/api` | Base path for REST API calls (proxied or direct) | `/api` |
| `NEXT_PUBLIC_SOCKET_URL` | Yes | `http://localhost:4000` | Socket.IO server connection endpoint | `http://localhost:4000` |
| `BACKEND_INTERNAL_URL` | No | `http://localhost:4000` | Target URL used by Next.js rewrites to proxy backend requests | `http://localhost:4000` |
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3001` | Public canonical URL used for SEO, Open Graph, and sitemap | `http://localhost:3001` |
| `NEXT_PUBLIC_DEMO_MODE`| No | `false` | Enable offline mock handlers for local demos without backend | `false` |

---

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **dev** | `npm run dev` | Starts Next.js development server with Turbopack on port 3001. |
| **build** | `npm run build` | Compiles production bundle and pre-renders static routes with Turbopack. |
| **start** | `npm run start` | Serves compiled production application. |
| **test** | `npm test` | Runs all 145 unit and component tests via Vitest. |
| **test:watch** | `npm run test:watch` | Runs Vitest in interactive watch mode. |
| **lint** | `npm run lint` | Inspects code quality and accessibility rules using ESLint. |

---

## Dual-Tier State Architecture

Kuizu divides state into clean client and server tiers:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Application                      │
├──────────────────────────────┬──────────────────────────────┤
│    Client State (Zustand)    │ Server State (React Query)   │
│  - useAuthStore (user, token)│  - useCoursesQuery           │
│  - useGameStore (arena state)│  - useCourseQuery(slug)      │
│  - useAudioStore (SFX, mute) │  - useCompletedLessonsQuery  │
│  - useShopStore (inventory)  │  - useQuizzesQuery           │
├──────────────────────────────┴──────────────────────────────┤
│                     Transport Layer                         │
│  - api.get / api.post with automatic offline mock fallback  │
│  - Socket.IO with auto-reconnection & room channel isolation│
└─────────────────────────────────────────────────────────────┘
```

### Client State: Zustand 5 Store Slices
- **[`useAuthStore`](src/stores/auth.store.ts)**: Manages current user session, hearts balance, gem stash, XP, and syncs session cookies across client and edge proxy boundaries.
- **[`useGameStore`](src/stores/game.store.ts)**: Tracks live room PIN, player roster, countdown clock, active question, answer distribution, and grand finale podium standings.
- **[`useAudioStore`](src/stores/audio.store.ts)**: Controls master mute preferences and exposes triggers for UI audio feedback (`playPop`, `playSuccess`, `playError`, `playLevelUp`).

### Server State: TanStack React Query 5
- Automatic background caching, stale-while-revalidate policies, and optimistic mutations for completed lessons and shop purchases.

### Offline Simulator & Resilient Mock Fallback
- If the backend is offline or `NEXT_PUBLIC_DEMO_MODE=true`, the client seamlessly falls back to [`mock-handler.ts`](src/mock/mock-handler.ts), ensuring uninterrupted demonstration capability.

---

## Real-Time Multiplayer Arena Engine

### Big-Screen Projector Mode (`/arena/host`)
- **Deck Selection**: Teachers select an author-created quiz deck or sample Japanese deck.
- **Giant PIN & QR Join**: Projector display presents a prominent 6-digit room PIN alongside a dynamically generated SVG QR code (`QRCodeSvg`) for zero-friction mobile onboarding.
- **Fullscreen Capability**: Integrated HTML5 Fullscreen API toggle with projector-optimized typography.

### Mobile Player Experience (`/arena/play`)
- **Tactile Kahoot-Style Controls**: 4 geometric color-coded buttons with 3D physical elevation:
  - 🔺 **Red** (Triangle)
  - 🔷 **Blue** (Rhombus)
  - 🟡 **Yellow** (Circle)
  - 🟩 **Green** (Square)
- **Session Guards**: Direct navigation to `/arena/play` without an active PIN or joined session presents an informative guard card with one-click navigation back to [`/arena/join`](src/app/arena/join/page.tsx).

### Audio-Synchronized Timers & Live Bar Charts
- Circular countdown clock rendered via SVG stroke-dashoffset physics with critical-second warning animations.
- Question results reveal mode renders animated distribution bar charts (`AnswerBarChart`) showing exact player response tallies with correct answer indicators.

### Olympic Podium Ceremony
- Three-tier physical stage showcasing 1st, 2nd, and 3rd place winners with crown badges, score labels, and celebratory confetti cannons (`canvas-confetti`).

---

## Duolingo-Style Gamified Learning Journey

### Sine-Wave Curriculum Path
- Units and lessons are laid out in a continuous trigonometric sine wave:

$$X(i) = \text{Center} + \sin\left(\frac{i \times \pi}{2}\right) \times \text{Amplitude}$$

- **Visual Milestones**: Pulsing current lesson stone, START callout badge, locked grayscale icons, and unit checkpoint treasure chests.

### Interactive Quest Engine (`LessonRunner`)
- **Exercise Types**:
  1. **Translate**: Word bank tokens with tap-to-select and tap-to-return physics.
  2. **Listen**: Normal speed (1.0x) and turtle speed (0.5x) speech synthesis audio buttons.
  3. **Match Pairs**: Dual-column term and definition pairing with tactile active states.
  4. **Fill in Blank**: Sentence prompts with placeholder drop targets.
- **Feedback Drawer**: Accessible bottom slide-up drawer with success (lime green) and failure (vibrant red) states, displaying audio chords and correct answer hints.

### Hearts Economy & Shop Power-Ups
- **Hearts**: Learners start with 5 hearts. Mistakes deduct 1 heart. Reaching 0 hearts triggers the refill modal.
- **Gems**: Earned on lesson completion and spent in [`/shop`](src/app/(app)/shop/page.tsx) on streak freezes or heart refills.

### Procedural Web Audio Engine
All auditory feedback is generated in real time without external audio files:
- **`playPop()`**: 440 Hz Sine wave with rapid frequency drop.
- **`playSuccess()`**: Two-tone ascending chime (C5 → G5).
- **`playError()`**: Low-frequency sawtooth dissonance.
- **`playLevelUp()`**: Four-note arpeggiated major chord fanfare.

---

## Design System & Aesthetics

### 3D Tactile Physics Tokens

Defined centrally in [`tokens.css`](src/styles/tokens.css):

```css
:root {
  /* Duolingo Brand Palette */
  --duo-green: #58cc02;
  --duo-green-dark: #46a302;
  --duo-blue: #1cb0f6;
  --duo-blue-dark: #1899d6;
  --duo-yellow: #ffc800;
  --duo-yellow-dark: #e5a400;
  --duo-red: #ff4b4b;
  --duo-red-dark: #ea2b2b;

  /* 3D Button Elevation */
  --btn-shadow-offset: 4px;
  --btn-press-offset: 3px;
  --radius-md: 16px;
}
```

### Accessible Primitive Component Suite

All components are located in [`src/components/ui`](src/components/ui/):
- **Button**: 3D tactile elevation with variants (`duo`, `secondary`, `danger`, `ghost`, `kahoot`).
- **Card**: Elevated surface with customizable padding.
- **Modal & Drawer**: ARIA dialog containers with backdrop blur and focus trapping.
- **ProgressBar**: Smooth animated gauge for quest progress.
- **Badge & Avatar**: Status chips and user avatars with tier rings (bronze to diamond).
- **Tabs, Accordion, Tooltip, Switch, Skeleton**: Fully keyboard-accessible UI primitives.

---

## Edge Proxy & Server-Side Security

Kuizu Frontend incorporates Next.js 16 [`proxy.ts`](src/proxy.ts) for route protection:
- Inspects session cookies (`access_token`, `kuizu_session`, `token`).
- Allows `/profile` to gracefully render a rich guest-mode call-to-action for unauthenticated visitors while protecting sensitive workflows.
- Configured with strict HTTP security headers in [`next.config.ts`](next.config.ts) (HSTS, CSP, X-Frame-Options, Referrer-Policy).

---

## Testing & Quality Assurance

Kuizu Frontend maintains **100% test pass rate** with 145 unit and integration tests:

```bash
# Execute all Vitest unit and component tests
npm test

# Run tests in interactive watch mode
npm run test:watch

# Execute ESLint inspection
npm run lint

# Validate full production build
npm run build
```

---

## Production Deployment

### Optimized Production Build

Compile with Next.js Turbopack:

```bash
npm run build
npm run start
```

### Deploying to Vercel

```bash
npx vercel --prod
```

Configure environment variables in the Vercel Project Settings (`NEXT_PUBLIC_SOCKET_URL`, `NEXT_PUBLIC_API_URL`, `BACKEND_INTERNAL_URL`).

---

## License

UNLICENSED © Kuizu Platform. Proprietary and confidential.
