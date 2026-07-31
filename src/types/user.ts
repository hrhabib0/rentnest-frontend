export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profilePhotoUrl: string | null;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}