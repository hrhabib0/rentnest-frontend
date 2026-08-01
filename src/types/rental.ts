import { IProperty } from "./property";

export type RentalRequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

export interface IRentalRequest {
    id: string;
    tenantId: string;
    propertyId: string;

    moveInDate: string;

    status: RentalRequestStatus;

    message: string | null;

    createdAt: string;
    updatedAt: string;

    property: IProperty;

    payment?: null;
}