import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "./ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`enter-rise sticky top-0 z-40 bg-cream transition-shadow duration-300 ${scrolled ? "shadow-soft" : ""}`}>
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[76px]">
        <Link to="/" className="flex h-full shrink-0 items-center" onClick={() => setOpen(false)}>
          <span className="lg:hidden"><Logo size={36} /></span>
          <span className="hidden lg:block"><Logo size={44} /></span>
        </Link>
        <nav className="hidden items-center gap-6 text-[15px] font-semibold text-navy lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link" activeOptions={{ exact: true }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/membership" className="btn btn-gold hidden !py-3 sm:inline-flex">Join</Link>
          <button aria-label="Menu" className="rounded-full p-2 text-navy lg:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div className={`overflow-hidden border-t bg-cream transition-[max-height] duration-500 lg:hidden ${open ? "max-h-[600px]" : "max-h-0 border-transparent"}`}>
        <nav className="container-site flex flex-col py-4 font-semibold text-navy">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border py-3 last:border-0" activeOptions={{ exact: true }} activeProps={{ className: "text-navy-soft" }}>{n.label}</Link>
          ))}
          <Link to="/membership" onClick={() => setOpen(false)} className="btn btn-gold mt-4">Join the Club</Link>
        </nav>
      </div>
    </header>
  );
}
