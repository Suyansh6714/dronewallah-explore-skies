import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import logo from "@/assets/logo.jpeg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — DroneWallah" }] }),
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 grid place-items-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="flex items-center gap-2 justify-center mb-6">
            <img src={logo} alt="" className="h-10 w-10 rounded-md" />
            <span className="font-display text-xl font-semibold">Drone<span className="text-primary">Wallah</span></span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-center">Welcome back</h1>
          <p className="text-sm text-muted-foreground text-center mt-1">Login to access wishlists, orders, and price alerts.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-medium">Email</label>
              <input type="email" required placeholder="you@example.com" className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <div>
              <label className="text-xs font-medium">Password</label>
              <input type="password" required placeholder="••••••••" className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <button className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors">Login</button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>
          <button className="w-full rounded-full border border-border bg-card py-2.5 text-sm font-medium hover:border-primary transition-colors">Continue with Google</button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New to DroneWallah? <Link to="/login" className="text-primary font-medium">Create an account</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
