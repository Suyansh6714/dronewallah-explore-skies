import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Drone } from "@/data/products";
import { formatINR } from "@/data/products";

export function ProductCard({ drone }: { drone: Drone }) {
  const off = Math.round(((drone.mrp - drone.price) / drone.mrp) * 100);
  return (
    <Link
      to="/products/$slug"
      params={{ slug: drone.slug }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm">
        <img src={drone.image} alt={drone.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {drone.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">{drone.badge}</span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); }}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 grid place-items-center h-9 w-9 rounded-full bg-card/95 backdrop-blur border border-border hover:text-primary transition-colors"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{drone.brand} · {drone.category}</p>
        <h3 className="font-display font-semibold text-base leading-tight line-clamp-1">{drone.name}</h3>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 font-medium">
            <Star className="h-3 w-3 fill-primary text-primary" />{drone.rating}
          </span>
          <span className="text-muted-foreground">({drone.reviews.toLocaleString("en-IN")})</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold">{formatINR(drone.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(drone.mrp)}</span>
          <span className="text-xs font-medium text-primary">{off}% off</span>
        </div>
      </div>
    </Link>
  );
}
