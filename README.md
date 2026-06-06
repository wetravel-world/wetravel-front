# wetravel-front

Vue 3 frontend for [WeTravel](https://we-travel.world) — a safety & welcome guide for Black travelers and mixed-race couples.

## Tech stack

| Tool | Version |
|------|---------|
| Vue 3 (Composition API) | ^3.4 |
| Vite | ^5.3 |
| TypeScript | ~5.4 |
| Vue Router 4 | ^4.3 |
| Pinia | ^2.1 |
| Tailwind CSS | ^3.4 |
| Axios | ^1.7 |
| vue-i18n | ^9.13 |

## Project structure

```
src/
├── pages/
│   ├── index.vue              # Homepage with city search
│   ├── search.vue             # Search results
│   ├── city/[slug].vue        # City detail (score, places, comments, booking)
│   ├── profile.vue            # User profile
│   ├── settings.vue           # Account settings
│   ├── rgpd.vue               # Privacy policy
│   └── auth/
│       ├── login.vue
│       ├── register.vue
│       └── google-callback.vue
├── components/
│   ├── SearchBar.vue          # Autocomplete city search
│   ├── CityCard.vue           # Card used in search results
│   ├── WelcomeScore.vue       # Color-coded score badge
│   ├── ScoreChip.vue          # Compact score chip
│   ├── CommentList.vue
│   ├── CommentForm.vue        # Auth-gated review form
│   ├── PlaceCard.vue          # Place to visit with image
│   ├── BookingWidget.vue      # Hotel CTA with Booking.com affiliate link
│   └── layout/
│       ├── AppHeader.vue
│       └── AppFooter.vue
├── stores/
│   ├── auth.ts
│   ├── cities.ts
│   └── comments.ts
└── composables/
    ├── useApi.ts              # Axios wrapper with JWT refresh interceptor
    ├── useSeo.ts              # useHead() wrapper for city meta tags
    ├── useScore.ts            # Score color/label helpers
    └── useMatomo.ts           # Analytics event tracking
```

## Getting started

### Prerequisites

- Node.js 20+
- A running instance of `wetravel-back` (or use the hosted API)

### Local development

```bash
cd wetravel-front
npm install
cp .env.example .env   # fill in the vars below
npm run dev            # starts at http://localhost:3000
```

### Environment variables

```env
VITE_API_BASE_URL=http://localhost:8000        # backend base URL
VITE_GOOGLE_CLIENT_ID=                         # for Google OAuth button
VITE_BOOKING_AFFILIATE_ID=                     # Booking.com affiliate ID
VITE_MATOMO_URL=https://yoursite.matomo.cloud  # analytics (optional)
VITE_MATOMO_SITE_ID=1
```

The dev server proxies `/api/*` to `VITE_API_BASE_URL`, so CORS is not an issue locally.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 with hot-reload |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve the production build locally |

## Docker

```bash
# Build and run the production image
docker build -t wetravel-front .
docker run -p 3000:3000 wetravel-front
```

The image uses a two-stage build (Node 20 builder → `serve` static server).

## Auth

- JWT stored in `httpOnly` cookies — never `localStorage`
- Axios interceptor in `useApi.ts` transparently refreshes expired access tokens
- Google OAuth2 callback lands on `/auth/google-callback`

## SEO

Each city page calls `useSeo()` to set:
- `<title>` — `Is {City} welcoming for Black travelers? — WeTravel`
- `<meta name="description">` from `City.meta_description`
- Open Graph tags (`og:title`, `og:image`, `og:description`)
- `<link rel="canonical">`

> Note: The app currently uses client-side rendering. For full SEO, migrate to Nuxt 3 (see CLAUDE.md).

## Design system

HTML mockups and design tokens live in `design/reference/` at the repo root:

- `wt-kit.jsx` — color, spacing, and typography tokens
- `shared.jsx` — header, footer, and button components
- `Home.html`, `City.html`, `Search.html`, `Login.html`, `Register.html` — visual truth

Tailwind config mirrors the tokens from `wt-kit.jsx`.
