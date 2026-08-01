import {
    Bath,
    BedDouble,
    MapPin,
    Ruler,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { IProperty } from "@/types/property";

type Props = {
    property: IProperty;
};

export default function PropertyInfo({
    property,
}: Props) {
    return (
        <div className="space-y-8">
            <div>
                <div className="mb-3 flex flex-wrap gap-3">
                    <Badge>{property.category.name}</Badge>

                    <Badge
                        variant={
                            property.status === "AVAILABLE"
                                ? "default"
                                : "secondary"
                        }
                    >
                        {property.status}
                    </Badge>
                </div>

                <h1 className="text-4xl font-bold">
                    {property.title}
                </h1>

                <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />

                    {property.address}, {property.city}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6 rounded-xl border p-6 md:grid-cols-4">
                <div className="flex flex-col items-center gap-2">
                    <BedDouble className="size-6 text-primary" />

                    <span className="text-lg font-semibold">
                        {property.bedrooms}
                    </span>

                    <span className="text-sm text-muted-foreground">
                        Bedrooms
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Bath className="size-6 text-primary" />

                    <span className="text-lg font-semibold">
                        {property.bathrooms}
                    </span>

                    <span className="text-sm text-muted-foreground">
                        Bathrooms
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Ruler className="size-6 text-primary" />

                    <span className="text-lg font-semibold">
                        {property.size}
                    </span>

                    <span className="text-sm text-muted-foreground">
                        Sq Ft
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                        ৳
                    </span>

                    <span className="text-lg font-semibold">
                        {property.monthlyRent}
                    </span>

                    <span className="text-sm text-muted-foreground">
                        Monthly Rent
                    </span>
                </div>
            </div>

            <div>
                <h2 className="mb-3 text-2xl font-semibold">
                    Description
                </h2>

                <p className="leading-8 text-muted-foreground">
                    {property.description}
                </p>
            </div>
        </div>
    );
}