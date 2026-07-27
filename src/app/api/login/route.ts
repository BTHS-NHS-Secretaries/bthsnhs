import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/admin';
import { TABLES, normalizeForLookup } from '@/utils/supabase/schema';

const attempts = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const record = attempts.get(ip) || { count: 0, lastAttempt: now };

    // Reset counter after 1 minute
    if (now - record.lastAttempt > 60000) {
      record.count = 0;
    }

    record.count += 1;
    record.lastAttempt = now;
    attempts.set(ip, record);

    if (record.count > 10) {
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        { status: 429 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 400 }
      );
    }

    // Case-insensitive, trimmed match — see normalizeForLookup for why an
    // exact `.eq()` match is too fragile against sheet-imported data.
    const { data: user, error } = await supabaseAdmin
      .from(TABLES.USERS)
      .select('*')
      .ilike('username', normalizeForLookup(username))
      .single();

    if (error || !user) {
      console.error('Login query error:', error);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // KNOWN ISSUE: passwords are stored and compared as plain text. Anyone
    // with database access can read every member's password directly.
    // Fixing this requires hashing (e.g. bcrypt) plus a one-time migration
    // to re-hash existing rows in the `users` table — flagged, not yet done.
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        id: user.id,
        email: user.username, // Email is same as username in users table
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
