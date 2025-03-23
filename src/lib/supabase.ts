
import { createClient } from '@supabase/supabase-js';

// Use a valid Supabase URL and anon key
const supabaseUrl = 'https://uirsdgcijkgzkqnbxfxl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnNkZ2NpamtnemtxbmJ4ZnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNjQwMzEsImV4cCI6MjAxNjk0MDAzMX0.TOQDsgF2tn7FU_IrZaPJPKIqiEBXPKT406AYKSQM3j0';

// Create Supabase client with additional options for better reliability
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: fetch,
    headers: {
      'X-Client-Info': 'supabase-js-web/2.0.0'
    }
  }
});
