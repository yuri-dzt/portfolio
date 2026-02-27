import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { Section } from "@/types/section";
import { scrollTo } from "../_data/functions";
import { NAV_ITEMS } from "../_data/constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavigationProps {
  setActive: Dispatch<SetStateAction<Section>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  active: string;
}

const Navigation = ({ setActive, setOpen, active }: NavigationProps) => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={item.id}>
            <button
              onClick={() =>
                scrollTo({
                  id: item.id,
                  setActive,
                  setOpen,
                })
              }
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "relative px-3 lg:px-4 py-2 text-sm font-medium rounded transition-all duration-200 outline-none overflow-hidden",
                active === item.id
                  ? "text-primary bg-primary/10 hover:bg-primary/20"
                  : "text-light/40 hover:text-light hover:bg-light/5",
              )}
            >
              {active === item.id && (
                <span className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-linear-to-r from-transparent via-primary to-transparent" />
              )}
              {item.label}
            </button>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { Navigation };
