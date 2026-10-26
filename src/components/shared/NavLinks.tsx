
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { publicNavLinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex"
        >
            {publicNavLinks.map((link) => {
                const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                            "relative rounded-sm py-2 text-sm font-medium transition-colors hover:text-primary",
                            isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        {link.label}
                        {isActive && (
                            <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-primary" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
