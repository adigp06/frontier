import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

const extractionOutputSchema = z.object({
  name: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  category: z.string(),
  website_url: z.string(),
  founded_year: z.number(),
  funding_stage: z.enum(['Seed', 'Series A', 'Series B', 'Series C+', 'Public', 'Bootstrapped', 'Acquired']),
  sources: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    })
  ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Target company URL is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured on the server environment' },
        { status: 500 }
      );
    }

    // Attempt to fetch webpage content for enhanced grounding
    let pageText = '';
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const html = await res.text();
        pageText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').substring(0, 15000);
      }
    } catch {
      // Ignore network fetch errors and rely on Gemini model knowledge
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert deeptech startup analyst and data extractor for a Bloomberg Terminal-style Frontier 3D Ecosystem.
Analyze the target company URL: ${url}
${pageText ? `Extracted Webpage Text Snippet:\n${pageText}` : ''}

Extract accurate structured information about this company.
The category must be one of: "Space Tech", "Robotics & Drones", "Industrial AI", "Quantum Tech", "Semiconductors", "EV & Energy Tech".
The funding_stage must be one of: "Seed", "Series A", "Series B", "Series C+", "Public", "Bootstrapped", "Acquired".
Founded year must be a 4-digit number.
Provide verified source citations (title and URL) including the website URL itself and any credible news or profile sources.

Return ONLY valid JSON matching this structure:
{
  "name": "Company Name",
  "slug": "company-slug",
  "tagline": "Short one-line tagline",
  "description": "Comprehensive 2-3 sentence description",
  "category": "Space Tech",
  "website_url": "https://...",
  "founded_year": 2020,
  "funding_stage": "Series A",
  "sources": [
    { "title": "Official Website", "url": "https://..." }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('No response generated from Gemini');
    }

    let rawData;
    try {
      const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      rawData = JSON.parse(cleanJson);
    } catch (err) {
      throw new Error(`Failed to parse JSON response from Gemini: ${(err as Error).message}`);
    }

    const validatedData = extractionOutputSchema.parse(rawData);

    return NextResponse.json({ success: true, data: validatedData });
  } catch (error) {
    console.error('AI Extraction Error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to extract company data' },
      { status: 500 }
    );
  }
}
