import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shirt, ShoppingBag, X } from "lucide-react";
import { CLUB_NAME, pageMeta } from "@/lib/site";
import { PageHero, Reveal, Success } from "@/components/site/ui";

export const Route = createFileRoute("/merchandise")({
  head: () => pageMeta("Merchandise", `Club hoodies, polos, gilets and caps from ${CLUB_NAME}.`),
  component: Merch,
});

type P = { id: string; name: string; price: number; tone: "navy" | "gold" };
const PRODUCTS: P[] = [
  { id: "h1", name: "Club Hoodie, Navy", price: 38, tone: "navy" },
  { id: "h2", name: "Club Hoodie, Yellow", price: 38, tone: "gold" },
  { id: "p1", name: "Embroidered Polo", price: 26, tone: "navy" },
  { id: "g1", name: "Padded Gilet", price: 52, tone: "navy" },
  { id: "c1", name: "Baseball Cap", price: 16, tone: "gold" },
  { id: "p2", name: "Junior Polo", price: 20, tone: "gold" },
];

function Merch() {
  const [cart, setCart] = useState<P[]>([]);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const total = cart.reduce((s, p) => s + p.price, 0);
  const add = (p: P, buy = false) => { setCart((c) => [...c, p]); if (buy) setOpen(true); };

  return (
    <>
      <PageHero eyebrow="Merchandise" title="Wear the colours" intro="Navy and yellow kit for shows, yard days and everything in between." />
      <section className="section bg-cream">
        <div className="container-site">
          {done ? (
            <Success title="Order Confirmed" action={<Link to="/" className="btn btn-gold">Back to home</Link>}>Thank you! Your kit is on its way (in the real site). We can't wait to see you in it.</Success>
          ) : (
            <>
              <div className="mb-8 flex justify-end">
                <button onClick={() => setOpen(true)} className="btn btn-outline-navy"><ShoppingBag className="h-4 w-4" /> Cart ({cart.length})</button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCTS.map((p, idx) => (
                  <Reveal key={p.id} delay={(idx % 3) * 80}>
                    <div className="card-lift overflow-hidden rounded-3xl border bg-card shadow-soft">
                      <div className={`flex aspect-[4/3] items-center justify-center ${p.tone === "navy" ? "bg-navy text-gold" : "bg-gold text-navy"}`}>
                        <Shirt className="h-24 w-24" strokeWidth={1} />
                      </div>
                      <div className="p-6">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-xl text-navy">{p.name}</h3>
                          <span className="font-display text-xl text-navy">£{p.price}</span>
                        </div>
                        <div className="mt-5 flex gap-2">
                          <button onClick={() => add(p)} className="btn btn-outline-navy flex-1 !px-3">Add to Cart</button>
                          <button onClick={() => add(p, true)} className="btn btn-gold flex-1 !px-3">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {open && !done && (
        <div className="route-fade fixed inset-0 z-50 flex justify-end bg-navy/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <aside className="flex h-full w-full max-w-md flex-col bg-cream p-8 shadow-lift" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl text-navy">Your cart</h3>
              <button aria-label="Close" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 flex-1 space-y-3 overflow-auto">
              {cart.length === 0 && <p className="text-muted-foreground">Your cart is empty.</p>}
              {cart.map((p, i) => (
                <div key={i} className="flex justify-between border-b pb-3"><span>{p.name}</span><span className="font-semibold">£{p.price}</span></div>
              ))}
            </div>
            <div className="border-t pt-6">
              <div className="flex justify-between font-display text-xl text-navy"><span>Total</span><span>£{total}.00</span></div>
              <button disabled={!cart.length} onClick={() => { setDone(true); setOpen(false); window.scrollTo({ top: 0 }); }} className="btn btn-gold mt-6 w-full disabled:opacity-40">Checkout</button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Demo checkout for {CLUB_NAME}, no payment taken.</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
