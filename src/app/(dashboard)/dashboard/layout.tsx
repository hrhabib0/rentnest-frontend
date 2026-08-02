import { ReactNode } from "react";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import { getMe } from "@/services/auth";



type Props = {
    children: ReactNode;
};

export default async function DashboardLayout({
    children,
}: Props) {
    const user = await getMe();

    if (!user?.success) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <DashboardSidebar
                    user={user.data}
                />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* <DashboardHeader
                    user={user.data}
                /> */}

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}