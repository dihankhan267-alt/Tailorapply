// app/api/stripe-webhook/route.js
// Point your Stripe webhook (checkout.session.completed, customer.subscription.deleted)
// at https://yourdomain.com/api/stripe-webhook
// This is the piece that makes billing fully hands-off.

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return Response.json({ error: `Webhook signature verification failed` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.client_reference_id; // pass this when creating the Checkout session
      await supabase
        .from("profiles")
        .update({ plan: "pro", stripe_customer_id: session.customer })
        .eq("id", userId);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await supabase
        .from("profiles")
        .update({ plan: "free" })
        .eq("stripe_customer_id", sub.customer);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      // Optional: flag account, Stripe's own dunning emails handle retries automatically
      await supabase
        .from("profiles")
        .update({ payment_issue: true })
        .eq("stripe_customer_id", invoice.customer);
      break;
    }
  }

  return Response.json({ received: true });
}
