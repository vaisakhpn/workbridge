import Link from "next/link";
import Logo from "@/components/layout/shared/Logo";

export function LandingFooter() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 border-b border-zinc-800 pb-8">
          {/* Brand Logo & Tagline */}
          <div className="space-y-3 max-w-xs">
            <Logo />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Connecting businesses, employers, and organizers with reliable part-time staff across World.
            </p>
          </div>

          {/* Company Links Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Bincoz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
