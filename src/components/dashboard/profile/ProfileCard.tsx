
import {
    Calendar,
    Mail,
    Phone,
    ShieldCheck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import EditProfileDialog from "./EditProfileDialogBox";

type UserProfile = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profilePhotoUrl: string | null;
    role: "ADMIN" | "LANDLORD" | "TENANT";
    status: "ACTIVE" | "BLOCKED";
    createdAt: string;
};

type Props = {
    user: UserProfile;
};

export default function ProfileCard({
    user,
}: Props) {
    return (
        <div className="rounded-xl border bg-background p-8 shadow-sm">
            <div className="flex flex-col items-center gap-4">
                <Avatar className="size-28">
                    <AvatarImage
                        src={
                            user.profilePhotoUrl ??
                            undefined
                        }
                        alt={user.name}
                    />

                    <AvatarFallback className="text-3xl font-semibold">
                        {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-1 text-center">
                    <h2 className="text-2xl font-bold">
                        {user.name}
                    </h2>

                    <p className="text-muted-foreground">
                        {user.email}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Badge
                        variant="secondary"
                        className={
                            user.status === "ACTIVE"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                    >
                        {user.status}
                    </Badge>

                    <Badge variant="outline">
                        {user.role}
                    </Badge>
                </div>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-6 md:grid-cols-2">
                <InfoItem
                    icon={<Mail className="size-5" />}
                    label="Email"
                    value={user.email}
                />

                <InfoItem
                    icon={<Phone className="size-5" />}
                    label="Phone"
                    value={
                        user.phone ??
                        "Not Provided"
                    }
                />

                <InfoItem
                    icon={
                        <ShieldCheck className="size-5" />
                    }
                    label="Role"
                    value={user.role}
                />

                <InfoItem
                    icon={
                        <Calendar className="size-5" />
                    }
                    label="Joined"
                    value={new Date(
                        user.createdAt
                    ).toLocaleDateString()}
                />
            </div>

            <div className="mt-8 flex justify-end">
                <EditProfileDialog user={user} />
            </div>
        </div>
    );
}

type InfoItemProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
};

function InfoItem({
    icon,
    label,
    value,
}: InfoItemProps) {
    return (
        <div className="flex items-start gap-3 rounded-lg border p-4">
            <div className="text-primary">
                {icon}
            </div>

            <div>
                <p className="text-sm text-muted-foreground">
                    {label}
                </p>

                <p className="font-medium">
                    {value}
                </p>
            </div>
        </div>
    );
}