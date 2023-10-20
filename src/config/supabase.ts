import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

dotenv.config();

export const supabase = createClient<Database>(process.env.PROJECT_URL, process.env.PROJECT_KEY); 