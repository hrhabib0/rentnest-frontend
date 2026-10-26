
import Image from "next/image";
import { Building2, Images } from "lucide-react";

type PropertyGalleryProps = {
    images: string[];
    title: string;
};

export default function PropertyGallery({
    images,
    title,
}: PropertyGalleryProps) {
    const validImages = images.filter(Boolean).slice(0, 5);
    const mainImage = validImages[0];
    const otherImages = validImages.slice(1, 5);

    return (
        <section aria-label={`${title} photo gallery`}>
            <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                        Property gallery
                    </p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                        Take a closer look
                    </h2>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                    <Images className="size-4" />
                    <span>
                        {validImages.length}{" "}
                        {validImages.length === 1 ? "photo" : "photos"}
                    </span>
                </div>
            </div>

            <div className="grid gap-3 sm:gap-4 lg:grid-cols-4">
                {/* Main photo */}
                <div className="relative min-h-64 overflow-hidden rounded-2xl bg-secondary sm:min-h-80 lg:col-span-2 lg:min-h-[440px]">
                    {mainImage ? (
                        <Image
                            src={mainImage}
                            alt={`${title} - main property photo`}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 text-primary/60">
                            <Building2 className="size-12" />
                            <span className="text-sm">No property photo available</span>
                        </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                        Featured photo
                    </div>
                </div>

                {/* Supporting photos */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2 lg:grid-cols-2">
                    {otherImages.map((image, index) => (
                        <div
                            key={`${image}-${index}`}
                            className="group relative min-h-36 overflow-hidden rounded-2xl bg-secondary sm:min-h-40 lg:min-h-0"
                        >
                            <Image
                                src={image}
                                alt={`${title} - photo ${index + 2}`}
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    ))}

                    {Array.from(
                        { length: Math.max(0, 4 - otherImages.length) },
                        (_, index) => (
                            <div
                                key={`placeholder-${index}`}
                                className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-secondary/30 text-muted-foreground sm:min-h-40 lg:min-h-0"
                            >
                                <Building2 className="size-6 text-primary/50" />
                                <span className="text-xs">Photo unavailable</span>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
