"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   O nó (2,3) — um trefoil.

   A curva é fechada e periódica, e o triedro de Frenet é calculado ponto
   a ponto a partir dela. Como só depende do parâmetro, ele volta para si
   mesmo depois de uma volta: a costura do tubo fecha sozinha, sem
   transporte paralelo nem correção de torção na emenda.
   ------------------------------------------------------------------ */
const P = 2;
const Q = 3;
const TUBE = 0.46;

/* O nó nasce quase plano — ±1 em z contra ±3 em xy. Sem esse ganho ele
   gira bastante e revela pouca profundidade. */
const Z_GAIN = 1.7;

/** Alcance do nó no plano da tela, usado para caber no quadro. */
const SPAN = 3 + TUBE;

/** Distância focal. Menor = perspectiva mais dramática. */
const FOCAL = 11;

/**
 * Meia-profundidade usada para normalizar z. Deliberadamente menor que o raio
 * real do nó (~3,44): comprimir a faixa quase dobra a ocupação das bordas da
 * paleta, e é isso que separa uma aresta acesa de um degradê morno.
 */
const DEPTH = 2.5;

/** Uma volta a cada ~2 minutos. Não é movimento, é sinal de vida. */
const IDLE_RAD_PER_S = 0.05;

/* ------------------------------------------------------------------
   Paleta por profundidade.

   O laço de desenho não pode montar string de cor por segmento — são
   milhares por quadro. Em vez disso a profundidade cai em uma de poucas
   faixas, e cada faixa já tem cor, alfa e espessura prontos. Fundo (0) é
   o cinza quente das linhas do site; frente (última) é o âmbar do acento.
   ------------------------------------------------------------------ */
const BUCKETS = 22;
const FAR = [58, 51, 45]; // colors.line
const NEAR = [232, 175, 79]; // colors.accent

/** A partir daqui a faixa ganha halo. Só a frente floresce. */
const GLOW_FROM = Math.floor(BUCKETS * 0.6);

const PALETTE = (() => {
  const stroke: string[] = [];
  const glow: string[] = [];
  const width: number[] = [];

  for (let b = 0; b < BUCKETS; b += 1) {
    const f = b / (BUCKETS - 1);
    const tint = f ** 1.35;
    const r = Math.round(FAR[0] + (NEAR[0] - FAR[0]) * tint);
    const g = Math.round(FAR[1] + (NEAR[1] - FAR[1]) * tint);
    const bl = Math.round(FAR[2] + (NEAR[2] - FAR[2]) * tint);
    const a = 0.07 + 0.62 * f ** 1.9;

    stroke.push(`rgba(${r},${g},${bl},${a.toFixed(3)})`);
    glow.push(`rgba(${r},${g},${bl},${(a * 0.1).toFixed(3)})`);
    width.push(0.55 + 1.05 * f);
  }

  return { stroke, glow, width };
})();

type Quality = { rings: number; sides: number; ringStep: number };

const DENSE: Quality = { rings: 260, sides: 9, ringStep: 6 };
const SPARSE: Quality = { rings: 150, sides: 7, ringStep: 6 };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Seno suavizado: a câmera nunca chega, só dá meia-volta. */
const breathe = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

function curve(t: number, out: Float64Array) {
  const r = 2 + Math.cos(Q * t);
  out[0] = r * Math.cos(P * t);
  out[1] = r * Math.sin(P * t);
  out[2] = Math.sin(Q * t) * Z_GAIN;
}

