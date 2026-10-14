# ROADMAP

## Milestone 1: Project Foundation & Environment Setup
- **Goal:** Initialize Next.js repository, configure TypeScript, Tailwind CSS, Supabase setup, and project structure.
- **Acceptance Criteria:** `npm run dev` serves clean landing page; environment validation works; zero build/lint errors.
- **Commit Message:** `feat(setup): initialize next.js app router, project structure, and dependencies`

## Milestone 2: Supabase Migration & Seed Dataset
- **Goal:** Apply database schema and insert seed JSON of 30 Indian deeptech companies with 3D coordinates.
- **Acceptance Criteria:** Supabase client successfully fetches company list from database.
- **Commit Message:** `feat(database): add companies migration schema and deeptech seed script`

## Milestone 3: React Three Fiber 3D Node Field
- **Goal:** Render 3D spatial field of startup nodes with raycasting click events and smooth camera transitions.
- **Acceptance Criteria:** 3D nodes render in space; clicking a node selects it and animates camera focus.
- **Commit Message:** `feat(3d): implement R3F node field canvas and camera controls`

## Milestone 4: Bloomberg Terminal HUD & Search
- **Goal:** Build floating UI overlays (Search bar, category filters, slide-over company detail drawer).
- **Acceptance Criteria:** User can filter startups in real time and view full profiles with citation links.
- **Commit Message:** `feat(ui): add bloomberg HUD search filters and detail drawer`

## Milestone 5: AI URL Extraction & Deployment
- **Goal:** Build `/api/extract` route with Gemini structured outputs and deploy to Vercel.
- **Acceptance Criteria:** Live deployment on Vercel connected to GitHub with working AI extraction pipeline.
- **Commit Message:** `feat(ai): integrate gemini extraction pipeline and vercel deployment`
