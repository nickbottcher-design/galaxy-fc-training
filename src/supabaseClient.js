import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kozgbsriumnywbrqfizx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EljXieP222dRoaiIuxD9oQ_0cT3d_0D";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
