import Link from "next/link";
import { ArrowRight, House } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyProperty() {
    return (
        <section
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center sm:py-20"
            aria-labelledby="empty-property-title"
        >
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10">
                <House
                    className="size-10 text-primary"
                    aria-hidden="true"
                />
            </div>

            <h2
                id="empty-property-title"
                className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
                No Properties Found
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                We couldn&apos;t find any rental properties to display right now.
                Please check back later to discover your next home.
            </p>

            <Button
                nativeButton={false}
                render={<Link href="/" />}
                className="mt-6 h-11 rounded-full px-6"
            >
                Back to Home
                <ArrowRight className="ml-2 size-4" />
            </Button>
        </section>
    );
}