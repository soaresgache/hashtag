import Link from "next/link";
import { Logo } from "./Logo";
import { getDict, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const year = 2026;

  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="container-px grid gap-10 py-14 md:grid-cols-[1.5fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.footer.tagline}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {t.footer.location}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {t.footer.nav}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href={`/${locale}`} className="text-ink-soft hover:text-brand-600">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#servicios`} className="text-ink-soft hover:text-brand-600">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#enfoque`} className="text-ink-soft hover:text-brand-600">
                {t.nav.approach}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contacto`} className="text-ink-soft hover:text-brand-600">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/5">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-muted sm:flex-row">
          <p>© {year} {t.brand}. {t.footer.rights}</p>
          <p>{t.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
