import { cookies } from "next/headers";

export const getDashboardStatistics = async () => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized",
                data: null,
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/landlord/dashboard-stats`,
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
            data: null,
        };
    }
};