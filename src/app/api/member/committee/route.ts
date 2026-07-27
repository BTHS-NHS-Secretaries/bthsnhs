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

    // Query the Committee table by Email (case-insensitive, trimmed — see
    // normalizeForLookup for why an exact `.eq()` match is too fragile here)
    const { data: committeeData, error: committeeError } = await supabaseAdmin
      .from(TABLES.COMMITTEE)
      .select('*')
      .ilike('Email', normalizeForLookup(email))
      .single();

    if (committeeError) {
      console.error('Committee data query error:', committeeError);
      const message =
        committeeError.code === 'PGRST116'
          ? 'No member record found for this email in the Committee sheet. Ask an officer to confirm your email is listed there.'
          : 'User data not found';
      return NextResponse.json({ error: message }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: committeeData,
    });
  } catch (err) {
    console.error('Error fetching committee data:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
