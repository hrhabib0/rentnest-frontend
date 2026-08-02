import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancelPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center gap-6 py-10 text-center">
                    <XCircle className="size-20 text-red-500" />

                    <div>
                        <h1 className="text-2xl font-bold">
                            Payment Cancelled
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            Your payment was cancelled.
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            No money has been charged. You can try again whenever you&apos;re ready.
                        </p>
                    </div>

                    <Button variant="outline" className="w-full">
                        <Link href="/dashboard/tenant/my-requests">
                            Back to My Requests
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}