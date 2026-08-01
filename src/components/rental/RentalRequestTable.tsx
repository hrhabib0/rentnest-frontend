import Image from "next/image";
import Link from "next/link";

import StatusBadge from "./StatusBadge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { IRentalRequest } from "@/types/rental";


type Props = {
    requests: IRentalRequest[];
};

export default function RentalRequestTable({
    requests,
}: Props) {
    console.log(requests, "request")
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Property</TableHead>

                    <TableHead>Move In</TableHead>

                    <TableHead>Monthly Rent</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead className="text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>

            {requests.length > 0 ? (<TableBody>
                {requests.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Image
                                    src={
                                        request.property
                                            .imageUrls[0]
                                    }
                                    alt={
                                        request.property
                                            .title
                                    }
                                    unoptimized
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover"
                                />

                                <div>
                                    <p className="font-medium">
                                        {
                                            request
                                                .property
                                                .title
                                        }
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {
                                            request
                                                .property
                                                .city
                                        }
                                    </p>
                                </div>
                            </div>
                        </TableCell>

                        <TableCell>
                            {new Date(
                                request.moveInDate
                            ).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                            ৳
                            {
                                request.property
                                    .monthlyRent
                            }
                        </TableCell>

                        <TableCell>
                            <StatusBadge
                                status={
                                    request.status
                                }
                            />
                        </TableCell>

                        <TableCell className="text-right">
                            <Button
                                size="sm"
                                variant="outline"
                            >
                                <Link
                                    href={`/properties/${request.property.id}`}
                                >
                                    View
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>) : (
                <div className="font-bold text-red-600 text-center">You have no request right now</div>
            )}
        </Table>
    );
}