
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    LogOut,
    LayoutDashboard,
    UserRound,
} from "lucide-react";
import { toast } from "sonner";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/services/auth";

type UserMenuProps = {
    user: {
        name: string;
        email: string;
        profilePhotoUrl?: string | null;
    };
};

export default function UserProfileMenu({ user }: UserMenuProps) {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const initials =
        user.name
            ?.trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    const handleLogout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);

        try {
            const result = await logout();

            if (result.success) {
                toast.success(result.message || "Logged out successfully.");
                router.replace("/login");
                router.refresh();
            } else {
                toast.error(result.message || "Unable to log out.");
            }
        } catch {
            toast.error("Something went wrong while logging out.");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label="Open account menu"
                className="rounded-full outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
                <Avatar className="size-10 border border-border">
                    <AvatarImage
                        src={user.profilePhotoUrl || undefined}
                        alt={user.name || "User profile"}
                    />
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                        {initials}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex min-w-0 flex-col gap-1">
                            <span className="truncate font-semibold text-foreground">
                                {user.name}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => router.push("/dashboard")}
                    >
                        <LayoutDashboard className="size-4" />
                        Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => router.push("/dashboard/profile")}
                    >
                        <UserRound className="size-4" />
                        My Profile
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        variant="destructive"
                        disabled={isLoggingOut}
                        onClick={handleLogout}
                    >
                        <LogOut className="size-4" />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}