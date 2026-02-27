"use client";

import Link from "next/link";
import { WhatsappSolid } from "iconoir-react";

import { Button } from "@/components/ui/button";

const ContactMe = () => {
  return (
    <Button
      asChild
      size="sm"
      className="hidden md:inline-flex gap-1.5 text-xs font-semibold bg-primary text-accent hover:bg-secondary hover:opacity-100 transition-all duration-200 rounded hover:scale-[1.02] active:scale-[0.98]"
    >
      <Link
        href="https://api.whatsapp.com/send?phone=5535999196082"
        target="_blank"
      >
        <WhatsappSolid className="h-3.5 w-3.5" />
        Contato
      </Link>
    </Button>
  );
};

export { ContactMe };
