import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * Tudo liberado: um portfólio existe para ser encontrado. O único trabalho
 * real aqui é apontar o sitemap, que é como o buscador acha a canônica sem
 * depender de adivinhação.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
