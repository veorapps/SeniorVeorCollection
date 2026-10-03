"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_STORAGE_KEY = "senior-veor:intro:v1";
const EXIT_DURATION_MS = 650;
const SAFETY_TIMEOUT_MS = 30_000;

type IntroPhase = "visible" | "leaving" | "hidden";

export function FirstVisitIntro() {
  const [phase, setPhase] = useState<IntroPhase>("visible");
  const [isReady, setIsReady] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const phaseRef = useRef<IntroPhase>("visible");
  const videoRef = useRef<HTMLVideoElement>(null);
  const forcePreviewRef = useRef(false);
  const hasPersistedRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);
  const hideFrameRef = useRef<number | null>(null);
  const previousOverflowRef = useRef("");

  const persistIntroSeen = useCallback(() => {
    if (hasPersistedRef.current || forcePreviewRef.current) return;

    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "seen");
      hasPersistedRef.current = true;
    } catch {
      // The current visit can continue even when persistence is unavailable.
    }
  }, []);

  const finishIntro = useCallback(() => {
    if (phaseRef.current !== "visible") return;

    persistIntroSeen();
    phaseRef.current = "leaving";
    setPhase("leaving");
    exitTimerRef.current = window.setTimeout(() => {
      phaseRef.current = "hidden";
      setPhase("hidden");
      document.body.style.overflow = previousOverflowRef.current;
    }, EXIT_DURATION_MS);
  }, [persistIntroSeen]);

  useEffect(() => {
    forcePreviewRef.current = new URLSearchParams(window.location.search).get("intro") === "1";
    let hasSeenIntro = !forcePreviewRef.current && document.documentElement.dataset.introSeen === "true";

    try {
      hasSeenIntro ||= !forcePreviewRef.current && window.localStorage.getItem(INTRO_STORAGE_KEY) === "seen";
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

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    safetyTimerRef.current = window.setTimeout(finishIntro, SAFETY_TIMEOUT_MS);

    const video = videoRef.current;
    if (video) {
      void video.play().catch(() => setNeedsInteraction(true));
    }

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
        className={`relative h-full w-full object-cover object-bottom transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
        muted
        onCanPlay={() => {
          const video = videoRef.current;
          if (video?.paused) {
            void video.play().catch(() => setNeedsInteraction(true));
          }
        }}
        onEnded={finishIntro}
        onError={finishIntro}
        onPlaying={() => {
          setIsReady(true);
          setNeedsInteraction(false);
          persistIntroSeen();
        }}
        playsInline
        preload="auto"
        ref={videoRef}
      >
        <source src="/videos/senior-veor-intro.mp4" type="video/mp4" />
      </video>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#182825]/10 via-transparent to-[#182825]/20" />
      {needsInteraction ? (
        <button
          className="absolute left-1/2 top-1/2 min-h-12 -translate-x-1/2 -translate-y-1/2 border border-white/70 bg-[#073f3d]/85 px-8 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition-colors hover:bg-[#073f3d]"
          onClick={() => {
            void videoRef.current?.play().catch(finishIntro);
          }}
          type="button"
        >
          Açılışı Başlat
        </button>
      ) : null}
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
