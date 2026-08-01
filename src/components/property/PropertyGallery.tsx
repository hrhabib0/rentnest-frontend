import Image from "next/image";

type PropertyGalleryProps = {
    images: string[];
    title: string;
};

export default function PropertyGallery({
    images,
    title,
}: PropertyGalleryProps) {
    const mainImage = images[0];

    const otherImages = images.slice(1, 5);

    return (
        <div className="grid gap-4 lg:grid-cols-4">
            <div className="relative h-112.5 overflow-hidden rounded-2xl lg:col-span-2">
                <Image
                    src={mainImage}
                    alt={title}
                    unoptimized
                    fill
                    priority
                    className="object-cover transition duration-500 hover:scale-105"
                />
            </div>

            <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
                {otherImages.length > 0 ? (
                    otherImages.map((image, index) => (
                        <div
                            key={index}
                            className="relative h-53.75 overflow-hidden rounded-2xl"
                        >
                            <Image
                                src={image}
                                alt={`${title}-${index}`}
                                unoptimized
                                fill
                                className="object-cover transition duration-500 hover:scale-105"
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex h-53.75 items-center justify-center rounded-2xl border bg-muted text-muted-foreground lg:col-span-2">
                        No additional images
                    </div>
                )}
            </div>
        </div>
    );
}