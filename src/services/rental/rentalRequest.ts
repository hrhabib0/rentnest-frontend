import api from "@/lib/api";


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