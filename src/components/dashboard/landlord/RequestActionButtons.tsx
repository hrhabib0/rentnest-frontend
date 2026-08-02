import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IReceivedRentalRequest } from "@/types/rental";
import UpdateRentalRequestStatusDialog from "./UpdateRentalRequestStatusDialog";


type Props = {
    request: IReceivedRentalRequest;
};

export default function RequestActionButtons({
    request,
}: Props) {
    return (
        <div className="flex justify-end gap-2">
            {request.status === "PENDING" && (
                <>
                    <UpdateRentalRequestStatusDialog
                        requestId={request.id}
                        propertyTitle={request.property.title}
                        tenantName={request.tenant.name}
                        status="APPROVED"
                    />

                    <UpdateRentalRequestStatusDialog
                        requestId={request.id}
                        propertyTitle={request.property.title}
                        tenantName={request.tenant.name}
                        status="REJECTED"
                    />
                </>
            )}

            <Button
                size="sm"
                variant="outline"
            >
                <Link href={`/properties/${request.property.id}`}>
                    View
                </Link>
            </Button>
        </div>
    );
}