# Clay News

A professional MERN news reader with a public headline feed, protected article reading, JWT authentication, MongoDB users, and persistent light/dark claymorphism themes.

## Setup

1. Install Node.js 18+ and MongoDB.
2. Copy `server/.env.example` to `server/.env` and fill in the values. Put the supplied Currents API key in `NEWS_API_KEY`; do not put it in the frontend.
3. Copy `client/.env.example` to `client/.env` if the backend is not running on port 5000.
4. Run `npm install`, `npm run install:all`, then `npm run dev`.
5. Open `http://localhost:5173`.

The backend proxies news requests at `/api/news`, keeping the provider key private. Because no provider sample response was supplied, the normalizer accepts the Currents response shape (`news`, `title`, `description`, `image`, `published`, `author`, `url`, `id`) and common alternatives defensively.

## Environment

See [server/.env.example](server/.env.example) and [client/.env.example](client/.env.example). Never commit real secrets.
