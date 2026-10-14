# ARCHITECTURE

## Technology Stack
- **Framework:** Next.js (App Router, TypeScript, Tailwind CSS)
- **3D Graphics:** React Three Fiber (`@react-three/fiber`), `@react-three/drei`, Three.js
- **Database & RLS:** Supabase (PostgreSQL)
- **AI Extraction:** Google GenAI SDK (`@google/genai`) using Gemini with structured JSON output schemas
- **Environment Validation:** `@t3-oss/env-nextjs` and `zod`

## System Architecture & Data Flow
1. **Client Loading:** App queries `companies` table via Supabase client on initial load.
2. **3D Canvas:** `NodeField` maps pre-computed `(x, y, z)` coordinates into interactive 3D mesh points inside a Canvas viewport.
3. **HUD State:** Clicked node updates a global/local React state (`selectedCompany`), triggering camera movement and opening the HUD Drawer.
4. **AI Pipeline:** `/api/extract` route receives target URL -> calls Gemini with structured response schema -> parses and verifies citations -> writes candidate company row into Supabase.

## Database Design (`companies` Table)
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  website_url TEXT NOT NULL,
  founded_year INT,
  funding_stage TEXT,
  x FLOAT NOT NULL DEFAULT 0.0,
  y FLOAT NOT NULL DEFAULT 0.0,
  z FLOAT NOT NULL DEFAULT 0.0,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON companies FOR SELECT USING (true);

