import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin } from "lucide-react";
import { CLUB_NAME, NAV } from "@/lib/site";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="relative bg-navy text-cream">
      <div className="hairline" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        <div>
          <Logo variant="badge" size={140} />
          <p className="mt-6 max-w-xs text-cream/75">A small, friendly BHS-affiliated riding club in Mid Sussex, Area 13. Everyone's welcome.</p>
        </div>
        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-5 grid grid-cols-2 gap-y-2 text-cream/85">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="nav-link">{n.label}</Link></li>)}
            <li><Link to="/constitution" className="nav-link">Constitution</Link></li>
          </ul>
        </div>
        <div className="space-y-4 text-cream/85">
          <p className="eyebrow text-gold">Say hello</p>
          <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" /> Plumpton College, Mid Sussex</p>
          <p className="flex gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-gold" /> hello@example.com (placeholder)</p>
          <a href="#" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 transition-colors hover:bg-gold hover:text-navy"><Facebook className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col justify-between gap-2 py-6 text-sm text-cream/60 md:flex-row">
          <span>© {new Date().getFullYear()} {CLUB_NAME}</span>
          <span>Photography by PDG Photography</span>
        </div>
      </div>
    </footer>
  );
}
