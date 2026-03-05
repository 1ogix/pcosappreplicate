"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import QuizHeader from "@/components/quiz/QuizHeader";
import { loadQuizState } from "@/lib/quizStore";

const plans = [
  {
    id: "7-day",
    label: "7-day plan",
    price: "$0.99",
    compareAt: "$22.20",
    discounted: "$6.93",
    per: "for first 7 days",
  },
  {
    id: "1-month",
    label: "1-month plan",
    price: "$0.51",
    compareAt: "$44.40",
    discounted: "$15.19",
    per: "for first month",
    badge: "MOST POPULAR",
  },
  {
    id: "3-month",
    label: "3-month plan",
    price: "$0.29",
    compareAt: "$75.49",
    discounted: "$25.99",
    per: "for first 3 months",
  },
];

const reviews = [
  {
    date: "18 Oct",
    title: "Simple to follow and very flexible",
    text: "The program is easy to follow and helped me manage my PCOS-related symptoms better. I also started drinking more water, something I struggled with before, and I love that I can choose different meal options whenever I want. The daily tips are practical and easy to apply.",
    name: "Amanda",
  },
  {
    date: "12 Aug",
    title: "It helped me get back on track",
    text: "I first tried the program earlier this year and saw noticeable progress, so I decided to return to it again. During a stressful period I gained weight quickly, but following the structured plan again helped me regain control.",
    name: "Nicole",
  },
  {
    date: "02 Sep",
    title: "Exactly the structure I needed",
    text: "I love the reminders and tracking tools — they keep me consistent with meals, hydration, and daily habits. The personalized meal plans and shopping lists make everything easier, and I finally feel like I have a clear system.",
    name: "Laura",
  },
];

