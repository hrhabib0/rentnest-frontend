
"use client";

import Link from "next/link";
import { Menu, LayoutDashboard, UserRound } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { publicNavLinks } from "@/constants/navigation";

type MobileNavProps = {
    isAuthenticated: boolean;
};

export default function MobileNav({
    isAuthenticated,
}: MobileNavProps) {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open navigation menu"
                        />
                    }
                >
                    <Menu className="size-6" aria-hidden="true" />
                </SheetTrigger>

                <SheetContent
                    side="left"
                    className="w-[min(85vw,320px)]"
                >
                    <div className="mt-10 flex flex-col gap-2 px-2">
                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Navigation
                        </p>

                        {publicNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="my-3 border-t" />

                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <Link
                                    href="/dashboard/profile"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                                >
                                    <UserRound className="size-4" />
                                    My Profile
                                </Link>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 px-1">
                                <Button
                                    variant="outline"
                                    nativeButton={false}
                                    render={<Link href="/login" />}
                                    className="w-full"
                                >
                                    Login
                                </Button>

                                <Button
                                    nativeButton={false}
                                    render={<Link href="/register" />}
                                    className="w-full"
                                >
                                    Get Started
                                </Button>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
