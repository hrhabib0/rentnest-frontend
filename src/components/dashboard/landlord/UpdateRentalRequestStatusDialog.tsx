"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { updateRentalRequestStatus } from "@/services/rental/rentalRequest";



type Props = {
    requestId: string;
    propertyTitle: string;
    tenantName: string;
    status: "APPROVED" | "REJECTED";
};

export default function UpdateRentalRequestStatusDialog({
    requestId,
    propertyTitle,
    tenantName,
    status,
}: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const isApprove = status === "APPROVED";

    const handleUpdate = () => {
        startTransition(async () => {
            const result = await updateRentalRequestStatus(
                requestId,
                status
            );

            if (result.success) {
                toast.success(result.message);
                setOpen(false);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        size="sm"
                        variant={
                            isApprove
                                ? "default"
                                : "destructive"
                        }
                    />
                }
            >
                {isApprove ? "Approve" : "Reject"}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isApprove
                            ? "Approve Rental Request"
                            : "Reject Rental Request"}
                    </DialogTitle>

                    <DialogDescription>
                        Are you sure you want to{" "}
                        {isApprove
                            ? "approve"
                            : "reject"}{" "}
                        this rental request?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 rounded-lg border p-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Property
                        </p>

                        <p className="font-medium">
                            {propertyTitle}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Tenant
                        </p>

                        <p className="font-medium">
                            {tenantName}
                        </p>
                    </div>
                </div>

                <DialogFooter showCloseButton>
                    <Button
                        disabled={isPending}
                        variant={
                            isApprove
                                ? "default"
                                : "destructive"
                        }
                        onClick={handleUpdate}
                    >
                        {isPending
                            ? "Please wait..."
                            : isApprove
                                ? "Approve"
                                : "Reject"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}