"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    RegisterFormData,
    registerSchema,
} from "@/schemas/register.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { registerUser } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "TENANT",
        },
    });

    const role = watch("role");

    const onSubmit = async (data: RegisterFormData) => {
        const result = await registerUser(data);

        if (result.success) {
            toast.success(result.message);
            router.push("/login")
        } else {
            alert(result.message);
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md shadow-xl">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-3xl font-bold">
                    Create Account
                </CardTitle>

                <CardDescription>
                    Join RentNest and start your rental journey.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="pl-10 h-11"
                                required
                                {...register("name")}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="pl-10 h-11"
                                required
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-12 h-11"
                                required
                                {...register("password")}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Profile Photo URL */}
                    <div className="space-y-3">
                        <Label>Register As</Label>

                        <RadioGroup
                            value={role}
                            onValueChange={(value) =>
                                setValue(
                                    "role",
                                    value as RegisterFormData["role"]
                                )
                            }
                            className="flex gap-8"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem
                                    value="TENANT"
                                    id="tenant"
                                />

                                <Label htmlFor="tenant">
                                    Tenant
                                </Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <RadioGroupItem
                                    value="LANDLORD"
                                    id="landlord"
                                />

                                <Label htmlFor="landlord">
                                    Landlord
                                </Label>
                            </div>
                        </RadioGroup>

                        {errors.role && (
                            <p className="text-sm text-destructive">
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-11 w-full text-base font-semibold cursor-pointer"
                    >
                        {isSubmitting ? "Creating Account..." : "Register"}
                    </Button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-primary hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}