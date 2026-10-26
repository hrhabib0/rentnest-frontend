
import Link from "next/link";
import { House } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="RentNest home"
      className="inline-flex items-center gap-2 rounded-sm text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary sm:text-2xl"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <House className="size-5" aria-hidden="true" />
      </span>
      <span>
        Rent<span className="text-primary">Nest</span>
      </span>
    </Link>
  );
}
