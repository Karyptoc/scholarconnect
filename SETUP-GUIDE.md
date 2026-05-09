# ScholarConnect – Complete Supabase Setup Guide

## Overview
This guide walks you through migrating ScholarConnect from a localStorage demo
to a fully live platform powered by Supabase (PostgreSQL + Auth + Storage + Realtime).

---

## STEP 1 – Create Your Supabase Project

1. Go to **https://supabase.com** and sign in (free account is fine to start)
2. Click **"New Project"**
3. Choose a name: `scholarconnect`
4. Choose a region close to your users (e.g. **Africa – Cape Town** for Kenya)
5. Set a strong database password and save it somewhere safe
6. Click **Create new project** — wait ~2 minutes for it to provision

---

## STEP 2 – Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase-schema.sql` from this project
4. **Copy the entire contents** and paste into the SQL Editor
5. Click **"Run"** (Ctrl+Enter)
6. You should see: `Schema created successfully!`

> This creates all 14 tables, Row Level Security policies, triggers, and seeds
> the English test questions, essay prompts, and platform settings.

---

## STEP 3 – Configure Your API Keys

1. In Supabase, go to **Project Settings → API**
2. Copy your **Project URL** (looks like `https://abcdefgh.supabase.co`)
3. Copy your **anon/public key** (the long `eyJ...` string)
4. Open the file `supabase-client.js` in this project
5. Replace the placeholder values at the top:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';  // ← paste here
const SUPABASE_KEY = 'YOUR_ANON_KEY';                      // ← paste here
```

Save the file. That's all — the entire app reads from these two values.

---

## STEP 4 – Create the Admin Account

The admin email is permanently fixed to: **solutionscenter29@gmail.com**

### Method A – Invite via Dashboard (Recommended)
1. Go to **Authentication → Users** in Supabase
2. Click **"Invite user"**
3. Enter: `solutionscenter29@gmail.com`
4. Click **Send invitation**
5. Check that email and click the link to set a password

### Method B – Sign up directly
1. Go to your deployed site's `auth.html`
2. The admin email is blocked from public registration, so use Method A

### After the account exists, set the admin role:
Go back to **SQL Editor** and run:
```sql
UPDATE public.profiles
SET user_type = 'admin', is_active = TRUE
WHERE email = 'solutionscenter29@gmail.com';
```

### First Login Setup:
When you visit `admin.html` for the first time, if the admin profile
doesn't have a password set yet, you'll see the **Setup Screen** where you
enter and confirm a new strong password.

---

## STEP 5 – Create Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. Click **"New bucket"** and create these 4 buckets:

| Bucket Name      | Public? | Purpose                          |
|------------------|---------|----------------------------------|
| `order-briefs`   | No      | Client uploaded assignment files |
| `deliverables`   | No      | Writer submitted work            |
| `essay-uploads`  | No      | Writer essay PDF submissions     |
| `writer-samples` | No      | Writer portfolio samples         |

3. For each bucket, set these **Storage Policies**:
   - Authenticated users can upload to their own folder
   - Users can only read files they are party to

Basic policy for `order-briefs` (run in SQL Editor):
```sql
CREATE POLICY "Clients upload own briefs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'order-briefs'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Parties can read briefs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'order-briefs'
  AND auth.role() = 'authenticated'
);
```
Repeat for `deliverables`, `essay-uploads`, and `writer-samples`.

---

## STEP 6 – Enable Realtime (for live chat)

1. Go to **Database → Replication** in Supabase dashboard
2. Under **"supabase_realtime" publication**, click **"Tables"**
3. Enable realtime for:
   - `messages`
   - `orders`
4. Click **Save**

This enables the live chat to update instantly without page refresh.

---

## STEP 7 – Configure Email Auth (for 2FA OTPs)

The platform sends OTP codes by email. To enable this:

### Option A – Use Supabase's built-in email (development/testing)
- Works out of the box, but limited to 4 emails/hour on free tier
- Good for testing

### Option B – Configure Resend (Recommended for production)
1. Create a free account at **https://resend.com**
2. Get your API key
3. In Supabase → **Authentication → Email Templates**
4. Go to **Settings → SMTP**
5. Configure:
   - Host: `smtp.resend.com`
   - Port: `465`
   - User: `resend`
   - Password: `your-resend-api-key`
   - Sender email: `noreply@yourdomain.com`

### Customize the 2FA email template:
In Supabase → **Authentication → Email Templates → Confirm signup**:
```html
<h2>ScholarConnect – Verify Your Email</h2>
<p>Click the link below to verify your email address:</p>
<p><a href="{{ .ConfirmationURL }}">Verify Email</a></p>
<p>This link expires in 24 hours.</p>
<hr>
<p>Support: writerhub97@gmail.com | WhatsApp: +254 716 603 371</p>
```

---

## STEP 8 – Configure Stripe Payments (Optional for live payments)

1. Create a Stripe account at **https://stripe.com**
2. Get your **Publishable Key** (`pk_live_...` or `pk_test_...`)
3. In `client-dashboard.html`, add the Stripe.js integration:

```html
<script src="https://js.stripe.com/v3/"></script>
```

4. In `supabase-client.js`, replace the `processPayment` simulation with:

```javascript
// Create a Checkout Session via your Supabase Edge Function
const response = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ orderId, amount: depositAmount * 100, currency: 'usd' })
});
const { url } = await response.json();
window.location.href = url; // Redirect to Stripe Checkout
```

5. Create a Supabase Edge Function `create-checkout-session`:
```typescript
import Stripe from 'stripe';
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

