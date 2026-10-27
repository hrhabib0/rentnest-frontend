import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
    title: string;
    value: number | string;
    icon: LucideIcon;
    description?: string;
    tone?: "green" | "blue" | "amber" | "violet";
};

const toneStyles = {
    green: {
        icon: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        accent: "bg-emerald-500",
    },
    blue: {
        icon: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
        accent: "bg-blue-500",
    },
    amber: {
        icon: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        accent: "bg-amber-500",
    },
    violet: {
        icon: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
        accent: "bg-violet-500",
    },
} as const;

export default function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    tone = "green",
}: StatsCardProps) {
    const styles = toneStyles[tone];

    return (
        <Card className="relative overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div
                aria-hidden="true"
                className={cn("absolute inset-x-0 top-0 h-1", styles.accent)}
            />

            <CardContent className="flex min-h-36 items-start justify-between gap-4 p-5 pt-6 sm:p-6 sm:pt-7">
                <div className="min-w-0 space-y-2">
                    <p className="text-sm font-medium leading-5 text-muted-foreground">
                        {title}
                    </p>

                    <p className="break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {value}
                    </p>

                    {description && (
                        <p className="text-xs leading-5 text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                <div
                    className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl",
                        styles.icon,
                    )}
                >
                    <Icon className="size-5" aria-hidden="true" />
                </div>
            </CardContent>
        </Card>
    );
}