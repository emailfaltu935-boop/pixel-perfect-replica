import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Heart, Sparkles, Trophy, Users } from "lucide-react";
import { EVENTS, images, pageMeta } from "@/lib/site";
import { Divider, Eyebrow, Reveal, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => pageMeta("A warm welcome awaits", "West End Riding Club: a friendly BHS-affiliated riding club in Mid Sussex, Area 13, based around Plumpton College."),
  component: Home,
});

const SLIDES = [images.hero1, images.hero2, images.hero3, images.hero4, images.lesson];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative h-[75vh] w-full overflow-hidden bg-navy md:h-[calc(100vh-76px)] md:max-h-[820px] md:min-h-[560px]">
      {SLIDES.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: idx === i ? 1 : 0, transform: idx === i ? "scale(1.06)" : "scale(1)", transition: "opacity 1.4s ease-in-out, transform 7s ease-out" }}
        />
      ))}
      <div className="overlay-left absolute inset-0" />
      <div className="overlay-bottom absolute inset-x-0 bottom-0 h-1/2 opacity-70" />
      <div className="container-site relative flex h-full flex-col justify-center pb-36 md:pb-32">
        <div className="enter-rise max-w-2xl" style={{ transitionDelay: "150ms" }}>
          <Eyebrow light>Area 13 BHS Affiliated Riding Club</Eyebrow>
          <h1 className="mt-5 text-cream" style={{ fontSize: "clamp(44px, 6vw, 84px)", lineHeight: 1.08 }}>A warm welcome awaits you</h1>
        </div>
        <p className="enter-rise mt-5 max-w-lg text-lg text-cream/85" style={{ transitionDelay: "300ms" }}>A friendly club in Mid Sussex, based around Plumpton College</p>
        <div className="enter-rise mt-8 flex flex-wrap gap-3" style={{ transitionDelay: "450ms" }}>
          <Link to="/membership" className="btn btn-gold">Join the Club</Link>
          <Link to="/lessons" className="btn btn-outline-cream">Book a Lesson</Link>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-4 md:bottom-8">
        <div className="container-site">
          <div className="mb-4 flex gap-2">
            {SLIDES.map((_, idx) => (
              <button key={idx} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-8 bg-gold" : "w-3 bg-cream/50"}`} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 rounded-2xl border border-cream/20 bg-navy/45 px-5 py-3 text-sm text-cream backdrop-blur-md sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-cream/20 sm:py-4 md:text-[15px]">
            <span className="flex items-center gap-2 sm:px-4"><CalendarDays className="h-4 w-4 text-gold" /> Next event: Training Camp, 11 Oct</span>
            <span className="hidden items-center gap-2 sm:flex sm:px-4"><Trophy className="h-4 w-4 text-gold" /> 50 years of friendly riding</span>
            <span className="hidden items-center gap-2 sm:flex sm:px-4"><Heart className="h-4 w-4 text-gold" /> All abilities welcome</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { icon: Users, title: "Friendly community", text: "A lovely bunch of people who cheer each other on, share lifts and always have the kettle on." },
  { icon: Heart, title: "All abilities welcome", text: "First rosette or fiftieth, happy hacker or keen competitor, there's a place for you here." },
  { icon: Sparkles, title: "Great events", text: "Training camps, dressage and showing at Plumpton College, plus socials through the year." },
];

const TILES = [
  { to: "/results", title: "Results", img: images.dressage },
  { to: "/lessons", title: "Lessons", img: images.lesson },
  { to: "/merchandise", title: "Merchandise", img: images.hero3 },
  { to: "/gallery", title: "Gallery", img: images.ponyHug },
  { to: "/history", title: "History", img: images.hero2 },
] as const;

function Home() {
  return (
    <>
      <Hero />

      <section className="section bg-cream">
        <div className="container-site grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md pb-10 pr-10">
            <div className="frame arch aspect-[4/5] shadow-lift"><img src={images.ponyHug} alt="A young rider hugging her pony" loading="lazy" /></div>
            <div className="frame absolute bottom-0 right-0 aspect-square w-40 rounded-full border-[6px] border-cream shadow-lift md:w-48"><img src={images.hero1} alt="A smiling rider" loading="lazy" /></div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="A little about us" title="Good people, happy horses and room to grow" />
            <Reveal delay={120}>
              <p className="mt-6 text-muted-foreground">
                West End Riding Club is a small friendly club based in Mid Sussex. In 2024 we celebrated our 50th Anniversary as an affiliated British Riding Club in Area 13. We base ourselves around Plumpton College where we hold dressage and showing shows during the year. We aim to be encouraging and supportive to all our members, whatever their ambitions.
              </p>
              <Link to="/history" className="btn btn-outline-navy mt-8">Our story <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider />

      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading center eyebrow="Why you'll love it here" title="Come and say hello" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WHY.map((w, idx) => (
              <Reveal key={w.title} delay={idx * 80}>
                <div className="card-lift h-full rounded-3xl border-t-2 border-t-gold bg-card p-8 shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/25 text-navy"><w.icon className="h-5 w-5" /></span>
                  <h3 className="mt-6 text-2xl text-navy">{w.title}</h3>
                  <p className="mt-3 text-muted-foreground">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container-site">
          <SectionHeading eyebrow="Upcoming events" title="Dates for the diary" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {EVENTS.map((e, idx) => (
              <Reveal key={e.title} delay={idx * 80}>
                <article className="card-lift flex h-full gap-6 rounded-3xl border bg-card p-8 shadow-soft md:gap-8">
                  <div className="shrink-0 border-r border-gold pr-6 text-center md:pr-8">
                    <div className="font-display text-6xl leading-none text-navy">{e.day}</div>
                    <div className="eyebrow mt-2 text-navy">{e.month} {e.year}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl text-navy">{e.title}</h3>
                    <p className="mt-3 text-muted-foreground">{e.text}</p>
                    <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-semibold text-navy nav-link">Find out more <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site">
          <SectionHeading eyebrow="Explore the club" title="Whatever your ambitions" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {TILES.map((t, idx) => (
              <Reveal key={t.to} delay={idx * 80} className={idx === 4 ? "col-span-2 md:col-span-1" : ""}>
                <Link to={t.to} className="card-lift frame group block aspect-[3/4] rounded-3xl shadow-soft">
                  <img src={t.img} alt="" loading="lazy" />
                  <div className="overlay-bottom absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <span className="font-display text-xl text-cream md:text-2xl">{t.title}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy grain overflow-hidden">
        <div className="container-site relative text-center">
          <Reveal>
            <div className="hairline mx-auto w-24" />
            <h2 className="mx-auto mt-8 max-w-2xl text-4xl text-cream md:text-6xl">Ready to join us?</h2>
            <p className="mx-auto mt-5 max-w-lg text-cream/80">Everyone's welcome. Become a member and be part of a club that's been riding together for fifty years.</p>
            <Link to="/membership" className="btn btn-gold mt-10">Join the Club <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
