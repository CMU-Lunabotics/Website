# Quick Deploy: cmu-moon-miners.com 🚀

## The Fastest Way (5 Steps)

### 1. Push to GitHub ✅
```bash
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project" → Select your GitHub repo
3. Click "Deploy" (takes ~2 minutes)

### 3. Add Your Domain in Vercel
- Project → Settings → Domains
- Add: `cmu-moon-miners.com`
- Add: `www.cmu-moon-miners.com`

### 4. Update GoDaddy DNS
Go to GoDaddy → DNS Management for `cmu-moon-miners.com`

**Add these records:**

**For root domain:**
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com`
- TTL: `600`

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `600`

> **Note:** If GoDaddy doesn't allow CNAME on root (`@`), use:
> - Type: `A`
> - Name: `@`
> - Value: `76.76.21.21`

### 5. Wait & Verify
- Wait 15-30 minutes for DNS to propagate
- Vercel will automatically add SSL
- Visit `https://cmu-moon-miners.com` 🎉

---

## That's It!

Your site will automatically deploy whenever you push to GitHub.

**Need more details?** See [DEPLOYMENT.md](./DEPLOYMENT.md)

