import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { blogPosts } from "@/data/products";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "DroneWallah Blog — Drone Guides & Reviews" }, { name: "description", content: "Expert drone buying guides, reviews and DGCA news for India." }] }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-page py-14">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Journal</span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-2">DroneWallah Blog</h1>
          <p className="text-muted-foreground mt-3">Independent reviews, buying guides, and the latest in Indian drone regulation.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...blogPosts, ...blogPosts].map((p, i) => (
            <article key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all">
              <div className="aspect-[16/10] bg-gradient-warm grid place-items-center">
                <span className="font-display text-4xl text-primary/30">DW</span>
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-primary">{p.tag}</span>
                <h2 className="font-display font-semibold text-xl mt-2">{p.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>
                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                  <span>{p.date} · {p.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-primary font-medium">Read <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
