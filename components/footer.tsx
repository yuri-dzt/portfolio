const Footer = () => {
  return (
    <footer className="border-t border-border bg-accent">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-xs font-mono text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} Yuri Donizete. Todos os direitos
          reservados.
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          Feito com <span className="text-primary">Next.js</span> +{" "}
          <span className="text-primary">Tailwind</span>
        </span>
      </div>
    </footer>
  );
};

export { Footer };
