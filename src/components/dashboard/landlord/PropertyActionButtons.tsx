import Link from "next/link";

import { Button } from "@/components/ui/button";
import DeletePropertyDialog from "./DeletePropertyDialog";

type Props = {
    propertyId: string;
    propertyTitle: string;
};

export default function PropertyActionButtons({
    propertyId,
    propertyTitle
}: Props) {
    return (
        <div className="flex justify-end gap-2">
            <Button
                size="sm"
                variant="outline"
            >
                <Link href={`/properties/${propertyId}`}>
                    View
                </Link>
            </Button>

            <Button
                size="sm"
                variant="secondary"
            >
                <Link
                    href={`/dashboard/landlord/properties/${propertyId}/edit`}
                >
                    Edit
                </Link>
            </Button>

            <DeletePropertyDialog
                propertyId={propertyId}
                propertyTitle={propertyTitle}
            />
        </div>
    );
}