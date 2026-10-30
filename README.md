# Briefly News

A professional MERN news reader with a public headline feed, protected article reading, JWT authentication, MongoDB users, and persistent light/dark claymorphism themes.

## Setup

1. Install Node.js 18+ and MongoDB (or a MongoDB Atlas cluster).
2. Copy `server/.env.example` to `server/.env` and fill in the values. Put the news provider key in `NEWS_API_KEY`; it never goes in the frontend.
3. Copy `client/.env.example` to `client/.env` only if your backend is not running on `http://localhost:5000`.
4. Run `npm install`, `npm run install:all`, then `npm run dev`.
5. Open `http://localhost:5173`.

Without `client/.env` the dev server talks to `http://localhost:5000/api`, and production builds fall back to the deployed API (`VITE_API_BASE_URL` overrides both).

## Environment

See [server/.env.example](server/.env.example) and [client/.env.example](client/.env.example). Never commit real secrets — `.env` files are gitignored.

## Endpoints

- `GET /api/news?page=1` — paginated headlines (public).
- `GET /api/news/:id` — a single article (requires session cookie).
- `POST /api/auth/signup` / `signin` / `logout`, `GET /api/auth/me` — session auth.

Because no provider sample response was supplied, the normalizer accepts the Currents response shape (`news`, `title`, `description`, `image`, `published`, `author`, `url`, `id`) and common alternatives defensively.
