import Image from "next/image";
import Link from "next/link";

import {
    Bath,
    BedDouble,
    MapPin,
    Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProperty } from "@/types/property";



type Props = {
    property: IProperty;
};

export default function PropertyCard({
    property,
}: Props) {
    return (
        <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={property.imageUrls[0]}
                    alt={property.title}
                    unoptimized
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                />

                <Badge className="absolute left-4 top-4">
                    {property.category.name}
                </Badge>

                <Badge
                    variant={
                        property.status === "AVAILABLE"
                            ? "default"
                            : "secondary"
                    }
                    className="absolute right-4 top-4"
                >
                    {property.status}
                </Badge>
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <h2 className="line-clamp-1 text-xl font-semibold">
                        {property.title}
                    </h2>

                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />

                        {property.city}, {property.address}
                    </p>
                </div>

                <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" />
                        {property.bedrooms}
                    </div>

                    <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms}
                    </div>

                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {property._count.reviews}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {property.amenities
                        .slice(0, 3)
                        .map((item) => (
                            <Badge
                                key={item}
                                variant="outline"
                            >
                                {item}
                            </Badge>
                        ))}
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-primary">
                            ৳{property.monthlyRent}
                        </p>

                        <span className="text-xs text-muted-foreground">
                            per month
                        </span>
                    </div>

                    <Button>
                        <Link href={`/properties/${property.id}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}