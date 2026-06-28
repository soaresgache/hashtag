import Link from "next/link";
import type { Metadata } from "next";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: `${t.brand} — ${t.hero.eyebrow}`,
    description: t.hero.subtitle,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = getDict(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="pointer-events-none absolute inset-x-0 top-[-20%] h-[420px] bg-gradient-to-b from-brand-50 to-transparent" />
        <div className="container-px relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="animate-fade-up">
            <span className="eyebrow">
              <span className="h-px w-6 bg-brand-500" />
              {t.hero.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t.hero.title}{" "}
              <span className="text-brand-600">{t.hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {t.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/contacto`} className="btn-primary">
                {t.hero.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href={`/${locale}#enfoque`} className="btn-ghost">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Decorative card cluster */}
          <div className="relative hidden lg:block">
            <div className="absolute right-0 top-4 w-72 rounded-2xl border border-ink/10 bg-white p-6 shadow-xl shadow-brand-900/5">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">Estrategia</div>
              <div className="mt-3 h-2 w-3/4 rounded-full bg-brand-100" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-ink/10" />
              <div className="mt-5 flex items-end gap-1.5">
                {[40, 64, 52, 80, 96].map((h, i) => (
                  <div key={i} className="w-6 rounded-t bg-gradient-to-t from-brand-500 to-accent" style={{ height: h }} />
                ))}
              </div>
            </div>
            <div className="absolute right-40 top-48 w-60 rounded-2xl border border-ink/10 bg-ink p-6 text-white shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">Procesos</div>
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">{n}</span>
                    <span className="h-1.5 flex-1 rounded-full bg-white/15" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + stats */}
      <section className="border-y border-ink/10 bg-white">
        <div className="container-px grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
              {t.intro.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">{t.intro.body}</p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-1">
            {t.intro.stats.map((s) => (
              <div key={s.label} className="bg-white p-6">
                <dt className="font-display text-3xl font-bold text-brand-600">{s.value}</dt>
                <dd className="mt-1 text-sm leading-snug text-ink-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="scroll-mt-20">
        <div className="container-px py-20">
          <div className="max-w-2xl">
            <span className="eyebrow"><span className="h-px w-6 bg-brand-500" />{t.nav.services}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.services.heading}
            </h2>
            <p className="mt-4 text-lg text-ink-muted">{t.services.subheading}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.services.items.map((s, i) => (
              <article
                key={s.title}
                className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-bold text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                <ul className="mt-5 space-y-2.5 border-t border-ink/5 pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <svg className="mt-0.5 shrink-0 text-accent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="enfoque" className="scroll-mt-20 border-y border-ink/10 bg-white">
        <div className="container-px py-20">
          <div className="max-w-2xl">
            <span className="eyebrow"><span className="h-px w-6 bg-brand-500" />{t.nav.approach}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.approach.heading}
            </h2>
            <p className="mt-4 text-lg text-ink-muted">{t.approach.subheading}</p>
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {t.approach.steps.map((s) => (
              <li key={s.step} className="relative rounded-2xl bg-paper p-7">
                <span className="font-display text-5xl font-bold text-brand-100">{s.step}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-ink">
        <div className="container-px flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t.ctaBand.heading}
            </h2>
            <p className="mt-3 text-base text-white/70">{t.ctaBand.body}</p>
          </div>
          <Link
            href={`/${locale}/contacto`}
            className="btn shrink-0 bg-accent text-ink hover:bg-white"
          >
            {t.ctaBand.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
