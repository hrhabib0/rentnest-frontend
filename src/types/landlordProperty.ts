export interface ILandlordProperty {
    id: string;
    title: string;
    city: string;
    monthlyRent: string;
    bedrooms: number;
    bathrooms: number;
    imageUrls: string[];
    status: "AVAILABLE" | "RENTED";

    category: {
        id: string;
        name: string;
    };

    _count: {
        rentalRequests: number;
        reviews: number;
    };
}