# Hashtag Digital — Sitio institucional

Sitio web de **Hashtag Digital**, consultoría de negocio en estrategia y procesos.
Landing bilingüe (ES/EN) + página de contacto con formulario funcional.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript + Tailwind CSS
- [Resend](https://resend.com/) para el envío del formulario de contacto
- Deploy en Vercel

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completá las variables
npm run dev                  # http://localhost:3000
```

El sitio redirige `/` → `/es`. Idiomas disponibles: `/es` y `/en`.

## Variables de entorno

Configurar en `.env.local` (local) y en Vercel (Project Settings → Environment Variables):

| Variable          | Descripción                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `RESEND_API_KEY`  | API key de Resend.                                                 |
| `CONTACT_TO`      | Casilla que recibe los mensajes (`jcsoaresgache@gmail.com`).        |
| `CONTACT_FROM`    | Remitente. Dirección de un dominio **verificado** en Resend.       |

> El formulario solo envía si las tres variables están cargadas en Vercel.

## Editar contenido

Toda la copy (ES/EN) está centralizada en [`src/lib/i18n.ts`](src/lib/i18n.ts).

## Estructura

```
src/
  app/
    layout.tsx            # layout raíz, fuentes, metadata
    page.tsx              # redirect / → /es
    [lang]/
      layout.tsx          # header + footer, valida idioma
      page.tsx            # landing
      contacto/page.tsx   # contacto
    api/contact/route.ts  # endpoint del formulario (Resend)
  components/             # Header, Footer, Logo, ContactForm
  lib/i18n.ts             # diccionario de contenido ES/EN
```
