CREATE TABLE public.recruiter_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.recruiter_questions TO service_role;

ALTER TABLE public.recruiter_questions ENABLE ROW LEVEL SECURITY;
-- No client policies: the log is written and read only by the site's server code.