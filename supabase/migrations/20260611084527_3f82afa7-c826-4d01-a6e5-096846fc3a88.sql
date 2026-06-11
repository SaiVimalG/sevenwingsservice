CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL,
  author text NOT NULL DEFAULT '7 Wings Editorial',
  image_url text NOT NULL,
  read_time text NOT NULL DEFAULT '5 min read',
  intro text NOT NULL,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  why_7wings jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_label text,
  cta_slug text,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_updated_at();

CREATE INDEX blog_posts_published_at_idx ON public.blog_posts (published_at DESC) WHERE published = true;