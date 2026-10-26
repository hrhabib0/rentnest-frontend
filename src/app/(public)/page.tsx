
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Check,
  House,
  Search,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import HeroSection from "@/components/home/HeroSection";

const features = [
  {
    icon: Search,
    number: "01",
    title: "Find your place",
    description:
      "Explore rental properties and discover a home that fits your lifestyle and budget.",
  },
  {
    icon: Building2,
    number: "02",
    title: "Manage with ease",
    description:
      "Give landlords a central place to manage property listings and rental requests.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Rent with confidence",
    description:
      "Use secure authentication and integrated payments for a more organized rental experience.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <section className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Made for renting
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Everything you need, in one place.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              From discovering a property to managing rental requests,
              RentNest helps keep the process organized.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="group rounded-2xl border border-border/80 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>

                    <span className="text-sm font-medium text-muted-foreground/60">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="bg-secondary/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-16">
          <div>
            <p className="text-sm font-medium text-primary">
              READY TO GET STARTED?
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Your next home starts here.
            </h2>
          </div>

          <Button
            nativeButton={false}
            size="lg"
            className="h-12 rounded-full px-6"
            render={<Link href="/properties" />}
          >
            Browse available properties
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
