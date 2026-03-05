"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProgressBarProps {
  current: number;
  total: number;
  locale?: string;
  gender?: string;
}

export default function ProgressBar({ current, total, locale = "en", gender = "female" }: ProgressBarProps) {
  const router = useRouter();
  const percentage = Math.min((current / total) * 100, 100);

  function handleBack() {
    if (current > 0) {
      router.push(`/${locale}/quiz/${gender}/${current - 1}`);
    }
  }

  return (
    <div style={{
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
      background: "#fff",
    }}>
      {/* Row 1: Progress bar — thin purple bar at the very top */}
      <div style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#E5E7EB",
      }}>
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: "#7B2FFF",
            borderRadius: "0 100px 100px 0",
            transition: "width 0.4s ease-out",
          }}
        />
      </div>

      {/* Row 2: Back button | PCOS Reset Method (centered) | Step counter */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid #F3F4F6",
        position: "relative",
      }}>
        {/* Back button — left */}
        <button
          onClick={handleBack}
          style={{
            background: "none",
            border: "none",
            cursor: current > 0 ? "pointer" : "default",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: current > 0 ? 1 : 0.3,
            flexShrink: 0,
            width: "36px",
          }}
          disabled={current <= 0}
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Center — Logo + Title */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          <Image
            src="/images/Logo/Logo-PCOS-icon.png"
            alt="PCOS Reset Method"
            width={28}
            height={28}
            style={{ borderRadius: "6px" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151",
            fontFamily: "var(--font-dm-sans), 'DM Sans', ui-sans-serif, system-ui, sans-serif",
            whiteSpace: "nowrap",
          }}>
            PCOS Reset Method
          </span>
        </div>

        {/* Step counter — right */}
        <span style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#9CA3AF",
          flexShrink: 0,
          minWidth: "36px",
          textAlign: "right",
        }}>
          {current}/{total}
        </span>
      </div>
    </div>
  );
}
