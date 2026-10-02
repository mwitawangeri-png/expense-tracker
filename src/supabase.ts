import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aHFuZ3J6Zmh1YXd5eW5ramZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4ODU4MzksImV4cCI6MjEwNjQ2MTgzOX0.-JdpsOQ3faY1ghfGA7toln8MuiXzlZDEyfhOt31qziY';

export const supabase = createClient(supabaseUrl, supabaseKey);