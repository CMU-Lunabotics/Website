# Deployment Guide: Connecting cmu-moon-miners.com

This guide will help you connect your Next.js website to your GoDaddy domain `cmu-moon-miners.com`.

## Option 1: Deploy to Vercel (Recommended) 🌟

Vercel is the easiest and most optimized platform for Next.js apps. It offers:
- Automatic HTTPS
- Global CDN
- Zero-config deployment
- Free SSL certificates
- Automatic deployments from GitHub

### Step 1: Deploy to Vercel

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

3. **Import your project**:
   - Click "New Project"
   - Select your GitHub repository (`CMU-Lunabotics/Website`)
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

4. **Wait for deployment**:
   - Your site will be live at something like `your-project.vercel.app`
   - This takes 1-2 minutes

### Step 2: Connect Your GoDaddy Domain

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add your domain: `cmu-moon-miners.com`
   - Also add `www.cmu-moon-miners.com` (optional but recommended)

2. **In GoDaddy**:
   - Log into your GoDaddy account
   - Go to "My Products" → "DNS" (or "Domain Management")
   - Find `cmu-moon-miners.com` and click "Manage DNS"
   
3. **Update DNS Records**:
   Vercel will show you what DNS records to add. Typically:
   
   **Option A: Using A Records** (Simple)
   - Add an A Record:
     - Type: `A`
     - Name: `@` (or leave blank for root domain)
     - Value: Vercel's IP (Vercel will show you the exact IP, usually `76.76.21.21`)
     - TTL: `600` (10 minutes)
   
   - Add another A Record for www (if you added www subdomain):
     - Type: `A`
     - Name: `www`
     - Value: Same Vercel IP
     - TTL: `600`
   
   **Option B: Using CNAME** (Recommended - easier to manage)
   - Add a CNAME Record:
     - Type: `CNAME`
     - Name: `@` (or root)
     - Value: `cname.vercel-dns.com`
     - TTL: `600`
   
   - For www subdomain:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
     - TTL: `600`

4. **Wait for DNS Propagation**:
   - DNS changes can take anywhere from a few minutes to 48 hours
   - Usually takes 15-30 minutes
   - You can check DNS propagation at [dnschecker.org](https://dnschecker.org)

5. **Verify in Vercel**:
   - Once DNS propagates, Vercel will automatically issue an SSL certificate
   - Your site will be live at `https://cmu-moon-miners.com` ✨

---

## Option 2: Deploy to Other Platforms

### Netlify

1. Deploy to Netlify: [netlify.com](https://netlify.com)
2. Add custom domain
3. Update GoDaddy DNS to point to Netlify's nameservers or use their provided DNS records

### AWS Amplify / Cloudflare Pages / Railway

Similar process:
1. Deploy your Next.js app to the platform
2. Add your custom domain in the platform's dashboard
3. Update DNS records in GoDaddy to point to the platform

---

## Option 3: Self-Hosted (Advanced)

If you want to self-host:

1. **Build your Next.js app**:
   ```bash
   npm run build
   ```

2. **Run the production server**:
   ```bash
   npm start
   ```

3. **Set up a reverse proxy** (nginx/Apache) on your server
4. **Point GoDaddy DNS** to your server's IP address
5. **Set up SSL** with Let's Encrypt (Certbot)

---

## Pre-deployment Checklist

Before connecting your domain:

- [ ] Your site builds successfully (`npm run build`)
- [ ] All images are optimized and working
- [ ] All links are correct
- [ ] SEO metadata is set up correctly
- [ ] Social media preview images work

---

## Updating Metadata for Your Domain

Once deployed, you should update the metadata in your Next.js app to reflect your domain. The following files might need updates:

- `src/app/layout.tsx` - Open Graph metadata
- `content/site.json` - Any URLs that reference the site

---

## Troubleshooting

### DNS Not Propagating
- Wait up to 48 hours for DNS changes
- Clear your DNS cache: `sudo dscacheutil -flushcache` (macOS) or `ipconfig /flushdns` (Windows)
- Try accessing the site from a different network/device

### SSL Certificate Issues
- Vercel automatically provisions SSL certificates
- If it fails, wait a few hours and try again
- Check that your DNS records are correct

### Site Not Loading
- Check that your site works on the Vercel URL first
- Verify DNS records are correct in GoDaddy
- Check Vercel deployment logs for errors

### Caching Issues
- Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+F5)
- Clear browser cache
- Check if CDN caching is the issue

---

## Next Steps After Deployment

1. **Set up analytics** (Google Analytics, Vercel Analytics, etc.)
2. **Set up monitoring** (Vercel provides basic monitoring)
3. **Test on multiple devices** and browsers
4. **Set up automatic deployments** (already done if using Vercel + GitHub)

---

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [GoDaddy DNS Help](https://www.godaddy.com/help)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

**Most Common Setup**: Vercel + GoDaddy DNS = Easy and Free ✨