export default function ResultOfferPage() {
  useParams();
  const [secondsLeft, setSecondsLeft] = useState(12 * 60 + 30);
  const [selectedPlan, setSelectedPlan] = useState("1-month");
  const answers = useMemo(() => loadQuizState()?.answers ?? {}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const currentW = answers.currentWeight?.value ?? 60;
  const goalW = answers.desiredWeight?.value ?? 55;

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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#0B0B0F",
          color: "#fff",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          fontWeight: 600,
          zIndex: 20,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span style={{ color: "#A855F7", fontSize: "16px" }}>⏱</span>
        Reserved discount expires in
        <span style={{ color: "#A855F7" }}>
          {minutes}:{seconds}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "72px 16px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ width: "100%" }}>
          <QuizHeader />
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            border: "1px solid #E5E7EB",
            padding: "16px",
            boxShadow: "0 8px 18px rgba(17, 24, 39, 0.08)",
          }}
        >
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "6px",
              textAlign: "center",
            }}
          >
            Great progress{answers.name ? `, ${answers.name}` : ""}!
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "#6B7280",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            Your personal PCOS Reset Plan is ready.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "11px", color: "#9CA3AF" }}>CURRENT</div>
              <div style={{ fontSize: "16px", fontWeight: 700 }}>
                {currentW} kg
              </div>
            </div>
            <div
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                GOAL WEIGHT
              </div>
              <div
                style={{ fontSize: "16px", fontWeight: 700, color: "#7C3AED" }}
              >
                {goalW} kg
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#FDFBFF",
              borderRadius: "16px",
              border: "1px solid #E9D5FF",
              padding: "14px",
              marginBottom: "14px",
              textAlign: "center",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            ⭐ Goal Snapshot
            <div
              style={{
                marginTop: "12px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                fontSize: "13px",
                color: "#6B7280",
                fontWeight: 500,
              }}
            >
              <div>
                <div style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                  BODY FAT
                </div>
                <div style={{ color: "#111827", fontWeight: 700 }}>Lower</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                  SYMPTOMS
                </div>
                <div style={{ color: "#111827", fontWeight: 700 }}>Reduced</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                  ENERGY
                </div>
                <div style={{ color: "#111827", fontWeight: 700 }}>Higher</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                  STRESS
                </div>
                <div style={{ color: "#111827", fontWeight: 700 }}>
                  Optimized
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderBottom: "1px solid #E5E7EB",
                textAlign: "center",
                fontSize: "12px",
                fontWeight: 600,
                color: "#6B7280",
                letterSpacing: "0.08em",
                padding: "10px 0",
              }}
            >
              <span>NOW</span>
              <span style={{ color: "#7C3AED" }}>YOUR GOAL</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                padding: "14px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Image
                  src="/images/results/before-25-35 (1).png"
                  alt="Before"
                  width={140}
                  height={220}
                  style={{ objectFit: "contain", height: "220px" }}
                />
                <div style={{ marginTop: "10px", fontSize: "12px" }}>
                  Body Fat: <strong>Medium</strong>
                </div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>
                  PCOS Symptoms • Energy • Stress
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <Image
                  src="/images/results/after-25-35 (1).png"
                  alt="After"
                  width={140}
                  height={220}
                  style={{ objectFit: "contain", height: "220px" }}
                />
                <div style={{ marginTop: "10px", fontSize: "12px" }}>
                  Body Fat: <strong>Low</strong>
                </div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>
                  PCOS Symptoms • Energy • Stress
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            border: "1px solid #E5E7EB",
            padding: "16px",
            boxShadow: "0 8px 18px rgba(17, 24, 39, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "6px",
              textAlign: "center",
            }}
          >
            Select Your Transformation
          </h2>
          <div
            style={{
              fontSize: "13px",
              color: "#7C3AED",
              marginBottom: "14px",
              textAlign: "center",
            }}
          >
            ✅ Your promo code has been successfully applied
          </div>
          <div style={{ display: "grid", gap: "12px" }}>
            {plans.map((plan) => {
              const selected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "16px",
                    borderRadius: "20px",
                    border: selected
                      ? "2px solid #A78BFA"
                      : "1px solid #E5E7EB",
                    background: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <div>
                    {plan.badge && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-10px",
                          left: "22px",
                          background: "#EF4444",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "999px",
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          border: selected
                            ? "2px solid #16A34A"
                            : "2px solid #111827",
                          background: selected ? "#16A34A" : "#fff",
                          color: "#fff",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        {selected ? "✓" : ""}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "16px" }}>
                          {plan.label}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#EF4444",
                            textDecoration: "line-through",
                            fontWeight: 600,
                          }}
                        >
                          {plan.compareAt}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748B",
                            fontWeight: 600,
                          }}
                        >
                          {plan.discounted}
                        </div>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                          {plan.per}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "30px",
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      {plan.price}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#9CA3AF",
                        marginTop: "-4px",
                      }}
                    >
                      per day
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              window.location.href = "/en-pcos-checkout-1m-v1";
            }}
            style={{
              marginTop: "14px",
              width: "100%",
              padding: "14px 16px",
              borderRadius: "18px",
              border: "none",
              background: "#7C3AED",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              boxShadow: "0 10px 20px rgba(124, 58, 237, 0.18)",
            }}
          >
            Get My Plan
          </button>
          <div
            style={{
              marginTop: "10px",
              fontSize: "11px",
              color: "#9CA3AF",
              textAlign: "center",
            }}
          >
            🔒 Guaranteed safe checkout
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Image
                src="/images/results/visa.eac00510.svg"
                alt="Visa"
                width={48}
                height={18}
              />
              <Image
                src="/images/results/mastercard.11aa627c.svg"
                alt="Mastercard"
                width={32}
                height={18}
              />
              <Image
                src="/images/results/discoverClean.a7c78576.svg"
                alt="Discover"
                width={48}
                height={18}
              />
              <Image
                src="/images/results/stripe.svg"
                alt="Stripe"
                width={40}
                height={18}
              />
            </div>
            <div style={{ marginTop: "8px", lineHeight: 1.5 }}>
              We&apos;ve automatically applied your discount to the first
              subscription payment. You can cancel anytime. Subscription Terms.
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#F9FAFB",
            borderRadius: "18px",
            border: "1px solid #E5E7EB",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}
          >
            Not Another Generic Plan.
          </div>
          <div
            style={{ color: "#7C3AED", fontWeight: 600, marginBottom: "12px" }}
          >
            Your AI PCOS Coach — Built Around You.
          </div>
          <Image
            src="/images/results/13_EN.png"
            alt="App preview"
            width={220}
            height={420}
            style={{ objectFit: "contain", height: "420px", margin: "0 auto" }}
          />
          <div style={{ marginTop: "12px", fontWeight: 600 }}>
            28,000+ women already improving their PCOS symptoms
          </div>
          <div style={{ fontSize: "12px", color: "#6B7280" }}>
            4.8★ average experience rating
          </div>
        </div>

        <div>
          <h3
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Success stories from our users
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {reviews.map((review) => (
              <div
                key={review.name}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  padding: "14px",
                  boxShadow: "0 6px 14px rgba(17, 24, 39, 0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#6B7280",
                  }}
                >
                  <span>{review.date}</span>
                  <span style={{ color: "#F59E0B" }}>★★★★★</span>
                </div>
                <div style={{ fontWeight: 700, marginTop: "6px" }}>
                  {review.title}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#4B5563",
                    marginTop: "6px",
                    lineHeight: 1.5,
                  }}
                >
                  {review.text}
                </p>
                <div style={{ marginTop: "8px", fontWeight: 600 }}>
                  {review.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#10B981",
                    marginTop: "4px",
                  }}
                >
                  ✅ Verified Customer
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(180deg, #F3E8FF 0%, #FDFBFF 100%)",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            padding: "18px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: 700 }}>
            9 out of 10 women
          </div>
          <div style={{ marginTop: "6px", color: "#4B5563", fontSize: "13px" }}>
            reported improvements in PCOS-related symptoms
          </div>
          <div style={{ marginTop: "8px", fontSize: "11px", color: "#9CA3AF" }}>
            Results are not typical. Individual results may vary.
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            border: "1px solid #E5E7EB",
            padding: "16px",
            boxShadow: "0 8px 18px rgba(17, 24, 39, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "6px",
              textAlign: "center",
            }}
          >
            Your personalized PCOS Reset Method is ready.
          </h2>
          <div
            style={{
              fontSize: "13px",
              color: "#7C3AED",
              marginBottom: "14px",
              textAlign: "center",
            }}
          >
            ✅ Your promo code has been successfully applied
          </div>
          <div style={{ display: "grid", gap: "12px" }}>
            {plans.map((plan) => {
              const selected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "16px",
                    borderRadius: "20px",
                    border: selected
                      ? "2px solid #A78BFA"
                      : "1px solid #E5E7EB",
                    background: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <div>
                    {plan.badge && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-10px",
                          left: "22px",
                          background: "#EF4444",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "999px",
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          border: selected
                            ? "2px solid #16A34A"
                            : "2px solid #111827",
                          background: selected ? "#16A34A" : "#fff",
                          color: "#fff",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        {selected ? "✓" : ""}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "16px" }}>
                          {plan.label}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#EF4444",
                            textDecoration: "line-through",
                            fontWeight: 600,
                          }}
                        >
                          {plan.compareAt}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748B",
                            fontWeight: 600,
                          }}
                        >
                          {plan.discounted}
                        </div>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                          {plan.per}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "30px",
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      {plan.price}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#9CA3AF",
                        marginTop: "-4px",
                      }}
                    >
                      per day
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <button
            style={{
              marginTop: "14px",
              width: "100%",
              padding: "14px 16px",
              borderRadius: "18px",
              border: "none",
              background: "#7C3AED",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              boxShadow: "0 10px 20px rgba(124, 58, 237, 0.18)",
            }}
          >
            Get My Plan
          </button>
          <div
            style={{
              marginTop: "10px",
              fontSize: "11px",
              color: "#9CA3AF",
              textAlign: "center",
            }}
          >
            🔒 Guaranteed safe checkout
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Image
                src="/images/results/visa.eac00510.svg"
                alt="Visa"
                width={48}
                height={18}
              />
              <Image
                src="/images/results/mastercard.11aa627c.svg"
                alt="Mastercard"
                width={32}
                height={18}
              />
              <Image
                src="/images/results/discoverClean.a7c78576.svg"
                alt="Discover"
                width={48}
                height={18}
              />
              <Image
                src="/images/results/stripe.svg"
                alt="Stripe"
                width={40}
                height={18}
              />
            </div>
            <div style={{ marginTop: "8px", lineHeight: 1.5 }}>
              We&apos;ve automatically applied your discount to the first
              subscription payment. You can cancel anytime. Subscription Terms.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
