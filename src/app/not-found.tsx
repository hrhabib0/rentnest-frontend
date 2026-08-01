"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-muted/20 to-background px-6">
            <Card className="w-full max-w-xl border-0 shadow-2xl">
                <CardContent className="flex flex-col items-center py-14 text-center">
                    <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
                        <SearchX className="h-14 w-14 text-primary" />
                    </div>

                    <h1 className="text-7xl font-extrabold tracking-tight text-primary">
                        404
                    </h1>

                    <h2 className="mt-3 text-3xl font-bold">
                        Page Not Found
                    </h2>

                    <p className="mt-4 max-w-md text-muted-foreground">
                        Sorry, the page you&apos;re looking for doesn&apos;t exist,
                        may have been moved, or the URL might be incorrect.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Button
                            onClick={() => router.back()}
                            variant="outline"
                            className="gap-2 cursor-pointer"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Button>

                        <Link href="/" className="gap-2">
                            <Button className="cursor-pointer">
                                <Home className="h-4 w-16" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
                        RentNest • Find your next home with confidence.
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}