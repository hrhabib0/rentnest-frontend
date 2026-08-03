import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-foreground">
                        RentNest
                    </span>
                    . All rights reserved.
                </p>

                <nav className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="transition-colors hover:text-primary"
                    >
                        Home
                    </Link>

                    <Link
                        href="/properties"
                        className="transition-colors hover:text-primary"
                    >
                        Properties
                    </Link>

                    <Link
                        href="/login"
                        className="transition-colors hover:text-primary"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="transition-colors hover:text-primary"
                    >
                        Register
                    </Link>
                </nav>
            </div>
        </footer>
    );
}