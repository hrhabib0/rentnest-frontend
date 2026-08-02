"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getCategories = async () => {
    try {
        const cookieStore = await cookies();

        const token =
            cookieStore.get("accessToken")?.value;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
            {
                headers: {
                    Cookie: `accessToken=${token}`,
                },
                cache: "no-store",
            }
        );

        return await res.json();
    } catch {
        return {
            success: false,
            data: [],
        };
    }
};

export const createCategory = async (
    payload: {
        name: string;
        description: string;
    }
) => {
    const token =
        (await cookies()).get("accessToken")?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
                Cookie: `accessToken=${token}`,
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidatePath(
            "/dashboard/admin/categories"
        );
    }

    return result;
};

export const updateCategory = async (
    id: string,
    payload: {
        name: string;
        description: string;
    }
) => {
    const token =
        (await cookies()).get("accessToken")?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type":
                    "application/json",
                Cookie: `accessToken=${token}`,
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidatePath(
            "/dashboard/admin/categories"
        );
    }

    return result;
};

export const deleteCategory = async (
    id: string
) => {
    const token =
        (await cookies()).get("accessToken")?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
        {
            method: "DELETE",
            headers: {
                Cookie: `accessToken=${token}`,
            },
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidatePath(
            "/dashboard/admin/categories"
        );
    }

    return result;
};