"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type Params = {
    page?: number;
    limit?: number;
    searchTerm?: string;
    role?: string;
    status?: string;
};

export const getDashboardStats = async () => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/stats`,
            {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                },
                cache: "no-store",
            }
        );

        return await res.json();
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const getAllUsers = async (
    params: Params = {}
) => {
    try {
        const cookieStore = await cookies();

        const token =
            cookieStore.get("accessToken")?.value;

        if (!token) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(
            ([key, value]) => {
                if (
                    value !== undefined &&
                    value !== ""
                ) {
                    searchParams.append(
                        key,
                        String(value)
                    );
                }
            }
        );

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users?${searchParams}`,
            {
                headers: {
                    Cookie: `accessToken=${token}`,
                },
                cache: "no-store",
            }
        );

        return await res.json();
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const updateUserStatus = async (
    id: string,
    status: "ACTIVE" | "BLOCKED"
) => {
    try {
        const cookieStore = await cookies();

        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `accessToken=${accessToken}`,
                },
                body: JSON.stringify({ status }),
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard/admin/users");
        }

        return result;
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};