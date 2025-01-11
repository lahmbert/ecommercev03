// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and public API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
