import { User, UserRole } from "./user";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
}

export type TokenPayload = {
    id: string;
    email: string;
    role: "TENANT" | "ADMIN" | "LANDLORD";
};

export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    role: "TENANT" | "LANDLORD";
};
