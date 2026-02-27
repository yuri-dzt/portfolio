import { Mail, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { Section } from "@/types/section";
import { scrollTo } from "../_data/functions";
import { NAV_ITEMS } from "../_data/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  active: string;
  setActive: Dispatch<SetStateAction<Section>>;
}

const MobileSidebar = ({
  open,
  setOpen,
  active,
  setActive,
}: MobileSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "md:hidden h-9 w-9 transition-all duration-200",
            open ? "text-primary" : "text-muted-foreground hover:text-light",
          )}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72 border-l border-border bg-foreground p-0 flex flex-col"
      >
        <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border">
          <span className="w-7 h-7 rounded bg-primary text-accent flex items-center justify-center text-xs font-bold">
            YD
          </span>
          <span className="text-sm font-medium tracking-wide text-light">
            yuri.dev
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                scrollTo({
                  id: item.id,
                  setActive,
                  setOpen,
                })
              }
              className={cn(
                "flex items-center gap-3 rounded px-3 py-3 text-sm font-medium transition-all duration-200 text-left",
                active === item.id
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-light hover:bg-light/5",
              )}
            >
              {active === item.id && (
                <span className="h-4 w-0.5 rounded-full bg-primary shrink-0" />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 pb-6 pt-2 border-t border-border">
          <Button
            asChild
            className="w-full gap-2 text-sm font-semibold bg-primary text-accent hover:bg-secondary hover:opacity-100 transition-all duration-200 rounded"
          >
            <a href="mailto:yuridonizete303@gmail.com">
              <Mail className="h-4 w-4" />
              Falar comigo
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileSidebar };
