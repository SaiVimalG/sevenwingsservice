
DROP POLICY "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Anyone can submit valid contact"
  ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 5 AND 200 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(phone) BETWEEN 6 AND 30
    AND char_length(message) BETWEEN 1 AND 2000
    AND (country_interest IS NULL OR char_length(country_interest) <= 80)
  );

DROP POLICY "Anyone can request consultation" ON public.consultation_requests;
CREATE POLICY "Anyone can submit valid consultation"
  ON public.consultation_requests FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 5 AND 200 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(phone) BETWEEN 6 AND 30
    AND char_length(preferred_country) BETWEEN 2 AND 80
    AND (notes IS NULL OR char_length(notes) <= 2000)
    AND (current_status IS NULL OR char_length(current_status) <= 200)
    AND (preferred_time IS NULL OR char_length(preferred_time) <= 40)
    AND status = 'pending'
  );
