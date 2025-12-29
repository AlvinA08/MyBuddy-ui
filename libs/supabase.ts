import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project credentials
const SUPABASE_URL = 'https://zpjqinxmsxpbmxctkbjv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwanFpbnhtc3hwYm14Y3RrYmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTYzOTMsImV4cCI6MjA3OTkzMjM5M30.ojYZGjs0fHzCYTU3Vd3nigokxb5gUPzDvIz6aWVE2s8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// import { createClient } from '@supabase/supabase-js';

// // Replace with your Supabase credentials
// const SUPABASE_URL = 'https://zpjqinxmsxpbmxctkbjv.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwanFpbnhtc3hwYm14Y3RrYmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTYzOTMsImV4cCI6MjA3OTkzMjM5M30.ojYZGjs0fHzCYTU3Vd3nigokxb5gUPzDvIz6aWVE2s8';

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
