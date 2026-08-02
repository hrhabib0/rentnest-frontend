"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, updateCategory } from "@/services/category/catergories";


type Category = {
    id: string;
    name: string;
    description: string;
};

type Props = {
    mode: "create" | "edit";
    category?: Category;
    onSuccess?: () => void;
};

export default function CategoryForm({
    mode,
    category,
    onSuccess
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const payload = {
            name: formData.get("name") as string,
            description: formData.get(
                "description"
            ) as string,
        };

        startTransition(async () => {
            const result =
                mode === "create"
                    ? await createCategory(payload)
                    : await updateCategory(
                        category!.id,
                        payload
                    );

            if (result.success) {
                toast.success(result.message);

                router.refresh();
                onSuccess?.();
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Name
                </label>

                <Input
                    name="name"
                    defaultValue={category?.name}
                    placeholder="Apartment"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Description
                </label>

                <Textarea
                    name="description"
                    defaultValue={
                        category?.description
                    }
                    rows={4}
                    placeholder="Enter category description"
                    required
                />
            </div>

            <Button
                className="w-full"
                type="submit"
                disabled={isPending}
            >
                {isPending
                    ? "Saving..."
                    : mode === "create"
                        ? "Create Category"
                        : "Save Changes"}
            </Button>
        </form>
    );
}