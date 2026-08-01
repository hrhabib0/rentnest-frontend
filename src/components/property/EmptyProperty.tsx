import { Home } from "lucide-react";

export default function EmptyProperty() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20">
            <Home className="mb-4 h-14 w-14 text-muted-foreground" />

            <h2 className="text-2xl font-semibold">
                No Properties Found
            </h2>

            <p className="mt-2 text-muted-foreground">
                There are currently no rental properties available.
            </p>
        </div>
    );
}