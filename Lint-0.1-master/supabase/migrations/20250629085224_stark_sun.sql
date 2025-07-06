/*
  # Tech Debt Analyzer Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) 
      - `email` (text, unique)
      - `github_username` (text, nullable)
      - `created_at` (timestamp)
    - `projects` 
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `project_name` (text)
      - `analysis_status` (text: pending, analyzing, completed, failed)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `project_files`
      - `id` (uuid, primary key) 
      - `project_id` (uuid, foreign key)
      - `file_path` (text)
      - `file_url` (text)
      - `file_size` (integer)
      - `uploaded_at` (timestamp)
    - `analysis_reports`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key) 
      - `debt_score` (integer)
      - `summary` (text)
      - `recommendations` (jsonb)
      - `file_analysis` (jsonb)
      - `generated_pdf_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  github_username text,
  created_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  project_name text NOT NULL,
  analysis_status text DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'analyzing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project files table
CREATE TABLE IF NOT EXISTS public.project_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  file_path text NOT NULL,
  file_url text,
  file_size integer DEFAULT 0,
  uploaded_at timestamptz DEFAULT now()
);

-- Analysis reports table
CREATE TABLE IF NOT EXISTS public.analysis_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  debt_score integer DEFAULT 0 CHECK (debt_score >= 0 AND debt_score <= 100),
  summary text,
  recommendations jsonb DEFAULT '[]'::jsonb,
  file_analysis jsonb DEFAULT '{}'::jsonb,
  generated_pdf_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read own project files"
  ON public.project_files
  FOR SELECT
  TO authenticated
  USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can create own project files"
  ON public.project_files
  FOR INSERT
  TO authenticated
  WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete own project files"
  ON public.project_files
  FOR DELETE
  TO authenticated
  USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can read own analysis reports"
  ON public.analysis_reports
  FOR SELECT
  TO authenticated
  USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can create own analysis reports"
  ON public.analysis_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own analysis reports"
  ON public.analysis_reports
  FOR UPDATE
  TO authenticated
  USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, github_username)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'name')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('project-uploads', 'project-uploads', false),
  ('analysis-reports', 'analysis-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Authenticated users can upload project files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-uploads');

CREATE POLICY "Users can read own project files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'project-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own project files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can upload reports"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'analysis-reports');

CREATE POLICY "Users can read own reports"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'analysis-reports' AND auth.uid()::text = (storage.foldername(name))[1]);