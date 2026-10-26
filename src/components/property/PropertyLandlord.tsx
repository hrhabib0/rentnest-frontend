import { Mail, ShieldCheck, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type PropertyLandlordProps = {
    landlord: {
        name: string;
        email: string;
        profilePhotoUrl: string | null;
        status: string;
    };
};

export default function PropertyLandlord({
    landlord,
}: PropertyLandlordProps) {
    const initials = landlord.name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <section className="space-y-5">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">
                    Meet the Landlord
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Contact information for the property owner.
                </p>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:p-6">
                <Avatar className="size-20 shrink-0 ring-4 ring-primary/10">
                    <AvatarImage
                        src={landlord.profilePhotoUrl || undefined}
                        alt={landlord.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                        {initials || <UserRound className="size-8" />}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold tracking-tight">
                            {landlord.name}
                        </h3>

                        <Badge variant="secondary" className="gap-1">
                            <ShieldCheck className="size-3.5" />
                            {landlord.status}
                        </Badge>
                    </div>

                    <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="size-4 shrink-0 text-primary" />
                        <a
                            href={`mailto:${landlord.email}`}
                            className="break-all transition-colors hover:text-primary"
                        >
                            {landlord.email}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}