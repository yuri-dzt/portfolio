import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/site";

export function Experience() {
  return (
    <Section id="experiencia">
      <Reveal variant="wipe">
        <SectionHeading title="Onde já apliquei isso" />
      </Reveal>

      <div className="mt-12">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.06}>
            <div className="relative grid gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr]">
              <div>
                <p className="font-mono text-sm text-accent">{job.period}</p>
                <p className="mt-1 text-sm text-faint">{job.company}</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-ink">{job.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {job.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
