import api from "@/lib/api";
import { IProperty } from "@/types/property";

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