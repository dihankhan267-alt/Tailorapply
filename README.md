# TailorApply — Starter Package

Everything needed to launch the MVP described in the business plan. This is not a full scaffolded
Next.js app (that needs `create-next-app` run locally, where you have internet access) — it's the
three pieces that actually contain the business logic, ready to drop into a fresh Next.js project.

## What's in here
- `app/api/tailor/route.js` — the core AI generation endpoint (Claude API call + credit metering)
- `app/api/stripe-webhook/route.js` — fully automated billing (upgrade/downgrade with zero manual steps)
- `supabase/schema.sql` — the entire database: users, credits, RLS, monthly credit reset via pg_cron
- `docs/seo-content-calendar.md` — 6-week content plan for the acquisition strategy
- `index.html` (in the parent folder) — the landing page / demo UI, open directly in a browser

## Exact setup steps (in order)

1. **Scaffold the app** (on your own machine, needs internet):
   ```
   npx create-next-app@latest tailorapply --app --js --tailwind
   ```
   Copy the `app/api/` folder from this package into the new project, overwriting nothing else.

2. **Create accounts** (all free to start): Vercel, Supabase, Stripe, Anthropic Console, Resend.

3. **Supabase**: new project → SQL editor → paste and run `supabase/schema.sql` → copy your
   Project URL and `service_role` key into environment variables.

4. **Stripe**: create one Product ("TailorApply Pro", $9/mo recurring). Create a webhook endpoint
   pointing at `/api/stripe-webhook` listening for `checkout.session.completed`,
   `customer.subscription.deleted`, `invoice.payment_failed`. Copy the signing secret.

5. **Anthropic**: create an API key in the Console. Add billing (pay-as-you-go — a few cents per
   generation, so budget ~$0.05/user/month at light usage).

6. **Environment variables** (Vercel → Project Settings → Environment Variables):
   ```
   SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=
   ANTHROPIC_API_KEY=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   ```

7. **Deploy**: `vercel --prod` (or connect the GitHub repo in the Vercel dashboard for auto-deploy
   on every push — this is what makes updates hands-off going forward).

8. **Test the full loop end-to-end** before announcing anywhere: sign up → use 2 free credits →
   get blocked on the 3rd → pay via Stripe test mode → confirm `plan` flips to `pro` in Supabase →
   confirm unlimited generations work.

9. **Launch checklist**: Termly ToS/Privacy pages linked in footer → Crisp chat widget installed →
   Resend welcome email connected to the Supabase `on_auth_user_created` trigger (via a Supabase
   Edge Function or a simple webhook) → submit to Product Hunt → post first 3 SEO articles →
   post one genuinely helpful (non-spammy) comment in a relevant subreddit thread.

## Ongoing human time (post-launch)
- 2×/week: check Crisp inbox for anything the bot couldn't answer.
- 1×/week: skim 5–10 recent `generations` rows for quality drift, adjust the system prompt if needed.
- 2–3×/week: publish or queue one SEO post from the content calendar.

Everything else — signups, billing, generation, credit resets — runs without you.
