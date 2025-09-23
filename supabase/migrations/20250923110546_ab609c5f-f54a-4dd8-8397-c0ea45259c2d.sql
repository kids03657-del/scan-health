-- Create table for storing analyzed food logs
CREATE TABLE IF NOT EXISTS public.food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  image_url TEXT,
  food_name TEXT NOT NULL,
  calories NUMERIC,
  protein NUMERIC,
  carbs NUMERIC,
  fats NUMERIC,
  fiber NUMERIC,
  serving_size TEXT,
  confidence INTEGER,
  breakdown JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;

-- Policies for user-owned data
DROP POLICY IF EXISTS "Users can view their own food logs" ON public.food_logs;
CREATE POLICY "Users can view their own food logs"
ON public.food_logs FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own food logs" ON public.food_logs;
CREATE POLICY "Users can insert their own food logs"
ON public.food_logs FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own food logs" ON public.food_logs;
CREATE POLICY "Users can update their own food logs"
ON public.food_logs FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own food logs" ON public.food_logs;
CREATE POLICY "Users can delete their own food logs"
ON public.food_logs FOR DELETE
USING (auth.uid() = user_id);

-- Helpful index
CREATE INDEX IF NOT EXISTS idx_food_logs_user_id_created_at ON public.food_logs (user_id, created_at DESC);
