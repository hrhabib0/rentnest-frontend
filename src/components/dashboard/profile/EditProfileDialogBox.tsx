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
import ProfileForm from "./ProfileForm";


type UserProfile = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profilePhotoUrl: string | null;
};

type Props = {
    user: UserProfile;
};

export default function EditProfileDialog({
    user,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger render={
                <Button>
                    <Pencil className="size-4" />
                    Edit Profile
                </Button>
            } />

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Profile
                    </DialogTitle>
                </DialogHeader>

                <ProfileForm
                    user={user}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}