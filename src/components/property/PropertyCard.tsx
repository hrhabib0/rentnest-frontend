
import Image from "next/image";
import Link from "next/link";
import {
    Bath,
    BedDouble,
    Building2,
    MapPin,
    Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProperty } from "@/types/property";

type Props = {
    property: IProperty;
};

export default function PropertyCard({ property }: Props) {
    const imageUrl = property.imageUrls?.[0];
    const isAvailable = property.status === "AVAILABLE";

    const formattedRent = Number(property.monthlyRent).toLocaleString(
        "en-BD",
    );

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
            {/* Property image */}
            <div className="relative h-60 overflow-hidden bg-secondary sm:h-64">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-primary/60">
                        <Building2 className="size-12" />
                        <span className="text-sm">Property image unavailable</span>
                    </div>
                )}

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

                <Badge className="absolute left-4 top-4 border-0 bg-background/95 text-foreground shadow-sm hover:bg-background">
                    {property.category.name}
                </Badge>

                <Badge
                    variant={isAvailable ? "default" : "secondary"}
                    className="absolute right-4 top-4 shadow-sm"
                >
                    {isAvailable ? "Available" : property.status}
                </Badge>
            </div>

            {/* Property information */}
            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                <div>
                    <h2 className="line-clamp-1 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {property.title}
                    </h2>

                    <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                        <MapPin className="mt-1 size-4 shrink-0 text-primary" />
                        <span className="line-clamp-2">
                            {property.city}, {property.address}
                        </span>
                    </p>
                </div>

                {/* Property facts */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border/70 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <BedDouble className="size-4 text-primary" />
                        <span>
                            {property.bedrooms}{" "}
                            {property.bedrooms === 1 ? "Bed" : "Beds"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Bath className="size-4 text-primary" />
                        <span>
                            {property.bathrooms}{" "}
                            {property.bathrooms === 1 ? "Bath" : "Baths"}
                        </span>
                    </div>

                    <div
                        className="flex items-center gap-2"
                        aria-label={`${property._count.reviews} reviews`}
                    >
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span>
                            {property._count.reviews}{" "}
                            {property._count.reviews === 1 ? "Review" : "Reviews"}
                        </span>
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((item) => (
                        <Badge
                            key={item}
                            variant="outline"
                            className="rounded-full border-primary/15 bg-secondary/40 px-3 py-1 font-normal text-muted-foreground"
                        >
                            {item}
                        </Badge>
                    ))}

                    {property.amenities.length > 3 && (
                        <Badge
                            variant="outline"
                            className="rounded-full px-3 py-1 font-normal"
                        >
                            +{property.amenities.length - 3} more
                        </Badge>
                    )}
                </div>

                {/* Price and action stay aligned at the bottom */}
                <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                    <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Monthly rent
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-primary">
                            ৳{formattedRent}
                            <span className="ml-1 text-sm font-normal text-muted-foreground">
                                /mo
                            </span>
                        </p>
                    </div>

                    <Button
                        nativeButton={false}
                        className="shrink-0 rounded-full px-4"
                        render={<Link href={`/properties/${property.id}`} />}
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </article>
    );
}
