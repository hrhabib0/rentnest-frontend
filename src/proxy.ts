import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    console.log("🔥 Proxy Running:", request.nextUrl.pathname);

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
};