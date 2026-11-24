# DNS records to carry from Blacknight to Cloudflare (captured 2026-11-24)

Email must keep working, so every record below must exist in Cloudflare before the nameservers change.

| Name | Type | Value | Proxy |
|---|---|---|---|
| @ | MX 10 | mx.zoho.eu | DNS only |
| @ | MX 20 | mx2.zoho.eu | DNS only |
| @ | MX 50 | mx3.zoho.eu | DNS only |
| @ | TXT | zoho-verification=zb70153468.zmverify.zoho.eu | – |
| @ | TXT | v=spf1 include:zohomail.eu ~all | – |
| zmail._domainkey | TXT | Zoho DKIM (v=DKIM1; k=rsa; p=MIGfMA0…) | – |
| resend._domainkey | TXT | Resend DKIM (p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDL9S7…) | – |
| send | MX 10 | feedback-smtp.eu-west-1.amazonses.com | DNS only |
| send | TXT | v=spf1 include:amazonses.com ~all | – |
| _dmarc | TXT | v=DMARC1; p=none; | – |

Website records (old, Vercel): `@ A 216.198.79.1` and `www CNAME 960d637fbb98b441.vercel-dns-017.com`.
These are replaced by Worker custom domains after the zone is active.