/** Vértices do tubo em repouso: `rings × sides` pontos, em xyz. */
function buildKnot(rings: number, sides: number) {
  const out = new Float32Array(rings * sides * 3);
  const h = 1e-3;
  const p = new Float64Array(3);
  const a = new Float64Array(3);
  const b = new Float64Array(3);

  for (let i = 0; i < rings; i += 1) {
    const t = (i / rings) * Math.PI * 2;
    curve(t, p);
    curve(t - h, a);
    curve(t + h, b);

    // tangente e aceleração por diferença central
    let tx = b[0] - a[0];
    let ty = b[1] - a[1];
    let tz = b[2] - a[2];
    const tl = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1;
    tx /= tl;
    ty /= tl;
    tz /= tl;

    const ax = b[0] - 2 * p[0] + a[0];
    const ay = b[1] - 2 * p[1] + a[1];
    const az = b[2] - 2 * p[2] + a[2];

    // binormal = T × A, normal = B × T. A curvatura do trefoil nunca zera,
    // então o triedro nunca degenera e o tubo não colapsa em lugar nenhum.
    let bx = ty * az - tz * ay;
    let by = tz * ax - tx * az;
    let bz = tx * ay - ty * ax;
    const bl = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
    bx /= bl;
    by /= bl;
    bz /= bl;

    const nx = by * tz - bz * ty;
    const ny = bz * tx - bx * tz;
    const nz = bx * ty - by * tx;

    for (let s = 0; s < sides; s += 1) {
      const ang = (s / sides) * Math.PI * 2;
      const c = Math.cos(ang);
      const sn = Math.sin(ang);
      const o = (i * sides + s) * 3;
      out[o] = p[0] + TUBE * (c * nx + sn * bx);
      out[o + 1] = p[1] + TUBE * (c * ny + sn * by);
      out[o + 2] = p[2] + TUBE * (c * nz + sn * bz);
    }
  }

  return out;
}

export type SculptureProps = {
  /**
   * Driver externo normalizado 0 → 1, lido uma vez por quadro. Entregue o
   * progresso do scroll e o nó passa a ser virado por ele. É um getter
   * simples de propósito: o componente não precisa saber quem dirige.
   */
  progress?: () => number;
  /** Voltas completas ao longo de todo o progresso. */
  turns?: number;
  className?: string;
};

/**
 * Um nó trefoil em arame, girando. Não são quadros pré-renderizados: a malha
 * é gerada, rotacionada e projetada a cada quadro, então ela responde ao
 * scroll em qualquer ângulo e não custa um byte de imagem.
 *
 * O desenho é o de sempre — pintor: tudo ordenado do fundo para a frente. A
 * parte que não é óbvia é *como* ordenar. Com ~2.500 segmentos por quadro,
 * um `stroke()` por segmento derruba a taxa de quadros; então a profundidade
 * é discretizada em poucas faixas e cada faixa vira um caminho só. Ordenar
 * vira contagem (O(n), sem comparar nada) e pintar vira algumas dezenas de
 * chamadas em vez de milhares.
 *
 * Nada é alocado dentro do laço: os buffers nascem com o componente e são
 * reescritos a cada quadro.
 */
