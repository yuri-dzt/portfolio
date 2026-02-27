import { Dispatch, SetStateAction } from "react";

import { NAV_IDS } from "./constants";
import { Section } from "@/types/section";

interface onThemeButtonClick {
  setTheme: (theme: string) => void;
  theme?: string;
}

export function onThemeButtonClick({ setTheme, theme }: onThemeButtonClick) {
  const newTheme = theme && theme === "light" ? "dark" : "light";
  setTheme(newTheme);
}

interface HandleScrollProps {
  setActive: Dispatch<SetStateAction<Section>>;
}

export const handleScroll = ({ setActive }: HandleScrollProps) => {
  for (const id of [...NAV_IDS].reverse()) {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 140) {
      setActive(id);
      break;
    }
  }
};

interface ScrollToProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setActive: Dispatch<SetStateAction<Section>>;
  id: Section;
}

export const scrollTo = ({ setOpen, setActive, id }: ScrollToProps) => {
  setOpen(false);
  setActive(id);
  setTimeout(
    () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    10,
  );
};