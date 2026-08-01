"use client";

import { Button } from "@/components/ui/button";

export default function Error({
    reset,
}: {
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold">
                Something went wrong
            </h1>

            <p className="mt-3 text-muted-foreground">
                We couldn&apos;t load this property.
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