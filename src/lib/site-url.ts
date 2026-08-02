/**
 * Domínio canônico do site.
 *
 * Em produção, defina NEXT_PUBLIC_SITE_URL com o domínio final. Sem ela, a
 * própria Vercel informa a URL do deploy — assim preview e produção geram
 * links que existem, em vez de apontar para um domínio ainda não comprado.
 *
 * Mora aqui porque agora são quatro consumidores (metadata, sitemap, robots e
 * a imagem de compartilhamento), e a mesma cascata de variáveis copiada em
 * quatro lugares é onde um deles fica para trás numa migração de domínio.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
