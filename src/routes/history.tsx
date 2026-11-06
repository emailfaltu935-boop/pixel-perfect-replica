import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { HeartHandshake, Sprout, Users } from "lucide-react";
import { CLUB_NAME, images, pageMeta } from "@/lib/site";
import { PageHero, PlaceholderTag, Reveal, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/history")({
  head: () => pageMeta("Our History", `Fifty years of friendly riding: the story of ${CLUB_NAME}, Area 13.`),
  component: History,
});

const MILESTONES = [
  { year: "1974", title: "The club is founded", text: "A handful of local riders come together. Founding details to be confirmed.", ph: true },
  { year: "1990s", title: "Growing together", text: "Membership grows and regular shows begin. Placeholder copy.", ph: true },
  { year: "2000s", title: "A home at Plumpton College", text: "Dressage and showing at Plumpton becomes part of the calendar. Placeholder copy.", ph: true },
  { year: "2024", title: "50th Anniversary", text: "We celebrate fifty years as an affiliated British Riding Club in Area 13.", ph: false },
  { year: "Today", title: "Still friendly, still growing", text: "Encouraging and supportive to all our members, whatever their ambitions.", ph: false },
];

const VALUES = [
  { icon: Users, title: "Community", text: "We look out for each other, at shows and at home." },
  { icon: HeartHandshake, title: "All abilities", text: "Every rider is welcome, whatever their ambitions." },
  { icon: Sprout, title: "Grassroots support", text: "Encouragement for first steps and big goals alike." },
];

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative mt-14 pl-10 md:pl-14">
      <div className={`timeline-line absolute bottom-2 left-3 top-2 w-px bg-gold md:left-5 ${vis ? "is-visible" : ""}`} />
      <ol className="space-y-10">
        {MILESTONES.map((m, i) => (
          <Reveal as="li" key={m.year} delay={i * 150} className="relative">
            <span className="absolute -left-[35px] top-2 h-3 w-3 rounded-full border-2 border-gold bg-cream md:-left-[43px]" />
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-display text-3xl text-navy">{m.year}</span>
              {m.ph && <PlaceholderTag />}
            </div>
            <h3 className="mt-1 text-xl text-navy">{m.title}</h3>
            <p className="mt-1 text-muted-foreground">{m.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function History() {
  return (
    <>
      <PageHero eyebrow="Our history" title="Fifty years of friendly riding" intro={`${CLUB_NAME} is a friendly BHS-affiliated club in Mid Sussex, Area 13, based around Plumpton College.`} />
      <section className="section bg-cream">
        <div className="container-site grid items-center gap-14 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Where it all began" />
            <Reveal delay={100}>
              <div className="mt-4"><PlaceholderTag /></div>
              <p className="mt-5 text-muted-foreground">This is where the club's founding story will live: who started it, why, and the people and horses who shaped it over the years. We'd love to hear memories from long-standing members to fill this in.</p>
            </Reveal>
          </div>
          <Reveal className="mx-auto w-full max-w-md"><div className="frame arch aspect-[4/5] shadow-lift"><img src={images.hero3} alt="Club members at the yard" loading="lazy" /></div></Reveal>
        </div>
      </section>
      <section className="section bg-mist">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="Milestones" title="Through the years" />
          <Timeline />
        </div>
      </section>
      <section className="section bg-sand">
        <div className="container-site">
          <SectionHeading center eyebrow="What we stand for" title="Encouraging and supportive" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-3xl border-t-2 border-t-gold bg-card p-8 text-center shadow-soft">
                  <v.icon className="mx-auto h-7 w-7 text-navy" strokeWidth={1.5} />
                  <h3 className="mt-5 text-2xl text-navy">{v.title}</h3>
                  <p className="mt-3 text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-navy grain overflow-hidden">
        <div className="container-site relative text-center">
          <Reveal>
            <div className="hairline mx-auto w-16" />
            <blockquote className="mx-auto mt-8 max-w-3xl font-display text-3xl italic leading-snug text-cream md:text-4xl">
              "We aim to be encouraging and supportive to all our members, whatever their ambitions."
            </blockquote>
          </Reveal>
        </div>
      </section>
    </>
  );
}
