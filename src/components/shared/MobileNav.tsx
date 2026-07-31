"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { publicNavLinks } from "@/constants/navigation";

export default function MobileNav() {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger render={
                    <Button variant="ghost" size="icon" />
                }>
                    <Menu className="h-6 w-6" />
                </SheetTrigger>

                <SheetContent side="left">
                    <div className="mt-10 flex flex-col gap-4">
                        {publicNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <hr />

                        <Link href="/login">
                            Login
                        </Link>

                        <Link href="/register">
                            Register
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}