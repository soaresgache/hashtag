import type { MetadataRoute } from "next";

const base = "https://hashtagdigital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/es`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/en`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/es/contacto`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/en/contacto`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
