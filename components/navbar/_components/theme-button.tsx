"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { onThemeButtonClick } from "../_data/functions";

interface ThemeButtonProps {}

const ThemeButton = ({}: ThemeButtonProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="w-9 h-9 flex justify-center items-center rounded-md cursor-pointer hover:bg-border transition-all duration-200"
      onClick={() => {
        onThemeButtonClick({
          setTheme,
          theme,
        });
      }}
    >
      {theme && theme === "light" ? (
        <Sun
          suppressHydrationWarning
          width={20}
          height={20}
          className="text-light"
        />
      ) : (
        <Moon
          suppressHydrationWarning
          width={20}
          height={20}
          className="text-light"
        />
      )}
    </button>
  );
};

export { ThemeButton };
