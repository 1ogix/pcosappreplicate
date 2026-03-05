"use client";

import Image from "next/image";

export default function QuizHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Image
          src="/images/Logo/Logo-PCOS-icon.png"
          alt="PCOS Reset Method"
          width={32}
          height={32}
          style={{ borderRadius: "8px" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#374151", fontFamily: "var(--font-dm-sans), 'DM Sans', ui-sans-serif, system-ui, sans-serif" }}>
          PCOS Reset Method
        </span>
      </div>
    </div>
  );
}
