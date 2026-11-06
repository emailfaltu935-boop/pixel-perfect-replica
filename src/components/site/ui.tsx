import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import logo from "@/assets/logo.png.asset.json";
import badge from "@/assets/logo-badge-cream.webp.asset.json";
import { CLUB_NAME } from "@/lib/site";

export function Logo({ size = 44, variant = "wide", className = "", style }: { size?: number | string; variant?: "wide" | "badge"; className?: string; style?: CSSProperties }) {
  const src = variant === "badge" ? badge.url : logo.url;
  const dim = variant === "badge" ? { width: size, height: "auto" } : { height: size, width: "auto" };
  return <img src={src} alt={CLUB_NAME} className={className} style={{ ...dim, objectFit: "contain", display: "block", maxWidth: "100%", ...style }} />;
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = Tag as "div";
  return (
    <T ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </T>
  );
}

export function Eyebrow({ children, light = false, center = false }: { children: ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${light ? "text-cream" : "text-navy"}`}>
      <span className="hairline w-8" />
      <span>{children}</span>
      {center && <span className="hairline w-8" />}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, intro, center = false, light = false }: { eyebrow: string; title: ReactNode; intro?: ReactNode; center?: boolean; light?: boolean }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <Eyebrow light={light} center={center}>{eyebrow}</Eyebrow>
      <h2 className={`mt-5 text-4xl md:text-5xl ${light ? "text-cream" : "text-navy"}`}>{title}</h2>
      {intro && <p className={`mt-5 ${light ? "text-cream/80" : "text-muted-foreground"}`}>{intro}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28 grain">
      <div className="container-site relative">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="anim-rise mt-5 max-w-3xl text-5xl text-cream md:text-6xl">{title}</h1>
        <div className="anim-line hairline mt-8 w-24 origin-left" style={{ animationDelay: ".3s" }} />
        {intro && <p className="anim-rise mt-6 max-w-2xl text-cream/80" style={{ animationDelay: ".2s" }}>{intro}</p>}
      </div>
    </section>
  );
}

export function Tick() {
  return (
    <svg viewBox="0 0 64 64" className="mx-auto h-20 w-20" aria-hidden>
      <circle className="tick-circle fill-gold" cx="32" cy="32" r="30" style={{ transformOrigin: "center" }} />
      <path className="tick-path stroke-navy" d="M20 33 l8 8 l16 -18" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Success({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="route-fade mx-auto max-w-lg rounded-3xl border bg-card p-10 text-center shadow-soft">
      <Tick />
      <h2 className="mt-6 text-3xl text-navy">{title}</h2>
      <div className="mt-4 text-muted-foreground">{children}</div>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export function Divider() {
  return (
    <Reveal className="flex items-center justify-center gap-4 bg-background py-2" >
      <span className="hairline w-16 opacity-70" />
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-navy/70" aria-hidden>
        <path d="M12 3c-4 0-7 3.2-7 7.5 0 3.3 1.7 6.3 3.2 8.5h2.3l-.6-3h4.2l-.6 3h2.3c1.5-2.2 3.2-5.2 3.2-8.5C19 6.2 16 3 12 3zm0 3.2c2.3 0 4 1.9 4 4.3 0 1.4-.4 2.8-1 4.1H9c-.6-1.3-1-2.7-1-4.1 0-2.4 1.7-4.3 4-4.3z" />
      </svg>
      <span className="hairline w-16 opacity-70" />
    </Reveal>
  );
}

export function PlaceholderTag({ children = "Placeholder" }: { children?: ReactNode }) {
  return <span className="eyebrow inline-block rounded-full border border-navy/20 bg-mist px-3 py-1 text-[11px] text-navy">{children}</span>;
}
