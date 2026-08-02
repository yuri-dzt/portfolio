import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * `data-skew` é o alvo da inclinação por velocidade de rolagem
 * (`VelocitySkew`). Fica aqui, e não nas seções, porque as duas cenas pinadas
 * — a dobra e as camadas — não passam por este componente: é justamente nelas
 * que inclinar um quadro preso na tela viraria enjoo.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      <div data-skew className="mx-auto w-[92%] max-w-content">
        {children}
      </div>
    </section>
  );
}

/**
 * Título de seção.
 *
 * Sem o rótulo mono minúsculo acima do título: repetido em oito seções, ele
 * vira andaime de template. A separação aqui é estrutural — um fio de 1px na
 * largura do conteúdo, como a régua de um documento técnico.
 *
 * Título e descrição dividem a linha em vez de empilharem numa coluna de
 * 672px. Empilhados, sobravam uns 450px vazios à direita do cabeçalho de todas
 * as oito seções — e essa faixa morta, repetida, é metade da sensação de
 * "espaço em branco demais". As duas alinham pela base: os pesos são
 * diferentes, e é a linha de base que os prende à mesma régua.
 */
export function SectionHeading({
  title,
  description,
  rule = true,
}: {
  title: string;
  description?: string;
  /** Desligue quando o título estiver numa coluna: o fio tem que atravessar
   *  a largura do conteúdo, não a da coluna. */
  rule?: boolean;
}) {
  return (
    <div>
      {rule ? <div className="h-px w-full bg-line" /> : null}
      {/* mais respiro acima do título do que abaixo dele: era o contrário,
          e por isso o título parecia colado na régua e solto do conteúdo */}
      <div
        className={cn(
          "grid gap-x-12 gap-y-4 md:items-end",
          description && "md:grid-cols-[1.25fr_1fr]",
          !description && "max-w-2xl",
          rule && "mt-10 sm:mt-14"
        )}
      >
        <h2 className="text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          {title}
        </h2>
        {description ? (
          <p className="text-pretty text-base leading-relaxed text-muted md:pb-1.5">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
