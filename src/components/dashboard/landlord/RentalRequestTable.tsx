import Link from "next/link";
import { format } from "date-fns";

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
import { IReceivedRentalRequest } from "@/types/rental";
import RequestActionButtons from "./RequestActionButtons";


type Props = {
    requests: IReceivedRentalRequest[];
};

export default function RentalRequestsTable({
    requests,
}: Props) {
    if (requests.length === 0) {
        return (
            <div className="rounded-xl border py-16 text-center">
                <h3 className="text-lg font-semibold">
                    No rental requests found.
                </h3>

                <p className="mt-2 text-muted-foreground">
                    Requests from tenants will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Move In</TableHead>
                        <TableHead>Rent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>
                                <div>
                                    <p className="font-medium">
                                        {request.tenant.name}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {request.tenant.email}
                                    </p>
                                </div>
                            </TableCell>

                            <TableCell>
                                <div>
                                    <p className="font-medium">
                                        {request.property.title}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {request.property.city}
                                    </p>
                                </div>
                            </TableCell>

                            <TableCell>
                                {format(
                                    new Date(request.moveInDate),
                                    "dd MMM yyyy"
                                )}
                            </TableCell>

                            <TableCell>
                                ৳
                                {Number(
                                    request.property.monthlyRent
                                ).toLocaleString()}
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        request.status ===
                                            "APPROVED"
                                            ? "default"
                                            : request.status ===
                                                "REJECTED"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                >
                                    {request.status}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <RequestActionButtons
                                    request={request}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}