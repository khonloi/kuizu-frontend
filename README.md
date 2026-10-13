# Kuizu Frontend (v2)

> The next-generation unified gamified learning platform uniting Duolingo-style self-paced mastery with Kahoot-style real-time multiplayer projector battles.

[![CI Status](https://img.shields.io/badge/CI-Passing-brightgreen)]()
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)]()
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)]()
[![Vitest](https://img.shields.io/badge/Vitest-100%25%20Passing-green?logo=vitest)]()
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-purple)]()

---

## ⚡ Core Architecture

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with Turbopack, React 19, and React Compiler.
* **Edge Proxy Route Guard**: Built using Next.js 16 `proxy.ts` convention for zero-flash server-side session protection.
* **State Management**:
  * **Reactive Client State**: [Zustand 5](https://github.com/pmndrs/zustand) for game PIN lobby, audio soundboard, and UI modals.
  * **Server Cache**: [@tanstack/react-query 5](https://tanstack.com/query) for courses, lessons, and leaderboard data with optimistic cache invalidation.
* **Real-time Engine**: [Socket.IO Client](https://socket.io) with automatic fallback to an offline demo simulator for standalone demos and presentations.
* **Sensory Feedback**:
  * **Procedural Web Audio API Synth**: [audio-engine.ts](src/lib/audio-engine.ts) creates dynamic audio oscillations (C5-G5 chords, clicks, fanfare) without heavy MP3 asset downloads.
  * **Canvas Confetti & Haptics**: Victory fireworks and tactile vibrations.
* **Design System**: Zero-runtime CSS Modules + [tokens.css](src/styles/tokens.css) with 20 accessible UI primitives.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `>= 20.18.0` (Node 22 recommended)
* **Package Manager**: `pnpm >= 9.0.0`

### 1. Clone & Install
```bash
cd kuizu-frontend
pnpm install
```

### 2. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env.local
```

Configurable variables:
```ini
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000  # Backend Socket.IO URL
NEXT_PUBLIC_API_URL=/api                      # API Base Path (proxied via Next.js)
BACKEND_INTERNAL_URL=http://localhost:4000   # Internal backend target for rewrites
NEXT_PUBLIC_APP_URL=http://localhost:3001     # Public canonical application URL
NEXT_PUBLIC_DEMO_MODE=false                   # Set 'true' for offline presentation mode
```

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🧪 Testing & Code Quality

| Script | Purpose |
| :--- | :--- |
| `pnpm test` | Run all 137 unit and component tests with Vitest |
| `pnpm lint` | Execute ESLint 9 flat config inspection |
| `pnpm build` | Compile and validate production build with Turbopack |

---

## 📂 Project Directory Structure

```text
src/
├── app/                  # Next.js 16 App Router pages & metadata
│   ├── (app)/            # Authenticated app layout with persistent Sidebar & StatsBar
│   ├── (auth)/           # Login & Registration authentication screens
│   ├── (learn)/          # Interactive quest runner (/lesson/[slug]/[id])
│   ├── arena/            # Multiplayer Kahoot arena (/host, /join, /play)
│   ├── manifest.ts       # PWA Web App Manifest
│   ├── robots.ts         # Search engine crawl directives
│   ├── sitemap.ts        # Dynamic XML sitemap generator
│   └── layout.tsx        # Root layout with Google Fonts & Open Graph metadata
├── components/
│   ├── layout/           # Sidebar, MobileNav dock, and StatsBar
│   └── ui/               # 20 standalone accessible primitives (Button, Modal, etc.)
├── features/             # Domain logic (Learn, Arena, Gamification, Auth)
├── hooks/                # Custom React & React Query hooks
├── lib/                  # Web Audio Engine, API transport, Confetti, and Sockets
├── mock/                 # Offline demo courses, quizzes, and local storage state
├── stores/               # Zustand global state slices
├── styles/               # CSS variables tokens & micro-animations
└── proxy.ts              # Next.js 16 Edge proxy route guarding
```

---

## 🛡️ Security & Accessibility Compliance

* **Enterprise Security Headers**: Configured in `next.config.ts` (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
* **WCAG 2.1 AA**:
  * Focus trapping within modal dialogs.
  * Visible keyboard focus rings (`:focus-visible`).
  * System reduced-motion preference support (`prefers-reduced-motion`).
  * ARIA live regions for lesson feedback drawers.
