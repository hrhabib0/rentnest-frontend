"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateProfile = async (
    payload: {
        name: string;
        phone?: string;
        profilePhotoUrl?: string;
    }
) => {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`,
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
            "/dashboard/profile"
        );
    }

    return result;
};