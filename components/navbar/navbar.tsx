"use client";

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Section } from "@/types/section";
import { NavbarLogo } from "./_components/logo";
import { handleScroll } from "./_data/functions";
import { ContactMe } from "./_components/contact-me";
import { Navigation } from "./_components/navigation";
import { ThemeButton } from "./_components/theme-button";
import { MobileSidebar } from "./_components/mobile-sidebar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<Section>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll({ setActive }), {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", () => handleScroll({ setActive }));
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-xl"
          : "border-b border-border bg-background/90 backdrop-blur-xl",
      )}
    >
      <nav className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavbarLogo setActive={setActive} setOpen={setOpen} />
        <Navigation active={active} setActive={setActive} setOpen={setOpen} />

        <div className="flex items-center gap-2 shrink-0">
          <ThemeButton />
          <ContactMe />
          <MobileSidebar
            active={active}
            open={open}
            setOpen={setOpen}
            setActive={setActive}
          />
        </div>
      </nav>
    </header>
  );
};

export { Navbar };
