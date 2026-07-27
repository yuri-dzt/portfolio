import { GraduationCap, BadgeCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { education, certifications } from "@/data/site";

export function Education() {
  return (
    <Section id="formacao">
      <Reveal variant="wipe">
        <SectionHeading
          title="Base acadêmica e certificações"
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal variant="tilt">
          <div className="h-full rounded-2xl border border-line bg-surface p-6">
            <h3 className="flex items-center gap-2 font-mono text-sm text-accent">
              <GraduationCap size={16} /> Formação
            </h3>

            <ul className="mt-5 space-y-6">
              {education.map((item) => (
                <li key={item.course}>
                  <p className="font-mono text-xs text-faint">
                    {item.period} · {item.location}
                  </p>
                  <p className="mt-1.5 text-base font-medium leading-snug text-ink">
                    {item.course}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.institution}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="tilt" delay={0.08}>
          <div className="h-full rounded-2xl border border-line bg-surface p-6">
            <h3 className="flex items-center gap-2 font-mono text-sm text-accent">
              <BadgeCheck size={16} /> Certificações
            </h3>

            <ul className="mt-5 divide-y divide-line">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3 first:pt-0 last:pb-0"
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
