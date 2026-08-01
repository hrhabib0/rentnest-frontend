"use server"
import api from "@/lib/api";
import { cookies } from "next/headers";


export const createRentalRequest = async (
    payload: {
        propertyId: string;
        moveInDate: string;
    }
) => {
    const { data } = await api.post(
        "/rental-requests",
        payload
    );

    return data;
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