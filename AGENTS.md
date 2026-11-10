# Architecture rules

- Handle the admin hostname root redirect in request middleware using the browser-safe admin-domain helper; keep existing administration paths untouched so blog and leads requests do not loop or change hosts.
- Blog covers are generated client-side from Pollinations.ai image URLs (no key, CORS-enabled) and then branded on canvas; article generation stays independent so manual blog editing is unchanged.
- Persist the replaceable cover logo at a fixed key in the existing private image bucket; composite its actual bytes in the browser before preview and upload so AI never redraws the brand.