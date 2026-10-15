export interface CompanySource {
  title: string;
  url: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  website_url: string;
  founded_year: number;
  funding_stage: 'Seed' | 'Series A' | 'Series B' | 'Series C+' | 'Public' | 'Bootstrapped' | 'Acquired';
  x: number;
  y: number;
  z: number;
  sources: CompanySource[];
  created_at?: string;
  updated_at?: string;
}

export type CategoryFilter = 'All' | string;
export type FundingFilter = 'All' | string;
