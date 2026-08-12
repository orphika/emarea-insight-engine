/**
 * Charge un <script src> une seule fois et résout une fois chargé (réutilise l'instance
 * existante si déjà présente dans le document, ex. React StrictMode double-effect en dev).
 */
export function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset["loaded"] === "true") {
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
      script.dataset["loaded"] = "true";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error(`Échec de chargement: ${src}`)));
    document.head.appendChild(script);
  });
}
