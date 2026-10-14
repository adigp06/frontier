# PROJECT: FRONTIER

## Product Vision
Imagine Bloomberg Terminal meets an explorable 3D map of the startup ecosystem. Companies are spatially clustered in 3D according to their domain taxonomy, technology stack, and market focus. Users can navigate clusters, perform targeted searches, view detailed company cards, and trigger AI-assisted extraction for newly discovered startups with verifiable source citations.

## Target User
- Venture Capital & Angel Investors researching Indian deeptech startups.
- Enterprise Innovation Teams scouting industrial automation, robotics, and aerospace solutions.
- Deeptech Founders analyzing competitor density and tech overlap.

## Core Use Cases
1. **Visual Discovery:** Orbit and pan through a 3D starfield of Indian deeptech companies grouped by sector.
2. **Filtering & Search:** Instant real-time search by company name, technology, or category.
3. **Company Deep Dive:** Click any node to view a slide-over drawer containing verified metadata, tags, and clickable citations.
4. **AI Sourcing:** Ingest a URL and automatically extract structured company attributes using AI, linking claims to ground-truth web sources.

## MVP Scope
- 30 to 50 curated Indian deeptech & industrial AI startups pre-populated in Supabase.
- Interactive React Three Fiber (R3F) node layout with camera auto-focus on node click.
- Floating HUD (Search, Category Filters, Detail Drawer).
- Supabase backend storing structured company metadata and source citations.
- Google GenAI SDK integration for structured URL extraction.
- Deployed on Vercel with a public GitHub repository.

## Explicitly Deferred Features
- Real-time dynamic 3D embedding generation on client load (positions are pre-calculated).
- User authentication, bookmarks, and custom user-submitted company lists.
- Financial data feeds or dynamic live stock tickers.
- Multi-agent swarm search workflows.

## Assumptions & Risks
- **Assumption:** Pre-calculated 3D coordinates provide a predictable, smooth 60fps UX without needing expensive client-side graph physics.
- **Risk:** R3F rendering performance degradation on lower-end hardware without instanced mesh rendering.
- **Mitigation:** Use InstancedMesh or simple low-poly geometries for startup nodes.
