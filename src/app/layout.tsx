import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hashtagdigital.com"),
  title: {
    default: "Hashtag Digital — Consultoría de negocio",
    template: "%s · Hashtag Digital",
  },
  description:
    "Consultoría de negocio en estrategia y procesos. Ayudamos a empresas a decidir mejor, ejecutar más rápido y crecer con foco.",
  keywords: [
    "consultoría de negocio",
    "consultoría estratégica",
    "optimización de procesos",
    "business consulting",
    "Hashtag Digital",
  ],
  authors: [{ name: "Hashtag Digital" }],
  openGraph: {
    title: "Hashtag Digital — Consultoría de negocio",
    description:
      "Estrategia y procesos que mueven el negocio. Consultoría para empresas que quieren crecer con foco.",
    type: "website",
    siteName: "Hashtag Digital",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
