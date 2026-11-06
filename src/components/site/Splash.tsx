import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/site";
import { Logo } from "./ui";

export function Splash({ onEnter, onDone }: { onEnter: () => void; onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    onEnter();
    window.setTimeout(onDone, 2050);
  };
  return (
    <div onClick={enter} className={`splash fixed inset-0 z-50 cursor-pointer overflow-hidden bg-navy ${leaving ? "is-leaving" : ""}`} role="dialog" aria-label="Welcome">
      <div className="splash-bg absolute inset-0">
        <div className="frame absolute inset-0"><img src={images.paddock} alt="" className="kenburns" /></div>
        <div className="absolute inset-0" style={{ background: "var(--overlay-splash)" }} />
        <div className="grain absolute inset-0" />
      </div>
      <div className="anim-fade pointer-events-none absolute inset-4 border border-gold/40 md:inset-6" />
      <p className="anim-fade eyebrow absolute inset-x-0 top-10 text-center text-[10px] text-cream md:top-12 md:text-[11px]" style={{ animationDelay: ".3s" }}>
        Area 13 &nbsp;·&nbsp; BHS Affiliated &nbsp;·&nbsp; Mid Sussex
      </p>
      <div className="splash-stack relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="anim-logo" style={{ animationDelay: ".4s", width: "clamp(180px, 22vw, 280px)" }}>
          <Logo variant="badge" size="100%" />
        </div>
        <div className="anim-line hairline mt-8 w-[60px]" style={{ animationDelay: "1s" }} />
        <p className="anim-rise eyebrow mt-6 text-cream/85" style={{ animationDelay: "1.2s" }}>Welcome to</p>
        <h1 className="anim-rise mt-3 text-cream" style={{ animationDelay: "1.35s", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.1 }}>
          West End <em className="font-normal italic">Riding Club</em>
        </h1>
        <p className="anim-rise mt-4 text-lg text-cream/85" style={{ animationDelay: "1.6s" }}>Where every rider is welcome</p>
        <button
          onClick={(e) => { e.stopPropagation(); enter(); }}
          className="anim-rise group mt-10 inline-flex items-center gap-3 rounded-full border border-gold px-8 py-3.5 text-cream transition-colors duration-500 hover:bg-gold hover:text-navy"
          style={{ animationDelay: "2.1s" }}
        >
          <span className="eyebrow">Enter</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
        </button>
        <p className="anim-fade mt-4 text-xs text-cream/60" style={{ animationDelay: "2.4s" }}>Click anywhere to come in</p>
      </div>
    </div>
  );
}
