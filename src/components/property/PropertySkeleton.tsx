import { Skeleton } from "@/components/ui/skeleton";

export default function PropertySkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border">
            <Skeleton className="h-64 w-full" />

            <div className="space-y-4 p-5">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />

                <div className="flex gap-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                </div>

                <Skeleton className="h-8 w-28" />

                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}