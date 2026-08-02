"use server"
import api from "@/lib/api";
import { IProperty } from "@/types/property";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface PropertyResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IProperty[];
}

export const getProperties = async () => {
    const { data } = await api.get<PropertyResponse>("/properties");

    return data;
};

export const getPropertyById = async (id: string) => {
    const { data } = await api.get(`/properties/${id}`);

    return data;
};

// for landlord

export const getMyProperties = async () => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized",
                data: [],
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/landlord/properties`,
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

export const deleteProperty = async (
    propertyId: string
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}`,
            {
                method: "DELETE",
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                },
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard/landlord/properties");
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

export const updateProperty = async (
    propertyId: string,
    payload: Record<string, unknown>
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `accessToken=${accessToken}`,
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard/landlord/properties");
            revalidatePath(`/properties/${propertyId}`);
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