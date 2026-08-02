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

export default function UsersTable({
    users,
}: Props) {
    return (
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
                                    src={
                                        user.profilePhotoUrl ??
                                        "/avatar.png"
                                    }
                                    alt={user.name}
                                    width={42}
                                    height={42}
                                    className="rounded-full object-cover"
                                />

                                <div>
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
                                <Badge className="bg-green-600 hover:bg-green-700">
                                    Active
                                </Badge>
                            ) : (
                                <Badge variant="destructive">
                                    Blocked
                                </Badge>
                            )}
                        </TableCell>

                        <TableCell>
                            {new Date(
                                user.createdAt
                            ).toLocaleDateString()}
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
    );
}