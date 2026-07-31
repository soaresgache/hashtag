"use client";

import { useRef, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const f = getDict(locale).contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Timestamp del primer render — el server chequea que hayan pasado
  // al menos 3s entre esto y el submit. Los bots submitean instantáneo.
  const loadedAtRef = useRef<number>(Date.now());

  function validate(data: FormData): Record<string, string> {
    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name) next.name = f.required;
    if (!email) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = f.invalidEmail;
    if (!message) next.message = f.required;
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          locale,
          website: data.get("website"),
          loadedAt: loadedAtRef.current,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-4 text-base font-medium text-ink">{f.success}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot invisible: los bots llenan todos los inputs; los humanos
          no lo ven. Si viene con valor, el server lo trata como spam.
          aria-hidden + tabIndex -1 evita que un screenreader o teclado
          lo alcance por accidente. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          No llenes este campo
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} error={errors.name}>
          <input name="name" type="text" autoComplete="name" className={inputClass} />
        </Field>
        <Field label={f.email} error={errors.email}>
          <input name="email" type="email" autoComplete="email" className={inputClass} />
        </Field>
      </div>

      <Field label={`${f.company} · ${f.optional}`}>
        <input name="company" type="text" autoComplete="organization" className={inputClass} />
      </Field>

      <Field label={f.message} error={errors.message}>
        <textarea name="message" rows={5} className={`${inputClass} resize-y`} />
      </Field>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{f.error}</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto">
        {status === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
