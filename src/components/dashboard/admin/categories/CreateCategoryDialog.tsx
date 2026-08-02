"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryFrom";



export default function CreateCategoryDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <Button>
                    <Plus className="size-4" />
                    Add Category
                </Button>
            } />


            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Category
                    </DialogTitle>
                </DialogHeader>

                <CategoryForm
                    mode="create"
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}