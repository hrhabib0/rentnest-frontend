"use client";

import Link from "next/link";
import {
    LogOut,
    LayoutDashboard,
    User,
} from "lucide-react";

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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserMenuProps = {
    user: {
        name: string;
        email: string;
        profilePhotoUrl?: string | null;
    };
};

export default function UserProfileMenu({ user }: UserMenuProps) {
    const router = useRouter()
    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            router.push("/login");
            toast.success(result.message)
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer">
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={user.profilePhotoUrl || ""}
                        alt={user.name}
                    />
                    <AvatarFallback>
                        {user.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">

                <DropdownMenuGroup>

                    <DropdownMenuLabel>
                        <div className="flex flex-col">
                            <span className="font-semibold">{user.name}</span>
                            <span className="text-xs text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Link
                            href="/dashboard"
                            className="flex w-full items-center gap-2"
                        >
                            <LayoutDashboard className="size-4" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link
                            href="/dashboard/profile"
                            className="flex w-full items-center gap-2"
                        >
                            <User className="size-4" />
                            Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                        <LogOut className="size-4" />
                        Logout
                    </DropdownMenuItem>

                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}