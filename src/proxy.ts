import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./utils/jwt";


const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;


    // No token
    if (!accessToken) {
        if (pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }

        return NextResponse.next();
    }

    const verifiedToken = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
    );

    // Invalid or expired token
    if (!verifiedToken.success) {
        const response = NextResponse.redirect(
            new URL("/login", request.url)
        );

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");

        return response;
    }

    const decoded = verifiedToken.data as {
        userId: string;
        role: "ADMIN" | "LANDLORD" | "TENANT";
    };

    const role = decoded.role;

    // Logged in user cannot access login/register
    if (authRoutes.includes(pathname)) {
        switch (role) {
            case "ADMIN":
                return NextResponse.redirect(
                    new URL("/dashboard/admin", request.url)
                );

            case "LANDLORD":
                return NextResponse.redirect(
                    new URL("/dashboard/landlord", request.url)
                );

            case "TENANT":
                return NextResponse.redirect(
                    new URL("/dashboard/tenant", request.url)
                );
        }
    }

    // Admin routes
    if (
        pathname.startsWith("/dashboard/admin") &&
        role !== "ADMIN"
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", request.url)
        );
    }

    // Landlord routes
    if (
        pathname.startsWith("/dashboard/landlord") &&
        role !== "LANDLORD"
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", request.url)
        );
    }

    // Tenant routes
    if (
        pathname.startsWith("/dashboard/tenant") &&
        role !== "TENANT"
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/register",
    ],
};