import { IProperty } from '@/types/property';
import { House, Search, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

import { Button } from '../ui/button';
import Link from 'next/link';


type Props = {
    properties: IProperty[];
};

export default function PropertiesBanner({
    properties,
}: Props) {
    return (
        <section className="px-4 pt-6 sm:px-6 lg:px-8">
            <div className="group relative mx-auto min-h-90 max-w-7xl overflow-hidden rounded-3xl bg-primary sm:min-h-[420px]">
                <Image
                    src="/images/properties-banner.jpg"
                    alt="Beautiful modern home available for rent"
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Stable overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/15" />

                <div className="relative z-10 flex min-h-[360px] max-w-3xl flex-col justify-center px-6 py-12 sm:min-h-[420px] sm:px-12 lg:px-16">
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                        <House className="size-4" />
                        Find your next home
                    </div>

                    <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Discover a place to{" "}
                        <span className="font-serif italic text-emerald-200">
                            call home.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                        Explore rental properties and find a space that fits your
                        lifestyle, preferences, and budget.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Button
                            nativeButton={false}
                            size="lg"
                            className="h-12 rounded-full px-6"
                            render={<Link href="#available-properties" />}
                        >
                            <Search className="size-4" />
                            Explore properties
                        </Button>

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur-sm">
                            <ShieldCheck className="size-4 text-emerald-200" />
                            Find your next home with RentNest
                        </div>
                    </div>
                </div>

                {/* Property count badge */}
                <div className="absolute bottom-5 right-5 z-10 hidden rounded-2xl border border-white/25 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md sm:block">
                    <p className="text-2xl font-semibold text-primary">
                        {properties.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {properties.length === 1
                            ? "Property available"
                            : "Properties available"}
                    </p>
                </div>
            </div>
        </section >
    );
}
