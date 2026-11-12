# Architecture rules

- Handle the admin hostname root redirect in request middleware using the browser-safe admin-domain helper; keep existing administration paths untouched so blog and leads requests do not loop or change hosts.
- Sitemap blog reads use the publishable server client and existing published-post access policy, paginate all results, and surface failures rather than return partial XML so discovery never relies on privileged access.
- Keep email queue RPC execution limited to service_role (revoke PUBLIC, anon and authenticated); queued message contents and mutations belong only to trusted email processing.
- Never log unsubscribe tokens or database error details from token updates; diagnostics must not expose reusable email-preference credentials.
