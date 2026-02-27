import { AnimatedSection } from "./animated-section";

interface SectionHeaderProps {
  num: string;
  title: string;
}

const SectionHeader = ({ num, title }: SectionHeaderProps) => {
  return (
    <AnimatedSection>
      <div className="flex items-center gap-3 mb-10 sm:mb-12 lg:mb-14">
        <span className="text-xs px-2 py-1 rounded shrink-0 font-mono text-primary bg-primary/10 border border-primary/30">
          {num}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold shrink-0 text-muted">
          {title}
        </h2>
        <div className="flex-1 h-px min-w-0 bg-border" />
      </div>
    </AnimatedSection>
  );
};

export { SectionHeader };
