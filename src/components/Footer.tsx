import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-warm">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-9 w-9 rounded-md object-cover" />
            <span className="font-display text-lg font-semibold">Drone<span className="text-primary">Wallah</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">India's trusted drone marketplace. Compare, discover, and explore the skies with confidence.</p>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-primary"><Youtube className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        <FooterCol title="Shop" links={[
          { label: "All Drones", to: "/products" },
          { label: "Compare", to: "/compare" },
          { label: "Deals", to: "/products" },
          { label: "Wishlist", to: "/dashboard" },
        ]} />
        <FooterCol title="Company" links={[
          { label: "About", to: "/about" },
          { label: "Blog", to: "/blog" },
          { label: "Contact", to: "/contact" },
          { label: "Affiliate Disclaimer", to: "/about" },
        ]} />
        <FooterCol title="Legal" links={[
          { label: "Privacy Policy", to: "/about" },
          { label: "Terms of Service", to: "/about" },
          { label: "Refund Policy", to: "/about" },
          { label: "DGCA Compliance", to: "/about" },
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DroneWallah Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Made with care in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}><Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
