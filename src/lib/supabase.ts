import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uevzvhhgsahxylzkmklh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVldnp2aGhnc2FoeHlsemtta2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjEyMTQsImV4cCI6MjA2Mjc5NzIxNH0.YHRcCjURnP1u1xJ3jVbESUKeDXmJSn3ZzoiYAFBs7ak';

export const supabase = createClient(supabaseUrl, supabaseKey); 