import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="container mx-auto space-y-10 px-4 py-10">
            <Skeleton className="h-[450px] w-full rounded-2xl" />

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Skeleton className="h-10 w-2/3" />

                    <Skeleton className="h-6 w-1/2" />

                    <Skeleton className="h-40 w-full" />

                    <Skeleton className="h-56 w-full" />
                </div>

                <Skeleton className="h-72 w-full rounded-2xl" />
            </div>
        </section>
    );
}