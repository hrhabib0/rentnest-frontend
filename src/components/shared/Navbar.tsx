import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

export default function Navbar() {
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

                <UserMenu />
            </div>
        </header>
    );
}