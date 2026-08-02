import { ReactNode } from "react";

type DashboardHeadingProps = {
    title: string;
    description?: string;
    action?: ReactNode;
};

export default function DashboardHeading({
    title,
    description,
    action,
}: DashboardHeadingProps) {
    return (
        <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    {title}
                </h1>

                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {action && <div>{action}</div>}
        </div>
    );
}