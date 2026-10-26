
import {
    Bath,
    BedDouble,
    MapPin,
    Ruler,
    Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { IProperty } from "@/types/property";

type Props = {
    property: IProperty;
};

export default function PropertyInfo({ property }: Props) {
    const isAvailable = property.status === "AVAILABLE";

    const formattedRent = Number(property.monthlyRent).toLocaleString(
        "en-BD",
    );

    const facts = [
        {
            icon: BedDouble,
            value: property.bedrooms,
            label: property.bedrooms === 1 ? "Bedroom" : "Bedrooms",
        },
        {
            icon: Bath,
            value: property.bathrooms,
            label: property.bathrooms === 1 ? "Bathroom" : "Bathrooms",
        },
        {
            icon: Ruler,
            value: Number(property.size).toLocaleString("en-BD"),
            label: "Sq. Ft.",
        },
        {
            icon: Wallet,
            value: `৳${formattedRent}`,
            label: "Monthly rent",
        },
    ];

    return (
        <section className="space-y-8">
            {/* Property heading */}
            <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge
                        variant="outline"
                        className="rounded-full border-primary/20 bg-secondary/50 px-3 py-1 text-primary"
                    >
                        {property.category.name}
                    </Badge>

                    <Badge
                        variant={isAvailable ? "default" : "secondary"}
                        className="rounded-full px-3 py-1"
                    >
                        {isAvailable
                            ? "Available"
                            : property.status.replaceAll("_", " ")}
                    </Badge>
                </div>

                <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {property.title}
                </h1>

                <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    <MapPin className="mt-1 size-4 shrink-0 text-primary" />
                    <span>
                        {property.address}, {property.city}
                    </span>
                </p>
            </div>

            {/* Property facts */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                {facts.map(({ icon: Icon, value, label }) => (
                    <div
                        key={label}
                        className="rounded-2xl border border-border/80 bg-card p-4 transition-colors hover:border-primary/25 sm:p-5"
                    >
                        <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                            <Icon className="size-5" />
                        </div>

                        <p className="mt-4 break-words text-lg font-semibold tracking-tight sm:text-xl">
                            {value}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Description */}
            <div className="border-t border-border/70 pt-7">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                    About this property
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Property description
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {property.description}
                </p>
            </div>
        </section>
    );
}
