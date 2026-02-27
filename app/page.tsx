import { Home } from "@/components/home";
import { Footer } from "@/components/footer";
import { AboutMe } from "@/components/about-me";
import { Navbar } from "@/components/navbar/navbar";
import { MyProjects } from "@/components/my-projects";
import { MyContacts } from "@/components/my-contacts";
import { MyEducation } from "@/components/my-education";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MyCapabilities } from "@/components/my-capabilities";

export default function Page() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen w-full bg-accent text-muted overflow-x-hidden">
        <Navbar />

        <main className="relative z-10 w-full">
          <Home />
          <AboutMe />
          <MyEducation />
          <MyCapabilities />
          <MyProjects />
          <MyContacts />
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
