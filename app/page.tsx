import { Suspense } from 'react';
import { Scene } from '@/components/canvas/Scene';
import { supabase } from '@/lib/supabase/client';
import { INDIAN_DEEPTECH_STARTUPS } from '@/lib/supabase/seed-data';
import { Company } from '@/types/company';

async function getCompanies(): Promise<Company[]> {
  try {
    const { data, error } = await supabase.from('companies').select('*');
    if (!error && data && data.length > 0) {
      return data as Company[];
    }
  } catch {
    // fallback
  }
  return INDIAN_DEEPTECH_STARTUPS.map((c, index) => ({
    ...c,
    id: `seed-${index}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })) as Company[];
}

async function SceneContainer() {
  const companies = await getCompanies();
  return <Scene companies={companies} />;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-950">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center text-zinc-400 bg-zinc-950 font-sans">
            Loading Frontier 3D Ecosystem...
          </div>
        }
      >
        <SceneContainer />
      </Suspense>
    </main>
  );
}
