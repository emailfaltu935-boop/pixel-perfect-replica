import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { CLUB_NAME, images, pageMeta } from "@/lib/site";
import { PageHero, Reveal, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/membership")({
  head: () => pageMeta("Membership", `Join ${CLUB_NAME}: friendly training, competitions and community for riders of every level.`),
  component: Membership,
});

const PERKS = ["Discounted entries to club shows at Plumpton College", "Training camps and clinics with fantastic trainers", "Represent the club at Area 13 competitions", "BRC membership benefits and insurance", "Socials, lifts and lifelong friends"];

function Membership() {
  const [going, setGoing] = useState(false);
  return (
    <>
      <PageHero eyebrow="Membership" title="Become part of the family" intro="Whether you're a happy hacker or chasing your first rosette, membership is your way in." />
      <section className="section bg-cream">
        <div className="container-site grid items-center gap-14 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What it means" title="More than a club card" intro={`Being a member of ${CLUB_NAME} means having people in your corner. We're encouraging and supportive, whatever your ambitions.`} />
            <Reveal delay={100}>
              <ul className="mt-8 space-y-3">
                {PERKS.map((p) => (
                  <li key={p} className="flex gap-3"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-navy"><Check className="h-3 w-3" /></span>{p}</li>
                ))}
              </ul>
              <div className="mt-10">
                {going ? (
                  <div className="route-fade inline-flex items-center gap-3 rounded-full border border-navy/20 bg-mist px-6 py-3 font-semibold text-navy">
                    <Loader2 className="h-4 w-4 animate-spin" /> Taking you to British Riding Clubs...
                  </div>
                ) : (
                  <button onClick={() => setGoing(true)} className="btn btn-gold">Join via British Riding Clubs</button>
                )}
              </div>
            </Reveal>
          </div>
          <Reveal className="mx-auto w-full max-w-md">
            <div className="frame arch aspect-[4/5] shadow-lift"><img src={images.hero2} alt="Young rider and her mum with a pony" /></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
