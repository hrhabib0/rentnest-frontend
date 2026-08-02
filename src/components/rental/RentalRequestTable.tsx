"use client";
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
import { CheckCircle, CreditCard, Eye } from "lucide-react";
import { useTransition } from "react";
import { createCheckoutSession } from "@/services/payment/payment";
import { toast } from "sonner";
import { Badge } from "../ui/badge";


type Props = {
    requests: IRentalRequest[];
};

export default function RentalRequestTable({
    requests,
}: Props) {
    console.log(requests, "request payment")
    const [isPending, startTransition] = useTransition();

    const handlePayment = (rentalRequestId: string) => {
        startTransition(async () => {
            const result = await createCheckoutSession(rentalRequestId);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            window.location.href =
                result.data.checkoutUrl;
        });
    };

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

            <TableBody>
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
                            <div className="flex justify-end gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                >
                                    <Link
                                        href={`/properties/${request.property.id}`}
                                        className="flex items-center gap-2"
                                    >
                                        <Eye className="size-4" />
                                        View
                                    </Link>
                                </Button>

                                {/* {request.status === "APPROVED" && !request.payment && (
                                    <Button
                                        size="sm"
                                        disabled={isPending}
                                        onClick={() => handlePayment(request.id)}
                                    >
                                        <CreditCard className="size-4" />
                                        {isPending ? "Redirecting..." : "Pay Now"}
                                    </Button>
                                )} */}
                                {request.payment?.status ? (
                                    <Badge
                                        variant="outline"
                                        className="cursor-default border-green-600 bg-green-50 text-green-700 transition-all duration-200 hover:scale-105 hover:border-green-700 hover:bg-green-100 hover:text-green-800 dark:border-green-700 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900"
                                    >
                                        <CheckCircle className="mr-1 size-3.5 fill-green-600 text-white dark:fill-green-500" />
                                        Paid
                                    </Badge>
                                ) : (
                                    request.status === "APPROVED" && (
                                        <Button
                                            size="sm"
                                            disabled={isPending}
                                            onClick={() => handlePayment(request.id)}
                                        >
                                            <CreditCard className="size-4" />
                                            {isPending ? "Redirecting..." : "Pay Now"}
                                        </Button>
                                    )
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}