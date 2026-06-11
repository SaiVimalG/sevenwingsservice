
-- Explicitly deny read/update/delete to anon and authenticated on PII tables.
-- service_role bypasses RLS so backend/admin access still works.

CREATE POLICY "Deny select to public" ON public.consultation_requests
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Deny update to public" ON public.consultation_requests
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny delete to public" ON public.consultation_requests
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE POLICY "Deny select to public" ON public.contact_submissions
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Deny update to public" ON public.contact_submissions
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny delete to public" ON public.contact_submissions
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);
