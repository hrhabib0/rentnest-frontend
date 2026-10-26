"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    Images,
    MapPin,
    Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    createProperty,
    updateProperty,
} from "@/services/property/properties";

type PropertyCategory = {
    id: string;
    name: string;
};

type EditableProperty = {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    monthlyRent: number | string;
    size: number;
    bedrooms: number;
    bathrooms: number;
    categoryId: string;
    amenities: string[];
    imageUrls: string[];
};

type Props = {
    mode: "create" | "edit";
    property?: EditableProperty;
    categories: PropertyCategory[];
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

const isValidImageUrl = (value: string) => {
    if (!value.trim()) return true;

    try {
        const url = new URL(value.trim());
        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
};

function FormError({ message }: { message?: string }) {
    if (!message) return null;

    return (
        <p className="text-sm text-destructive" role="alert">
            {message}
        </p>
    );
}

export default function PropertyForm({
    mode,
    property,
    categories,
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const isEdit = mode === "edit";

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
            size: property?.size ?? 0,
            bedrooms: property?.bedrooms ?? 1,
            bathrooms: property?.bathrooms ?? 1,
            categoryId: property?.categoryId ?? "",
            amenities: property?.amenities?.join(", ") ?? "",
            imageUrl1: property?.imageUrls?.[0] ?? "",
            imageUrl2: property?.imageUrls?.[1] ?? "",
            imageUrl3: property?.imageUrls?.[2] ?? "",
            imageUrl4: property?.imageUrls?.[3] ?? "",
            imageUrl5: property?.imageUrls?.[4] ?? "",
        },
    });

    const onSubmit = (data: PropertyFormValues) => {
        if (isEdit && !property?.id) {
            toast.error("Unable to identify the property to update.");
            return;
        }

        setSubmitError(null);

        const payload = {
            title: data.title.trim(),
            description: data.description.trim(),
            address: data.address.trim(),
            city: data.city.trim(),
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
            ]
                .map((url) => url.trim())
                .filter(Boolean),
        };

        startTransition(async () => {
            try {
                const result = isEdit
                    ? await updateProperty(property!.id, payload)
                    : await createProperty(payload);

                if (!result.success) {
                    const message =
                        result.message || "Unable to save the property.";
                    setSubmitError(message);
                    toast.error(message);
                    return;
                }

                toast.success(
                    result.message ||
                    (isEdit
                        ? "Property updated successfully."
                        : "Property created successfully."),
                );

                router.push("/dashboard/landlord/properties");
                router.refresh();
            } catch {
                const message =
                    "Something went wrong. Please try again.";
                setSubmitError(message);
                toast.error(message);
            }
        });
    };

    const numericRules = {
        required: "This field is required",
        valueAsNumber: true,
        validate: {
            finite: (value: number) =>
                Number.isFinite(value) || "Enter a valid number",
        },
    };

    const imageFields = [
        { name: "imageUrl1", label: "Cover image URL", required: true },
        { name: "imageUrl2", label: "Image URL 2", required: false },
        { name: "imageUrl3", label: "Image URL 3", required: false },
        { name: "imageUrl4", label: "Image URL 4", required: false },
        { name: "imageUrl5", label: "Image URL 5", required: false },
    ] as const;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-4xl space-y-6"
        >
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Building2 className="size-4" />
                    Landlord dashboard
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {isEdit ? "Edit Property" : "List Your Property"}
                </h1>

                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {isEdit
                        ? "Update your property information, amenities, and images."
                        : "Provide accurate property details to help potential tenants find their next home."}
                </p>
            </div>

            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Building2 className="size-5 text-primary" />
                        Basic information
                    </CardTitle>
                    <CardDescription>
                        Add a clear title and a helpful description of your property.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="title">Property title *</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Spacious 3-bedroom apartment in Dhanmondi"
                            aria-invalid={!!errors.title}
                            {...register("title", {
                                required: "Property title is required",
                                minLength: {
                                    value: 5,
                                    message: "Title must contain at least 5 characters",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Title cannot exceed 100 characters",
                                },
                            })}
                        />
                        <FormError message={errors.title?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            rows={6}
                            placeholder="Describe the property, its layout, nearby facilities, and other useful details..."
                            className="resize-y"
                            aria-invalid={!!errors.description}
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 20,
                                    message: "Description must contain at least 20 characters",
                                },
                                maxLength: {
                                    value: 3000,
                                    message: "Description cannot exceed 3000 characters",
                                },
                            })}
                        />
                        <FormError message={errors.description?.message} />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <MapPin className="size-5 text-primary" />
                        Property location
                    </CardTitle>
                    <CardDescription>
                        Give tenants enough information to understand where the property is.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Street address *</Label>
                        <Input
                            id="address"
                            placeholder="e.g. Road 10, Block C"
                            aria-invalid={!!errors.address}
                            {...register("address", {
                                required: "Street address is required",
                                maxLength: {
                                    value: 250,
                                    message: "Address cannot exceed 250 characters",
                                },
                            })}
                        />
                        <FormError message={errors.address?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            placeholder="e.g. Dhaka"
                            aria-invalid={!!errors.city}
                            {...register("city", {
                                required: "City is required",
                                maxLength: {
                                    value: 100,
                                    message: "City cannot exceed 100 characters",
                                },
                            })}
                        />
                        <FormError message={errors.city?.message} />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Property details</CardTitle>
                    <CardDescription>
                        Specify the monthly rent, size, and number of rooms.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="monthlyRent">Monthly rent (৳) *</Label>
                        <Input
                            id="monthlyRent"
                            type="number"
                            min="1"
                            step="any"
                            placeholder="50000"
                            aria-invalid={!!errors.monthlyRent}
                            {...register("monthlyRent", {
                                ...numericRules,
                                min: {
                                    value: 1,
                                    message: "Rent must be greater than zero",
                                },
                            })}
                        />
                        <FormError message={errors.monthlyRent?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="size">Property size (sq ft) *</Label>
                        <Input
                            id="size"
                            type="number"
                            min="1"
                            step="any"
                            placeholder="1200"
                            aria-invalid={!!errors.size}
                            {...register("size", {
                                ...numericRules,
                                min: {
                                    value: 1,
                                    message: "Property size must be greater than zero",
                                },
                            })}
                        />
                        <FormError message={errors.size?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms *</Label>
                        <Input
                            id="bedrooms"
                            type="number"
                            min="1"
                            step="1"
                            aria-invalid={!!errors.bedrooms}
                            {...register("bedrooms", {
                                ...numericRules,
                                min: {
                                    value: 1,
                                    message: "At least one bedroom is required",
                                },
                                validate: {
                                    integer: (value) =>
                                        Number.isInteger(value) ||
                                        "Bedrooms must be a whole number",
                                },
                            })}
                        />
                        <FormError message={errors.bedrooms?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms *</Label>
                        <Input
                            id="bathrooms"
                            type="number"
                            min="1"
                            step="1"
                            aria-invalid={!!errors.bathrooms}
                            {...register("bathrooms", {
                                ...numericRules,
                                min: {
                                    value: 1,
                                    message: "At least one bathroom is required",
                                },
                                validate: {
                                    integer: (value) =>
                                        Number.isInteger(value) ||
                                        "Bathrooms must be a whole number",
                                },
                            })}
                        />
                        <FormError message={errors.bathrooms?.message} />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Sparkles className="size-5 text-primary" />
                        Category and amenities
                    </CardTitle>
                    <CardDescription>
                        Help tenants understand the property type and available facilities.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="categoryId">Property category *</Label>

                        <Controller
                            control={control}
                            name="categoryId"
                            rules={{ required: "Please select a property category" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="categoryId"
                                        className="w-full"
                                        aria-invalid={!!errors.categoryId}
                                    >
                                        <SelectValue placeholder="Choose a category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <FormError message={errors.categoryId?.message} />

                        {categories.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No categories are available. Please contact an administrator.
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amenities">Amenities</Label>
                        <Input
                            id="amenities"
                            placeholder="Lift, Parking, WiFi, Generator"
                            {...register("amenities", {
                                maxLength: {
                                    value: 1000,
                                    message: "Amenities cannot exceed 1000 characters",
                                },
                            })}
                        />
                        <p className="text-xs leading-5 text-muted-foreground">
                            Separate each amenity with a comma. For example: Lift, Parking,
                            WiFi.
                        </p>
                        <FormError message={errors.amenities?.message} />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Images className="size-5 text-primary" />
                        Property images
                    </CardTitle>
                    <CardDescription>
                        Add up to five publicly accessible image URLs. The cover image is
                        required; the remaining images are optional.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {imageFields.map((imageField, index) => {
                        const fieldName = imageField.name;
                        const error = errors[fieldName];

                        return (
                            <div key={fieldName} className="space-y-2">
                                <Label htmlFor={fieldName}>
                                    {imageField.label}
                                    {imageField.required ? " *" : " (optional)"}
                                </Label>

                                <Input
                                    id={fieldName}
                                    type="url"
                                    placeholder="https://example.com/property-image.jpg"
                                    aria-invalid={!!error}
                                    {...register(fieldName, {
                                        ...(imageField.required
                                            ? { required: "A cover image URL is required" }
                                            : {}),
                                        validate: (value) =>
                                            isValidImageUrl(value) ||
                                            "Enter a valid HTTP or HTTPS URL",
                                    })}
                                />

                                <FormError message={error?.message} />

                                {index === 0 && (
                                    <p className="text-xs leading-5 text-muted-foreground">
                                        Use a direct image URL that can be accessed publicly.
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            {submitError && (
                <div
                    className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
                    role="alert"
                >
                    {submitError}
                </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    disabled={isPending}
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="mr-2 size-4" />
                    Cancel
                </Button>

                <Button
                    type="submit"
                    className="rounded-full px-6"
                    disabled={isPending}
                >
                    {isPending
                        ? isEdit
                            ? "Saving changes..."
                            : "Creating property..."
                        : isEdit
                            ? "Save changes"
                            : "Create property"}

                    {!isPending && <ArrowRight className="ml-2 size-4" />}
                </Button>
            </div>
        </form>
    );
}
