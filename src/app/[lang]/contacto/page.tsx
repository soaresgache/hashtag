import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: t.contact.heading,
    description: t.contact.body,
    alternates: {
      canonical: `/${lang}/contacto`,
      languages: { es: "/es/contacto", en: "/en/contacto" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = getDict(locale);

  return (
    <section className="bg-grid">
      <div className="container-px grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        {/* Left: intro + info */}
        <div className="lg:pr-8">
          <span className="eyebrow"><span className="h-px w-6 bg-brand-500" />{t.contact.eyebrow}</span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.contact.heading}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">{t.contact.body}</p>

          <div className="mt-10 rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink">{t.contact.sidebar.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.contact.sidebar.body}</p>
            <div className="mt-5 flex items-start gap-3 border-t border-ink/5 pt-5">
              <svg className="mt-0.5 shrink-0 text-brand-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {t.contact.sidebar.locationLabel}
                </div>
                <div className="text-sm text-ink-soft">{t.contact.sidebar.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-xl shadow-brand-900/5 sm:p-9">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
