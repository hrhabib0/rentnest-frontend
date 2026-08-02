"use client";


import UserProfileMenu from "@/components/shared/UserProfileMenu";
import { User } from "@/types";

type DashboardHeaderProps = {
    user: User;
};

export default function DashboardHeader({
    user,
}: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            {/* Mobile Sidebar Button */}
            {/* <DashboardMobileSidebar user={user} /> */}

            {/* Page Title */}
            <h1 className="hidden text-xl font-semibold md:block">
                Dashboard
            </h1>

            {/* User Menu */}
            <UserProfileMenu
                user={{
                    name: user.name,
                    email: user.email,
                    profilePhotoUrl:
                        user.profilePhotoUrl,
                }}
            />
        </header>
    );
}