"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QuizHeader from "@/components/quiz/QuizHeader";

const reviews = [
  {
    name: "Lucy T.",
    text: "PCOS Reset Method is worth it. Straight forward, clean eating meal plans and shopping lists. Blood results confirm I'm doing better.",
  },
  {
    name: "Emily S.",
    text: "Lots of options to customize recipes: foods you love/don't like, time to prepare, complexity, health concerns... so much more!",
  },
  {
    name: "Caroline N.",
    text: "I've been using PCOS Reset Method for many years. I was really overweight and now I'm back to 59 kg! It's wonderful, thank you.",
  },
  {
    name: "Laura G.",
    text: "Couldn't do the exercises in the program due to my poor joints, but the food is really good and I already notice improvements.",
  },
  {
    name: "Sarah G.",
    text: "A sense of community and a super helpful team. This could be just what you need.",
  },
  {
    name: "Katherine B.",
    text: "If you told me a month ago I'd be 9 kg lighter I would’ve called you a liar. I'm proof this works!",
  },
  {
    name: "Elizabeth M.",
    text: "I needed something to lose weight in a safe way. This was the best option out there.",
  },
];

export default function GeneratingPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [progress, setProgress] = useState(1);

  const carouselItems = useMemo(() => [...reviews, ...reviews], []);

  useEffect(() => {
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current >= 100) {
        current = 100;
        setProgress(current);
        clearInterval(interval);
        setTimeout(() => {
          router.push(`/${locale}/email`);
        }, 500);
        return;
      }
      setProgress(current);
    }, 40);
    return () => clearInterval(interval);
  }, [locale, router]);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#F7F2FF",
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
          maxWidth: "720px",
          padding: "28px 16px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: `conic-gradient(#7C3AED ${progress * 3.6}deg, #E9D5FF 0deg)`,
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              width: "108px",
              height: "108px",
              borderRadius: "50%",
              background: "#F7F2FF",
              display: "grid",
              placeItems: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {progress}%
          </div>
        </div>
        <div style={{ color: "#7C3AED", fontWeight: 600, fontSize: "14px" }}>
          Calculating your results
        </div>

        <h2
          style={{
            marginTop: "8px",
            fontSize: "26px",
            fontWeight: 700,
            color: "#111827",
            textAlign: "center",
          }}
        >
          What our users are saying
        </h2>
      </div>

      <div style={{ width: "100%", overflow: "hidden", paddingBottom: "32px" }}>
        <div className="review-track">
          {carouselItems.map((review, idx) => (
            <div key={`${review.name}-${idx}`} className="review-card">
              <p className="review-text">{review.text}</p>
              <div className="review-footer">
                <span className="review-name">{review.name}</span>
                <span className="review-stars">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .review-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: carousel 22s linear infinite;
          padding: 0 16px 12px;
        }

        .review-card {
          width: 260px;
          background: #fff;
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 8px 18px rgba(17, 24, 39, 0.08);
          border: 1px solid #E5E7EB;
        }

        .review-text {
          font-size: 13px;
          line-height: 1.5;
          color: #374151;
          margin-bottom: 12px;
        }

        .review-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }

        .review-name {
          font-weight: 600;
          color: #111827;
        }

        .review-stars {
          color: #F59E0B;
          letter-spacing: 1px;
        }

        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}
