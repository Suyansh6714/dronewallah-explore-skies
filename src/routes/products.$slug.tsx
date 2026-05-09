import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, GitCompareArrows, ShieldCheck, Truck, RotateCcw, Star, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { drones, formatINR } from "@/data/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const drone = drones.find((d) => d.slug === params.slug);
    if (!drone) throw notFound();
    return { drone };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.drone.name} — DroneWallah` }, { name: "description", content: loaderData.drone.description }]
      : [],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center"><p>Drone not found.</p></div>
  ),
});

function ProductDetail() {
  const { drone } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const off = Math.round(((drone.mrp - drone.price) / drone.mrp) * 100);
  const gallery = [drone.image, drone.image, drone.image, drone.image];

  const handleBuy = () => {
    alert("Razorpay checkout will open here. Connect Lovable Cloud + Razorpay key to enable real payments.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-page py-8">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/products" className="hover:text-primary">Drones</Link> / <span className="text-foreground">{drone.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden border border-border bg-warm">
              <img src={gallery[active]} alt={drone.name} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActive(i)} className={`aspect-square rounded-xl overflow-hidden border ${i === active ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-medium">{drone.brand} · {drone.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mt-2">{drone.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
                <Star className="h-3.5 w-3.5 fill-primary" />{drone.rating}
              </span>
              <span className="text-sm text-muted-foreground">{drone.reviews.toLocaleString("en-IN")} verified reviews</span>
            </div>
            <p className="text-muted-foreground">{drone.description}</p>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold">{formatINR(drone.price)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatINR(drone.mrp)}</span>
                <span className="text-sm font-medium text-primary">{off}% off</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes · No-cost EMI from ₹{Math.round(drone.price / 12).toLocaleString("en-IN")}/mo</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={handleBuy} className="flex-1 min-w-[160px] rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors">Buy Now · Razorpay</button>
                <button className="rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Wishlist
                </button>
                <Link to="/compare" className="rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2">
                  <GitCompareArrows className="h-4 w-4" /> Compare
                </Link>
              </div>
            </div>

            <ul className="space-y-2">
              {drone.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {h}
                </li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <Trust icon={<ShieldCheck className="h-4 w-4" />} t="Genuine product" />
              <Trust icon={<Truck className="h-4 w-4" />} t="Free shipping" />
              <Trust icon={<RotateCcw className="h-4 w-4" />} t="7-day returns" />
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold mb-5">Specifications</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <dl className="divide-y divide-border">
              {Object.entries(drone.specs).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 sm:grid-cols-3 px-5 py-3.5 text-sm">
                  <dt className="text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</dt>
                  <dd className="sm:col-span-2 font-medium">{typeof v === "boolean" ? (v ? "Yes" : "No") : v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold mb-5">Customer reviews</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: "Karan", text: "Camera quality is unreal at this price. Setup took 5 minutes.", rating: 5 },
              { name: "Sneha", text: "Battery lasts as advertised. Very stable in moderate winds.", rating: 4 },
            ].map((r) => (
              <div key={r.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <p className="mt-2 text-sm">{r.text}</p>
                <p className="mt-3 text-xs text-muted-foreground">— {r.name}, verified buyer</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

function Trust({ icon, t }: { icon: React.ReactNode; t: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs">
      <span className="text-primary">{icon}</span> {t}
    </div>
  );
}
