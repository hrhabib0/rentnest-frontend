import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function UserMenu() {
    return (
        <div className="hidden items-center gap-2 md:flex">
            <Link href="/login">
                <Button
                    variant="default"
                >
                    Login
                </Button>
            </Link>
            <Link href="/register">
                <Button>
                    Register
                </Button>
            </Link>
        </div>
    );
}