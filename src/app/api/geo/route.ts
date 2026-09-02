import { NextResponse } from 'next/server';

/**
 * IP-based geolocation. Resolves the visitor's city/state/region from their
 * IP address using the free ipapi.co service. Falls back gracefully when
 * geolocation is unavailable (e.g. in a sandbox/localhost).
 */
export async function GET(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? '';

  // In local dev / sandbox, there's no real public IP — return a default
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('10.') || ip.startsWith('172.')) {
    return NextResponse.json({
      city: 'Chicago',
      state: 'Illinois',
      region: 'Midwest',
      country: 'US',
      source: 'fallback',
    });
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error(`Geo service returned ${response.status}`);
    const data = await response.json();

    if (!data || data.error || !data.city) {
      return NextResponse.json({
        city: 'Chicago',
        state: 'Illinois',
        region: 'Midwest',
        country: 'US',
        source: 'fallback',
      });
    }

    return NextResponse.json({
      city: data.city,
      state: data.region,
      region: data.region,
      country: data.country_name ?? 'US',
      source: 'ip',
    });
  } catch {
    return NextResponse.json({
      city: 'Chicago',
      state: 'Illinois',
      region: 'Midwest',
      country: 'US',
      source: 'fallback',
    });
  }
}
