"use client";
// app/components/PayPalButton.js
// Renders PayPal's real subscribe button. Loads PayPal's SDK script on the client only.
//
// NOTE: userId below is a placeholder. Once you wire up Supabase Auth (sign-up/login),
// pass the real logged-in user's id here so the webhook can tie the subscription back
// to the right account. Until then, subscriptions won't auto-upgrade anyone.

import { useEffect, useRef } from "react";

export default function PayPalButton({ userId = "anonymous" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    function renderButton() {
      if (!containerRef.current || !window.paypal) return;
      containerRef.current.innerHTML = "";
      window.paypal
        .Buttons({
          style: { shape: "pill", color: "gold", layout: "horizontal", label: "subscribe" },
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID,
              custom_id: userId,
            });
          },
          onApprove: function () {
            alert("Subscribed! Your Pro access activates within a few seconds.");
          },
        })
        .render(containerRef.current);
    }

    if (window.paypal) {
      renderButton();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.onload = renderButton;
    document.body.appendChild(script);
  }, [userId]);

  return <div ref={containerRef} />;
}
