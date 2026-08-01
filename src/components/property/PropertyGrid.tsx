import { IProperty } from "@/types/property";
import PropertyCard from "./PropertyCard";

type PropertyGridProps = {
    properties: IProperty[];
};

export default function PropertyGrid({
    properties,
}: PropertyGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                />
            ))}
        </div>
    );
}