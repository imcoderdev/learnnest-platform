
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://studdybuddy-46da3.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dWRkeWJ1ZGR5LTQ2ZGEzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNjg4MjUsImV4cCI6MjAxMzg0NDgyNX0.JNZIgSSWf1HyibIUYdYuVj4xnMFLJsMEFSkxzIOZbvk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
