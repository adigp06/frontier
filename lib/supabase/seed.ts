import { createClient } from '@supabase/supabase-js';
import { INDIAN_DEEPTECH_STARTUPS } from './seed-data';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local if present
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and Supabase key (Service Role or Anon Key) must be set in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log(`Starting seed process for ${INDIAN_DEEPTECH_STARTUPS.length} companies into Supabase...`);

  for (const company of INDIAN_DEEPTECH_STARTUPS) {
    const { error } = await supabase
      .from('companies')
      .upsert(
        {
          name: company.name,
          slug: company.slug,
          tagline: company.tagline,
          description: company.description,
          category: company.category,
          website_url: company.website_url,
          founded_year: company.founded_year,
          funding_stage: company.funding_stage,
          x: company.x,
          y: company.y,
          z: company.z,
          sources: company.sources,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'slug' }
      );

    if (error) {
      console.error(`Failed to upsert company ${company.name}:`, error.message);
    } else {
      console.log(`Successfully seeded/updated: ${company.name} (${company.category})`);
    }
  }

  console.log('Seeding process completed!');
}

seedDatabase().catch((err) => {
  console.error('Unexpected error during seeding:', err);
  process.exit(1);
});
