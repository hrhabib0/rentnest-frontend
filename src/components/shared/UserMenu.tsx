
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function UserMenu() {
    return (
        <div className="hidden items-center gap-2 md:flex">
            <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/login" />}
            >
                Login
            </Button>

            <Button
                nativeButton={false}
                render={<Link href="/register" />}
            >
                Get Started
            </Button>
        </div>
    );
}
