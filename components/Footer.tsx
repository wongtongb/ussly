const links = {
  Work: [
    { label: "The Yemeni House", href: "https://yemeni-house.vercel.app" },
    { label: "Northwest Fades", href: "https://northwestfades.netlify.app" },
  ],
  Studio: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  Elsewhere: [
    { label: "Instagram ↗", href: "https://instagram.com/usslydesignss" },
    { label: "TikTok ↗", href: "https://tiktok.com/@usslydesigns" },
    { label: "Are.na ↗", href: "https://www.are.na/ussly-designs" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-paper border-t border-ink">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Big wordmark */}
        <div className="mb-16 lg:mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">
            Colophon
          </p>
          <h2 className="font-display text-[clamp(80px,22vw,360px)] text-ink leading-[0.85] tracking-[-0.04em]">
            Uss<span className="font-display-italic text-accent">ly.</span>
          </h2>
        </div>

        {/* Link columns + meta */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 border-t border-ink pt-10">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-2xl text-ink max-w-sm leading-snug">
              A one-person web studio for businesses worth{" "}
              <span className="font-display-italic text-accent">remembering.</span>
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Lynnwood, WA · Open for projects
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="col-span-6 md:col-span-2 lg:col-span-2">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">
                {group}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-ink hover:text-accent transition-colors text-[15px] inline-flex items-center gap-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="mt-14 pt-6 border-t border-rule flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            © {new Date().getFullYear()} Ussly · All rights reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Set in Fraunces &amp; Geist · Hand-coded with care
          </p>
        </div>
      </div>
    </footer>
  );
}
