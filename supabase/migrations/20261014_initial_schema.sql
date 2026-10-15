-- Create companies table with spatial coordinates (x, y, z)
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    website_url TEXT NOT NULL,
    founded_year INT NOT NULL,
    funding_stage TEXT NOT NULL,
    x FLOAT NOT NULL DEFAULT 0.0,
    y FLOAT NOT NULL DEFAULT 0.0,
    z FLOAT NOT NULL DEFAULT 0.0,
    sources JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on category and funding stage for fast filtering
CREATE INDEX IF NOT EXISTS idx_companies_category ON companies(category);
CREATE INDEX IF NOT EXISTS idx_companies_funding ON companies(funding_stage);
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to companies
CREATE POLICY "Allow public read access on companies"
    ON companies FOR SELECT
    USING (true);

-- Allow authenticated or service role write access if needed (or keep open for demo seeding)
CREATE POLICY "Allow service role write access on companies"
    ON companies FOR ALL
    USING (true)
    WITH CHECK (true);
