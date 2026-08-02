"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
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
import { deleteCategory } from "@/services/category/catergories";


type Props = {
    categoryId: string;
};

export default function DeleteCategoryDialog({
    categoryId,
}: Props) {
    const [open, setOpen] = useState(false);

    const [isPending, startTransition] =
        useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const result =
                await deleteCategory(categoryId);

            if (result.success) {
                toast.success(result.message);
                setOpen(false);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger render={
                <Button
                    size="icon"
                    variant="destructive"
                >
                    <Trash2 className="size-4" />
                </Button>
            } />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Category
                    </DialogTitle>

                    <DialogDescription>
                        This action cannot be
                        undone. Are you sure you
                        want to delete this
                        category?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter showCloseButton>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending
                            ? "Deleting..."
                            : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}