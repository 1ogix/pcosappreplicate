"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import quizConfig from "@/config/quizConfig.json";
import ProgressBar from "@/components/quiz/ProgressBar";
import ContinueButton from "@/components/quiz/ContinueButton";
import { saveQuizState, loadQuizState, QuizAnswers } from "@/lib/quizStore";

export default function QuizStepPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const gender = params.gender as string;
  const stepIndex = parseInt(params.step as string, 10);

  const step = quizConfig.steps[stepIndex];
  const [answers, setAnswers] = useState<QuizAnswers>(
    () => loadQuizState()?.answers ?? {},
  );
  const [selected, setSelected] = useState<string | string[]>(
    step?.type === "multi-select" || step?.type === "category-select" ? [] : "",
  );
  const [heightValue, setHeightValue] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightValue, setWeightValue] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [ageValue, setAgeValue] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

  if (!step) {
    router.push(`/${locale}/quiz/${gender}/offer`);
    return null;
  }

  const totalSteps = quizConfig.totalSteps;

  function navigateNext() {
    const nextStep = stepIndex + 1;
    saveQuizState(answers, nextStep);
    if (nextStep > totalSteps) {
      router.push(`/${locale}/quiz/${gender}/offer`);
    } else {
      router.push(`/${locale}/quiz/${gender}/${nextStep}`);
    }
  }

  function handleSingleSelect(value: string) {
    setSelected(value);
    const updatedAnswers = { ...answers };
    // map step to answer key
    const keyMap: Record<number, string> = {
      0: "ageGroup",
      2: "cycleRegularity",
      3: "stressLevel",
      4: "weightLossAttempt",
      5: "energyLevel",
      8: "bodyType",
      15: "activityType",
      16: "activityEnjoyment",
      17: "waterIntake",
    };
    const key = keyMap[stepIndex] || `step_${stepIndex}`;
    updatedAnswers[key] = value;
    setAnswers(updatedAnswers);

    // auto-advance after short delay
    if ((step as { autoAdvance?: boolean }).autoAdvance) {
      setTimeout(() => {
        saveQuizState(updatedAnswers, stepIndex + 1);
        const nextStep = stepIndex + 1;
        if (nextStep > totalSteps) {
          router.push(`/${locale}/quiz/${gender}/offer`);
        } else {
          router.push(`/${locale}/quiz/${gender}/${nextStep}`);
        }
      }, 300);
    }
  }

  function handleMultiSelect(value: string) {
    const arr = selected as string[];
    const newSelected = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    setSelected(newSelected);

    const updatedAnswers = { ...answers };
    const keyMap: Record<number, string> = {
      1: "symptoms",
      7: "goals",
      18: "habits",
      19: "focusAreas",
    };
    const key = keyMap[stepIndex] || `step_${stepIndex}`;
    updatedAnswers[key] = newSelected;
    setAnswers(updatedAnswers);
  }

  // ─── STEP 0: Age selection landing ────────────────────────────────────────
  if (step.type === "single-select" && stepIndex === 0) {
    const s0 = step as {
      question: string;
      subtitle?: string;
      cta?: string;
      trustSignal?: string;
      rating?: string;
      options: { emoji: string; label: string; value: string }[];
    };
    return (
      <>
        <style>{`
          .step0-headline {
            font-size: clamp(32px, 8vw, 48px);
            font-weight: 800;
            color: #111827;
            text-align: center;
            line-height: 1.15;
            margin-bottom: 16px;
            font-family: var(--font-dm-sans), "DM Sans", ui-sans-serif, system-ui, sans-serif;
          }
          .step0-subtitle {
            font-size: clamp(15px, 4vw, 18px);
            font-weight: 600;
            color: #7B2FFF;
            text-align: center;
            margin-bottom: 8px;
          }
          .step0-cta {
            font-size: clamp(13px, 3.5vw, 16px);
            color: #9CA3AF;
            text-align: center;
            margin-bottom: 32px;
            font-weight: 400;
          }
          .step0-age-label {
            font-size: clamp(17px, 4.5vw, 20px);
            font-weight: 700;
            color: #111827;
            text-align: center;
            margin-bottom: 16px;
          }
          .step0-option {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 18px;
            border-radius: 16px;
            border: 1.5px solid #E5E7EB;
            background: #fff;
            cursor: pointer;
            text-align: left;
            transition: border-color 0.15s, box-shadow 0.15s;
            box-shadow: 0 1px 4px rgba(0,0,0,0.06);
            width: 100%;
            font-family: inherit;
          }
          .step0-option:hover {
            border-color: #7B2FFF;
            box-shadow: 0 2px 12px rgba(123, 47, 255, 0.12);
          }
          .step0-option:active {
            transform: scale(0.98);
          }
        `}</style>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
          }}
        >
          {/* White top bar with trust signal */}
          <div
            style={{ width: "100%", background: "#fff", borderBottom: "none" }}
          >
            <div
              style={{
                maxWidth: "480px",
                margin: "0 auto",
                textAlign: "center",
                padding: "18px 20px 14px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  color: "#111827",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ fontSize: "20px" }}>💜</span> Trusted by 28,000+
                women
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  fontWeight: 500,
                  marginTop: "2px",
                }}
              >
                4.8{" "}
                <span style={{ color: "#F59E0B", fontSize: "15px" }}>★</span>{" "}
                average rating
              </div>
            </div>
          </div>

          {/* Lavender content area */}
          <div style={{ width: "100%", flex: 1, background: "#F4EFFF" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "480px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "0 20px",
                margin: "0 auto",
              }}
            >
              {/* Main content */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingBottom: "24px",
                  paddingTop: "32px",
                }}
              >
                {/* Headline — 48px, Fraunces display font */}
                <h1 className="step0-headline">{s0.question}</h1>

                {/* Subtitle — 18px */}
                <p className="step0-subtitle">{s0.subtitle}</p>

                {/* CTA — 16px */}
                <p className="step0-cta">{s0.cta}</p>

                {/* "What is your age?" — 20px */}
                <p className="step0-age-label">What is your age?</p>

                {/* Age options — vertical list */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {s0.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSingleSelect(opt.value)}
                      className="step0-option"
                    >
                      {/* Emoji circle */}
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          backgroundColor: "#F4EFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          flexShrink: 0,
                        }}
                      >
                        {opt.emoji}
                      </div>
                      {/* Label */}
                      <span
                        style={{
                          flex: 1,
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        {opt.label}
                      </span>
                      {/* Arrow */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        style={{ flexShrink: 0 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <footer
                style={{
                  paddingBottom: "24px",
                  paddingTop: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "16px",
                    fontSize: "11px",
                    color: "#9CA3AF",
                  }}
                >
                  <a
                    href="#"
                    style={{ color: "#9CA3AF", textDecoration: "none" }}
                  >
                    Cookie Policy
                  </a>
                  <a
                    href="#"
                    style={{ color: "#9CA3AF", textDecoration: "none" }}
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    style={{ color: "#9CA3AF", textDecoration: "none" }}
                  >
                    Terms of Service
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </>
    );
  }

  // ─── INTERSTITIAL SCREENS ─────────────────────────────────────────────────
  if (
    step.type === "interstitial" ||
    step.type === "interstitial-personalized"
  ) {
    const s = step as {
      title?: string;
      titleTemplate?: string;
      body?: string;
      bodyTemplate?: string;
      bullets?: string[];
      footer?: string;
      image?: string;
      buttonText?: string;
      showProgress?: boolean;
    };

    const title = s.title || s.titleTemplate || "";
    let body = s.body || s.bodyTemplate || "";
    if (s.bodyTemplate) {
      body = body
        .replace("{age}", String(answers.age || "your age"))
        .replace(
          "{goalWeight}",
          String(answers.desiredWeight?.value || "your goal"),
        );
    }

    if (stepIndex === 14) {
      const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
      const imageSrc = "/images/interstitial/after-25-35.png";

      return (
        <main
          style={{
            minHeight: "100dvh",
            background: "#FDFBFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
            }}
          >
            <div style={{ height: "4px", background: "#E9D5FF" }}>
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "#A855F7",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                padding: "12px 16px",
                borderBottom: "1px solid #F3E8FF",
              }}
            >
              <button
                onClick={() =>
                  stepIndex > 0 &&
                  router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
                }
                aria-label="Go back"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "1px solid #E9D5FF",
                  borderRadius: "8px",
                  background: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B21A8"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/images/Logo/Logo-PCOS-icon.png"
                  alt="PCOS Reset Method logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                    lineHeight: 1,
                  }}
                >
                  PCOS Reset Method
                </p>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9333EA",
                }}
              >
                {stepIndex}/{totalSteps}
              </span>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: "16px 16px 32px" }}>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #F3E8FF",
                    padding: "24px",
                    textAlign: "center",
                    boxShadow: "0 1px 8px rgba(168,85,247,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "192px",
                        height: "192px",
                        borderRadius: "999px",
                        overflow: "hidden",
                        background: "#F5EEFF",
                      }}
                    >
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="192px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "12px",
                      lineHeight: 1.25,
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#374151",
                      lineHeight: 1.6,
                    }}
                  >
                    {body}
                  </p>
                </div>

                <div style={{ marginTop: "32px", marginBottom: "16px" }}>
                  <button
                    onClick={navigateNext}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "none",
                      background: "#9333EA",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    {s.buttonText || "Continue"}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </main>
      );
    }

    if (stepIndex === 9) {
      const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
      const step9Bullets = s.bullets
        ? [...s.bullets, "That's why personalization matters."]
        : [];

      return (
        <main
          style={{
            minHeight: "100dvh",
            background: "#FDFBFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
            }}
          >
            <div style={{ height: "4px", background: "#E9D5FF" }}>
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "#A855F7",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                padding: "12px 16px",
                borderBottom: "1px solid #F3E8FF",
              }}
            >
              <button
                onClick={() =>
                  stepIndex > 0 &&
                  router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
                }
                aria-label="Go back"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "1px solid #E9D5FF",
                  borderRadius: "8px",
                  background: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B21A8"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/images/Logo/Logo-PCOS-icon.png"
                  alt="PCOS Reset Method logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                    lineHeight: 1,
                  }}
                >
                  PCOS Reset Method
                </p>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9333EA",
                }}
              >
                {stepIndex}/{totalSteps}
              </span>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: "16px 16px 32px" }}>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #F3E8FF",
                    padding: "24px",
                    textAlign: "center",
                    boxShadow: "0 1px 8px rgba(168,85,247,0.08)",
                  }}
                >
                  {s.image && (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "208px",
                        marginBottom: "16px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: "rgba(243,232,255,0.5)",
                      }}
                    >
                      <Image
                        src={s.image}
                        alt={title}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "contain", padding: "8px" }}
                      />
                    </div>
                  )}
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "12px",
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#374151",
                      marginBottom: "16px",
                      lineHeight: 1.6,
                    }}
                  >
                    {body}
                  </p>
                  <div style={{ marginBottom: "16px", width: "100%" }}>
                    {step9Bullets.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "4px 0",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#9333EA",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#374151",
                            textAlign: "left",
                          }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                  {s.footer && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        background: "#FAF5FF",
                        border: "1px solid #F3E8FF",
                        borderRadius: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "#F3E8FF",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#9333EA"
                          strokeWidth={2}
                        >
                          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                        </svg>
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#111827",
                          textAlign: "left",
                        }}
                      >
                        {s.footer}
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "32px", marginBottom: "16px" }}>
                  <button
                    onClick={navigateNext}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "none",
                      background: "#9333EA",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    {s.buttonText || "Continue"}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </main>
      );
    }

    if (stepIndex === 6) {
      const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
      const step6Body = body.startsWith("Based on your answers")
        ? body
        : `Based on your answers, ${body.charAt(0).toLowerCase()}${body.slice(1)}`;

      return (
        <main
          style={{
            minHeight: "100dvh",
            background: "#FDFBFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
            }}
          >
            <div style={{ height: "4px", background: "#E9D5FF" }}>
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "#A855F7",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                padding: "12px 16px",
                borderBottom: "1px solid #F3E8FF",
              }}
            >
              <button
                onClick={() =>
                  stepIndex > 0 &&
                  router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
                }
                aria-label="Go back"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "1px solid #E9D5FF",
                  borderRadius: "8px",
                  background: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B21A8"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/images/Logo/Logo-PCOS-icon.png"
                  alt="PCOS Reset Method logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                  }}
                >
                  PCOS Reset Method
                </p>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9333EA",
                }}
              >
                {stepIndex}/{totalSteps}
              </span>
            </div>
          </header>

          <div
            style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}
          >
            <div style={{ margin: "0 auto", width: "100%", maxWidth: "400px" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #F3E8FF",
                  padding: "24px",
                  textAlign: "center",
                  boxShadow: "0 1px 8px rgba(168,85,247,0.08)",
                }}
              >
                {s.image && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "208px",
                      marginBottom: "16px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "rgba(243,232,255,0.6)",
                    }}
                  >
                    <Image
                      src={s.image}
                      alt={title}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "contain", padding: "8px" }}
                    />
                  </div>
                )}

                <h2
                  style={{
                    fontSize: "30px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "12px",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#374151",
                    marginBottom: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  {step6Body}
                </p>

                {s.bullets && s.bullets.length > 0 && (
                  <div style={{ marginBottom: "16px", width: "100%" }}>
                    {s.bullets.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "4px 0",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#9333EA",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#374151",
                            textAlign: "left",
                          }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {s.footer && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px",
                      background: "#FAF5FF",
                      border: "1px solid #F3E8FF",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#F3E8FF",
                        display: "grid",
                        placeItems: "center",
                        color: "#9333EA",
                        fontSize: "16px",
                        flexShrink: 0,
                      }}
                    >
                      ♡
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#111827",
                        textAlign: "left",
                      }}
                    >
                      {s.footer}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "32px", marginBottom: "16px" }}>
                <button
                  onClick={navigateNext}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "none",
                    background: "#9333EA",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                  }}
                >
                  {s.buttonText || "Continue"}
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {s.showProgress && (
            <ProgressBar
              current={stepIndex}
              total={totalSteps}
              locale={locale}
              gender={gender}
            />
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "20px 20px 0",
              overflowY: "auto",
            }}
          >
            {/* Image */}
            {s.image && (
              <div
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginBottom: "24px",
                  backgroundColor: "#F3F4F6",
                }}
              >
                <Image
                  src={s.image}
                  alt={title}
                  width={480}
                  height={300}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Title */}
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                textAlign: "center",
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              {title}
            </h2>

            {/* Body text */}
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                textAlign: "center",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              {body}
            </p>

            {/* Bullet points with purple dots */}
            {s.bullets && s.bullets.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                {s.bullets.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#7B2FFF",
                        flexShrink: 0,
                        marginTop: "6px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#374151",
                        lineHeight: 1.5,
                      }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer callout box */}
            {s.footer && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "14px 16px",
                  backgroundColor: "#F5F0FF",
                  borderRadius: "14px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "18px", flexShrink: 0 }}>💜</span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#6B21A8",
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {s.footer}
                </span>
              </div>
            )}
          </div>

          {/* Continue button */}
          <div style={{ padding: "8px 20px 24px" }}>
            <ContinueButton
              onClick={navigateNext}
              label={s.buttonText || "Continue"}
            />
          </div>
        </div>
      </main>
    );
  }

  // ─── RESEARCH SCREEN ──────────────────────────────────────────────────────
  if (step.type === "research-screen") {
    const s = step as {
      title: string;
      sources: { name: string; abbr: string; logo: string }[];
      subtitle?: string;
      buttonText?: string;
      showProgress?: boolean;
    };
    const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#FDFBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
        >
          <div style={{ height: "4px", background: "#E9D5FF" }}>
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "#A855F7",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              padding: "12px 16px",
              borderBottom: "1px solid #F3E8FF",
            }}
          >
            <button
              onClick={() =>
                stepIndex > 0 &&
                router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
              }
              aria-label="Go back"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "1px solid #E9D5FF",
                borderRadius: "8px",
                background: "#fff",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B21A8"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                src="/images/Logo/Logo-PCOS-icon.png"
                alt="PCOS Reset Method logo"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1F2937",
                  lineHeight: 1,
                }}
              >
                PCOS Reset Method
              </p>
            </div>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9333EA",
              }}
            >
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 120px" }}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "420px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "28px",
                  padding: "0 12px",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "10px",
                  }}
                >
                  {s.title}
                </h1>
                {s.subtitle && (
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#4B5563",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.subtitle}
                  </p>
                )}
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {s.sources.map((src, index) => (
                  <div key={src.abbr}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 18px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#111827",
                        }}
                      >
                        {src.name}
                      </span>
                      <Image
                        src={src.logo}
                        alt={src.name}
                        width={40}
                        height={22}
                        style={{
                          objectFit: "contain",
                          width: "40px",
                          height: "22px",
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                    {index < s.sources.length - 1 && (
                      <div
                        style={{
                          height: "1px",
                          background: "#E5E7EB",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(180deg, rgba(253,251,255,0) 0%, rgba(253,251,255,0.95) 40%, #FDFBFF 100%)",
            padding: "16px 20px 28px",
          }}
        >
          <div style={{ maxWidth: "420px", margin: "0 auto" }}>
            <ContinueButton
              onClick={navigateNext}
              label={s.buttonText || "Continue"}
            />
          </div>
        </div>
      </main>
    );
  }

  // ─── TIMELINE SCREEN ──────────────────────────────────────────────────────
  if (step.type === "timeline-screen") {
    const currentW = answers.currentWeight?.value || 68;
    const goalW = answers.desiredWeight?.value || 55;
    const unit = answers.currentWeight?.unit || "kg";
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setMonth(targetDate.getMonth() + 3);
    targetDate.setDate(1);
    const targetDateStr = targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const percentage = Math.min((stepIndex / totalSteps) * 100, 100);

    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#FDFBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
        >
          <div style={{ height: "4px", background: "#E9D5FF" }}>
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "#A855F7",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              padding: "12px 16px",
              borderBottom: "1px solid #F3E8FF",
            }}
          >
            <button
              onClick={() =>
                stepIndex > 0 &&
                router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
              }
              aria-label="Go back"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "1px solid #E9D5FF",
                borderRadius: "8px",
                background: "#fff",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B21A8"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                src="/images/Logo/Logo-PCOS-icon.png"
                alt="PCOS Reset Method logo"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1F2937",
                  lineHeight: 1,
                }}
              >
                PCOS Reset Method
              </p>
            </div>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9333EA",
              }}
            >
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 120px" }}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "420px",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "22px",
                  lineHeight: 1.35,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                With PCOS Reset Method, you could
                <br />
                reach your target weight of
              </h1>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#A855F7",
                  marginBottom: "6px",
                }}
              >
                {goalW} {unit} by {targetDateStr}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "24px",
                }}
              >
                Now: {currentW} {unit} · Goal: {goalW} {unit}
              </div>

              <div
                style={{
                  width: "100%",
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "16px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      color: "#9CA3AF",
                      fontWeight: 600,
                    }}
                  >
                    WEIGHT
                  </span>
                </div>

                <div style={{ position: "relative", height: "180px" }}>
                  <svg
                    viewBox="0 0 340 180"
                    width="100%"
                    height="180"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="purpleLine"
                        x1="0"
                        x2="1"
                        y1="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                    <line
                      x1="12"
                      y1="26"
                      x2="330"
                      y2="26"
                      stroke="#E5E7EB"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="12"
                      y1="90"
                      x2="330"
                      y2="90"
                      stroke="#E5E7EB"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="12"
                      y1="154"
                      x2="330"
                      y2="154"
                      stroke="#E5E7EB"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M20 54 C80 60, 120 120, 180 112 S260 140, 320 132"
                      fill="none"
                      stroke="url(#purpleLine)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="timeline-line"
                    />
                    <path
                      d="M20 48 C90 38, 170 30, 320 22"
                      fill="none"
                      stroke="#FCA5A5"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="58"
                      cy="60"
                      r="5"
                      fill="#8B5CF6"
                      className="timeline-dot timeline-dot-1"
                    />
                    <circle
                      cx="170"
                      cy="112"
                      r="5"
                      fill="#8B5CF6"
                      className="timeline-dot timeline-dot-2"
                    />
                    <circle
                      cx="276"
                      cy="136"
                      r="5"
                      fill="#8B5CF6"
                      className="timeline-dot timeline-dot-3"
                    />
                    <line
                      x1="310"
                      y1="132"
                      x2="330"
                      y2="132"
                      stroke="#8B5CF6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="timeline-end"
                    />
                    <polyline
                      points="324,124 332,132 324,140"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="timeline-end"
                    />
                  </svg>

                  <div
                    style={{
                      position: "absolute",
                      left: "18px",
                      top: "34px",
                      background: "#8B5CF6",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    Now: {currentW} {unit}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "94px",
                      background: "#8B5CF6",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    Goal: {goalW} {unit}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      right: "50px",
                      top: "70px",
                      color: "#A855F7",
                      fontSize: "18px",
                      fontWeight: 700,
                      opacity: 0,
                      animation:
                        "fadeInLate 0.6s ease-out 1 forwards, arrowFloat 1.6s ease-in-out infinite",
                      animationDelay: "1.8s, 2.6s",
                    }}
                  >
                    ↑
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      bottom: "-8px",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      color: "#9CA3AF",
                      fontWeight: 600,
                    }}
                  >
                    TIME
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginTop: "12px",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      color: "#374151",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "34px",
                        height: "3px",
                        background: "#8B5CF6",
                        borderRadius: "999px",
                      }}
                    />
                    Estimated Timeline With PCOS Reset Method
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      color: "#374151",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "34px",
                        height: "3px",
                        borderBottom: "2px dashed #FCA5A5",
                      }}
                    />
                    Typical weight-loss journey
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(180deg, rgba(253,251,255,0) 0%, rgba(253,251,255,0.95) 40%, #FDFBFF 100%)",
            padding: "16px 20px 28px",
          }}
        >
          <div style={{ maxWidth: "420px", margin: "0 auto" }}>
            <ContinueButton onClick={navigateNext} label="Continue" />
          </div>
        </div>

        <style jsx>{`
          .timeline-line {
            stroke-dasharray: 420;
            stroke-dashoffset: 420;
            animation: lineDraw 2.4s ease-in-out 1 forwards;
          }

          .timeline-dot,
          .timeline-end {
            opacity: 0;
            animation: fadeInLate 0.6s ease-out 1 forwards;
            animation-delay: 1.8s;
          }

          .timeline-dot-1 {
            animation-delay: 1.6s;
          }

          .timeline-dot-2 {
            animation-delay: 1.9s;
          }

          .timeline-dot-3 {
            animation-delay: 2.2s;
          }

          @keyframes lineDraw {
            0% {
              stroke-dashoffset: 420;
            }
            70% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes fadeInLate {
            0% {
              opacity: 0;
              transform: translateY(6px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes arrowFloat {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}</style>
      </main>
    );
  }

  // ─── RESULTS / BMI SCREEN ─────────────────────────────────────────────────
  if (step.type === "results-screen") {
    const currentW = answers.currentWeight?.value || 68;
    const heightVal = answers.height?.value || 165;
    const heightUnitVal = answers.height?.unit || "cm";
    let heightInM = heightVal / 100;
    if (heightUnitVal === "ft") heightInM = heightVal * 0.3048;
    const bmi = currentW / (heightInM * heightInM);
    let bmiLabel = "Normal";
    if (bmi < 18.5) {
      bmiLabel = "Underweight";
    } else if (bmi >= 25 && bmi < 30) {
      bmiLabel = "Overweight";
    } else if (bmi >= 30) {
      bmiLabel = "Obese";
    }
    const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
    const needleValue = Math.min(Math.max((bmi - 10) / 30, 0), 1);
    const needleRotation = -90 + needleValue * 180;

    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#FDFBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
        >
          <div style={{ height: "4px", background: "#E9D5FF" }}>
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "#A855F7",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              padding: "12px 16px",
              borderBottom: "1px solid #F3E8FF",
            }}
          >
            <button
              onClick={() =>
                stepIndex > 0 &&
                router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
              }
              aria-label="Go back"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "1px solid #E9D5FF",
                borderRadius: "8px",
                background: "#fff",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B21A8"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                src="/images/Logo/Logo-PCOS-icon.png"
                alt="PCOS Reset Method logo"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1F2937",
                  lineHeight: 1,
                }}
              >
                PCOS Reset Method
              </p>
            </div>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9333EA",
              }}
            >
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 120px" }}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "520px",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "22px",
                  lineHeight: 1.35,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "18px",
                }}
              >
                Your personal summary
              </h1>

              <div
                style={{
                  width: "100%",
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 8px 18px rgba(17, 24, 39, 0.08)",
                }}
              >
                <div
                  style={{
                    background: "#FCE8E1",
                    padding: "20px 18px 24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      color: "#6B7280",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    BODY MASS INDEX (BMI)
                  </div>
                  <div
                    style={{
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    {bmiLabel}
                  </div>

                  <div
                    style={{
                      position: "relative",
                      width: "220px",
                      height: "120px",
                      margin: "8px auto 14px",
                    }}
                  >
                    <svg
                      viewBox="0 0 220 120"
                      width="220"
                      height="120"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 110 A90 90 0 0 1 60 40"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <path
                        d="M60 40 A90 90 0 0 1 110 20"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <path
                        d="M110 20 A90 90 0 0 1 160 40"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <path
                        d="M160 40 A90 90 0 0 1 200 110"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <g
                        className="bmi-needle"
                        style={
                          {
                            "--needle-rotation": `${needleRotation}deg`,
                          } as React.CSSProperties
                        }
                      >
                        <path
                          d="M 110 110 L 106 105 L 110 45 L 114 105 Z"
                          fill="#1F2937"
                        />
                        <circle cx="110" cy="110" r="6" fill="#1F2937" />
                      </g>
                    </svg>
                  </div>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6B7280",
                      lineHeight: 1.5,
                      maxWidth: "360px",
                      margin: "0 auto",
                    }}
                  >
                    <strong>Risks of unhealthy BMI:</strong> High blood pressure,
                    increased risk of heart attack, stroke, type 2 diabetes,
                    chronic back and joint pain
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "18px",
                    background: "#fff",
                    alignItems: "stretch",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: "#FDE4F4",
                          display: "grid",
                          placeItems: "center",
                          color: "#EC4899",
                          fontSize: "18px",
                        }}
                      >
                        ●
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.12em",
                            color: "#9CA3AF",
                            fontWeight: 600,
                          }}
                        >
                          PCOS SYMPTOMS
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          Present
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: "#FEF3C7",
                          display: "grid",
                          placeItems: "center",
                          color: "#F59E0B",
                          fontSize: "18px",
                        }}
                      >
                        🏃
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.12em",
                            color: "#9CA3AF",
                            fontWeight: 600,
                          }}
                        >
                          PHYSICAL LOAD
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          Low
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: "#FCE7F3",
                          display: "grid",
                          placeItems: "center",
                          color: "#EC4899",
                          fontSize: "18px",
                        }}
                      >
                        📅
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.12em",
                            color: "#9CA3AF",
                            fontWeight: 600,
                          }}
                        >
                          ACTIVITY LEVEL
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          Average
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "160px",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      borderLeft: "1px solid #F3F4F6",
                      paddingLeft: "12px",
                    }}
                  >
                    <Image
                      src="/images/results/summary-body.png"
                      alt="PCOS Reset Method profile"
                      width={160}
                      height={220}
                      style={{ objectFit: "contain", height: "220px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(180deg, rgba(253,251,255,0) 0%, rgba(253,251,255,0.95) 40%, #FDFBFF 100%)",
            padding: "16px 20px 28px",
          }}
        >
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <ContinueButton
              onClick={() => router.push(`/${locale}/generating`)}
              label="Continue"
            />
          </div>
        </div>

        <style jsx>{`
          .bmi-needle {
            transform-origin: 110px 110px;
            transform: rotate(var(--needle-rotation));
            animation: needleMove 1.6s ease-out 1 forwards;
          }

          @keyframes needleMove {
            0% {
              transform: rotate(-90deg);
            }
            100% {
              transform: rotate(var(--needle-rotation));
            }
          }
        `}</style>
      </main>
    );
  }

  // ─── HEIGHT INPUT ─────────────────────────────────────────────────────────
  if (step.type === "input-height") {
    const s = step as {
      question: string;
      units: string[];
      buttonText?: string;
      showProgress?: boolean;
    };
    const isValid = heightUnit === "ft" ? !!heightFt : !!heightValue;

    if (stepIndex === 10) {
      const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
      const unit = heightUnit === "ft" ? "ft" : "cm";
      const canContinue = heightUnit === "ft" ? !!heightFt : !!heightValue;

      return (
        <main
          style={{
            minHeight: "100dvh",
            background: "#FDFBFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
            }}
          >
            <div style={{ height: "4px", background: "#E9D5FF" }}>
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "#A855F7",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                padding: "12px 16px",
                borderBottom: "1px solid #F3E8FF",
              }}
            >
              <button
                onClick={() =>
                  stepIndex > 0 &&
                  router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
                }
                aria-label="Go back"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "1px solid #E9D5FF",
                  borderRadius: "8px",
                  background: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B21A8"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/images/Logo/Logo-PCOS-icon.png"
                  alt="PCOS Reset Method logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                    lineHeight: 1,
                  }}
                >
                  PCOS Reset Method
                </p>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9333EA",
                }}
              >
                {stepIndex}/{totalSteps}
              </span>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: "16px 16px 32px" }}>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    padding: "0 8px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "24px",
                      lineHeight: 1.25,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    {s.question}
                  </h1>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4B5563",
                      fontWeight: 400,
                    }}
                  >
                    This helps us estimate a realistic and safe progress range
                    for you.
                  </p>
                </div>

                <div
                  style={{
                    width: "fit-content",
                    margin: "0 auto 24px",
                    padding: "2px",
                    borderRadius: "10px",
                    border: "1px solid #E9D5FF",
                    background: "#fff",
                  }}
                >
                  <button
                    onClick={() => setHeightUnit("cm")}
                    style={{
                      padding: "8px 40px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background:
                        heightUnit === "cm" ? "#9333EA" : "transparent",
                      color: heightUnit === "cm" ? "#fff" : "#9333EA",
                    }}
                  >
                    cm
                  </button>
                  <button
                    onClick={() => setHeightUnit("ft")}
                    style={{
                      padding: "8px 40px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background:
                        heightUnit === "ft" ? "#9333EA" : "transparent",
                      color: heightUnit === "ft" ? "#fff" : "#9333EA",
                    }}
                  >
                    ft
                  </button>
                </div>

                {heightUnit === "cm" ? (
                  <div
                    style={{
                      position: "relative",
                      height: "56px",
                      borderRadius: "12px",
                      border: "1px solid #E9D5FF",
                      background: "#fff",
                      marginBottom: "32px",
                    }}
                  >
                    <input
                      type="number"
                      min={80}
                      max={250}
                      value={heightValue}
                      onChange={(e) => setHeightValue(e.target.value)}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        textAlign: "center",
                        padding: "0 48px 0 12px",
                        fontSize: "30px",
                        fontWeight: 500,
                        color: "#6B21A8",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#C084FC",
                      }}
                    >
                      cm
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "32px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: "56px",
                        borderRadius: "12px",
                        border: "1px solid #E9D5FF",
                        background: "#fff",
                        flex: 1,
                      }}
                    >
                      <input
                        type="number"
                        min={3}
                        max={8}
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          textAlign: "center",
                          padding: "0 42px 0 12px",
                          fontSize: "30px",
                          fontWeight: 500,
                          color: "#6B21A8",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#C084FC",
                        }}
                      >
                        ft
                      </span>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        height: "56px",
                        borderRadius: "12px",
                        border: "1px solid #E9D5FF",
                        background: "#fff",
                        flex: 1,
                      }}
                    >
                      <input
                        type="number"
                        min={0}
                        max={11}
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          textAlign: "center",
                          padding: "0 42px 0 12px",
                          fontSize: "30px",
                          fontWeight: 500,
                          color: "#6B21A8",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#C084FC",
                        }}
                      >
                        in
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    const val =
                      heightUnit === "ft"
                        ? parseFloat(heightFt || "0") +
                          parseFloat(heightIn || "0") / 12
                        : parseFloat(heightValue || "0");
                    const updated = {
                      ...answers,
                      height: { value: val, unit },
                    };
                    setAnswers(updated);
                    saveQuizState(updated, stepIndex + 1);
                    router.push(`/${locale}/quiz/${gender}/${stepIndex + 1}`);
                  }}
                  disabled={!canContinue}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "none",
                    background: canContinue ? "#9333EA" : "#E9D5FF",
                    color: canContinue ? "#fff" : "#A855F7",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: canContinue ? "pointer" : "not-allowed",
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                  }}
                >
                  {s.buttonText || "Continue"}
                </button>
              </div>
            </div>
          </main>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[480px] flex flex-col min-h-screen">
          {s.showProgress && (
            <ProgressBar
              current={stepIndex}
              total={totalSteps}
              locale={locale}
              gender={gender}
            />
          )}
          <div className="flex-1 flex flex-col px-4 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {s.question}
            </h2>
            <div className="flex gap-2 mb-4">
              {s.units.map((u) => (
                <button
                  key={u}
                  onClick={() => setHeightUnit(u)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-all ${heightUnit === u ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-500"}`}
                >
                  {u}
                </button>
              ))}
            </div>
            {heightUnit === "cm" ? (
              <div className="relative">
                <input
                  type="number"
                  value={heightValue}
                  onChange={(e) => setHeightValue(e.target.value)}
                  placeholder="e.g. 165"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg font-semibold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  cm
                </span>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="5"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg font-semibold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    ft
                  </span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="6"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg font-semibold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    in
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="px-4 pb-6">
            <ContinueButton
              onClick={() => {
                const val =
                  heightUnit === "ft"
                    ? parseFloat(heightFt) + parseFloat(heightIn || "0") / 12
                    : parseFloat(heightValue);
                const updated = {
                  ...answers,
                  height: { value: val, unit: heightUnit },
                };
                setAnswers(updated);
                saveQuizState(updated, stepIndex + 1);
                router.push(`/${locale}/quiz/${gender}/${stepIndex + 1}`);
              }}
              disabled={!isValid}
              label={s.buttonText || "Continue"}
            />
          </div>
        </div>
      </main>
    );
  }

  // ─── WEIGHT INPUT ─────────────────────────────────────────────────────────
  if (step.type === "input-weight") {
    const s = step as {
      question: string;
      subtitle?: string;
      units: string[];
      buttonText?: string;
      showProgress?: boolean;
    };
    const isCurrentWeight = stepIndex === 11;

    if (stepIndex === 11) {
      const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
      const canContinue = !!weightValue;

      return (
        <main
          style={{
            minHeight: "100dvh",
            background: "#FDFBFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
            }}
          >
            <div style={{ height: "4px", background: "#E9D5FF" }}>
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "#A855F7",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                padding: "12px 16px",
                borderBottom: "1px solid #F3E8FF",
              }}
            >
              <button
                onClick={() =>
                  stepIndex > 0 &&
                  router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
                }
                aria-label="Go back"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "1px solid #E9D5FF",
                  borderRadius: "8px",
                  background: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B21A8"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/images/Logo/Logo-PCOS-icon.png"
                  alt="PCOS Reset Method logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                    lineHeight: 1,
                  }}
                >
                  PCOS Reset Method
                </p>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9333EA",
                }}
              >
                {stepIndex}/{totalSteps}
              </span>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: "16px 16px 32px" }}>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    padding: "0 8px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "24px",
                      lineHeight: 1.25,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    {s.question}
                  </h1>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4B5563",
                      fontWeight: 400,
                    }}
                  >
                    {s.subtitle || "Weight helps us calculate your BMI."}
                  </p>
                </div>

                <div
                  style={{
                    width: "fit-content",
                    margin: "0 auto 24px",
                    padding: "2px",
                    borderRadius: "10px",
                    border: "1px solid #E9D5FF",
                    background: "#fff",
                  }}
                >
                  <button
                    onClick={() => setWeightUnit("kg")}
                    style={{
                      padding: "8px 40px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background:
                        weightUnit === "kg" ? "#9333EA" : "transparent",
                      color: weightUnit === "kg" ? "#fff" : "#9333EA",
                    }}
                  >
                    kg
                  </button>
                  <button
                    onClick={() => setWeightUnit("lbs")}
                    style={{
                      padding: "8px 40px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background:
                        weightUnit === "lbs" ? "#9333EA" : "transparent",
                      color: weightUnit === "lbs" ? "#fff" : "#9333EA",
                    }}
                  >
                    lbs
                  </button>
                </div>

                <div
                  style={{
                    position: "relative",
                    height: "56px",
                    borderRadius: "12px",
                    border: "1px solid #E9D5FF",
                    background: "#fff",
                    marginBottom: "32px",
                  }}
                >
                  <input
                    type="number"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    placeholder="0"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      textAlign: "center",
                      padding: "0 56px 0 16px",
                      fontSize: "40px",
                      fontWeight: 500,
                      color: "#6B21A8",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "24px",
                      fontWeight: 500,
                      color: "#C084FC",
                    }}
                  >
                    {weightUnit}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const val = parseFloat(weightValue);
                    const key = "currentWeight";
                    const updated = {
                      ...answers,
                      [key]: { value: val, unit: weightUnit },
                    };
                    setAnswers(updated);
                    setWeightValue("");
                    saveQuizState(updated, stepIndex + 1);
                    router.push(`/${locale}/quiz/${gender}/${stepIndex + 1}`);
                  }}
                  disabled={!canContinue}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "none",
                    background: canContinue ? "#9333EA" : "#E9D5FF",
                    color: canContinue ? "#fff" : "#A855F7",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: canContinue ? "pointer" : "not-allowed",
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                  }}
                >
                  {s.buttonText || "Continue"}
                </button>
              </div>
            </div>
          </main>
        </main>
      );
    }

    if (stepIndex === 12) {
      const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
      const canContinue = !!weightValue;

      return (
        <main
          style={{
            minHeight: "100dvh",
            background: "#FDFBFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
            }}
          >
            <div style={{ height: "4px", background: "#E9D5FF" }}>
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "#A855F7",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                padding: "12px 16px",
                borderBottom: "1px solid #F3E8FF",
              }}
            >
              <button
                onClick={() =>
                  stepIndex > 0 &&
                  router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
                }
                aria-label="Go back"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "1px solid #E9D5FF",
                  borderRadius: "8px",
                  background: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B21A8"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/images/Logo/Logo-PCOS-icon.png"
                  alt="PCOS Reset Method logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                    lineHeight: 1,
                  }}
                >
                  PCOS Reset Method
                </p>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9333EA",
                }}
              >
                {stepIndex}/{totalSteps}
              </span>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: "16px 16px 32px" }}>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    padding: "0 8px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "24px",
                      lineHeight: 1.25,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    {s.question}
                  </h1>
                </div>

                <div
                  style={{
                    width: "fit-content",
                    margin: "0 auto 24px",
                    padding: "2px",
                    borderRadius: "10px",
                    border: "1px solid #E9D5FF",
                    background: "#fff",
                  }}
                >
                  <button
                    onClick={() => setWeightUnit("kg")}
                    style={{
                      padding: "8px 40px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background:
                        weightUnit === "kg" ? "#9333EA" : "transparent",
                      color: weightUnit === "kg" ? "#fff" : "#9333EA",
                    }}
                  >
                    kg
                  </button>
                  <button
                    onClick={() => setWeightUnit("lbs")}
                    style={{
                      padding: "8px 40px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background:
                        weightUnit === "lbs" ? "#9333EA" : "transparent",
                      color: weightUnit === "lbs" ? "#fff" : "#9333EA",
                    }}
                  >
                    lbs
                  </button>
                </div>

                <div
                  style={{
                    position: "relative",
                    height: "56px",
                    borderRadius: "12px",
                    border: "1px solid #E9D5FF",
                    background: "#fff",
                    marginBottom: "32px",
                  }}
                >
                  <input
                    type="number"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    placeholder="0"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      textAlign: "center",
                      padding: "0 56px 0 16px",
                      fontSize: "40px",
                      fontWeight: 500,
                      color: "#6B21A8",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "24px",
                      fontWeight: 500,
                      color: "#C084FC",
                    }}
                  >
                    {weightUnit}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const val = parseFloat(weightValue);
                    const key = "desiredWeight";
                    const updated = {
                      ...answers,
                      [key]: { value: val, unit: weightUnit },
                    };
                    setAnswers(updated);
                    setWeightValue("");
                    saveQuizState(updated, stepIndex + 1);
                    router.push(`/${locale}/quiz/${gender}/${stepIndex + 1}`);
                  }}
                  disabled={!canContinue}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "none",
                    background: canContinue ? "#9333EA" : "#E9D5FF",
                    color: canContinue ? "#fff" : "#A855F7",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: canContinue ? "pointer" : "not-allowed",
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                  }}
                >
                  {s.buttonText || "Continue"}
                </button>
              </div>
            </div>
          </main>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[480px] flex flex-col min-h-screen">
          {s.showProgress && (
            <ProgressBar
              current={stepIndex}
              total={totalSteps}
              locale={locale}
              gender={gender}
            />
          )}
          <div className="flex-1 flex flex-col px-4 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {s.question}
            </h2>
            {s.subtitle && (
              <p className="text-gray-500 text-sm mb-6">{s.subtitle}</p>
            )}
            <div className="flex gap-2 mb-4">
              {s.units.map((u) => (
                <button
                  key={u}
                  onClick={() => setWeightUnit(u)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-all ${weightUnit === u ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-500"}`}
                >
                  {u}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
                placeholder={weightUnit === "kg" ? "e.g. 68" : "e.g. 150"}
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                {weightUnit}
              </span>
            </div>
          </div>
          <div className="px-4 pb-6">
            <ContinueButton
              onClick={() => {
                const val = parseFloat(weightValue);
                const key = isCurrentWeight ? "currentWeight" : "desiredWeight";
                const updated = {
                  ...answers,
                  [key]: { value: val, unit: weightUnit },
                };
                setAnswers(updated);
                setWeightValue("");
                saveQuizState(updated, stepIndex + 1);
                router.push(`/${locale}/quiz/${gender}/${stepIndex + 1}`);
              }}
              disabled={!weightValue}
              label={s.buttonText || "Continue"}
            />
          </div>
        </div>
      </main>
    );
  }

  // ─── AGE INPUT ────────────────────────────────────────────────────────────
  if (step.type === "input-age") {
    const s = step as {
      question: string;
      buttonText?: string;
      showProgress?: boolean;
    };

    if (stepIndex === 13) {
      const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
      const canContinue = !!ageValue;

      return (
        <main
          style={{
            minHeight: "100dvh",
            background: "#FDFBFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
            }}
          >
            <div style={{ height: "4px", background: "#E9D5FF" }}>
              <div
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  background: "#A855F7",
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                padding: "12px 16px",
                borderBottom: "1px solid #F3E8FF",
              }}
            >
              <button
                onClick={() =>
                  stepIndex > 0 &&
                  router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
                }
                aria-label="Go back"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "1px solid #E9D5FF",
                  borderRadius: "8px",
                  background: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B21A8"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/images/Logo/Logo-PCOS-icon.png"
                  alt="PCOS Reset Method logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#1F2937",
                    lineHeight: 1,
                  }}
                >
                  PCOS Reset Method
                </p>
              </div>
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9333EA",
                }}
              >
                {stepIndex}/{totalSteps}
              </span>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: "16px 16px 32px" }}>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    padding: "0 8px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "24px",
                      lineHeight: 1.25,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    {s.question}
                  </h1>
                </div>

                <div
                  style={{
                    position: "relative",
                    height: "56px",
                    borderRadius: "12px",
                    border: "1px solid #E9D5FF",
                    background: "#fff",
                    marginBottom: "32px",
                  }}
                >
                  <input
                    type="number"
                    min={18}
                    max={100}
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    placeholder="0"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      textAlign: "center",
                      padding: "0 16px",
                      fontSize: "40px",
                      fontWeight: 500,
                      color: "#6B21A8",
                    }}
                  />
                </div>

                <button
                  onClick={() => {
                    const updated = { ...answers, age: parseInt(ageValue) };
                    setAnswers(updated);
                    saveQuizState(updated, stepIndex + 1);
                    router.push(`/${locale}/quiz/${gender}/${stepIndex + 1}`);
                  }}
                  disabled={!canContinue}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "none",
                    background: canContinue ? "#9333EA" : "#E9D5FF",
                    color: canContinue ? "#fff" : "#A855F7",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: canContinue ? "pointer" : "not-allowed",
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                  }}
                >
                  {s.buttonText || "Continue"}
                </button>
              </div>
            </div>
          </main>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[480px] flex flex-col min-h-screen">
          {s.showProgress && (
            <ProgressBar
              current={stepIndex}
              total={totalSteps}
              locale={locale}
              gender={gender}
            />
          )}
          <div className="flex-1 flex flex-col px-4 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {s.question}
            </h2>
            <div className="relative">
              <input
                type="number"
                value={ageValue}
                onChange={(e) => setAgeValue(e.target.value)}
                placeholder="e.g. 28"
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                years
              </span>
            </div>
          </div>
          <div className="px-4 pb-6">
            <ContinueButton
              onClick={() => {
                const updated = { ...answers, age: parseInt(ageValue) };
                setAnswers(updated);
                saveQuizState(updated, stepIndex + 1);
                router.push(`/${locale}/quiz/${gender}/${stepIndex + 1}`);
              }}
              disabled={!ageValue}
              label={s.buttonText || "Continue"}
            />
          </div>
        </div>
      </main>
    );
  }

  // ─── BODY SELECT ──────────────────────────────────────────────────────────
  if (step.type === "body-select") {
    const s = step as {
      question: string;
      options: { label: string; value: string; image: string }[];
      showProgress?: boolean;
    };

    if (stepIndex === 8) {
      return (
        <main
          style={{
            minHeight: "100vh",
            background: "#ECECF1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {s.showProgress && (
              <ProgressBar
                current={stepIndex}
                total={totalSteps}
                locale={locale}
                gender={gender}
              />
            )}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "28px 16px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#111827",
                  textAlign: "center",
                  lineHeight: 1.2,
                  marginBottom: "40px",
                  maxWidth: "760px",
                }}
              >
                {s.question}
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  justifyContent: "center",
                  flexWrap: "nowrap",
                  width: "100%",
                  overflowX: "auto",
                  paddingBottom: "6px",
                }}
              >
                {s.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSingleSelect(opt.value)}
                      style={{
                        width: "210px",
                        minWidth: "210px",
                        borderRadius: "16px",
                        border: `2px solid ${isSelected ? "#7C3AED" : "#D1CBD9"}`,
                        background: "#fff",
                        overflow: "hidden",
                        cursor: "pointer",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        transition: "transform 0.12s, border-color 0.12s",
                      }}
                    >
                      <div
                        style={{
                          height: "272px",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={opt.image}
                          alt={opt.label}
                          width={210}
                          height={272}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center top",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          padding: "16px 10px",
                          background: "#F3F4F6",
                          borderTop: "1px solid #E5E7EB",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            textAlign: "center",
                            fontSize: "31px",
                            fontWeight: 700,
                            color: "#111827",
                            lineHeight: 1,
                          }}
                        >
                          {opt.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full max-w-[480px] flex flex-col min-h-screen">
          {s.showProgress && (
            <ProgressBar
              current={stepIndex}
              total={totalSteps}
              locale={locale}
              gender={gender}
            />
          )}
          <div className="flex-1 flex flex-col px-4 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {s.question}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {s.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSingleSelect(opt.value)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${selected === opt.value ? "border-purple-600 bg-purple-50" : "border-gray-200 bg-white hover:border-purple-300"}`}
                >
                  <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-2 overflow-hidden">
                    <Image
                      src={opt.image}
                      alt={opt.label}
                      width={120}
                      height={160}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent)
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-3xl">🧍‍♀️</span></div>`;
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${selected === opt.value ? "text-purple-700" : "text-gray-700"}`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── CATEGORY SELECT ──────────────────────────────────────────────────────
  if (step.type === "category-select") {
    const s = step as {
      question: string;
      instruction?: string;
      categories: {
        emoji: string;
        label: string;
        value: string;
        items: string[];
      }[];
      buttonText?: string;
      showProgress?: boolean;
    };
    const selectedItems = selected as string[];

    // Each category gets its own accent color (selected pill bg + divider)
    const categoryColors: Record<
      string,
      { bg: string; text: string; divider: string }
    > = {
      symptoms: { bg: "#E91E8C", text: "#fff", divider: "#E91E8C" },
      "energy-metabolism": { bg: "#F59E0B", text: "#fff", divider: "#F59E0B" },
      nutrition: { bg: "#22C55E", text: "#fff", divider: "#22C55E" },
      movement: { bg: "#3B82F6", text: "#fff", divider: "#3B82F6" },
      mindset: { bg: "#8B5CF6", text: "#fff", divider: "#8B5CF6" },
      lifestyle: { bg: "#EF4444", text: "#fff", divider: "#EF4444" },
    };

    const allItems = s.categories.flatMap((c) => c.items);
    const allSelected = allItems.every((i) => selectedItems.includes(i));

    function toggleItem(item: string) {
      const next = selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item];
      setSelected(next);
      setAnswers({ ...answers, focusAreas: next });
    }

    function toggleAll() {
      const next = allSelected ? [] : allItems;
      setSelected(next);
      setAnswers({ ...answers, focusAreas: next });
    }

    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#F3F4F6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {s.showProgress && (
            <ProgressBar
              current={stepIndex}
              total={totalSteps}
              locale={locale}
              gender={gender}
            />
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {s.question}
            </h2>

            {/* Select everything checkbox */}
            <button
              onClick={toggleAll}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  border: `2px solid ${allSelected ? "#7C3AED" : "#9CA3AF"}`,
                  backgroundColor: allSelected ? "#7C3AED" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {allSelected && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}
              >
                Select everything
              </span>
            </button>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {s.categories.map((cat) => {
                const colors = categoryColors[cat.value] ?? {
                  bg: "#7C3AED",
                  text: "#fff",
                  divider: "#7C3AED",
                };
                return (
                  <div
                    key={cat.value}
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
                      padding: "16px",
                    }}
                  >
                    {/* Header: title left, emoji right */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "#111827",
                        }}
                      >
                        {cat.label}
                      </span>
                      <span style={{ fontSize: "22px" }}>{cat.emoji}</span>
                    </div>
                    {/* Colored divider */}
                    <div
                      style={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: colors.divider,
                        borderRadius: "2px",
                        marginBottom: "12px",
                      }}
                    />
                    {/* Individual capsules */}
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {cat.items.map((item) => {
                        const isActive = selectedItems.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => toggleItem(item)}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "999px",
                              fontSize: "13px",
                              fontWeight: 500,
                              border: isActive
                                ? `1.5px solid ${colors.bg}`
                                : "1.5px solid #D1D5DB",
                              backgroundColor: isActive ? colors.bg : "#fff",
                              color: isActive ? colors.text : "#374151",
                              cursor: "pointer",
                              transition: "all 0.15s",
                              lineHeight: 1.4,
                            }}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ padding: "8px 16px 24px", background: "#F3F4F6" }}>
            <ContinueButton
              onClick={navigateNext}
              disabled={selectedItems.length === 0}
              label={s.buttonText || "Continue"}
            />
          </div>
        </div>
      </main>
    );
  }

  // ─── DEFAULT: SINGLE / MULTI SELECT ───────────────────────────────────────
  const s = step as {
    question: string;
    subtitle?: string;
    options: { emoji?: string; label: string; value: string }[];
    type: string;
    buttonText?: string;
    showProgress?: boolean;
    autoAdvance?: boolean;
  };

  if (stepIndex === 15 && s.type === "single-select") {
    const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#FDFBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
        >
          <div style={{ height: "4px", background: "#E9D5FF" }}>
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "#A855F7",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              padding: "12px 16px",
              borderBottom: "1px solid #F3E8FF",
            }}
          >
            <button
              onClick={() =>
                stepIndex > 0 &&
                router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
              }
              aria-label="Go back"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "1px solid #E9D5FF",
                borderRadius: "8px",
                background: "#fff",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B21A8"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                src="/images/Logo/Logo-PCOS-icon.png"
                alt="PCOS Reset Method logo"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1F2937",
                  lineHeight: 1,
                }}
              >
                PCOS Reset Method
              </p>
            </div>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9333EA",
              }}
            >
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 32px" }}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "28px",
                  padding: "0 8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {s.question}
                </h1>
                {s.subtitle && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4B5563",
                      fontWeight: 400,
                    }}
                  >
                    {s.subtitle}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {s.options.map((opt, index) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSingleSelect(opt.value)}
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      border: "1px solid transparent",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow:
                        "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      animationDelay: `${index * 50}ms`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#E9D5FF";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(247,243,255,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#fff";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {opt.emoji && (
                        <span style={{ fontSize: "20px" }}>{opt.emoji}</span>
                      )}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#111827",
                          textAlign: "left",
                        }}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </main>
    );
  }

  if (stepIndex === 16 && s.type === "single-select") {
    const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#FDFBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
        >
          <div style={{ height: "4px", background: "#E9D5FF" }}>
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "#A855F7",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              padding: "12px 16px",
              borderBottom: "1px solid #F3E8FF",
            }}
          >
            <button
              onClick={() =>
                stepIndex > 0 &&
                router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
              }
              aria-label="Go back"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "1px solid #E9D5FF",
                borderRadius: "8px",
                background: "#fff",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B21A8"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                src="/images/Logo/Logo-PCOS-icon.png"
                alt="PCOS Reset Method logo"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1F2937",
                  lineHeight: 1,
                }}
              >
                PCOS Reset Method
              </p>
            </div>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9333EA",
              }}
            >
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 32px" }}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "28px",
                  padding: "0 8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {s.question}
                </h1>
                {s.subtitle && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4B5563",
                      fontWeight: 400,
                    }}
                  >
                    {s.subtitle}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {s.options.map((opt, index) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSingleSelect(opt.value)}
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      border: "1px solid transparent",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 1px 4px rgba(17,24,39,0.08)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      animationDelay: `${index * 50}ms`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#E9D5FF";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(247,243,255,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#fff";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {opt.emoji && (
                        <span style={{ fontSize: "20px" }}>{opt.emoji}</span>
                      )}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#111827",
                          textAlign: "left",
                        }}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </main>
    );
  }

  if (stepIndex === 17 && s.type === "single-select") {
    const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#FDFBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
        >
          <div style={{ height: "4px", background: "#E9D5FF" }}>
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "#A855F7",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              padding: "12px 16px",
              borderBottom: "1px solid #F3E8FF",
            }}
          >
            <button
              onClick={() =>
                stepIndex > 0 &&
                router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
              }
              aria-label="Go back"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "1px solid #E9D5FF",
                borderRadius: "8px",
                background: "#fff",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B21A8"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                src="/images/Logo/Logo-PCOS-icon.png"
                alt="PCOS Reset Method logo"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1F2937",
                  lineHeight: 1,
                }}
              >
                PCOS Reset Method
              </p>
            </div>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9333EA",
              }}
            >
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 32px" }}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "28px",
                  padding: "0 8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {s.question}
                </h1>
                {s.subtitle && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4B5563",
                      fontWeight: 400,
                    }}
                  >
                    {s.subtitle}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {s.options.map((opt, index) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSingleSelect(opt.value)}
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      border: "1px solid transparent",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 1px 4px rgba(17,24,39,0.08)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      animationDelay: `${index * 50}ms`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#E9D5FF";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(247,243,255,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#fff";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {opt.emoji && (
                        <span style={{ fontSize: "20px" }}>{opt.emoji}</span>
                      )}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#111827",
                          textAlign: "left",
                        }}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </main>
    );
  }

  if (stepIndex === 18 && s.type === "multi-select") {
    const percentage = Math.min((stepIndex / totalSteps) * 100, 100);
    const selectedArr = selected as string[];

    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#FDFBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}
        >
          <div style={{ height: "4px", background: "#E9D5FF" }}>
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "#A855F7",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              padding: "12px 16px",
              borderBottom: "1px solid #F3E8FF",
            }}
          >
            <button
              onClick={() =>
                stepIndex > 0 &&
                router.push(`/${locale}/quiz/${gender}/${stepIndex - 1}`)
              }
              aria-label="Go back"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "1px solid #E9D5FF",
                borderRadius: "8px",
                background: "#fff",
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B21A8"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l-7-7 7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
              </svg>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                src="/images/Logo/Logo-PCOS-icon.png"
                alt="PCOS Reset Method logo"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1F2937",
                  lineHeight: 1,
                }}
              >
                PCOS Reset Method
              </p>
            </div>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9333EA",
              }}
            >
              {stepIndex}/{totalSteps}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 96px" }}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "28px",
                  padding: "0 8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {s.question}
                </h1>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "10px",
                }}
              >
                {s.options.map((opt, index) => {
                  const isSelected = selectedArr.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleMultiSelect(opt.value)}
                      style={{
                        width: "100%",
                        borderRadius: "14px",
                        padding: "14px 16px",
                        border: "1px solid #E5E7EB",
                        background: isSelected
                          ? "rgba(247,243,255,0.7)"
                          : "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        boxShadow:
                          "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        animationDelay: `${index * 30}ms`,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "#E9D5FF";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(247,243,255,0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "#E5E7EB";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "#fff";
                        }
                      }}
                    >
                      {opt.emoji && (
                        <span style={{ fontSize: "18px" }}>{opt.emoji}</span>
                      )}
                      <span
                        style={{
                          flex: 1,
                          fontSize: "15px",
                          fontWeight: 500,
                          color: "#111827",
                          textAlign: "left",
                        }}
                      >
                        {opt.label}
                      </span>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "999px",
                          border: `2px solid ${isSelected ? "#9333EA" : "#D1D5DB"}`,
                          background: isSelected ? "#9333EA" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}

                <div
                  style={{
                    height: "1px",
                    background: "#E5E7EB",
                    margin: "6px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </main>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, #fff, #fff, rgba(255,255,255,0.8))",
            padding: "16px 16px 24px",
            zIndex: 20,
          }}
        >
          <div style={{ margin: "0 auto", width: "100%", maxWidth: "400px" }}>
            <ContinueButton
              onClick={navigateNext}
              disabled={selectedArr.length === 0}
              label={s.buttonText || "Continue"}
            />
          </div>
        </div>
      </main>
    );
  }

  const isMulti = s.type === "multi-select";
  const selectedArr = isMulti ? (selected as string[]) : [];
  const canContinue = isMulti ? selectedArr.length > 0 : !!selected;

  return (
    <>
      <style>{`
        .quiz-option {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 16px;
          border: 1.5px solid #E5E7EB;
          background: #fff;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.15s, background 0.15s;
          width: 100%;
          font-family: inherit;
        }
        .quiz-option:hover {
          border-color: #C4B5FD;
          background: #FAFAFF;
        }
        .quiz-option.selected {
          border-color: #7B2FFF;
          background: #F5F0FF;
        }
        .quiz-option:active {
          transform: scale(0.98);
        }
      `}</style>
      <main
        style={{
          minHeight: "100vh",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {s.showProgress && (
            <ProgressBar
              current={stepIndex}
              total={totalSteps}
              locale={locale}
              gender={gender}
            />
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "6px",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {s.question}
            </h2>
            {s.subtitle && (
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {s.subtitle}
              </p>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              {s.options.map((opt) => {
                const isSelected = isMulti
                  ? selectedArr.includes(opt.value)
                  : selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() =>
                      isMulti
                        ? handleMultiSelect(opt.value)
                        : handleSingleSelect(opt.value)
                    }
                    className={`quiz-option ${isSelected ? "selected" : ""}`}
                  >
                    {/* Emoji */}
                    {opt.emoji && (
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                          backgroundColor: isSelected ? "#EDE9FE" : "#F9FAFB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          flexShrink: 0,
                          transition: "background 0.15s",
                        }}
                      >
                        {opt.emoji}
                      </div>
                    )}
                    {/* Label */}
                    <span
                      style={{
                        flex: 1,
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#111827",
                        lineHeight: 1.4,
                      }}
                    >
                      {opt.label}
                    </span>
                    {/* Circle checkbox (multi) or radio (single) */}
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        border: isSelected
                          ? "2px solid #7B2FFF"
                          : "2px solid #D1D5DB",
                        backgroundColor: isSelected ? "#7B2FFF" : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth={3.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {isMulti && (
            <div style={{ padding: "8px 20px 24px" }}>
              <ContinueButton
                onClick={navigateNext}
                disabled={!canContinue}
                label={s.buttonText || "Continue"}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
