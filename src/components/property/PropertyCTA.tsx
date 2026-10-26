
import Link from "next/link";
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RequestToRentModal from "../rental/RequestToRentModal";

type PropertyCTAProps = {
    id: string;
    rent: string;
    status: string;
    userRole?: string | null;
};

export default function PropertyCTA({
    id,
    rent,
    status,
    userRole,
}: PropertyCTAProps) {
    const isAvailable = status === "AVAILABLE";
    const formattedRent = Number(rent).toLocaleString("en-BD");

    return (
        <aside className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm shadow-primary/5 sm:p-6 lg:shadow-lg lg:shadow-primary/5">
            <div className="space-y-5">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Monthly rental price
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        ৳{formattedRent}
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                            / month
                        </span>
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 p-3">
                    <span className="text-sm text-muted-foreground">
                        Availability
                    </span>

                    <Badge variant={isAvailable ? "default" : "secondary"}>
                        {isAvailable ? "Available" : status.replaceAll("_", " ")}
                    </Badge>
                </div>

                {userRole === "TENANT" ? (
                    isAvailable ? (
                        <RequestToRentModal propertyId={id} />
                    ) : (
                        <Button className="w-full" disabled>
                            Currently unavailable
                        </Button>
                    )
                ) : !userRole ? (
                    <Button
                        nativeButton={false}
                        className="h-11 w-full rounded-full"
                        render={<Link href="/login" />}
                    >
                        Login to request
                        <ArrowRight className="size-4" />
                    </Button>
                ) : (
                    <Button className="w-full" disabled>
                        Only tenants can request rentals
                    </Button>
                )}

                <div className="space-y-3 border-t border-border/70 pt-4">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                        <p className="text-xs leading-5 text-muted-foreground">
                            Your rental request is subject to approval by the landlord.
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
                        <p className="text-xs leading-5 text-muted-foreground">
                            Review the rental details before submitting your request.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
