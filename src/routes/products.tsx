import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { drones } from "@/data/products";
import { SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "All Drones — DroneWallah" }, { name: "description", content: "Browse drones by brand, price, camera quality and more." }] }),
  component: ProductsPage,
});

const brands = Array.from(new Set(drones.map((d) => d.brand)));
const types = Array.from(new Set(drones.map((d) => d.category)));

function ProductsPage() {
  const [maxPrice, setMaxPrice] = useState(500000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [gpsOnly, setGpsOnly] = useState(false);
  const [sort, setSort] = useState("popular");
  const [openFilters, setOpenFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = drones.filter((d) =>
      d.price <= maxPrice &&
      (selectedBrands.length === 0 || selectedBrands.includes(d.brand)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(d.category)) &&
      (!gpsOnly || d.specs.gps)
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [maxPrice, selectedBrands, selectedTypes, gpsOnly, sort]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">All Drones</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} products available</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpenFilters(!openFilters)} className="lg:hidden inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
              <option value="popular">Most popular</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className={`${openFilters ? "block" : "hidden"} lg:block space-y-6 rounded-2xl border border-border bg-card p-5 h-fit sticky top-20`}>
            <FilterBlock title="Price">
              <input type="range" min={4999} max={500000} step={1000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
              <p className="text-xs text-muted-foreground mt-1">Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
            </FilterBlock>
            <FilterBlock title="Drone type">
              {types.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={selectedTypes.includes(t)} onChange={() => toggle(selectedTypes, t, setSelectedTypes)} className="accent-primary" /> {t}
                </label>
              ))}
            </FilterBlock>
            <FilterBlock title="Brand">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggle(selectedBrands, b, setSelectedBrands)} className="accent-primary" /> {b}
                </label>
              ))}
            </FilterBlock>
            <FilterBlock title="Features">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={gpsOnly} onChange={(e) => setGpsOnly(e.target.checked)} className="accent-primary" /> GPS enabled
              </label>
            </FilterBlock>
          </aside>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((d) => <ProductCard key={d.id} drone={d} />)}
            {filtered.length === 0 && <p className="text-muted-foreground">No drones match your filters.</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-sm mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
