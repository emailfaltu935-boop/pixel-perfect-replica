import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { CLUB_NAME, pageMeta } from "@/lib/site";
import { PageHero, Success } from "@/components/site/ui";

export const Route = createFileRoute("/lessons")({
  head: () => pageMeta("Book a Lesson", `Book a friendly riding lesson with ${CLUB_NAME} in Mid Sussex.`),
  component: Lessons,
});

const SLOTS = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00"];
const FEE = 45;
const WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function Lessons() {
  const [offset, setOffset] = useState(0);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const base = new Date(2026, 9 + offset, 1);
  const monthLabel = base.toLocaleString("en-GB", { month: "long", year: "numeric" });
  const cells = useMemo(() => {
    const first = (base.getDay() + 6) % 7;
    const days = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  }, [offset]);
  const available = (d: number) => (d * 7 + offset) % 3 !== 0;

  return (
    <>
      <PageHero eyebrow="Lessons" title="Book a lesson" intro="Pick a day and time that suits you. Our instructors will make you feel right at home." />
      <section className="section bg-mist">
        <div className="container-site">
          {done ? (
            <Success title="You're booked in!" action={<Link to="/" className="btn btn-gold">Back to home</Link>}>
              We'll see you on {day} {monthLabel} at {slot}. A confirmation would be emailed to you in the real site.
            </Success>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr_0.9fr]">
              <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl text-navy">{monthLabel}</h3>
                  <div className="flex gap-2">
                    <button aria-label="Previous month" disabled={offset === 0} onClick={() => { setOffset(offset - 1); setDay(null); }} className="rounded-full border p-2 disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
                    <button aria-label="Next month" onClick={() => { setOffset(offset + 1); setDay(null); }} className="rounded-full border p-2"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-7 gap-1 text-center">
                  {WEEK.map((w) => <span key={w} className="eyebrow py-2 text-[11px] text-muted-foreground">{w}</span>)}
                  {cells.map((d, i) => d === null ? <span key={i} /> : (
                    <button key={i} disabled={!available(d)} onClick={() => { setDay(d); setSlot(null); }}
                      className={`aspect-square rounded-full text-sm font-semibold transition-colors ${day === d ? "bg-navy text-cream" : available(d) ? "bg-gold/20 text-navy hover:bg-gold" : "text-muted-foreground/40"}`}>{d}</button>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-8">
                <h3 className="text-2xl text-navy">Times</h3>
                {day ? (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {SLOTS.map((s) => (
                      <button key={s} onClick={() => setSlot(s)} className={`rounded-xl border px-4 py-3 font-semibold transition-colors ${slot === s ? "border-navy bg-navy text-cream" : "border-navy/20 text-navy hover:border-navy"}`}>{s}</button>
                    ))}
                  </div>
                ) : <p className="mt-6 text-muted-foreground">Choose a highlighted day to see available times.</p>}
              </div>
              <div className="rounded-3xl bg-navy p-6 text-cream shadow-lift md:p-8">
                <p className="eyebrow text-gold">Summary</p>
                <h3 className="mt-4 text-2xl">Private lesson</h3>
                <p className="mt-2 flex items-center gap-2 text-cream/75"><Clock className="h-4 w-4" /> 45 minutes</p>
                <div className="my-6 h-px bg-cream/15" />
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-cream/70">Date</dt><dd>{day ? `${day} ${monthLabel}` : "—"}</dd></div>
                  <div className="flex justify-between"><dt className="text-cream/70">Time</dt><dd>{slot ?? "—"}</dd></div>
                  <div className="flex justify-between text-lg"><dt>Total</dt><dd className="font-display">£{FEE}.00</dd></div>
                </dl>
                <button disabled={!day || !slot} onClick={() => setDone(true)} className="btn btn-gold mt-8 w-full disabled:pointer-events-none disabled:opacity-40">Pay & Confirm Booking</button>
                <p className="mt-3 text-center text-xs text-cream/60">Demo only, no payment is taken. {CLUB_NAME}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
