"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, LoginSchema } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getErrorMessage } from "@/utils/getErrorMessage";


export default function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter()
    const loginMutation = useMutation({
        mutationFn: login
    });

    const onSubmit = async (values: LoginSchema) => {
        try {
            const res = await loginMutation.mutateAsync(values);
            toast.success(res.message);
            router.push("/")
        } catch (error) {
            console.error(error);
            toast.error(getErrorMessage(error))
        }
    };
    return (
        <Card className="mx-auto w-full max-w-md shadow-lg">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-3xl font-bold">
                    Welcome Back 👋
                </CardTitle>

                <CardDescription>
                    Sign in to continue to RentNest
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        className="w-full"
                        type="submit"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-primary hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}