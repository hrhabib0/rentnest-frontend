"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/services/profile/profile";
import { toast } from "sonner";

type UserProfile = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profilePhotoUrl: string | null;
};

type Props = {
    user: UserProfile;
    onSuccess?: () => void;
};

export default function ProfileForm({
    user,
    onSuccess,
}: Props) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const payload = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            profilePhotoUrl: formData.get(
                "profilePhotoUrl"
            ) as string,
        };

        startTransition(async () => {
            const result =
                await updateProfile(payload);

            if (result.success) {
                toast.success(result.message);
                onSuccess?.();
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Name
                </label>

                <Input
                    name="name"
                    defaultValue={user.name}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Email
                </label>

                <Input
                    value={user.email}
                    disabled
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Phone
                </label>

                <Input
                    name="phone"
                    defaultValue={
                        user.phone ?? ""
                    }
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Profile Photo URL
                </label>

                <Input
                    name="profilePhotoUrl"
                    defaultValue={
                        user.profilePhotoUrl ??
                        ""
                    }
                />
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                {isPending
                    ? "Saving..."
                    : "Save Changes"}
            </Button>
        </form>
    );
}