export function Sculpture({ progress, turns = 0.85, className }: SculptureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { rings, sides, ringStep } = window.matchMedia("(max-width: 767px)")
      .matches
      ? SPARSE
      : DENSE;

    const vertices = rings * sides;
    const base = buildKnot(rings, sides);

    /* Arestas: as que correm ao longo do tubo, e um anel a cada `ringStep`
       amostras. As longitudinais sozinhas já leem como cabo trançado; os
       anéis são o que deixa a superfície legível quando ela vira de lado. */
    const ringLines = Math.ceil(rings / ringStep);
    const segments = rings * sides + ringLines * sides;
    const segA = new Int32Array(segments);
    const segB = new Int32Array(segments);

    let k = 0;
    for (let i = 0; i < rings; i += 1) {
      const j = (i + 1) % rings;
      for (let s = 0; s < sides; s += 1) {
        segA[k] = i * sides + s;
        segB[k] = j * sides + s;
        k += 1;
      }
    }
    for (let i = 0; i < rings; i += ringStep) {
      for (let s = 0; s < sides; s += 1) {
        segA[k] = i * sides + s;
        segB[k] = i * sides + ((s + 1) % sides);
        k += 1;
      }
    }

    // buffers de quadro — escritos por cima, nunca realocados
    const proj = new Float32Array(vertices * 3); // x de tela, y de tela, z
    const bucketOf = new Uint8Array(segments);
    const counts = new Int32Array(BUCKETS);
    const offsets = new Int32Array(BUCKETS + 1);
    const cursor = new Int32Array(BUCKETS);
    const packed = new Float32Array(segments * 4);

    let width = 0;
    let height = 0;
    let fit = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // escrever em canvas.width zera o contexto inteiro — transform e
      // estilo de linha voltam junto
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // 0,40 deixa o nó com ~780px de diâmetro num quadro de 900: presença
      // sem encostar na borda, onde a vinheta já o teria comido
      fit = (Math.min(width, height) * 0.4) / SPAN;
    };

    let origin = 0;
    let elapsed = 0;

    const draw = (now: number) => {
      if (!width || !height) return;

      const t = reduced ? 0 : (now - origin) / 1000;
      const p = progress ? clamp01(progress()) : reduced ? 0.12 : (t * 0.05) % 1;

      /* A deriva lenta é somada ao ângulo do scroll em vez de substituí-lo:
         parado o objeto continua vivo, e rolar apenas acelera o mesmo giro. */
      const yaw = 0.6 + p * turns * Math.PI * 2 + t * IDLE_RAD_PER_S;
      const pitch = -0.34 + p * 0.5 + Math.sin(t * 0.21) * 0.09;

      // câmera respirando, com o mesmo período do dz7
      const cycle = (t % 20) / 10;
      const scale =
        fit * (1 + 0.035 * breathe(cycle > 1 ? 2 - cycle : cycle));

      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const ox = width / 2;
      const oy = height / 2;

      for (let i = 0; i < vertices; i += 1) {
        const o = i * 3;
        const x = base[o];
        const y = base[o + 1];
        const z = base[o + 2];

        const x1 = x * cy + z * sy;
        const z1 = z * cy - x * sy;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;

        const persp = FOCAL / (FOCAL + z2);
        proj[o] = ox + x1 * persp * scale;
        proj[o + 1] = oy + y2 * persp * scale;
        proj[o + 2] = z2;
      }

      // ordenação por contagem: cada segmento cai na faixa da sua
      // profundidade média, e as faixas já saem em ordem de fundo → frente
      counts.fill(0);
      for (let s = 0; s < segments; s += 1) {
        const z = (proj[segA[s] * 3 + 2] + proj[segB[s] * 3 + 2]) * 0.5;
        let b = (((DEPTH - z) / (2 * DEPTH)) * BUCKETS) | 0;
        if (b < 0) b = 0;
        else if (b >= BUCKETS) b = BUCKETS - 1;
        bucketOf[s] = b;
        counts[b] += 1;
      }

      offsets[0] = 0;
      for (let b = 0; b < BUCKETS; b += 1) {
        offsets[b + 1] = offsets[b] + counts[b];
        cursor[b] = offsets[b];
      }

      for (let s = 0; s < segments; s += 1) {
        const b = bucketOf[s];
        const at = cursor[b] * 4;
        cursor[b] += 1;
        const ia = segA[s] * 3;
        const ib = segB[s] * 3;
        packed[at] = proj[ia];
        packed[at + 1] = proj[ia + 1];
        packed[at + 2] = proj[ib];
        packed[at + 3] = proj[ib + 1];
      }

      ctx.clearRect(0, 0, width, height);

      for (let b = 0; b < BUCKETS; b += 1) {
        const from = offsets[b];
        const to = offsets[b + 1];
        if (from === to) continue;

        ctx.beginPath();
        for (let s = from; s < to; s += 1) {
          const at = s * 4;
          ctx.moveTo(packed[at], packed[at + 1]);
          ctx.lineTo(packed[at + 2], packed[at + 3]);
        }

        /* Halo: o mesmo caminho, largo e quase invisível. É bloom por dois
           traços em vez de `shadowBlur`, que borraria a tela inteira a cada
           quadro para um brilho que ninguém consegue apontar. */
        if (b >= GLOW_FROM) {
          ctx.lineWidth = PALETTE.width[b] * 4.2;
          ctx.strokeStyle = PALETTE.glow[b];
          ctx.stroke();
        }

        ctx.lineWidth = PALETTE.width[b];
        ctx.strokeStyle = PALETTE.stroke[b];
        ctx.stroke();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    resize();

    if (reduced) {
      draw(0);
      return () => resizeObserver.disconnect();
    }

    let raf: number | null = null;

    const tick = (now: number) => {
      elapsed = now;
      draw(now);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf !== null) return;
      // o tempo parado não conta: o nó retoma do ângulo onde ficou
      origin += performance.now() - elapsed;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (raf === null) return;
      cancelAnimationFrame(raf);
      raf = null;
    };

    let onScreen = true;
    let visible = !document.hidden;
    const sync = () => (onScreen && visible ? start() : stop());

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const boot = performance.now();
    origin = boot;
    elapsed = boot;
    sync();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [progress, turns]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    />
  );
}
