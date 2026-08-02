import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { education, certifications } from "@/data/site";

/**
 * Dois cards iguais lado a lado, cada um com ícone e título, eram o desenho
 * mais genérico da página inteira — o contêiner preguiçoso, escolhido por não
 * ter escolhido nada. Aqui viram o que o resto do site já usa: rótulo na
 * margem, conteúdo na coluna, fio entre as linhas. Documento, não painel.
 *
 * Os ícones saíram junto: enfeitar "Formação" com um chapéu de formatura não
 * acrescenta informação nenhuma a quem já leu a palavra.
 */
export function Education() {
  return (
    <Section id="formacao">
      <Reveal variant="wipe">
        <SectionHeading title="Base acadêmica e certificações" />
      </Reveal>

      <div className="mt-8 border-t border-line">
        {education.map((item) => (
          <Reveal key={item.course}>
            <div className="grid gap-2 border-b border-line py-6 md:grid-cols-[200px_1fr] md:gap-10">
              <p className="font-mono text-sm text-accent">Formação</p>
              <div>
                <p className="text-base font-medium leading-snug text-ink">
                  {item.course}
                </p>
                <p className="mt-1.5 text-sm text-muted">{item.institution}</p>
                <p className="mt-1 font-mono text-xs text-faint">
                  {item.period} · {item.location}
                </p>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.08}>
          <div className="grid gap-2 border-b border-line py-6 md:grid-cols-[200px_1fr] md:gap-10">
            <p className="font-mono text-sm text-accent">Certificações</p>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <p className="text-sm font-medium text-ink">{cert.name}</p>
                  <p className="font-mono text-xs text-faint">
                    {cert.issuer} · {cert.hours} · {cert.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
