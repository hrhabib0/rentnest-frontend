import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
    title: string;
    value: number | string;
    icon: LucideIcon;
    description?: string;
};

export default function StatsCard({
    title,
    value,
    icon: Icon,
    description,
}: StatsCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>

                    {description && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                <div className="rounded-full bg-primary/10 p-3">
                    <Icon className="size-6 text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}