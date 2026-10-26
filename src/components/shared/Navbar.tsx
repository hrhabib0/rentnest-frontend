
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";
import UserProfileMenu from "./UserProfileMenu";

import type { User } from "@/types";

type GetMeResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: User;
};

type NavbarProps = {
    user: GetMeResponse;
};

export default function Navbar({ user }: NavbarProps) {
    const currentUser =
        user.success && user.data ? user.data : null;

    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
                <Logo />

                <div className="flex items-center gap-4">
                    <MobileNav isAuthenticated={Boolean(currentUser)} />
                    <NavLinks />
                </div>

                {currentUser ? (
                    <UserProfileMenu
                        user={{
                            name: currentUser.name,
                            email: currentUser.email,
                            profilePhotoUrl: currentUser.profilePhotoUrl,
                        }}
                    />
                ) : (
                    <UserMenu />
                )}
            </div>
        </header>
    );
}
