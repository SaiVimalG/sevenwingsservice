ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS listed boolean NOT NULL DEFAULT true;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS content_html text;
ALTER TABLE public.blog_posts ALTER COLUMN intro DROP NOT NULL;
ALTER TABLE public.blog_posts ALTER COLUMN intro SET DEFAULT '';

DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;
CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);