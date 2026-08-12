import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

import { loadScriptOnce } from "@/lib/load-script-once";
import "@/components/emarea/landing-immersive.css";

// Vidéo drone fournie par le client (générée via Google Flow — voir assets/SOURCES.md
// §6). Importée par URL Vite depuis assets/ (dossier de sourcing, hors src/).
import heroVideoUrl from "../../../assets/property-01/hero-drone-entrepot.mp4?url";

/**
 * Fond vidéo scroll-scratch de toute la landing ("/"). Généralise le pattern initialement
 * confiné au hero (hero-scrub.tsx, désormais supprimé) à la hauteur complète de la page :
 * un seul ScrollTrigger, `trigger` = le conteneur de toute la page d'accueil (passé en prop),
 * `start: "top top"`, `end: "bottom bottom"`, `scrub: true`. video.currentTime suit
 * directement `self.progress` — pas d'autoplay, pas de pin (la vidéo est déjà fixed via le
 * portail, le contenu défile normalement par-dessus).
 *
 * Rendu par `createPortal` dans `document.body` pour échapper à tout ancêtre qui poserait un
 * `transform` (le motion.div de PageTransition en est un — framer-motion laisse `transform`
 * en style inline même revenu à l'identité) et casserait `position: fixed`.
 *
 * Coupé sur mobile et prefers-reduced-motion (cf. landing-immersive.css) : la vidéo reste dans
 * le DOM mais masquée, le contenu redevient un fond uni.
 */
export function LandingBackground({
  pageRef,
  illustrationLabel,
}: {
  pageRef: RefObject<HTMLElement | null>;
  illustrationLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scrollTriggerInstance: any;

    async function init() {
      try {
        await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
        await loadScriptOnce(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
        );
        if (cancelled) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gsap = (window as any).gsap;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ScrollTrigger = (window as any).ScrollTrigger;
        if (!gsap || !ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        const video = videoRef.current;
        const fill = fillRef.current;
        const trigger = pageRef.current;
        if (!video || !fill || !trigger) return;

        video.pause();

        function start() {
          if (!video || !fill || cancelled) return;
          const dur = video.duration;
          if (!dur || Number.isNaN(dur)) return;

          scrollTriggerInstance = ScrollTrigger.create({
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onUpdate: (self: any) => {
              video.currentTime = self.progress * dur;
              fill.style.width = `${self.progress * 100}%`;
            },
          });
        }

        if (video.readyState >= 1) start();
        else video.addEventListener("loadedmetadata", start, { once: true });
      } catch {
        // Échec de chargement CDN GSAP/ScrollTrigger : le CSS de secours (fond uni, vidéo
        // masquée) reste actif — pas d'erreur visible pour l'utilisateur.
      }
    }

    void init();

    return () => {
      cancelled = true;
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [pageRef]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div className="landing-immersive-fixed-video" aria-hidden="true">
        <video
          id="landingImmersiveVideo"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="landing-immersive-overlay" />
        <div className="landing-immersive-grid hairline-grid opacity-[0.14]" />
      </div>
      <div className="landing-immersive-progress" aria-hidden="true">
        <div className="landing-immersive-progress-fill" ref={fillRef} />
      </div>
      <p className="landing-immersive-illustration-badge label-caps bg-background/95 px-3 py-2 text-warning">
        {illustrationLabel}
      </p>
    </>,
    document.body,
  );
}
