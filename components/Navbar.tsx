"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work", num: "01" },
  { label: "Studio", href: "#studio", num: "02" },
  { label: "Services", href: "#services", num: "03" },
  { label: "Process", href: "#process", num: "04" },
  { label: "Words", href: "#testimonials", num: "05" },
  { label: "Pricing", href: "#pricing", num: "06" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Wordmark */}
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-[28px] lg:text-[32px] font-black text-ink leading-none tracking-tight">
              Ussly
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hidden sm:inline">
              est. 2023
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative flex items-baseline gap-1.5 px-3 py-2 text-ink hover:text-accent transition-colors"
              >
                <span className="font-mono text-[10px] text-ink-muted/70 group-hover:text-accent/70 transition-colors">
                  {link.num}
                </span>
                <span className="text-sm font-medium tracking-tight">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-paper bg-ink px-5 py-2.5 rounded-full hover:bg-accent transition-colors"
            >
              Claim a slot
              <span>↗</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-t border-rule px-6 py-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-baseline gap-3 text-ink py-2"
              onClick={() => setOpen(false)}
            >
              <span className="font-mono text-[10px] text-ink-muted">
                {link.num}
              </span>
              <span className="font-display text-2xl">{link.label}</span>
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 inline-flex items-center gap-2 justify-center bg-ink text-paper rounded-full px-5 py-3 text-sm"
            onClick={() => setOpen(false)}
          >
            Claim a slot ↗
          </a>
        </div>
      )}
    </header>
  );
}
