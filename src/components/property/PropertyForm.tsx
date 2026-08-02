/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProperty, updateProperty } from "@/services/property/properties";
import { toast } from "sonner";

type Props = {
    mode: "create" | "edit";
    property?: any;
    categories: any[];
};

type PropertyFormValues = {
    title: string;
    description: string;
    address: string;
    city: string;
    monthlyRent: number;
    size: number;
    bedrooms: number;
    bathrooms: number;
    categoryId: string;
    amenities: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    imageUrl5: string;
};

export default function PropertyForm({
    mode,
    property,
    categories,
}: Props) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PropertyFormValues>({
        defaultValues: {
            title: property?.title ?? "",
            description: property?.description ?? "",
            address: property?.address ?? "",
            city: property?.city ?? "",
            monthlyRent: Number(property?.monthlyRent) || 0,
            size: property?.size || 0,
            bedrooms: property?.bedrooms || 1,
            bathrooms: property?.bathrooms || 1,
            categoryId: property?.categoryId ?? "",
            amenities: property?.amenities?.join(", ") ?? "",
            imageUrl1: property?.imageUrls?.[0] ?? "",
            imageUrl2: property?.imageUrls?.[1] ?? "",
            imageUrl3: property?.imageUrls?.[2] ?? "",
            imageUrl4: property?.imageUrls?.[3] ?? "",
            imageUrl5: property?.imageUrls?.[4] ?? "",
        },
    });
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    const onSubmit = (data: PropertyFormValues) => {
        const payload = {
            title: data.title,
            description: data.description,
            address: data.address,
            city: data.city,
            monthlyRent: data.monthlyRent,
            size: data.size,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            categoryId: data.categoryId,
            amenities: data.amenities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            imageUrls: [
                data.imageUrl1,
                data.imageUrl2,
                data.imageUrl3,
                data.imageUrl4,
                data.imageUrl5,
            ].filter(Boolean),
        };

        startTransition(async () => {
            let result;

            if (mode === "edit") {
                result = await updateProperty(property.id, payload);
            } else {
                result = await createProperty(payload);
            }

            if (result.success) {
                toast.success(result.message);
                router.push("/dashboard/landlord/properties");
            } else {
                toast.error(result.message);
            }
        });

        // console.log(payload);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Card>
                <CardHeader>
                    <CardTitle>
                        Basic Information
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Property Title
                        </Label>

                        <Input
                            id="title"
                            placeholder="Luxury Villa with Private Garden"
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />

                        {errors.title && (
                            <p className="text-sm text-destructive">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description
                        </Label>

                        <Textarea
                            id="description"
                            rows={6}
                            placeholder="Describe your property..."
                            {...register("description", {
                                required:
                                    "Description is required",
                            })}
                        />

                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="address">
                            Address
                        </Label>

                        <Input
                            id="address"
                            placeholder="Road 10, Block C"
                            {...register("address", {
                                required: "Address is required",
                            })}
                        />

                        {errors.address && (
                            <p className="text-sm text-destructive">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">
                            City
                        </Label>

                        <Input
                            id="city"
                            placeholder="Dhaka"
                            {...register("city", {
                                required: "City is required",
                            })}
                        />

                        {errors.city && (
                            <p className="text-sm text-destructive">
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="monthlyRent">
                                Monthly Rent (৳)
                            </Label>

                            <Input
                                id="monthlyRent"
                                type="number"
                                placeholder="50000"
                                {...register("monthlyRent", {
                                    required: "Monthly rent is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Rent must be greater than 0",
                                    },
                                })}
                            />

                            {errors.monthlyRent && (
                                <p className="text-sm text-destructive">
                                    {errors.monthlyRent.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="size">
                                Property Size (sq ft)
                            </Label>

                            <Input
                                id="size"
                                type="number"
                                placeholder="1800"
                                {...register("size", {
                                    required: "Property size is required",
                                    valueAsNumber: true,
                                })}
                            />

                            {errors.size && (
                                <p className="text-sm text-destructive">
                                    {errors.size.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms">
                                Bedrooms
                            </Label>

                            <Input
                                id="bedrooms"
                                type="number"
                                {...register("bedrooms", {
                                    required: "Bedrooms are required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Minimum 1 bedroom",
                                    },
                                })}
                            />

                            {errors.bedrooms && (
                                <p className="text-sm text-destructive">
                                    {errors.bedrooms.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bathrooms">
                                Bathrooms
                            </Label>

                            <Input
                                id="bathrooms"
                                type="number"
                                {...register("bathrooms", {
                                    required: "Bathrooms are required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Minimum 1 bathroom",
                                    },
                                })}
                            />

                            {errors.bathrooms && (
                                <p className="text-sm text-destructive">
                                    {errors.bathrooms.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Category & Amenities
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6"><Controller
                    control={control}
                    name="categoryId"
                    rules={{
                        required: "Category is required",
                    }}
                    render={({ field }) => (
                        <div className="space-y-2">
                            <Label>Category</Label>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.categoryId && (
                                <p className="text-sm text-destructive">
                                    {errors.categoryId.message}
                                </p>
                            )}
                        </div>
                    )}
                /><div className="space-y-2">
                        <Label htmlFor="amenities">
                            Amenities
                        </Label>

                        <Input
                            id="amenities"
                            placeholder="Lift, Parking, WiFi"
                            {...register("amenities")}
                        />

                        <p className="text-xs text-muted-foreground">
                            Separate amenities using commas.
                        </p>
                    </div></CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Property Images
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl1">
                            Image URL 1
                        </Label>

                        <Input
                            id="imageUrl1"
                            placeholder="https://..."
                            {...register("imageUrl1", {
                                required: "At least one image is required",
                            })}
                        />

                        {errors.imageUrl1 && (
                            <p className="text-sm text-destructive">
                                {errors.imageUrl1.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl2">
                            Image URL 2
                        </Label>

                        <Input
                            id="imageUrl2"
                            placeholder="https://..."
                            {...register("imageUrl2")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl3">
                            Image URL 3
                        </Label>

                        <Input
                            id="imageUrl3"
                            placeholder="https://..."
                            {...register("imageUrl3")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl4">
                            Image URL 4
                        </Label>

                        <Input
                            id="imageUrl4"
                            placeholder="https://..."
                            {...register("imageUrl4")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl5">
                            Image URL 5
                        </Label>

                        <Input
                            id="imageUrl5"
                            placeholder="https://..."
                            {...register("imageUrl5")}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isPending}
                >
                    {isPending
                        ? mode === "edit"
                            ? "Saving Changes..."
                            : "Creating Property..."
                        : mode === "edit"
                            ? "Save Changes"
                            : "Create Property"}
                </Button>
            </div>

        </form>
    );

}
