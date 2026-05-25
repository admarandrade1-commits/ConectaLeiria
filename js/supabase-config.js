const SUPABASE_URL = 'https://xnmmpjxpausizguspamz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Gtqx608nigitqngG9lsttw_phshTPed';
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);
window.db = db;
console.log('✅ Supabase conectado!');
