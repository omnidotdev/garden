import Link from "next/link";
import {
  CodeIcon,
  Share2Icon,
  ZapIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "lucide-react";

import { Button } from "components/ui";
import cn from "lib/util/cn";

const features = [
  {
    icon: <CodeIcon className="h-6 w-6" />,
    title: "Easy Modeling",
    description:
      "Define your ecosystem structure using an intuitive JSON schema",
  },
  {
    icon: <Share2Icon className="h-6 w-6" />,
    title: "Interactive Maps",
    description: "Transform complex relationships into clear, visual insights",
  },
  {
    icon: <ZapIcon className="h-6 w-6" />,
    title: "Dynamic Updates",
    description:
      "Watch your ecosystem map evolve in real-time as you make changes",
  },
];

/**
 * Home page.
 */
const HomePage = () => (
  <div className="flex flex-col bg-gradient-to-b from-background via-background/90 to-background/80">
    <section className="relative flex w-full flex-1 justify-center py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="-z-10 absolute inset-0 mx-0 max-w-none overflow-hidden">
        <div className="absolute top-0 left-1/2 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
            >
              <defs>
                <pattern
                  id="grid"
                  width="72"
                  height="56"
                  patternUnits="userSpaceOnUse"
                  x="50%"
                  y="100%"
                >
                  <path d="M.5 56V.5H72" fill="none" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#grid)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 font-medium text-sm">
            <p>
              🌱 See the Forest <i>and</i> the Trees 🌱
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex h-full items-center justify-center gap-4">
              <h1 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text py-2 font-bold text-3xl text-transparent tracking-tighter sm:text-4xl md:text-5xl">
                Visualize Your Ecosystem{" "}
              </h1>

              <SparklesIcon className="hidden h-10 w-10 md:flex" />
            </div>

            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Transform complex relationships into clear, interactive maps.
            </p>
          </div>

          <div className="mt-8 space-x-4">
            <Link href="/visualizer">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Start Modeling
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="flex h-full w-full flex-col items-center justify-center bg-muted/50 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "group relative flex flex-col items-center space-y-4 text-center",
                "rounded-lg border bg-background p-6 shadow-lg transition-shadow hover:shadow-xl"
              )}
            >
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                {feature.icon}
              </div>
              <h2 className="font-bold text-foreground text-xl">
                {feature.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-x-4">
        <Link href="/visualizer">
          <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            Start Modeling
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;
