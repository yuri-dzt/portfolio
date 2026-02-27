import { Dispatch, SetStateAction } from "react";

import { Section } from "@/types/section";
import { scrollTo } from "../_data/functions";

interface ScrollToProps {
  setActive: Dispatch<SetStateAction<Section>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarLogo = ({ setActive, setOpen }: ScrollToProps) => {
  return (
    <button
      onClick={() =>
        scrollTo({
          id: "sobre",
          setActive,
          setOpen,
        })
      }
      className="group flex items-center gap-2 shrink-0"
      aria-label="Início"
    >
      <span className="w-7 h-7 rounded bg-primary text-accent flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 group-hover:scale-105">
        YD
      </span>
      <span className="hidden text-sm font-medium tracking-wide text-light sm:block transition-colors duration-200 group-hover:text-light/70">
        yuri.dev
      </span>
    </button>
  );
};

export { NavbarLogo };
