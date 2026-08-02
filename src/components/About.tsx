import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/data/site";

export function About() {
  return (
    <Section id="sobre">
      <div className="h-px w-full bg-line" />

      <div className="mt-10 grid gap-12 sm:mt-14 md:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal variant="wipe">
            <SectionHeading rule={false} title="Software que dá para manter." />
          </Reveal>

          {/* ficha técnica: rótulo à esquerda, número à direita */}
          <Reveal delay={0.12}>
            <dl className="mt-8 border-t border-line">
              {about.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                >
                  <dt className="text-sm leading-snug text-muted">{s.label}</dt>
                  <dd className="font-mono text-xl font-medium tracking-[-0.04em] text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-pretty text-base leading-relaxed text-muted">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
