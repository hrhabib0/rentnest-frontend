import { IProperty } from "./property";

export type RentalRequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

export type TPayment = {
    id: string;
    status: "PENDING" | "PAID" | "FAILED";
    amount: string;
    transactionId: string;
    provider: "STRIPE";
    paidAt: string | null;
};

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

    payment?: TPayment | null;
}

export interface IReceivedRentalRequest {
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: string;
    status: RentalRequestStatus;
    message: string | null;
    createdAt: string;
    updatedAt: string;

    tenant: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        profilePhotoUrl: string | null;
        role: "TENANT";
        status: "ACTIVE" | "BLOCKED";
    };

    property: {
        id: string;
        title: string;
        address: string;
        city: string;
        monthlyRent: string;
        imageUrls: string[];
    };

    payment: null;
}