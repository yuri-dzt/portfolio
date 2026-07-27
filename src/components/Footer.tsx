import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { profile, socials } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-[92%] max-w-content flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-faint">
          © {year} {profile.name}. Feito com Next.js.
        </p>
        <div className="flex items-center gap-5 text-faint">
          <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-ink">
            <Github size={18} />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-ink">
            <Linkedin size={18} />
          </a>
          <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-ink">
            <Instagram size={18} />
          </a>
          <a href={`mailto:${socials.email}`} aria-label="Email" className="transition-colors hover:text-ink">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
