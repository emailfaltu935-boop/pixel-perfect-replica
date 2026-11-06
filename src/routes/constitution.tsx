import { createFileRoute } from "@tanstack/react-router";
import { CLUB_NAME, pageMeta } from "@/lib/site";
import { PageHero, PlaceholderTag } from "@/components/site/ui";

export const Route = createFileRoute("/constitution")({
  head: () => pageMeta("Constitution", `The constitution of ${CLUB_NAME}.`),
  component: Constitution,
});

const SECTIONS = [
  ["Name", `The club shall be called ${CLUB_NAME} and is affiliated to British Riding Clubs, Area 13.`],
  ["Objects", "To encourage and support riders of all abilities, and to promote the welfare of horses and ponies."],
  ["Membership", "Membership is open to all who support the objects of the club, subject to the payment of an annual subscription."],
  ["Committee", "The affairs of the club shall be managed by an elected committee, meeting at regular intervals."],
  ["General Meetings", "An Annual General Meeting shall be held each year to receive reports and elect officers."],
  ["Finance", "All monies shall be held in a club bank account and accounts presented at the AGM."],
  ["Amendments", "This constitution may be amended by a two-thirds majority at a general meeting."],
];

function Constitution() {
  return (
    <>
      <PageHero eyebrow="Club documents" title="Constitution" />
      <section className="section bg-mist">
        <div className="container-site">
          <article className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-soft md:p-14">
            <PlaceholderTag>Placeholder text</PlaceholderTag>
            <ol className="mt-8 space-y-8">
              {SECTIONS.map(([t, body], i) => (
                <li key={t}>
                  <h2 className="text-2xl text-navy"><span className="mr-3 text-muted-foreground">{i + 1}.</span>{t}</h2>
                  <p className="mt-2 text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>
    </>
  );
}
