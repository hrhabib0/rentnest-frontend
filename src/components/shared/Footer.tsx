import Link from "next/link";
import { House, ArrowUpRight } from "lucide-react";

const footerGroups = [
    {
        title: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Browse Properties", href: "/properties" },
        ],
    },
    {
        title: "Your Account",
        links: [
            { label: "Login", href: "/login" },
            { label: "Create an Account", href: "/register" },
        ],
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12 md:py-14">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            aria-label="RentNest home"
                            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                        >
                            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <House className="size-5" aria-hidden="true" />
                            </span>
                            <span>
                                Rent<span className="text-primary">Nest</span>
                            </span>
                        </Link>

                        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                            Find a place to call home. Explore properties and take
                            the next step toward your ideal rental.
                        </p>
                    </div>

                    {/* Navigation groups */}
                    {footerGroups.map((group) => (
                        <div key={group.title} className="space-y-4">
                            <h2 className="text-sm font-semibold text-foreground">
                                {group.title}
                            </h2>

                            <nav
                                aria-label={`${group.title} links`}
                                className="flex flex-col items-start gap-3"
                            >
                                {group.links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                        <ArrowUpRight
                                            className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="flex flex-col gap-3 border-t border-border py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {currentYear}{" "}
                        <span className="font-semibold text-foreground">
                            RentNest
                        </span>
                        . All rights reserved.
                    </p>

                    <Link
                        href="/properties"
                        className="transition-colors hover:text-primary"
                    >
                        Find your next home
                    </Link>
                </div>
            </div>
        </footer>
    );
}