Deno.serve(async (req) => {
  const { orderId, amount } = await req.json();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'usd', product_data: { name: `Order ${orderId} Deposit` }, unit_amount: amount }, quantity: 1 }],
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/client-dashboard.html?paid=${orderId}`,
    cancel_url: `${req.headers.get('origin')}/client-dashboard.html`,
  });
  return new Response(JSON.stringify({ url: session.url }), { headers: { 'Content-Type': 'application/json' } });
});
```

---

## STEP 9 – Deploy Your Site

### Option A – Netlify (Easiest, Free)
1. Go to **https://app.netlify.com/drop**
2. Drag your entire project folder onto the page
3. Get a live URL like `https://amazing-name.netlify.app`
4. To use a custom domain: Site Settings → Domain Management → Add custom domain

### Option B – Vercel (Also free)
1. Install Vercel CLI: `npm i -g vercel`
2. In your project folder: `vercel --prod`
3. Follow prompts — your site is live in seconds

### Option C – GitHub Pages
1. Push your files to a GitHub repository
2. Settings → Pages → Source: main branch, root folder
3. Live at `https://yourusername.github.io/scholarconnect`

---

## STEP 10 – Auto-Approval Cron Job

Orders auto-approve 72h after delivery. Set up a cron job to run the check:

### Option A – Supabase Edge Function + pg_cron
```sql
-- Install pg_cron extension (Supabase Pro plan)
SELECT cron.schedule(
  'auto-approve-orders',
  '0 * * * *',  -- every hour
  $$ SELECT auto_approve_orders(); $$
);
```

### Option B – External cron (free)
1. Go to **https://cron-job.org** (free)
2. Create a new cron job
3. URL: `https://YOUR_PROJECT.supabase.co/functions/v1/auto-approve`
4. Schedule: Every hour

Create the Edge Function:
```typescript
Deno.serve(async () => {
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SERVICE_ROLE_KEY')!);
  await supabase.rpc('auto_approve_orders');
  return new Response('OK');
});
```

---

## STEP 11 – Test Your Live Platform

Use this checklist to verify everything works:

### Authentication
- [ ] Register as a new client with a valid email
- [ ] Receive verification email and click the link
- [ ] Log in — receive 2FA code email
- [ ] Enter 2FA code — lands on client dashboard
- [ ] Register as a writer — verify email, log in

### Writer Flow
- [ ] Writer sees English test (25 questions, 10-minute timer)
- [ ] After passing: submit a subject essay
- [ ] Log in to admin panel and approve the essay
- [ ] Writer can now see and request available orders

### Client Flow
- [ ] Create a new order (all fields required)
- [ ] Price auto-calculates based on pages and deadline
- [ ] Pay deposit via Stripe test card `4242 4242 4242 4242`
- [ ] Order appears in "My Orders" with status "Finding Writer"

### Admin Flow
- [ ] Go to `admin.html` — enter password (not email shown)
- [ ] Assign writer to an order
- [ ] View client email/IP (visible only in admin panel)
- [ ] Approve/reject essay submissions
- [ ] View blocked contact attempts in Security tab
- [ ] Export revenue CSV

### Chat
- [ ] Client sends a message — writer sees it in real-time (no refresh needed)
- [ ] Try sending an email address — should be blocked with warning
- [ ] Try sending a phone number — should be blocked

---

## File Structure (Final)

```
scholarconnect/
├── index.html               ← Landing page
├── auth.html                ← Login / Register / 2FA / Email verify
├── client-dashboard.html    ← Client: orders, payments, chat
├── freelancer-dashboard.html← Writer: test, essays, orders, earnings
├── admin.html               ← Admin: full management panel
├── supabase-client.js       ← Central Supabase API layer ← EDIT KEYS HERE
├── supabase-schema.sql      ← Run this in Supabase SQL Editor
├── style.css                ← Design system
├── terms.html               ← Terms of Service
├── privacy.html             ← Privacy Policy
└── SETUP-GUIDE.md           ← This file
```

---

## Support

- **Email:** writerhub97@gmail.com
- **WhatsApp:** +254 716 603 371
- **Admin Login:** admin.html (email never displayed, password only)
- **Admin Email (internal):** solutionscenter29@gmail.com

---

## Quick Reference – Demo Credentials

| Role    | Email                    | Password      | 2FA   |
|---------|--------------------------|---------------|-------|
| Client  | client@example.com       | Demo@1234!    | 123456|
| Writer  | writer@example.com       | Demo@1234!    | 123456|
| Admin   | *(not shown in UI)*      | Admin@SC2025! | N/A   |

> In production, all demo accounts should be deleted and replaced with real registrations.
