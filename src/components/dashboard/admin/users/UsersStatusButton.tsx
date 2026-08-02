"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/services/admin/admin";


type Props = {
    userId: string;
    currentStatus: "ACTIVE" | "BLOCKED";
};

export default function UserStatusButton({
    userId,
    currentStatus,
}: Props) {
    const [isPending, startTransition] = useTransition();

    const nextStatus =
        currentStatus === "ACTIVE"
            ? "BLOCKED"
            : "ACTIVE";

    const handleUpdate = () => {
        const confirmed = window.confirm(
            `Are you sure you want to ${nextStatus.toLowerCase()} this user?`
        );

        if (!confirmed) return;

        startTransition(async () => {
            const result =
                await updateUserStatus(
                    userId,
                    nextStatus
                );

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Button
            className="cursor-pointer"
            size="sm"
            variant={
                currentStatus === "ACTIVE"
                    ? "destructive"
                    : "default"
            }
            disabled={isPending}
            onClick={handleUpdate}
        >
            {isPending
                ? "Updating..."
                : currentStatus === "ACTIVE"
                    ? "Suspend"
                    : "Activate"}
        </Button>
    );
}