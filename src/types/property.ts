export interface IProperty {
    id: string;
    title: string;
    description: string;
    size: number;
    address: string;
    city: string;
    monthlyRent: string;
    bedrooms: number;
    bathrooms: number;
    imageUrls: string[];
    amenities: string[];
    // status: "AVAILABLE" | "RENTED";
    status: string;
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;

    category: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    };

    landlord: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        profilePhotoUrl: string | null;
        role: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    };

    _count: {
        reviews: number;
        rentalRequests: number;
    };
}