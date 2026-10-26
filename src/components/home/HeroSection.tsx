import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    Search,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
    {
        icon: Search,
        title: "Find Properties",
        description: "Discover rental homes that fit your needs.",
    },
    {
        icon: Building2,
        title: "Manage Rentals",
        description: "Manage property listings and rental requests.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Platform",
        description: "A structured rental experience with secure payments.",
    },
];

export default function HeroSection() {
    return (
        <section className="overflow-hidden bg-background">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
                {/* Hero content */}
                <div className="order-2 md:order-1">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary/70 px-4 py-2 text-sm font-medium text-primary">
                        <Building2 className="size-4" />
                        Smart Rental Management Platform
                    </div>

                    <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Find Your Perfect{" "}
                        <span className="font-serif italic text-primary">
                            Rental Property.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                        RentNest helps tenants discover rental homes, landlords manage
                        properties, and administrators oversee the platform—all in one
                        place.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button
                            nativeButton={false}
                            size="lg"
                            className="h-12 rounded-full px-6"
                            render={<Link href="/properties" />}
                        >
                            <Search className="size-4" />
                            Browse Properties
                        </Button>

                        <Button
                            nativeButton={false}
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-full border-primary/25 px-6"
                            render={<Link href="/register" />}
                        >
                            Get Started
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>

                    {/* Feature highlights */}
                    <div className="hidden mt-12 md:grid gap-6 sm:grid-cols-3">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="min-w-0">
                                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                                    <Icon className="size-5" />
                                </div>

                                <h2 className="text-sm font-semibold">{title}</h2>
                                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property image */}
                <div className="relative order-1 md:order-2">
                    <div className="absolute -right-8 -top-8 size-40 rounded-full bg-accent/20 blur-3xl" />

                    <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-secondary/40 p-2 shadow-xl shadow-primary/10">
                        <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-5/4 lg:aspect-4/5 xl:aspect-5/4">
                            <Image
                                src="/images/rentnest-hero.jpg"
                                alt="Modern rental home surrounded by greenery"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/5" />

                            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wider text-primary">
                                            Your next chapter
                                        </p>
                                        <h2 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                                            A place to call home.
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Discover a space that feels right for you.
                                        </p>
                                    </div>

                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                                        <Building2 className="size-5" />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                                    <span className="text-sm font-medium text-foreground">
                                        Find your next home
                                    </span>

                                    <Link
                                        href="/properties"
                                        aria-label="Explore rental properties"
                                        className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                                    >
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}