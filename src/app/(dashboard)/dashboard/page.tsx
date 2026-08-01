import { getMe } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getMe();
    if (!user?.success) {
        redirect("/login");
    }

    switch (user.data.role) {
        case "TENANT":
            redirect("/dashboard/tenant");

        case "LANDLORD":
            redirect("/dashboard/landlord");

        case "ADMIN":
            redirect("/dashboard/admin");

        default:
            redirect("/");
    }
}