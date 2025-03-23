
import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase URL and anon key
const supabaseUrl = 'https://tivdhpesicdfeyhtuwhu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpdmRocGVzaWNkZmV5aHR1d2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2OTc3ODIsImV4cCI6MjA1ODI3Mzc4Mn0.PUeASIcVVVdOZV439LiKrL52ZUb0h_xs3bSMmMsUjBY';

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
