import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { techGroups } from "@/data/site";

/**
 * As três esteiras infinitas saíram, e nada girando entrou no lugar.
 *
 * O problema delas nunca foi falta de movimento: para encher três linhas elas
 * embaralhavam os grupos — "Fastify" passava colado em "pgvector" sem nada em
 * comum — e o que sobrava era sopa de etiqueta, a assinatura visual de página
 * gerada. Cada frente da stack agora ocupa a própria linha, com o nome dela na
 * margem, no mesmo idioma de ficha técnica que "Sobre" e "Resultados" usam.
 *
 * Sem animação própria: a entrada por `Reveal` basta. Uma lista de ferramentas
 * é para ser consultada, não assistida.
 */
export function TechStack() {
  return (
    <Section id="tecnologias">
      <Reveal variant="wipe">
        <SectionHeading
          title="Ferramentas que uso no dia a dia"
          description="Escolho a stack pelo problema, não pela moda. Estas são as que domino e uso em produção."
        />
      </Reveal>

      <dl className="mt-8 border-t border-line">
        {techGroups.map((group, i) => (
          <Reveal key={group.title} delay={Math.min(i, 4) * 0.06}>
            <div className="grid gap-3 border-b border-line py-6 md:grid-cols-[200px_1fr] md:gap-10">
              <dt className="font-mono text-sm text-accent">{group.title}</dt>
              {/* Sem etiqueta: quarenta e duas caixinhas de borda e raio numa
                  seção só é a assinatura visual mais forte de página gerada.
                  O separador é um fio da cor da régua, não um ponto de texto,
                  então ele some do olho e sobra a palavra. */}
              <dd className="font-mono text-[13px] leading-[2] text-muted">
                {group.items.map((item, j) => (
                  <span key={item}>
                    {j > 0 ? <span className="text-line"> · </span> : null}
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
