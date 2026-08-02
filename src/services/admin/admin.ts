"use server";

import { cookies } from "next/headers";

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