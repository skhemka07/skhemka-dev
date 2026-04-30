# Cloudflare DNS records for skhemka.dev

Open Cloudflare in one browser tab. Add each record exactly as shown.

**Path in Cloudflare:** dash.cloudflare.com → click `skhemka.dev` → DNS → Records → "Add record"

---

## Record 1 (of 5)
| Field | Value |
|-------|-------|
| Type | `A` |
| Name | `@` |
| IPv4 address | `185.199.108.153` |
| Proxy status | **DNS only** (grey cloud) ⚠️ |
| TTL | Auto |

Click **Save**.

---

## Record 2 (of 5)
| Field | Value |
|-------|-------|
| Type | `A` |
| Name | `@` |
| IPv4 address | `185.199.109.153` |
| Proxy status | **DNS only** (grey cloud) ⚠️ |
| TTL | Auto |

Click **Save**.

---

## Record 3 (of 5)
| Field | Value |
|-------|-------|
| Type | `A` |
| Name | `@` |
| IPv4 address | `185.199.110.153` |
| Proxy status | **DNS only** (grey cloud) ⚠️ |
| TTL | Auto |

Click **Save**.

---

## Record 4 (of 5)
| Field | Value |
|-------|-------|
| Type | `A` |
| Name | `@` |
| IPv4 address | `185.199.111.153` |
| Proxy status | **DNS only** (grey cloud) ⚠️ |
| TTL | Auto |

Click **Save**.

---

## Record 5 (of 5)
| Field | Value |
|-------|-------|
| Type | `CNAME` |
| Name | `www` |
| Target | `skhemka07.github.io` |
| Proxy status | **DNS only** (grey cloud) ⚠️ |
| TTL | Auto |

Click **Save**.

---

## ⚠️ The proxy status thing

Cloudflare will default to **Proxied** (orange cloud icon). For GitHub Pages
to issue an SSL certificate the first time, you must set this to **DNS only**
(grey cloud icon). After your site is live and HTTPS works, you can flip
the records back to Proxied to get Cloudflare's free CDN — but not yet.

## What you should see when done

DNS Records list should show 5 entries:

```
A     @      185.199.108.153    DNS only
A     @      185.199.109.153    DNS only
A     @      185.199.110.153    DNS only
A     @      185.199.111.153    DNS only
CNAME www    skhemka07.github.io DNS only
```

Cloudflare may also have added some default records (like email-related
TXT records) — leave those alone, they don't conflict with anything.
