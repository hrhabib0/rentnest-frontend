import { User, UserRole } from "./user";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role: Exclude<UserRole, "ADMIN">;
}

export interface LoginResponse {
    user: User;
}