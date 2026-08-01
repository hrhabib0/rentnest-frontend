import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";
import { getMe } from "@/services/auth";
import UserProfileMenu from "./UserProfileMenu";

export default async function Navbar() {
    const user = await getMe();
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div>
                    <Logo />
                </div>
                <div className="flex items-center gap-6">
                    <MobileNav />
                    <NavLinks />
                </div>
                {/* <UserMenu /> */}
                {user.success ? (
                    <UserProfileMenu user={{
                        name: user.data.name,
                        email: user.data.email,
                        profilePhotoUrl: user.data.profilePhotoUrl,
                    }} />
                ) : <UserMenu></UserMenu>}

            </div>
        </header >
    );
}