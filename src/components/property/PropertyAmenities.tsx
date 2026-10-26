
import { CheckCircle2, Sparkles } from "lucide-react";

type PropertyAmenitiesProps = {
    amenities: string[];
};

export default function PropertyAmenities({
    amenities,
}: PropertyAmenitiesProps) {
    return (
        <section className="space-y-5">
            <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                    Comfort and convenience
                </p>

                <div className="mt-2 flex items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Amenities
                    </h2>

                    <Sparkles className="size-5 text-primary/70" />
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                    Features and facilities available at this property.
                </p>
            </div>

            {amenities.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {amenities.map((amenity) => (
                        <div
                            key={amenity}
                            className="flex min-w-0 items-start gap-3 rounded-xl border border-border/80 bg-card p-4 transition-all duration-200 hover:border-primary/25 hover:bg-secondary/30"
                        >
                            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                            <span className="break-words text-sm font-medium leading-6">
                                {amenity}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border bg-secondary/20 px-5 py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        No amenities have been listed for this property yet.
                    </p>
                </div>
            )}
        </section>
    );
}
