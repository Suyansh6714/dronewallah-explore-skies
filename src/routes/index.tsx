import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BadgeCheck, GitCompareArrows, Headphones, ShieldCheck, Star, Truck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { drones, categories, blogPosts, reviews, formatINR } from "@/data/products";
import heroImg from "@/assets/hero-drone.jpg";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = drones.slice(0, 4);
  const trending = drones.slice(4, 8);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div className="space-y-6 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" /> DGCA-aware curation · 200+ models
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              India's Trusted<br />
              <span className="text-primary">Drone</span> Marketplace
            </h1>
            <p className="text-lg text-muted-foreground">
              Compare drones, discover accessories, and explore the skies with confidence — from beginner toys to cinema-grade rigs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors">
                Explore Drones <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/compare" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                <GitCompareArrows className="h-4 w-4" /> Compare Now
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm">
              <Stat n="50K+" l="Pilots served" />
              <Stat n="4.8★" l="Avg. rating" />
              <Stat n="48 hr" l="Delivery in metros" />
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img src={heroImg} alt="Premium quadcopter drone" width={1536} height={1152} className="w-full aspect-[4/3] object-cover" />
            </div>
            {/* Floating product cards */}
            <FloatingCard className="absolute -left-4 top-10 hidden sm:block" name="SkyFly Pro X9" price={89999} />
            <FloatingCard className="absolute -right-4 bottom-10 hidden sm:block" name="AeroX Mini 2" price={32999} delay="0.6s" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Categories" title="Shop by drone type" />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/products" className="group rounded-2xl border border-border bg-card p-5 text-center hover:border-primary hover:shadow-card transition-all">
              <div className="text-3xl mb-2">{c.icon}</div>
              <p className="font-medium text-sm">{c.name}</p>
              <p className="mt-1 text-xs text-muted-foreground group-hover:text-primary">Explore →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page py-8">
        <SectionHead eyebrow="Featured" title="Our flagship picks" cta={{ label: "View all", to: "/products" }} />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((d) => <ProductCard key={d.id} drone={d} />)}
        </div>
      </section>

      {/* WHY US */}
      <section className="container-page py-16">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-soft">
          <SectionHead eyebrow="Why DroneWallah" title="Built for serious pilots & curious beginners" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature icon={<ShieldCheck />} title="Genuine & DGCA-aware" desc="Authorized sellers, clear compliance guidance." />
            <Feature icon={<GitCompareArrows />} title="Side-by-side compare" desc="Stack up to 4 drones across 20+ specs." />
            <Feature icon={<Truck />} title="48-hr metro delivery" desc="Tracked shipping with insured packaging." />
            <Feature icon={<Headphones />} title="Pilot-led support" desc="Talk to actual drone pilots, not bots." />
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="container-page py-8">
        <SectionHead eyebrow="Trending" title="What pilots are buying this week" cta={{ label: "View all", to: "/products" }} />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((d) => <ProductCard key={d.id} drone={d} />)}
        </div>
      </section>

      {/* COMPARE PREVIEW */}
      <section className="container-page py-16">
        <div className="rounded-3xl bg-gradient-warm border border-border p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Compare</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">Stack drones side-by-side, instantly.</h2>
            <p className="text-muted-foreground mt-3">Battery, camera, range, GPS — see what really matters before you buy.</p>
            <Link to="/compare" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors">
              Try the Compare Tool <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr><th className="text-left py-2">Spec</th><th className="text-left">SkyFly Pro X9</th><th className="text-left">Nimbus Air 3</th></tr>
              </thead>
              <tbody>
                {[
                  ["Camera", "4K HDR 60fps", "4K 60fps Dual"],
                  ["Flight time", "38 min", "46 min"],
                  ["Range", "12 km", "20 km"],
                  ["Price", "₹89,999", "₹65,999"],
                ].map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-2.5 text-muted-foreground">{row[0]}</td>
                    <td className="py-2.5 font-medium">{row[1]}</td>
                    <td className="py-2.5 font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Reviews" title="Loved by pilots across India" />
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: r.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-primary" />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 grid place-items-center text-primary font-medium">{r.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="container-page py-8">
        <SectionHead eyebrow="From the blog" title="Guides & reviews" cta={{ label: "All articles", to: "/blog" }} />
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {blogPosts.map((p) => (
            <Link key={p.slug} to="/blog" className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all">
              <div className="aspect-[16/10] bg-gradient-warm flex items-center justify-center">
                <Award className="h-10 w-10 text-primary/40" />
              </div>
              <div className="p-5">
                <span className="text-xs uppercase tracking-wider text-primary">{p.tag}</span>
                <h3 className="font-display font-semibold text-lg mt-1 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-3">{p.date} · {p.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-page py-16">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Get drone deals in your inbox</h2>
          <p className="mt-3 text-background/70 max-w-xl mx-auto">Price drops, new launches, and DGCA updates — twice a month. Zero spam.</p>
          <form className="mt-6 flex max-w-md mx-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@example.com" className="flex-1 rounded-full bg-background/10 border border-background/20 px-5 py-3 text-sm placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="rounded-full bg-primary px-5 py-3 text-sm font-medium hover:bg-primary-hover transition-colors">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold">{n}</p>
      <p className="text-xs text-muted-foreground">{l}</p>
    </div>
  );
}

function SectionHead({ eyebrow, title, cta }: { eyebrow: string; title: string; cta?: { label: string; to: string } }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <span className="text-xs uppercase tracking-widest text-primary font-medium">{eyebrow}</span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">{title}</h2>
      </div>
      {cta && (
        <Link to={cta.to} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary">
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center">{icon}</div>
      <h4 className="font-display font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function FloatingCard({ name, price, className = "", delay = "0s" }: { name: string; price: number; className?: string; delay?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card/95 backdrop-blur shadow-card p-3 pr-4 flex items-center gap-3 ${className}`}
      style={{ animation: `float 4s ease-in-out ${delay} infinite alternate` }}
    >
      <div className="h-10 w-10 rounded-lg bg-gradient-warm grid place-items-center text-lg">🛸</div>
      <div>
        <p className="text-xs text-muted-foreground">In stock</p>
        <p className="text-sm font-semibold leading-tight">{name}</p>
        <p className="text-xs font-medium text-primary">{formatINR(price)}</p>
      </div>
      <style>{`@keyframes float{from{transform:translateY(0)}to{transform:translateY(-8px)}}`}</style>
    </div>
  );
}
