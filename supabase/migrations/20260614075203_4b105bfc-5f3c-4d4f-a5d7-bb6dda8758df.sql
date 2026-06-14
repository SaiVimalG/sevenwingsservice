CREATE SCHEMA IF NOT EXISTS extensions;
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION pg_net WITH SCHEMA extensions;

-- Reschedule the GSC sitemap submission cron with the new schema-qualified call
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname='gsc-resubmit-sitemap-daily') THEN
    PERFORM cron.unschedule('gsc-resubmit-sitemap-daily');
  END IF;
END $$;

SELECT cron.schedule(
  'gsc-resubmit-sitemap-daily',
  '0 3 * * *',
  $cron$
  SELECT extensions.http_post(
    url := 'https://project--194042d7-d400-4563-a5dc-ee36f53cbdd1.lovable.app/api/public/gsc/submit-sitemap',
    headers := '{"Content-Type":"application/json","apikey":"sb_publishable_YMukuQRwp5H7U_Nnns_Zvg_tszzG7_o"}'::jsonb,
    body := '{}'::jsonb
  );
  $cron$
);