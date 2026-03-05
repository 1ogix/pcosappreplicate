"use client";

import Image from "next/image";

export default function CheckoutPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#F3F4F6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 16px 60px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <Image
          src="/images/Logo/Logo-PCOS-icon.png"
          alt="PCOS Reset Method"
          width={28}
          height={28}
          style={{ borderRadius: "6px" }}
        />
        <div style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
          PCOS
          <div style={{ fontSize: "11px", color: "#6B7280" }}>Reset Method</div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "860px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 520px) minmax(0, 300px)",
          gap: "32px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>
            Choose payment method
          </h1>
          <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "16px" }}>
            Apple or Android Pay will Display here when available.
          </p>
          <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "20px" }}>
            You will be charged only <strong>$15.19</strong> (1 month plan)
          </p>

          <div style={{ display: "grid", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600 }}>Card Number</label>
              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <input
                  placeholder="XXXX XXXX XXXX XXXX"
                  style={{
                    flex: 1,
                    height: "42px",
                    borderRadius: "10px",
                    border: "1px solid #D1D5DB",
                    padding: "0 14px",
                    background: "#fff",
                  }}
                />
                <button
                  style={{
                    height: "42px",
                    borderRadius: "10px",
                    border: "1px solid #0B8D6A",
                    background: "#0B8D6A",
                    color: "#fff",
                    padding: "0 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Autofill link
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600 }}>Expiration Date</label>
                <input
                  placeholder="MM/YY"
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                    border: "1px solid #D1D5DB",
                    padding: "0 14px",
                    marginTop: "6px",
                    background: "#fff",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600 }}>CVV/CVC</label>
                <input
                  placeholder="CVC"
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                    border: "1px solid #D1D5DB",
                    padding: "0 14px",
                    marginTop: "6px",
                    background: "#fff",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600 }}>Name on Card</label>
              <input
                placeholder="Full name as on card"
                style={{
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  padding: "0 14px",
                  marginTop: "6px",
                  background: "#fff",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600 }}>Email Address</label>
              <input
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  padding: "0 14px",
                  marginTop: "6px",
                  background: "#fff",
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: "18px", fontSize: "12px", color: "#6B7280" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
              <span>Product</span>
              <span>Price</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <span>PCOS Reset Method – 1-Month Plan</span>
              <span>$15.19</span>
            </div>
          </div>

          <button
            style={{
              marginTop: "18px",
              width: "100%",
              height: "48px",
              borderRadius: "999px",
              border: "none",
              background: "#1F4B55",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            🔒 Complete secure payment
          </button>

          <div style={{ marginTop: "10px", textAlign: "center", fontSize: "11px", color: "#6B7280" }}>
            ✅ Guaranteed secure payments
          </div>

          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
            <Image src="/images/results/visa.eac00510.svg" alt="Visa" width={40} height={16} />
            <Image src="/images/results/mastercard.11aa627c.svg" alt="Mastercard" width={28} height={16} />
            <Image src="/images/results/discoverClean.a7c78576.svg" alt="Discover" width={40} height={16} />
            <Image src="/images/results/stripe.svg" alt="Stripe" width={32} height={16} />
            <Image src="/images/results/secure-nocturnum.svg" alt="Secure" width={46} height={16} />
          </div>

          <div style={{ marginTop: "10px", textAlign: "center", fontSize: "11px", color: "#6B7280" }}>
            100% Secure Checkout. Your payment is protected and encrypted.
          </div>
        </div>

        <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.6 }}>
          <p style={{ marginBottom: "10px" }}>
            Follow the instructions on the screen to complete your purchase securely.
          </p>
          <p>
            * The price is valid for the first term of your subscription.
            Afterwards, your subscription will be automatically renewed for the
            initially ordered service period and you will be charged at the
            standard renewal price.
          </p>
        </div>
      </div>
    </main>
  );
}
