"use client";

import { Button } from "@/components/ui/button";

export default function Error({
    reset,
}: {
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold">
                Something went wrong
            </h2>

            <p className="mt-3 text-muted-foreground">
                We couldn&apos;t load the properties.
            </p>

            <Button
                className="mt-6"
                onClick={() => reset()}
            >
                Try Again
            </Button>
        </div>
    );
}