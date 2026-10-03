"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_STORAGE_KEY = "senior-veor:intro:v1";
const EXIT_DURATION_MS = 650;
const SAFETY_TIMEOUT_MS = 30_000;

type IntroPhase = "visible" | "leaving" | "hidden";

export function FirstVisitIntro() {
  const [phase, setPhase] = useState<IntroPhase>("visible");
  const [isReady, setIsReady] = useState(false);
  const phaseRef = useRef<IntroPhase>("visible");
  const exitTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);
  const hideFrameRef = useRef<number | null>(null);
  const previousOverflowRef = useRef("");

  const finishIntro = useCallback(() => {
    if (phaseRef.current !== "visible") return;

    phaseRef.current = "leaving";
    setPhase("leaving");
    exitTimerRef.current = window.setTimeout(() => {
      phaseRef.current = "hidden";
      setPhase("hidden");
      document.body.style.overflow = previousOverflowRef.current;
    }, EXIT_DURATION_MS);
  }, []);

  useEffect(() => {
    let hasSeenIntro = document.documentElement.dataset.introSeen === "true";

    try {
      hasSeenIntro ||= window.localStorage.getItem(INTRO_STORAGE_KEY) === "seen";
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }

    if (hasSeenIntro) {
      phaseRef.current = "hidden";
      hideFrameRef.current = window.requestAnimationFrame(() => setPhase("hidden"));
      return () => {
        if (hideFrameRef.current !== null) window.cancelAnimationFrame(hideFrameRef.current);
      };
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        window.localStorage.setItem(INTRO_STORAGE_KEY, "seen");
      } catch {
        // The intro still remains safely skippable when storage is unavailable.
      }
      phaseRef.current = "hidden";
      hideFrameRef.current = window.requestAnimationFrame(() => setPhase("hidden"));
      return () => {
        if (hideFrameRef.current !== null) window.cancelAnimationFrame(hideFrameRef.current);
      };
    }

    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "seen");
    } catch {
      // The current visit can continue even when persistence is unavailable.
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    safetyTimerRef.current = window.setTimeout(finishIntro, SAFETY_TIMEOUT_MS);

    return () => {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
      if (safetyTimerRef.current !== null) window.clearTimeout(safetyTimerRef.current);
      if (hideFrameRef.current !== null) window.cancelAnimationFrame(hideFrameRef.current);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [finishIntro]);

  if (phase === "hidden") return null;

  return (
    <div
      aria-label="Senior Veor Collection açılışı"
      aria-modal="true"
      className={`site-intro fixed inset-0 z-[100] overflow-hidden bg-[#f4ede4] transition-opacity duration-[650ms] ease-out ${phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"}`}
      role="dialog"
    >
      <div aria-hidden="true" className={`absolute inset-0 grid place-items-center transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}>
        <div className="text-center text-[#725b3c]">
          <p className="font-display text-3xl tracking-[0.08em] uppercase">Senior Veor</p>
          <p className="mt-2 text-[0.5625rem] font-semibold tracking-[0.42em] uppercase">Collection</p>
          <span className="mx-auto mt-5 block h-px w-24 origin-left animate-pulse bg-brand-gold" />
        </div>
      </div>

      <video
        aria-label="Senior Veor Collection marka açılış videosu"
        autoPlay
        className={`relative h-full w-full object-cover transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
        muted
        onCanPlay={() => setIsReady(true)}
        onEnded={finishIntro}
        onError={finishIntro}
        playsInline
        preload="auto"
      >
        <source src="/videos/senior-veor-intro.mp4" type="video/mp4" />
      </video>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#182825]/10 via-transparent to-[#182825]/20" />
      <button
        className="absolute right-5 top-5 inline-flex min-h-10 items-center border border-white/55 bg-[#182825]/25 px-5 text-[0.625rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition-colors hover:bg-[#182825]/45 sm:right-8 sm:top-8"
        onClick={finishIntro}
        type="button"
      >
        Geç
      </button>
    </div>
  );
}
