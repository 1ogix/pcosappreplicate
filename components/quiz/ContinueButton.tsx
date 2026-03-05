"use client";

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export default function ContinueButton({
  onClick,
  disabled = false,
  label = "Continue",
}: ContinueButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "16px 24px",
        borderRadius: "50px",
        border: "none",
        fontSize: "16px",
        fontWeight: 700,
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "opacity 0.2s, transform 0.1s",
        backgroundColor: disabled ? "#C4B5FD" : "#7B2FFF",
        boxShadow: disabled ? "none" : "0 4px 20px rgba(123, 47, 255, 0.35)",
        opacity: disabled ? 0.6 : 1,
        letterSpacing: "0.01em",
      }}
      onMouseDown={(e) => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
    >
      {label}
    </button>
  );
}
