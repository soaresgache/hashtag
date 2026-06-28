import Link from "next/link";
import { getDict, defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  const t = getDict(defaultLocale);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="font-display text-7xl font-bold text-brand-100">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">{t.notFound.title}</h1>
      <p className="mt-2 text-ink-muted">{t.notFound.body}</p>
      <Link href={`/${defaultLocale}`} className="btn-primary mt-8">
        {t.notFound.cta}
      </Link>
    </div>
  );
}
