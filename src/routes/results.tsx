import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CLUB_NAME, pageMeta } from "@/lib/site";
import { PageHero, PlaceholderTag, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/results")({
  head: () => pageMeta("Results", `Latest dressage, showing and show jumping results from ${CLUB_NAME}.`),
  component: Results,
});

const DATA: Record<string, { cls: string; rider: string; horse: string; score: string }[]> = {
  Dressage: [
    { cls: "Intro A", rider: "Sarah Mitchell", horse: "Willow", score: "72.5%" },
    { cls: "Prelim 12", rider: "Emma Collins", horse: "Bramble", score: "70.1%" },
    { cls: "Novice 24", rider: "Jo Turner", horse: "Duke", score: "68.9%" },
    { cls: "DTM Prelim", rider: "Lucy Hart", horse: "Maple", score: "67.4%" },
  ],
  Showing: [
    { cls: "Riding Horse", rider: "Kate Ellis", horse: "Sovereign", score: "1st" },
    { cls: "Cob", rider: "Hannah Brooks", horse: "Barney", score: "1st" },
    { cls: "Veteran", rider: "Anne Price", horse: "Rosie", score: "2nd" },
    { cls: "Young Handler", rider: "Millie Shaw", horse: "Pickle", score: "1st" },
  ],
  "Show Jumping": [
    { cls: "70cm", rider: "Grace Owen", horse: "Pepper", score: "Clear 32.4s" },
    { cls: "80cm", rider: "Ben Ward", horse: "Ziggy", score: "Clear 30.9s" },
    { cls: "90cm", rider: "Chloe Reid", horse: "Tango", score: "4 faults" },
    { cls: "1m", rider: "Amy Lewis", horse: "Rocket", score: "Clear 29.1s" },
  ],
};

function Results() {
  const tabs = Object.keys(DATA);
  const [tab, setTab] = useState<string>(tabs[0] ?? "Dressage");
  return (
    <>
      <PageHero eyebrow="Results" title="Celebrating every ride" intro="Results from our recent shows. Well done to everyone who took part!" />
      <section className="section bg-cream">
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex rounded-full border bg-card p-1 shadow-soft">
              {tabs.map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === t ? "bg-navy text-cream" : "text-navy hover:bg-mist"}`}>{t}</button>
              ))}
            </div>
            <PlaceholderTag>Sample results</PlaceholderTag>
          </div>
          <Reveal key={tab} className="mt-10 overflow-hidden rounded-3xl border bg-card shadow-soft">
            <div className="hidden grid-cols-4 bg-mist px-8 py-4 eyebrow text-navy md:grid"><span>Class</span><span>Rider</span><span>Horse</span><span className="text-right">Result</span></div>
            {(DATA[tab] ?? []).map((r, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-1 border-t px-8 py-5 md:grid-cols-4 md:items-center">
                <span className="font-display text-lg text-navy">{r.cls}</span>
                <span className="text-right md:text-left">{r.rider}</span>
                <span className="text-muted-foreground">{r.horse}</span>
                <span className="text-right font-semibold text-navy"><span className="rounded-full bg-gold/30 px-3 py-1">{r.score}</span></span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
