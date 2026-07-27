import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/admin';
import { TABLES, normalizeForLookup } from '@/utils/supabase/schema';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Query the General table by Email (case-insensitive, trimmed — see
    // normalizeForLookup for why an exact `.eq()` match is too fragile here)
    const { data: generalData, error: generalError } = await supabaseAdmin
      .from(TABLES.GENERAL)
      .select('*')
      .ilike('Email', normalizeForLookup(email))
      .single();

    if (generalError) {
      console.error('General data query error:', generalError);
      const message =
        generalError.code === 'PGRST116'
          ? 'No member record found for this email in the General sheet. Ask an officer to confirm your email is listed there.'
          : 'User data not found';
      return NextResponse.json({ error: message }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: generalData,
    });
  } catch (err) {
    console.error('Error fetching general data:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
