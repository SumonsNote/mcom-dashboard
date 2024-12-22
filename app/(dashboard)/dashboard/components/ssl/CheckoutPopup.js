"use client";
import React, { useEffect } from "react";

const CheckoutPopup = () => {
  useEffect(() => {
    // Dynamically load the SSLCommerz script
    const loader = () => {
      const script = document.createElement("script");
      const randomQuery = Math.random().toString(36).substring(7);
      script.src = `https://sandbox.sslcommerz.com/embed.min.js?${randomQuery}`;
      script.async = true;
      document.body.appendChild(script);
    };

    // Attach loader to window's load event
    if (window.addEventListener) {
      window.addEventListener("load", loader);
    } else if (window.attachEvent) {
      window.attachEvent("onload", loader);
    }

    // Cleanup script when component unmounts
    return () => {
      const existingScript = document.querySelector(
        'script[src^="https://sandbox.sslcommerz.com/embed.min.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return <div>Checkout popup script is now active.</div>;
};

export default CheckoutPopup;
