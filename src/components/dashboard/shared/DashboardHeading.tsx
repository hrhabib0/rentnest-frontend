import type { ReactNode } from "react";

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
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          RentNest Administration
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex shrink-0 items-center gap-3">
          {action}
        </div>
      )}
    </div>
  );
}