"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import QuizHeader from "@/components/quiz/QuizHeader";

export default function NamePage() {
  const [name, setName] = useState("");
  const canContinue = name.trim().length > 1;
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

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
          padding: "32px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "24px",
          }}
        >
          What is your name?
        </h1>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "420px",
            height: "52px",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            padding: "0 18px",
            fontSize: "16px",
            color: "#111827",
            background: "#fff",
            marginBottom: "22px",
          }}
        />

        <button
          disabled={!canContinue}
          onClick={() => {
            if (!canContinue) return;
            router.push(`/${locale}/result-offer`);
          }}
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "14px 18px",
            borderRadius: "18px",
            border: "none",
            background: canContinue ? "#7C3AED" : "#E9D5FF",
            color: canContinue ? "#fff" : "#A855F7",
            fontWeight: 600,
            fontSize: "16px",
            boxShadow: "0 10px 20px rgba(124, 58, 237, 0.18)",
            cursor: canContinue ? "pointer" : "not-allowed",
          }}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
