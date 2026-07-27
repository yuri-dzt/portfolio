import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto w-[92%] max-w-content">{children}</div>
    </section>
  );
}

/**
 * Título de seção.
 *
 * Sem o rótulo mono minúsculo acima do título: repetido em oito seções, ele
 * vira andaime de template. A separação aqui é estrutural — um fio de 1px na
 * largura do conteúdo, como a régua de um documento técnico.
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
      <div className={rule ? "mt-8 max-w-2xl sm:mt-10" : "max-w-2xl"}>
        <h2 className="text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
