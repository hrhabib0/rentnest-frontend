import Image from "next/image";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ILandlordProperty } from "@/types/landlordProperty";
import PropertyActionButtons from "./PropertyActionButtons";

type Props = {
    properties: ILandlordProperty[];
};

export default function PropertyTable({
    properties,
}: Props) {
    if (!properties.length) {
        return (
            <div className="rounded-xl border py-16 text-center">
                <h3 className="text-lg font-semibold">
                    No properties found
                </h3>

                <p className="mt-2 text-muted-foreground">
                    Start by adding your first property.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Rent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Requests</TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {properties.map((property) => (
                        <TableRow key={property.id}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={
                                            property.imageUrls[0]
                                        }
                                        alt={property.title}
                                        unoptimized
                                        width={70}
                                        height={70}
                                        className="rounded-lg object-cover"
                                    />

                                    <div>
                                        <p className="font-medium">
                                            {property.title}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {property.city}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {property.bedrooms} Bed •{" "}
                                            {property.bathrooms} Bath
                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>
                                {property.category.name}
                            </TableCell>

                            <TableCell>
                                ৳
                                {Number(
                                    property.monthlyRent
                                ).toLocaleString()}
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        property.status ===
                                            "AVAILABLE"
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {property.status}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {
                                    property._count
                                        .rentalRequests
                                }
                            </TableCell>

                            <TableCell>
                                {
                                    property._count
                                        .reviews
                                }
                            </TableCell>

                            <TableCell>
                                <PropertyActionButtons propertyId={property.id} propertyTitle={property.title} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}