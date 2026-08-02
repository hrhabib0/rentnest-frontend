"use server";

export const getCategories = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
            {
                cache: "force-cache",
            }
        );

        return await res.json();
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Failed to fetch categories.",
            data: [],
        };
    }
};