"use client";

import { useState } from "react";
import QuizHeader from "@/components/quiz/QuizHeader";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const isValid = email.trim().length > 3 && email.includes("@") && agreed;

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#FDFBFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <QuizHeader />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "28px 20px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.4,
            marginBottom: "22px",
          }}
        >
          Enter your email to unlock your
          <br />
          personalized PCOS metabolism
          <br />
          breakdown and projected progress
          <br />
          plan.
        </h1>

        <div style={{ width: "100%", textAlign: "left" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "8px",
            }}
          >
            Your email address
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                padding: "0 48px 0 16px",
                fontSize: "14px",
                outline: "none",
                background: "#fff",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                background: "#D1D5DB",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontSize: "14px",
              }}
            >
              ✉
            </div>
          </div>
        </div>

        <label
          style={{
            marginTop: "18px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            textAlign: "left",
            fontSize: "13px",
            color: "#374151",
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ marginTop: "3px" }}
          />
          <span>
            I agree to the <span style={{ textDecoration: "underline" }}>Privacy Policy</span>{" "}
            and <span style={{ textDecoration: "underline" }}>Terms of Service</span> and consent
            to receive important updates related to the PCOS Reset Method
          </span>
        </label>

        <button
          disabled={!isValid}
          onClick={() => {
            if (!isValid) return;
            window.location.href = `/${location.pathname.split("/")[1]}/name`;
          }}
          style={{
            width: "100%",
            marginTop: "18px",
            padding: "12px 16px",
            borderRadius: "14px",
            border: "none",
            background: isValid ? "#7C3AED" : "#E9D5FF",
            color: isValid ? "#fff" : "#A855F7",
            fontWeight: 600,
            fontSize: "15px",
            boxShadow: "0 10px 20px rgba(124, 58, 237, 0.18)",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          Continue
        </button>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            fontSize: "12px",
            color: "#6B7280",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: "16px" }}>🔒</span>
          We respect your privacy. Your email will only be used to deliver your
          personalized program details and essential updates. No spam, ever.
        </div>
      </div>
    </main>
  );
}
