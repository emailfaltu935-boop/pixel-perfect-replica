import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CLUB_NAME, images, pageMeta } from "@/lib/site";
import { PageHero, PlaceholderTag, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/gallery")({
  head: () => pageMeta("Gallery", `Photos from shows, training and yard days at ${CLUB_NAME}.`),
  component: Gallery,
});

const PICS = [images.hero1, images.ponyHug, images.hero3, images.dressage, images.hero2, images.lesson, images.hero4, images.paddock];

function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <PageHero eyebrow="Gallery" title="Moments from the yard" intro="Smiles, rosettes and muddy boots." />
      <section className="section bg-cream">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground">Photography by PDG Photography</p>
            <PlaceholderTag>Placeholder images</PlaceholderTag>
          </div>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {PICS.map((src, i) => (
              <Reveal key={i} delay={(i % 3) * 80} className="mb-5 break-inside-avoid">
                <button onClick={() => setActive(src)} className="frame group block w-full rounded-3xl shadow-soft">
                  <img src={src} alt={`${CLUB_NAME} photo ${i + 1}`} loading="lazy" className="transition-transform duration-700 group-hover:scale-105" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {active && (
        <div className="route-fade fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-6 backdrop-blur" onClick={() => setActive(null)}>
          <button aria-label="Close" className="absolute right-6 top-6 text-cream"><X className="h-7 w-7" /></button>
          <div className="frame max-h-[85vh] max-w-5xl rounded-2xl"><img src={active} alt="" className="!h-auto max-h-[85vh] !object-contain" /></div>
        </div>
      )}
    </>
  );
}
