import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center gap-6 py-10 text-center">
                    <CheckCircle2 className="size-20 text-green-500" />

                    <div>
                        <h1 className="text-2xl font-bold">
                            Payment Successful
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            Your payment has been completed successfully.
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Thank you for your payment.
                        </p>
                    </div>

                    <Button className="w-full">
                        <Link href="/dashboard/tenant/my-requests">
                            Go to My Requests
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}