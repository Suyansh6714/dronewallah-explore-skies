import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { drones, formatINR, type Drone } from "@/data/products";
import { Plus, X, Trophy } from "lucide-react";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare Drones — DroneWallah" }] }),
  component: ComparePage,
});

const SPECS: { key: string; label: string; better?: "high" | "low"; format?: (d: Drone) => string; numeric?: (d: Drone) => number }[] = [
  { key: "price", label: "Price", better: "low", format: (d) => formatINR(d.price), numeric: (d) => d.price },
  { key: "camera", label: "Camera", format: (d) => d.specs.camera },
  { key: "flightTime", label: "Flight time", better: "high", format: (d) => d.specs.flightTime, numeric: (d) => parseInt(d.specs.flightTime) },
  { key: "range", label: "Range", better: "high", format: (d) => d.specs.range, numeric: (d) => parseFloat(d.specs.range) },
  { key: "maxSpeed", label: "Max speed", better: "high", format: (d) => d.specs.maxSpeed, numeric: (d) => parseInt(d.specs.maxSpeed) },
  { key: "battery", label: "Battery", format: (d) => d.specs.battery },
  { key: "weight", label: "Weight", format: (d) => d.specs.weight },
  { key: "gps", label: "GPS", format: (d) => (d.specs.gps ? "Yes" : "No") },
  { key: "rating", label: "Rating", better: "high", format: (d) => d.rating.toFixed(1) + "★", numeric: (d) => d.rating },
];

function ComparePage() {
  const [selected, setSelected] = useState<Drone[]>([drones[0], drones[4]]);
  const [picker, setPicker] = useState(false);

  const add = (d: Drone) => {
    if (selected.length < 4 && !selected.find((s) => s.id === d.id)) {
      setSelected([...selected, d]);
    }
    setPicker(false);
  };
  const remove = (id: string) => setSelected(selected.filter((s) => s.id !== id));

  const bestIndex = (s: typeof SPECS[number]) => {
    if (!s.numeric || !s.better) return -1;
    const vals = selected.map((d) => s.numeric!(d));
    if (s.better === "high") return vals.indexOf(Math.max(...vals));
    return vals.indexOf(Math.min(...vals));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-page py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Compare</span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-2">Find your perfect drone</h1>
          <p className="text-muted-foreground mt-3">Add up to 4 drones and see how they stack up. Winning specs are highlighted.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr>
                <th className="w-44 p-4 text-left text-xs uppercase text-muted-foreground">Drone</th>
                {selected.map((d) => (
                  <th key={d.id} className="p-4 text-left align-top min-w-[180px]">
                    <div className="relative rounded-xl bg-warm aspect-[4/3] overflow-hidden mb-3">
                      <img src={d.image} alt="" className="h-full w-full object-cover" />
                      <button onClick={() => remove(d.id)} className="absolute top-2 right-2 grid place-items-center h-7 w-7 rounded-full bg-card/95 border border-border hover:text-primary"><X className="h-3.5 w-3.5" /></button>
                    </div>
                    <p className="font-display font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.brand}</p>
                  </th>
                ))}
                {selected.length < 4 && (
                  <th className="p-4 align-top min-w-[180px]">
                    <button onClick={() => setPicker(!picker)} className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary hover:text-primary grid place-items-center text-muted-foreground transition-colors">
                      <div className="text-center"><Plus className="h-6 w-6 mx-auto" /><p className="text-xs mt-1">Add drone</p></div>
                    </button>
                    {picker && (
                      <div className="mt-3 max-h-72 overflow-y-auto rounded-xl border border-border bg-card divide-y divide-border">
                        {drones.filter((d) => !selected.find((s) => s.id === d.id)).map((d) => (
                          <button key={d.id} onClick={() => add(d)} className="w-full text-left p-3 hover:bg-muted text-xs">
                            <p className="font-medium">{d.name}</p>
                            <p className="text-muted-foreground">{formatINR(d.price)}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {SPECS.map((s) => {
                const best = bestIndex(s);
                return (
                  <tr key={s.key} className="border-t border-border">
                    <td className="p-4 text-muted-foreground">{s.label}</td>
                    {selected.map((d, i) => (
                      <td key={d.id} className={`p-4 ${i === best ? "bg-primary/5" : ""}`}>
                        <span className={`inline-flex items-center gap-1.5 ${i === best ? "font-semibold text-primary" : "font-medium"}`}>
                          {i === best && <Trophy className="h-3.5 w-3.5" />}
                          {s.format!(d)}
                        </span>
                      </td>
                    ))}
                    {selected.length < 4 && <td />}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
