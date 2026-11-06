import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, MapPin } from "lucide-react";
import { CLUB_NAME, pageMeta } from "@/lib/site";
import { PageHero, Reveal, Success } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact", `Get in touch with ${CLUB_NAME} in Mid Sussex.`),
  component: Contact,
});

const field = "mt-2 w-full rounded-xl border border-input bg-cream px-4 py-3 outline-none transition focus:border-navy focus:ring-2 focus:ring-gold/50";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you" intro="Questions about joining, lessons or events? Drop us a line." />
      <section className="section bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {sent ? (
              <Success title="Message sent!">Thanks for getting in touch. Someone from the club will be back to you soon.</Success>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl border bg-card p-8 shadow-soft md:p-10">
                <label className="block font-semibold text-navy">Name<input required className={field} /></label>
                <label className="mt-5 block font-semibold text-navy">Email<input required type="email" className={field} /></label>
                <label className="mt-5 block font-semibold text-navy">Message<textarea required rows={5} className={field} /></label>
                <button className="btn btn-gold mt-8">Send message</button>
              </form>
            )}
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl bg-navy p-8 text-cream shadow-lift md:p-10">
              <p className="eyebrow text-gold">Find us</p>
              <h3 className="mt-4 text-3xl">Plumpton College</h3>
              <p className="mt-3 flex gap-3 text-cream/80"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" /> Ditchling Road, Plumpton, Mid Sussex</p>
              <div className="my-8 h-px bg-cream/15" />
              <p className="text-cream/80">Follow {CLUB_NAME} for news, photos and event updates.</p>
              <a href="#" className="btn btn-outline-cream mt-6"><Facebook className="h-4 w-4" /> Facebook (placeholder)</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
