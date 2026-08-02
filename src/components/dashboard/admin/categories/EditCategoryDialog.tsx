"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryFrom";


type Category = {
    id: string;
    name: string;
    description: string;
};

type Props = {
    category: Category;
};

export default function EditCategoryDialog({
    category,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger render={
                <Button
                    size="icon"
                    variant="outline"
                >
                    <Pencil className="size-4" />
                </Button>
            } />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Category
                    </DialogTitle>
                </DialogHeader>

                <CategoryForm
                    mode="edit"
                    category={category}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}