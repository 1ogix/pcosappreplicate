"use client";

import { useState, useEffect } from "react";
import offerConfig from "@/config/offerConfig.json";
import QuizHeader from "@/components/quiz/QuizHeader";

export default function OfferPage() {
  const [tierIndex, setTierIndex] = useState(0);
  const tier = offerConfig.tiers[tierIndex];

  // Escalate offer tier after time
  useEffect(() => {
    const timers = offerConfig.tiers.map((t, i) => {
      if (i === 0) return null;
      return setTimeout(() => setTierIndex(i), t.triggerAfter * 1000);
    });
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-[480px] flex flex-col">
        <QuizHeader />

        {/* Hero */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-800 text-white px-4 py-8 text-center">
          <div className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🎉 Your Plan Is Ready!
          </div>
          <h1 className="text-2xl font-bold mb-2">{offerConfig.product.name}</h1>
          <p className="text-purple-200 text-sm">{offerConfig.product.tagline}</p>
        </div>

        {/* Pricing */}
        <div className="px-4 py-6">
          <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-5 mb-4 text-center">
            <div className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              {tier.discount}
            </div>
            <div className="text-gray-400 line-through text-lg mb-1">
              ${tier.originalPrice}
            </div>
            <div className="text-4xl font-bold text-purple-700 mb-1">
              ${tier.salePrice}
            </div>
            <div className="text-xs text-gray-500">One-time payment · Instant access</div>
          </div>

          <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-base rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-[0.98] mb-4">
            {tier.ctaText}
          </button>

          {/* Guarantee */}
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3 mb-6">
            <span className="text-2xl">🛡️</span>
            <div>
              <div className="text-sm font-semibold text-green-800">{offerConfig.guarantee.text}</div>
              <div className="text-xs text-green-600">Not happy? Full refund, no questions asked.</div>
            </div>
          </div>

          {/* What You Get */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">What&apos;s included:</h3>
            <div className="space-y-2">
              {[
                "✅ Personalized PCOS meal plan",
                "✅ Hormone-supportive workout guide",
                "✅ Daily habit tracker",
                "✅ PCOS-friendly recipe book",
                "✅ Supplement guidance",
                "✅ Lifetime access & updates",
              ].map((item) => (
                <div key={item} className="text-sm text-gray-700">{item}</div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Real women, real results:</h3>
            <div className="space-y-3">
              {offerConfig.testimonials.map((t) => (
                <div key={t.name} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-sm font-bold text-purple-700">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{t.name}, {t.age}</div>
                      <div className="text-yellow-400 text-xs">{"★".repeat(t.rating)}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">&quot;{t.text}&quot;</p>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-base rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-[0.98] mb-6">
            {tier.ctaText}
          </button>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 pb-8">
            <p className="mb-2">{offerConfig.product.name} · All rights reserved</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
