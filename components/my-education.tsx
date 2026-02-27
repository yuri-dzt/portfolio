"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { formations } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { SectionHeader } from "./section-header";
import { fadeChild, stagger } from "@/lib/animations";

function useScrollInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const MyEducation = () => {
  const { ref, inView } = useScrollInView();

  return (
    <section
      id="formacao"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      <SectionHeader num="02" title="Formações" />

      <motion.div
        ref={ref}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {formations.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.course} variants={fadeChild}>
              <Card className="h-full">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.type}
                    </span>
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-muted leading-snug">
                      {item.course}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.institution}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-muted-foreground mt-auto">
                    {item.period}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export { MyEducation };
