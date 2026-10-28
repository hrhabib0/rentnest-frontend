
import Image from "next/image";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import UserStatusButton from "./UsersStatusButton";

type TUser = {
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
    users: TUser[];
};

export default function UsersTable({ users }: Props) {
    if (users.length === 0) {
        return (
            <div className="rounded-xl border bg-card px-6 py-12 text-center">
                <h2 className="text-lg font-semibold">
                    No users found
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Registered users will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Image
                                        unoptimized
                                        src={user.profilePhotoUrl ?? "/avatar.png"}
                                        alt={`${user.name}'s profile`}
                                        width={42}
                                        height={42}
                                        className="size-[42px] rounded-full object-cover"
                                    />

                                    <div className="min-w-0">
                                        <p className="font-medium">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>
                                <Badge variant="secondary">
                                    {user.role}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {user.status === "ACTIVE" ? (
                                    <Badge className="bg-green-600 text-white hover:bg-green-700">
                                        Active
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">
                                        Blocked
                                    </Badge>
                                )}
                            </TableCell>

                            <TableCell>
                                {new Date(user.createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        timeZone: "UTC",
                                    },
                                )}
                            </TableCell>

                            <TableCell className="text-right">
                                <UserStatusButton
                                    userId={user.id}
                                    currentStatus={user.status}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
