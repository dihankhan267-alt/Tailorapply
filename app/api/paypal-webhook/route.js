// app/api/paypal-webhook/route.js
// Point your PayPal webhook at https://yourdomain.com/api/paypal-webhook
// Listens for subscription activation/cancellation and updates Supabase — fully automated billing.

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// PayPal requires an OAuth token for server-to-server calls (like verifying a webhook is real)
async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req) {
  const body = await req.json();
  const headers = Object.fromEntries(req.headers);

  // 1. Verify this request actually came from PayPal, not someone spoofing it
  const accessToken = await getAccessToken();
  const verifyRes = await fetch(
    "https://api-m.paypal.com/v1/notifications/verify-webhook-signature",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_algo: headers["paypal-auth-algo"],
        cert_url: headers["paypal-cert-url"],
        transmission_id: headers["paypal-transmission-id"],
        transmission_sig: headers["paypal-transmission-sig"],
        transmission_time: headers["paypal-transmission-time"],
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: body,
      }),
    }
  );
  const verifyData = await verifyRes.json();
  if (verifyData.verification_status !== "SUCCESS") {
    return Response.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  // 2. Act on the event
  const eventType = body.event_type;
  const resource = body.resource;

  if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
    // custom_id was set when the subscription was created on the frontend —
    // it carries the Supabase user id through to here
    const userId = resource.custom_id;
    await supabase
      .from("profiles")
      .update({ plan: "pro", paypal_subscription_id: resource.id })
      .eq("id", userId);
  }

  if (eventType === "BILLING.SUBSCRIPTION.CANCELLED" || eventType === "BILLING.SUBSCRIPTION.EXPIRED") {
    await supabase
      .from("profiles")
      .update({ plan: "free" })
      .eq("paypal_subscription_id", resource.id);
  }

  return Response.json({ received: true });
}
