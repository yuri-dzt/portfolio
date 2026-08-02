import { Github, Linkedin, Instagram, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { socials, whatsappMessage } from "@/data/site";

const waLink = `https://wa.me/${socials.whatsapp}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const channels = [
  { label: "WhatsApp", value: "Resposta rápida", href: waLink, icon: MessageCircle, external: true },
  { label: "Email", value: socials.email, href: `mailto:${socials.email}`, icon: Mail, external: false },
  { label: "GitHub", value: "Ver repositórios", href: socials.github, icon: Github, external: true },
  { label: "LinkedIn", value: "Perfil profissional", href: socials.linkedin, icon: Linkedin, external: true },
  { label: "Instagram", value: "Bastidores e conteúdo", href: socials.instagram, icon: Instagram, external: true },
];

export function Contact() {
  return (
    <Section id="contato">
      {/* o segundo campo de pigmento: a página abre e fecha na cor da marca */}
      <div className="relative overflow-hidden rounded-3xl bg-field p-8 text-on-field sm:p-14">
        {/* a luz que atravessa o campo por baixo do texto */}
        <span aria-hidden className="field-breath" />

        <div className="relative">
          <Reveal>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.02em] text-on-field sm:text-[2.6rem]">
              Tem um projeto em mente? Vamos conversar.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-on-field-soft">
              Respondo rápido e sem enrolação. Me conte o que você precisa e eu
              digo com sinceridade se posso ajudar e como.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-on-field px-5 py-3 text-sm font-medium text-field transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98] active:duration-100"
              >
                <MessageCircle size={16} /> Chamar no WhatsApp
              </a>
              <a
                href={`mailto:${socials.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-on-field/30 px-5 py-3 text-sm font-medium text-on-field transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-on-field/60 hover:bg-on-field/10 active:translate-y-0 active:scale-[0.98] active:duration-100"
              >
                <Mail size={16} /> Enviar email
              </a>
            </div>
          </Reveal>

          {/* Cinco caixas com ícone dentro de outra caixa viravam painel de
              dashboard no meio de uma carta. Como lista de fios, cada canal é
              uma linha que se percorre — e a seta ganha o gesto, deslizando
              para fora no hover. */}
          <div className="mt-10 border-t border-on-field/25">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={Math.min(i, 3) * 0.05}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 border-b border-on-field/25 py-4 transition-colors duration-300 hover:border-on-field/60"
                >
                  <c.icon
                    size={17}
                    className="flex-none text-on-field-soft transition-colors duration-300 group-hover:text-on-field"
                  />
                  <span className="text-sm font-medium text-on-field">
                    {c.label}
                  </span>
                  <span className="min-w-0 truncate text-xs text-on-field-soft">
                    {c.value}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="ml-auto flex-none text-on-field-soft transition-[transform,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-on-field"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
