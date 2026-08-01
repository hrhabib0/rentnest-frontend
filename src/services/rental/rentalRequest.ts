"use server"
import { cookies } from "next/headers";


export const createRentalRequest = async (
    payload: {
        propertyId: string;
        moveInDate: string;
    }
) => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "User not logged in!",
                data: null,
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/rental-requests`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `accessToken=${accessToken}`,
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await res.json();

        return result;
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong.",
            data: null,
        };
    }
};

export const getMyRentalRequests = async () => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "User not logged in!",
                data: [],
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/rental-requests/my-requests`,
            {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                },
                cache: "no-store",
            }
        );

        const result = await res.json();

        return result;
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong.",
            data: [],
        };
    }
};