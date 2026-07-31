"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { publicNavLinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="hidden items-center gap-6 md:flex">
            {publicNavLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === link.href
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}