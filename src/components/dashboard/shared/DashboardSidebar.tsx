"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
    adminLinks,
    landlordLinks,
    tenantLinks,
} from "@/constants/dashboardLinks";
import { User } from "@/types";
import { logout } from "@/services/auth";

// import { logoutAction } from "@/actions/auth/logoutAction";

type DashboardSidebarProps = {
    user: User;
};

export default function DashboardSidebar({
    user,
}: DashboardSidebarProps) {
    const pathname = usePathname();
    const links =
        user.role === "TENANT"
            ? tenantLinks
            : user.role === "LANDLORD"
                ? landlordLinks
                : adminLinks;

    const isActive = (href: string) => {
        if (href === pathname) return true;

        return pathname.startsWith(`${href}/`);
    };

    const handleLogout = async () => {
        await logout();
    };
    return (
        <aside className="flex h-screen w-72 flex-col border-r bg-background">
            {/* Logo */}
            <div className="border-b p-6">
                <Link
                    href="/"
                    className="text-2xl font-bold text-primary"
                >
                    RentNest
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
                {links.map((link) => {
                    const Icon = link.icon;

                    const active = isActive(link.href);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                                active
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                            )}
                        >
                            <Icon className="size-5" />

                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t p-4">
                <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 size-4" />

                    Logout
                </Button>
            </div>
        </aside>
    );
}