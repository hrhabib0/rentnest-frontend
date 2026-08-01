import EmptyProperty from "@/components/property/EmptyProperty";
import PropertyGrid from "@/components/property/PropertyGrid";
// import { getProperties } from "@/services/PropertyService";

export default async function PropertiesPage() {
    //   const result = await getProperties();

    //   const properties = result?.data ?? [];
    const properties = [
        {
            "id": "a627463b-7cf5-44aa-9205-8f29e0175fdf",
            "title": "Luxury Villa with Private Garden",
            "description": "Premium villa featuring a private garden, garage, and modern interior.",
            "size": 4200,
            "address": "Block C, Bashundhara R/A",
            "city": "Dhaka",
            "monthlyRent": "85000",
            "bedrooms": 5,
            "bathrooms": 5,
            "imageUrls": [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
            ],
            "amenities": [
                "Swimming Pool",
                "Garage",
                "Garden",
                "Security",
                "Gym"
            ],
            "status": "AVAILABLE",
            "landlordId": "1b929fe4-93b6-46d4-b220-1a6e2ad000a0",
            "categoryId": "6a931ab2-d9f6-469c-b656-01d6d883bab7",
            "createdAt": "2026-07-11T12:55:10.954Z",
            "updatedAt": "2026-07-11T12:55:10.954Z",
            "category": {
                "id": "6a931ab2-d9f6-469c-b656-01d6d883bab7",
                "name": "Villa",
                "description": "Luxury standalone homes with spacious outdoor areas.",
                "createdAt": "2026-07-11T11:37:35.921Z",
                "updatedAt": "2026-07-11T11:37:35.921Z"
            },
            "landlord": {
                "id": "1b929fe4-93b6-46d4-b220-1a6e2ad000a0",
                "name": "John Smith",
                "email": "john@example.com",
                "phone": null,
                "profilePhotoUrl": null,
                "role": "LANDLORD",
                "status": "ACTIVE",
                "createdAt": "2026-07-11T06:52:03.581Z",
                "updatedAt": "2026-07-13T05:00:22.979Z"
            },
            "_count": {
                "reviews": 0,
                "rentalRequests": 0
            }
        },
        {
            "id": "7f5bab4a-b85b-4579-be8d-9d7d702d84a9",
            "title": "Luxury Villa with Private Garden",
            "description": "Premium villa featuring a private garden, garage, and modern interior.",
            "size": 4200,
            "address": "Block C, Bashundhara R/A",
            "city": "Dhaka",
            "monthlyRent": "85000",
            "bedrooms": 5,
            "bathrooms": 5,
            "imageUrls": [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
            ],
            "amenities": [
                "Swimming Pool",
                "Garage",
                "Garden",
                "Security",
                "Gym"
            ],
            "status": "RENTED",
            "landlordId": "1b929fe4-93b6-46d4-b220-1a6e2ad000a0",
            "categoryId": "6a931ab2-d9f6-469c-b656-01d6d883bab7",
            "createdAt": "2026-07-11T12:52:19.505Z",
            "updatedAt": "2026-07-12T13:29:52.769Z",
            "category": {
                "id": "6a931ab2-d9f6-469c-b656-01d6d883bab7",
                "name": "Villa",
                "description": "Luxury standalone homes with spacious outdoor areas.",
                "createdAt": "2026-07-11T11:37:35.921Z",
                "updatedAt": "2026-07-11T11:37:35.921Z"
            },
            "landlord": {
                "id": "1b929fe4-93b6-46d4-b220-1a6e2ad000a0",
                "name": "John Smith",
                "email": "john@example.com",
                "phone": null,
                "profilePhotoUrl": null,
                "role": "LANDLORD",
                "status": "ACTIVE",
                "createdAt": "2026-07-11T06:52:03.581Z",
                "updatedAt": "2026-07-13T05:00:22.979Z"
            },
            "_count": {
                "reviews": 1,
                "rentalRequests": 1
            }
        },

    ]
    return (
        <section className="container mx-auto px-4 py-10">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold">
                    Browse Rental Properties
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Discover apartments, villas and homes that
                    match your lifestyle.
                </p>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Available Properties
                </h2>

                <span className="text-sm text-muted-foreground">
                    {properties.length} Properties
                </span>
            </div>

            {properties.length > 0 ? (
                <PropertyGrid properties={properties} />
            ) : (
                <EmptyProperty />
            )}
        </section>
    );
}