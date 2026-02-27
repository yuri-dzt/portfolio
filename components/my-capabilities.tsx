"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { capabilities } from "@/lib/data";
import { SectionHeader } from "./section-header";
import { fadeChild, stagger } from "@/lib/animations";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function useScrollInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const MyCapabilities = () => {
  return (
    <section id="capabilities" className="w-full py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader num="02" title="Especialidades" />

        {(() => {
          const { ref, inView } = useScrollInView();

          return (
            <motion.div
              ref={ref}
              className="grid sm:grid-cols-2 gap-4 sm:gap-5"
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {Object.entries(capabilities).map(([category, items]) => (
                <motion.div key={category} variants={fadeChild}>
                  <Card className="h-full">
                    <CardHeader className="pb-3 pt-5 px-5 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-primary">
                          {category}
                        </h3>
                      </div>
                    </CardHeader>

                    <CardContent className="px-5 sm:px-6 pb-5">
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Tooltip key={item}>
                            <TooltipTrigger asChild>
                              <span className="text-xs px-2 py-0.5 rounded font-mono text-muted bg-accent border border-border-light">
                                {item}
                              </span>
                            </TooltipTrigger>

                            <TooltipContent
                              side="top"
                              className="bg-border border-border-light text-muted text-xs"
                            >
                              {item}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
};

export { MyCapabilities };
