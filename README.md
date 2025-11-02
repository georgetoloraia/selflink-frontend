# SelfLink Frontend

Serene React SPA implementing the SelfLink sanctuary experience described in `selflink-frontend-blueprint.txt`.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an `.env` file (optional) with the API base URL expected by the backend:
   ```bash
   echo "VITE_API_BASE_URL=https://api.selflink.com" > .env
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Key Features

- Aurora-inspired design system with breathing mode and time-of-day themes.
- React Router page structure: Home, Register, SoulMatch, Mentor, Growth Path, Courses.
- Matrix background canvas animation with reduced-motion support.
- Zustand + React Query for lightweight state and API management (JWT + refresh cycle).
- Mentor chat interface with optimistic user messaging and graceful fallbacks.

Refer to the blueprint for the broader product vision and future expansion ideas.
