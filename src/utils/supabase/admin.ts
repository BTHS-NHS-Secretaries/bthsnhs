import { createClient } from '@supabase/supabase-js';

// Server-only client authenticated with the service role key — this
// bypasses Row Level Security, so it must only ever be imported from
// server code (API routes, server components), never shipped to the client.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
