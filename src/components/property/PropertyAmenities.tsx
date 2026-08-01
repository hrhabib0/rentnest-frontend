import { CheckCircle2 } from "lucide-react";

type PropertyAmenitiesProps = {
    amenities: string[];
};

export default function PropertyAmenities({
    amenities,
}: PropertyAmenitiesProps) {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-bold">
                Amenities
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {amenities.map((amenity) => (
                    <div
                        key={amenity}
                        className="flex items-center gap-3 rounded-xl border p-4"
                    >
                        <CheckCircle2 className="size-5 text-green-600" />

                        <span>{amenity}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}