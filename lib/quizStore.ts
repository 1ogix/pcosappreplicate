"use client";

export interface QuizAnswers {
  ageGroup?: string;
  symptoms?: string[];
  cycleRegularity?: string;
  stressLevel?: string;
  weightLossAttempt?: string;
  energyLevel?: string;
  goals?: string[];
  bodyType?: string;
  height?: { value: number; unit: string };
  currentWeight?: { value: number; unit: string };
  desiredWeight?: { value: number; unit: string };
  age?: number;
  activityType?: string;
  activityEnjoyment?: string;
  waterIntake?: string;
  habits?: string[];
  focusAreas?: string[];
  [key: string]: unknown;
}

const QUIZ_STATE_KEY = "pcos_quiz_state";
const OFFER_STATE_KEY = "pcos_offer_state";
const QUIZ_TTL = 3 * 60 * 1000; // 3 minutes
const OFFER_TTL = 12 * 60 * 60 * 1000; // 12 hours

interface StoredState<T> {
  data: T;
  timestamp: number;
}

export function saveQuizState(answers: QuizAnswers, step: number) {
  const state: StoredState<{ answers: QuizAnswers; step: number }> = {
    data: { answers, step },
    timestamp: Date.now(),
  };
  localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
}

export function loadQuizState(): { answers: QuizAnswers; step: number } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(QUIZ_STATE_KEY);
  if (!raw) return null;
  const parsed: StoredState<{ answers: QuizAnswers; step: number }> = JSON.parse(raw);
  if (Date.now() - parsed.timestamp > QUIZ_TTL) {
    localStorage.removeItem(QUIZ_STATE_KEY);
    return null;
  }
  return parsed.data;
}

export function saveOfferState(data: Record<string, unknown>) {
  const state: StoredState<Record<string, unknown>> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(OFFER_STATE_KEY, JSON.stringify(state));
}

export function loadOfferState(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(OFFER_STATE_KEY);
  if (!raw) return null;
  const parsed: StoredState<Record<string, unknown>> = JSON.parse(raw);
  if (Date.now() - parsed.timestamp > OFFER_TTL) {
    localStorage.removeItem(OFFER_STATE_KEY);
    return null;
  }
  return parsed.data;
}

export function clearQuizState() {
  localStorage.removeItem(QUIZ_STATE_KEY);
}
