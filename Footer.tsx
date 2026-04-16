/* ============================================================
   SQUISHLY Footer – Clean, minimal with links and social
   Dreamy Glassmorphism + Organic Softness
   ============================================================ */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#1e1030" }}
    >
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a7ff]/40 to-transparent" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-black font-nunito squish-gradient-text">Squishly</span>
              <span className="text-2xl animate-float-y-slow inline-block">🧸</span>
            </div>
            <p className="text-white/50 font-dm-sans text-sm leading-relaxed max-w-xs">
              Mystery boxes filled with satisfying squishy toys, stress balls, and sensory fidget items. Squeeze the stress away.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                { label: "TikTok", icon: "🎵" },
                { label: "Instagram", icon: "📸" },
                { label: "Twitter", icon: "🐦" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-base transition-all duration-200 hover:scale-110"
                  title={s.label}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold font-nunito text-sm mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5">
              {["Mini Box", "Medium Box", "Mega Box", "Gift Cards"].map((item) => (
                <li key={item}>
                  <a href="#shop" className="text-white/50 hover:text-white/80 text-sm font-dm-sans transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold font-nunito text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {["About Us", "How It Works", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white/80 text-sm font-dm-sans transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-dm-sans">
            © {currentYear} Squishly. All rights reserved. Made with 💜 for Gen Z.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Info"].map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs font-dm-sans transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
