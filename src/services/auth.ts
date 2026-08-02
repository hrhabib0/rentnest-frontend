"use server"
import api from "@/lib/api";
import {
    LoginPayload,
    RegisterFormData,
} from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const registerUser = async (payload: RegisterFormData) => {
    const result = await api.post(
        "/auth/register",
        payload
    );
    return result.data
}

export const login = async (payload: LoginPayload) => {
    const { data } = await api.post(
        "auth/login",
        payload
    )

    if (data.success) {
        const cookieStore = await cookies();
        cookieStore.set("accessToken", data.data.accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "lax"
        });
    }
    return data;
}

export const logout = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    revalidateTag("my-profile", {
        expire: 0
    });

    return {
        success: true,
        message: "Log out Successfully"
    }
}

export const getMe = async () => {
    try {
        const cookieStore = cookies();

        const accessToken = (await cookieStore).get("accessToken")?.value || null;
        if (!accessToken) {
            return {
                success: false,
                message: "User not logged in!"
            }
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error);

        return null;
    }
}