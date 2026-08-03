import Link from "next/link";

import { Building2, Search, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-[calc(100vh-80px)] items-center px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
          <Building2 className="size-4" />
          Smart Rental Management Platform
        </div>

        <p className="text-4xl font-bold tracking-tight md:text-6xl">
          Find Your Perfect Rental Property
        </p>

        <p className="mt-6 text-lg text-muted-foreground">
          RentNest helps tenants discover rental homes,
          landlords manage properties, and administrators
          oversee the platform—all in one place.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">
            <Link href="/properties">
              Browse Properties
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
          >
            <Link href="/register">
              Get Started
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <Search className="mx-auto mb-4 size-10 text-primary" />

            <h3 className="font-semibold">
              Find Properties
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Browse verified rental listings that
              match your needs.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <Building2 className="mx-auto mb-4 size-10 text-primary" />

            <h3 className="font-semibold">
              Manage Rentals
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Landlords can easily create and manage
              rental properties.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <ShieldCheck className="mx-auto mb-4 size-10 text-primary" />

            <h3 className="font-semibold">
              Secure Platform
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Role-based authentication and secure
              payment integration with Stripe.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}