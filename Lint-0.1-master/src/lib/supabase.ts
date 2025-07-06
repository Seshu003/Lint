import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  github_username?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  project_name: string;
  analysis_status: 'pending' | 'analyzing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_path: string;
  file_url?: string;
  file_size: number;
  uploaded_at: string;
}

export interface AnalysisReport {
  id: string;
  project_id: string;
  debt_score: number;
  summary?: string;
  recommendations: any[];
  file_analysis: Record<string, any>;
  generated_pdf_url?: string;
  created_at: string;
}