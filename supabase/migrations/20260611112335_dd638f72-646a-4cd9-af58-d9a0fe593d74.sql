
-- Restrict all client access to the private blog-images bucket.
-- Only service_role (server-side admin code) can read/write.

CREATE POLICY "blog_images_deny_anon_authenticated_select"
ON storage.objects AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (bucket_id <> 'blog-images');

CREATE POLICY "blog_images_deny_anon_authenticated_insert"
ON storage.objects AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'blog-images');

CREATE POLICY "blog_images_deny_anon_authenticated_update"
ON storage.objects AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'blog-images')
WITH CHECK (bucket_id <> 'blog-images');

CREATE POLICY "blog_images_deny_anon_authenticated_delete"
ON storage.objects AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'blog-images');
