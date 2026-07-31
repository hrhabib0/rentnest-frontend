import api from "@/lib/api";
import {
    ApiResponse,
    LoginPayload,
    LoginResponse,
    RegisterPayload,
    User,
} from "@/types";


export const register = async (payload: RegisterPayload) => {
    const result = await api.post(
        "/auth/register",
        payload
    );
}

export const login = async (payload: LoginPayload) => {
    const { data } = await api.post(
        "auth/login",
        payload
    )
    return data;
}