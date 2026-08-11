import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { CtaLink, DemoTag } from "@/components/emarea/shell";
import "@/components/emarea/hero-scrub.css";

// Vidéo drone fournie par le client (générée via Google Flow — voir assets/SOURCES.md
// §6). Importée par URL Vite depuis assets/ (dossier de sourcing, hors src/), pas de
// build step manuel requis.
import heroVideoUrl from "../../../assets/property-01/hero-drone-entrepot.mp4?url";

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(`Échec de chargement: ${src}`)));
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error(`Échec de chargement: ${src}`)));
    document.head.appendChild(script);
  });
}

/**
 * Hero de la page d'accueil, fond vidéo piloté par le scroll (scrub).
 *
 * Pattern repris à l'identique de deux implémentations déjà éprouvées dans le vault
 * (voir commentaire en tête de hero-scrub.css) : bloc épinglé (pin) le temps du scroll,
 * scrub:true, et video.currentTime réglé directement dans onUpdate du ScrollTrigger —
 * pas d'autoplay, la lecture avance/recule avec le sens du scroll.
 *
 * GSAP/ScrollTrigger sont chargés depuis un CDN au montage (uniquement côté client,
 * dans useEffect — jamais exécuté pendant le SSR TanStack Start) plutôt qu'installés en
 * dépendance npm, pour rester fidèle au pattern de référence. Coupé sur mobile et en
 * prefers-reduced-motion : le CSS de secours masque la vidéo et republie le hero en
 * contenu statique (voir hero-scrub.css).
 */
export function HeroScrub() {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (reduceMotion || isMobile) return;

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
        const block = blockRef.current;
        const sticky = stickyRef.current;
        if (!video || !fill || !block || !sticky) return;

        video.pause();

        function start() {
          if (!video || !fill || cancelled) return;
          const dur = video.duration;
          if (!dur || Number.isNaN(dur)) return;

          scrollTriggerInstance = ScrollTrigger.create({
            trigger: block,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: sticky,
            anticipatePin: 1,
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
        // Échec de chargement CDN GSAP/ScrollTrigger : le CSS de secours (contenu
        // statique, vidéo masquée) reste actif — pas d'erreur visible pour l'utilisateur.
      }
    }

    void init();

    return () => {
      cancelled = true;
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <div className="hero-scrub-block border-b border-border" ref={blockRef} id="heroScrubBlock">
      <div className="hero-scrub-sticky" ref={stickyRef}>
        <video
          id="heroScrubVideo"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="hero-scrub-overlay" aria-hidden="true" />
        <div className="hero-scrub-grid hairline-grid opacity-[0.18]" aria-hidden="true" />
        <div className="hero-scrub-progress">
          <div className="hero-scrub-progress-fill" ref={fillRef} />
        </div>

        <div className="hero-scrub-content">
          <div className="mx-auto max-w-7xl px-5 py-20 md:py-32">
            <DemoTag>Prototype conceptuel — non contractuel</DemoTag>
            <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">
              Et si chaque bien EMAREA devenait un actif digital exploitable&nbsp;?
            </h1>
            <p className="mt-6 max-w-2xl font-display text-xl text-muted-foreground md:text-2xl">
              Centraliser. Présenter. Qualifier. Trouver plus vite.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CtaLink to="/portefeuille">
                Voir la démonstration
                <ArrowRight className="h-4 w-4" />
              </CtaLink>
              <CtaLink to="/roadmap" variant="ghost">
                Comprendre le fonctionnement
              </CtaLink>
            </div>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Cette démonstration ne présente pas un site vitrine. Elle montre la couche
              d'information qui pourrait se trouver derrière la présence digitale d'un cabinet
              d'immobilier d'entreprise.
            </p>
          </div>
        </div>

        <p className="hero-scrub-illustration-badge label-caps bg-background/95 px-3 py-2 text-warning">
          Vidéo — illustration générée (non tournée sur un site EMAREA)
        </p>
      </div>
    </div>
  );
}
