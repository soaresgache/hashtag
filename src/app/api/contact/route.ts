import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  locale?: string;
  // Anti-spam:
  //   website: honeypot invisible por CSS. Un humano no lo ve → siempre
  //     vacío. Los bots llenan todos los inputs y este viene poblado.
  //   loadedAt: timestamp (ms) que el frontend estampa al renderar el
  //     formulario. Si el submit es <3s después, es bot: ni el más
  //     rápido humano escribe nombre+email+mensaje en 3s.
  website?: string;
  loadedAt?: number;
};

/**
 * Heurísticas de contenido para detectar spam de bots que rellenan con
 * strings random tipo "kKsFctWBWatlPZsU". Las palabras humanas reales
 * tienen espacios y una proporción de vocales/consonantes normal.
 *
 * Devuelve true si el string parece basura random.
 */
function looksLikeGibberish(s: string, opts: { minLen: number; requireSpace: boolean }): boolean {
  const trimmed = s.trim();
  if (trimmed.length < opts.minLen) return false; // muy corto, no aplica el test
  if (opts.requireSpace && !/\s/.test(trimmed)) return true;
  // Vocales < 15% → sospechoso (español promedia ~45%, inglés ~38%).
  const letters = trimmed.replace(/[^a-záéíóúñü]/gi, '');
  if (letters.length < 8) return false;
  const vowels = (letters.match(/[aeiouáéíóúü]/gi) ?? []).length;
  const vowelRatio = vowels / letters.length;
  return vowelRatio < 0.15;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const message = String(body.message || "").trim();

  // 1) Honeypot: si el campo trampa tiene valor, es bot. Silent 200
  //    (fingimos éxito para no dar señal al atacante de que fue detectado).
  if (String(body.website || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2) Time trap: menos de 3s entre render del form y submit = bot.
  //    Los humanos tardan mínimo 10s en llenar el form. Silent 200.
  const loadedAt = Number(body.loadedAt || 0);
  if (loadedAt > 0 && Date.now() - loadedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "Too long" }, { status: 400 });
  }

  // 3) Heurística de contenido: strings tipo "kKsFctWBWatlPZsU" con
  //    puros random alfanuméricos, sin espacios, sin vocales normales.
  //    Silent 200 igual — no queremos que el bot ajuste su patrón.
  if (
    looksLikeGibberish(name, { minLen: 8, requireSpace: false }) ||
    looksLikeGibberish(message, { minLen: 15, requireSpace: true }) ||
    (company && looksLikeGibberish(company, { minLen: 10, requireSpace: false }))
  ) {
    console.warn("[contact] Bloqueado por heurística gibberish:", { name, email, company });
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error("Contact form not configured: missing RESEND_API_KEY / CONTACT_TO / CONTACT_FROM");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const subject = `Hashtag Digital — nuevo contacto de ${name}`;
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0A1626; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Nuevo mensaje desde el sitio</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Idioma del sitio:</strong> ${escapeHtml(String(body.locale || "—"))}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;
  const text = `Nuevo mensaje desde el sitio\n\nNombre: ${name}\nEmail: ${email}\n${
    company ? `Empresa: ${company}\n` : ""
  }Idioma: ${body.locale || "—"}\n\n${message}`;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
