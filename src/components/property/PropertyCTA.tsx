import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import RequestToRentModal from "../rental/RequestToRentModal";

type PropertyCTAProps = {
    id: string;
    rent: string;
    status: string;
    userRole: string;
};

export default function PropertyCTA({
    id,
    rent,
    status,
    userRole
}: PropertyCTAProps) {
    return (
        <aside className="sticky top-24 rounded-2xl border p-6 shadow-sm">
            <div className="space-y-5">
                <div>
                    <p className="text-4xl font-bold text-primary">
                        ৳{rent}
                    </p>

                    <span className="text-muted-foreground">
                        per month
                    </span>
                </div>

                <Badge
                    className="w-fit"
                    variant={
                        status === "AVAILABLE"
                            ? "default"
                            : "secondary"
                    }
                >
                    {status}
                </Badge>



                {userRole === "TENANT" ? (
                    // <RequestRentalDialog propertyId={property.id} />
                    // <Button
                    //     className="w-full"
                    //     disabled={status !== "AVAILABLE"}
                    // >
                    //     Request to Rent
                    // </Button>
                    <RequestToRentModal propertyId={id} />
                ) : !userRole ? (
                    <Button className="w-full" disabled={status !== "AVAILABLE"}>
                        <Link href="/login">Login to Request</Link>
                    </Button>
                ) : (
                    <Button className="w-full" disabled>
                        Only tenants can request rentals
                    </Button>
                )}

                <p className="text-center text-xs text-muted-foreground">
                    You won&apos;t be charged until your rental request
                    is approved.
                </p>
            </div>
        </aside>
    );
}