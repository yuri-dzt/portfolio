import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

/**
 * Runtime edge, e não Node, por um bug de plataforma.
 *
 * A build Node do `@vercel/og` carrega a fonte padrão assim, no topo do
 * módulo:
 *
 *     fileURLToPath(join(import.meta.url, "../noto-sans-v27-latin-regular.ttf"))
 *
 * `path.join` recebe uma URL `file:///D:/...` e no Windows a normaliza para
 * `file:\D:\...`, que não é URL válida — e `fileURLToPath` estoura. No Linux o
 * mesmo `join` devolve `file:/D:/...`, que ainda passa. Ou seja: a build
 * quebra na máquina e passaria no deploy, que é a pior combinação possível.
 *
 * Como o estouro é na importação do módulo, fornecer uma fonte própria não
 * resolveria. A build edge do mesmo pacote não usa `fileURLToPath`, então o
 * caminho quebrado simplesmente não é percorrido. O cartão passa a ser gerado
 * na primeira requisição em vez de no build — para uma imagem que só os
 * raspadores de link buscam, e que fica em cache, não muda nada.
 */
export const runtime = "edge";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Hex, não oklch: o renderizador da imagem (Satori) entende um subconjunto de
   CSS, e a paleta do site vive em oklch. Estes são os mesmos tons, convertidos
   — os dois extremos batem com o que o `Sculpture` já documenta em RGB. */
const BG = "#130e0a";
const INK = "#f1ece4";
const MUTED = "#bab3a9";
const FAINT = "#938d83";
const LINE = "#3a332d";
const ACCENT = "#e8af4f";

/**
 * O cartão que aparece quando o link é colado no LinkedIn ou no WhatsApp.
 *
 * Sem ele, a primeira impressão do site para um recrutador é um retângulo de
 * texto pelado — o que é uma pena, já que compartilhar o link é exatamente
 * para o que o site existe.
 *
 * Gerado no build, então não há binário no repositório para desatualizar: o
 * nome e o cargo saem do mesmo `site.ts` que a página lê.
 *
 * Layout em flexbox puro e explícito de propósito — Satori não implementa grid,
 * e todo elemento com mais de um filho precisa de `display: flex` declarado.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          padding: "72px 80px",
        }}
      >
        {/* a mesma régua de 1px que separa as seções do site */}
        <div style={{ display: "flex", width: "100%", height: 1, backgroundColor: LINE }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", width: 44, height: 2, backgroundColor: ACCENT }} />
            <div
              style={{
                display: "flex",
                marginLeft: 18,
                fontSize: 27,
                color: ACCENT,
                letterSpacing: -0.5,
              }}
            >
              {profile.role}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 92,
              fontWeight: 700,
              color: INK,
              letterSpacing: -3.5,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 860,
              fontSize: 27,
              color: MUTED,
              lineHeight: 1.45,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: FAINT }}>
            {profile.location}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: MUTED }}>
            {profile.name.split(" ")[0]}
            <span style={{ color: ACCENT }}>.dev</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
