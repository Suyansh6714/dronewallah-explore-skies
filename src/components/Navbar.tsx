import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Heart, ShoppingCart, User, Menu, X, GitCompareArrows, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { to: "/products", label: "Categories" },
  { to: "/compare", label: "Compare" },
  { to: "/products", label: "Deals", search: { sort: "deals" } as any },
  { to: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="DroneWallah" className="h-9 w-9 rounded-md object-cover" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Drone<span className="text-primary">Wallah</span>
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl items-center rounded-full border border-border bg-card px-4 py-2 shadow-soft focus-within:ring-2 focus-within:ring-ring/30">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search drones, brands, accessories…"
            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to} className="text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <Link to="/compare" className="hidden sm:inline-flex items-center justify-center rounded-full p-2 hover:bg-muted" aria-label="Compare">
            <GitCompareArrows className="h-5 w-5" />
          </Link>
          <Link to="/dashboard" className="hidden sm:inline-flex items-center justify-center rounded-full p-2 hover:bg-muted" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>
          <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-primary px-1 text-[10px] font-semibold leading-4 text-primary-foreground">2</span>
          </button>
          {user ? (
            <div className="hidden sm:flex items-center gap-1">
              <Link to="/dashboard" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary transition-colors">
                <User className="h-4 w-4" /> {user.email?.split("@")[0]}
              </Link>
              <button onClick={handleSignOut} className="inline-flex items-center justify-center rounded-full p-2 hover:bg-muted" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary transition-colors">
              <User className="h-4 w-4" /> Login
            </Link>
          )}
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-page py-3 flex flex-col gap-3">
            <div className="flex items-center rounded-full border border-border px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search drones…" className="ml-2 w-full bg-transparent text-sm outline-none" />
            </div>
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className="py-1 text-sm" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link to="/login" className="py-1 text-sm" onClick={() => setOpen(false)}>Login / Sign up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
