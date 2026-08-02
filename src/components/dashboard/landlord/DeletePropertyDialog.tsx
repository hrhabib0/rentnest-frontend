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
import { deleteProperty } from "@/services/property/properties";

type Props = {
    propertyId: string;
    propertyTitle: string;
};

export default function DeletePropertyDialog({
    propertyId,
    propertyTitle,
}: Props) {
    const [open, setOpen] = useState(false);

    const [isPending, startTransition] =
        useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteProperty(propertyId);

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
                        variant="destructive"
                    />
                }
            >
                Delete
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Property
                    </DialogTitle>

                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">
                        Property
                    </p>

                    <p className="font-medium">
                        {propertyTitle}
                    </p>
                </div>

                <DialogFooter showCloseButton>
                    <Button
                        variant="destructive"
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        {isPending
                            ? "Deleting..."
                            : "Delete Property"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}