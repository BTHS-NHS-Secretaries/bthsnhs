// Table names as they exist in Supabase today — these mirror the original
// spreadsheet tab names.
export const TABLES = {
  USERS: 'users',
  GENERAL: 'General',
  COMMITTEE: 'Committee',
} as const;

// `username` doubles as the member's email — there is no separate email column.
export interface UserRow {
  id: string;
  username: string;
  // Stored and compared as plain text today — known issue, not yet fixed.
  password: string;
}

// `General` and `Committee` are wide/spreadsheet-shaped: every event gets its
// own column holding a member's points for it, rather than an events+points
// join table. Event columns vary over time and are read dynamically in
// member-points/page.tsx.
export interface MemberPointsRow {
  'Full Name': string;
  'First Name': string;
  'Last Name': string;
  Committee: string;
  Email: string;
  'Graduating Class': string;
  Prefect: string;
  [eventColumn: string]: string | number;
}

// `.eq()` is exact and case-sensitive, which breaks against sheet-imported
// data with inconsistent casing/whitespace. Use with `.ilike()` instead —
// this trims input and escapes `%`/`_` (ILIKE wildcards, and `_` can
// legitimately appear in an email address).
export function normalizeForLookup(value: string): string {
  return value.trim().replace(/[%_]/g, (match) => `\\${match}`);
}
