"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { getDict, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const otherPath = pathname.replace(/^\/(es|en)/, `/${otherLocale}`);

  const links = [
    { href: `/${locale}#servicios`, label: t.nav.services },
    { href: `/${locale}#enfoque`, label: t.nav.approach },
    { href: `/${locale}/contacto`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/80 backdrop-blur-md">
      <div className="container-px flex h-16 items-center justify-between">
        <Link href={`/${locale}`} aria-label={t.brand} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={otherPath}
            className="rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted transition-colors hover:border-brand-500 hover:text-brand-600"
            aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
          >
            {otherLocale}
          </Link>
          <Link href={`/${locale}/contacto`} className="btn-primary !px-5 !py-2.5">
            {t.hero.ctaPrimary}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/5 bg-paper md:hidden">
          <nav className="container-px flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <Link href={`/${locale}/contacto`} onClick={() => setOpen(false)} className="btn-primary flex-1">
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href={otherPath}
                onClick={() => setOpen(false)}
                className="rounded-full border border-ink/10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
              >
                {otherLocale}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
