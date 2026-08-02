"use server"
import { revalidatePath } from "next/cache";
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

// for landlord
export const getReceivedRentalRequests = async () => {
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/rental-requests/received`,
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
            data: [],
        };
    }
};

type TStatus = "APPROVED" | "REJECTED";

export const updateRentalRequestStatus = async (
    requestId: string,
    status: TStatus
) => {
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/rental-requests/${requestId}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `accessToken=${accessToken}`,
                },
                body: JSON.stringify({
                    status,
                }),
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard/landlord/rental-requests");
            revalidatePath("/dashboard/landlord");
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