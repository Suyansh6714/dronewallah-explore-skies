import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { drones, formatINR } from "@/data/products";
import { Bell, Heart, Package, Settings, BellRing, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Your Dashboard — DroneWallah" }] }),
  component: Dashboard,
});

const tabs = [
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "orders", label: "Orders", icon: Package },
  { id: "alerts", label: "Price Alerts", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

function Dashboard() {
  const wish = drones.slice(0, 3);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-page py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full bg-primary/10 grid place-items-center text-primary font-display text-xl font-semibold">A</div>
          <div>
            <h1 className="font-display text-2xl font-semibold">Welcome back, Pilot</h1>
            <p className="text-sm text-muted-foreground">aarav@dronewallah.in</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <aside className="rounded-2xl border border-border bg-card p-2 h-fit">
            {tabs.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted">
                <t.icon className="h-4 w-4" /> {t.label}
              </a>
            ))}
          </aside>

          <div className="space-y-10">
            <section id="wishlist">
              <h2 className="font-display text-xl font-semibold mb-4">Your wishlist</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wish.map((d) => (
                  <Link key={d.id} to="/products/$slug" params={{ slug: d.slug }} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-card transition-all">
                    <div className="aspect-[4/3] bg-warm overflow-hidden">
                      <img src={d.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-medium">{d.name}</p>
                      <p className="text-sm text-primary mt-1">{formatINR(d.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section id="orders">
              <h2 className="font-display text-xl font-semibold mb-4">Recent orders</h2>
              <div className="rounded-2xl border border-border bg-card divide-y divide-border">
                {[
                  { id: "DW-10293", item: "AeroX Mini 2", status: "Delivered", date: "Apr 22" },
                  { id: "DW-10198", item: "TinyHawk Kid", status: "Out for delivery", date: "May 06" },
                ].map((o) => (
                  <div key={o.id} className="p-4 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{o.item}</p>
                      <p className="text-xs text-muted-foreground">{o.id} · {o.date}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{o.status}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="alerts">
              <h2 className="font-display text-xl font-semibold mb-4">Price alerts</h2>
              <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
                <BellRing className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">SkyFly Pro X9 dropped by ₹4,000</p>
                  <p className="text-xs text-muted-foreground">Now {formatINR(85999)} · was ₹89,999</p>
                </div>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium"><ArrowDown className="h-4 w-4" />4.4%</span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
