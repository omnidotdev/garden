import Link from "next/link";
import {
  CodeIcon,
  Share2Icon,
  ZapIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "lucide-react";

import { Button, RotatingText } from "components/ui";
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
  {
    icon: <ArrowRightIcon className="h-6 w-6" />,
    title: "Composable Gardens",
    description:
      "Build interconnected ecosystems with powerful garden relationship models",
  },
];

/**
 * Home page.
 */
const HomePage = () => (
  <div className="flex flex-col bg-gradient-to-b from-background via-background/90 to-background/80 overflow-x-hidden">
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
              🌱 See the forest <i>and</i> the trees 🌱
            </p>
          </div>

          <div className="space-y-4">
            <RotatingText
              words={[
                "Product",
                "Service",
                "Team",
                "Organization",
                "Project",
                "Platform",
              ]}
              className="py-2"
            />

            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Transform complex business ecosystem relationships into clear,
              interactive, and interconnected visualizations that evolve with
              your organization.
            </p>
          </div>

          <div className="mt-8 space-x-4">
            <Link href="/visualizer">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 mt-4"
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
    </section>

    <section className="flex w-full flex-col items-center justify-center py-16 bg-background">
      <div className="container max-w-full px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Garden?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Garden helps simplify complexity and gain clarity on your business
            ecosystem.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col space-y-3 rounded-lg border bg-card p-6">
            <div className="flex items-center space-x-3 flex-wrap">
              <SparklesIcon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">User Awareness</h3>
            </div>
            <p className="text-muted-foreground">
              Visually model your product, service, and other offerings as
              interactive visualizations that everyone can understand
            </p>
          </div>
          <div className="flex flex-col space-y-3 rounded-lg border bg-card p-6">
            <div className="flex items-center space-x-3 flex-wrap">
              <Share2Icon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Collaborate Effectively</h3>
            </div>
            <p className="text-muted-foreground">
              Share your ecosystem maps with stakeholders to align understanding
              and drive better decision making across your organization
            </p>
          </div>
        </div>

        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
            Composable Architecture
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col space-y-3 rounded-lg border bg-card p-6">
              <div className="flex items-center space-x-3 flex-wrap">
                <ArrowRightIcon className="h-10 w-10 text-primary rotate-90" />
                <h3 className="text-xl font-bold">Supergardens</h3>
              </div>
              <p className="text-muted-foreground">
                Link gardens upward to their parent ecosystems, creating
                hierarchical relationships that provide context and big-picture
                visibility. Supergardens enable organization-wide mapping of
                complex systems with multiple levels of abstraction.
              </p>
            </div>
            <div className="flex flex-col space-y-3 rounded-lg border bg-card p-6">
              <div className="flex items-center space-x-3 flex-wrap">
                <ArrowRightIcon className="h-10 w-10 text-primary -rotate-90" />
                <h3 className="text-xl font-bold">Subgardens</h3>
              </div>
              <p className="text-muted-foreground">
                Connect gardens to their components and subsystems, allowing you
                to drill down into specific areas while maintaining overall
                structure. Expand subgardens directly in your visualization or
                navigate between gardens with a single click.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8">
            <div className="flex flex-col space-y-3 rounded-lg border bg-card p-6">
              <div className="flex items-center space-x-3 flex-wrap">
                <Share2Icon className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">
                  Interconnected Garden Network
                </h3>
              </div>
              <p className="text-muted-foreground">
                Create a network of connected gardens that accurately represents
                your ecosystem's complexity. Each garden can be both a
                supergarden and a subgarden, enabling multi-dimensional
                relationships that match real-world structures. Visualize
                relationships between products, services, teams, and
                infrastructure with ease, all while maintaining the ability to
                navigate through your ecosystem at any level of detail.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/visualizer">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              Start Modeling
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
