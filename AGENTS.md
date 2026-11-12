# Architecture rules

- Handle the admin hostname root redirect in request middleware using the browser-safe admin-domain helper; keep existing administration paths untouched so blog and leads requests do not loop or change hosts.
- Sitemap blog reads use the publishable server client and existing published-post access policy, paginate all results, and surface failures rather than return partial XML so discovery never relies on privileged access.
