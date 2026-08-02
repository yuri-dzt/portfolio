import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * O site é uma página só. O sitemap existe mesmo assim porque é o que declara
 * a URL canônica para o buscador — sem ele, quem indexa decide sozinho se a
 * versão com ou sem barra final é a boa, e as duas competem entre si.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
