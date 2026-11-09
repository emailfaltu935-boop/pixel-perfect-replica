import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { images } from "@/lib/site";
import logo from "@/assets/logo.png";

export function Splash({ onEnter, onDone }: { onEnter: () => void; onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    onEnter();
    window.setTimeout(onDone, 2050);
  };
  return (
    <div
      onClick={enter}
      className={`splash fixed inset-0 z-50 flex min-h-[100svh] cursor-pointer flex-col justify-between overflow-hidden p-6 md:p-8 ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-label="Welcome"
    >
      {/* background photo + warm glow */}
      <div className="splash-bg absolute inset-0 -z-10">
        <div className="frame absolute inset-0"><img src={images.paddock} alt="" className="kenburns" /></div>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,253,247,0.92) 0%, rgba(255,253,247,0.35) 100%)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(255,207,1,0.05)" }} />
      </div>

      {/* top zone */}
      <p className="anim-fade eyebrow text-center text-[12px] font-semibold tracking-[0.2em] text-navy" style={{ animationDelay: ".2s" }}>
        Area 13 &nbsp;·&nbsp; BHS Affiliated &nbsp;·&nbsp; Mid Sussex
      </p>

      {/* centre zone */}
      <div className="splash-stack flex flex-1 flex-col items-center justify-center gap-6 py-6 text-center">
        <div className="anim-logo" style={{ animationDelay: ".4s" }}>
          <img
            src={logo}
            alt="West End Riding Club"
            style={{ height: "clamp(90px, 16vh, 150px)", width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>
        <div className="anim-line hairline w-[60px]" style={{ animationDelay: ".8s" }} />
        <p className="anim-rise eyebrow text-navy/80" style={{ animationDelay: ".95s" }}>Welcome to</p>
        <h1 className="anim-rise text-navy" style={{ animationDelay: "1.1s", fontSize: "clamp(36px, 5.5vw, 68px)", lineHeight: 1.1 }}>
          West End <em className="font-normal italic">Riding Club</em>
        </h1>
        <p className="anim-rise max-w-[520px] text-lg text-navy/80" style={{ animationDelay: "1.3s" }}>
          Come and say hello. Everyone's welcome, whatever your ambitions.
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); enter(); }}
          className="splash-cta anim-rise group mt-2 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 font-sans text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5"
          style={{ animationDelay: "1.7s" }}
        >
          Come on in
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      </div>

      {/* bottom zone */}
      <p className="anim-fade flex items-center justify-center gap-1.5 text-xs text-navy/70" style={{ animationDelay: "2.1s" }}>
        Click anywhere to come in
        <ChevronDown className="splash-bounce h-3.5 w-3.5" />
      </p>
    </div>
  );
}
