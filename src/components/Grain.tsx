/**
 * Grão sobre a página inteira.
 *
 * Um degradê escuro perfeitamente liso é a coisa que mais entrega "isto é um
 * retângulo digital". Uma camada de ruído a 4% quebra o liso e o olho lê como
 * material — é o acabamento mais barato que existe, e o único aqui que age em
 * todas as telas ao mesmo tempo.
 *
 * A textura é uma turbulência SVG embutida como data URI: nenhuma requisição,
 * nenhum arquivo em /public, e ela ladrilha sem emenda (`stitchTiles`).
 *
 * Estático de propósito. Grão de filme de verdade cintila, mas cintilar aqui
 * significa repintar a tela inteira algumas vezes por segundo, para sempre, e
 * o custo não se paga num efeito que ninguém consegue apontar.
 */
export function Grain() {
  return <div aria-hidden className="grain" />;
}
