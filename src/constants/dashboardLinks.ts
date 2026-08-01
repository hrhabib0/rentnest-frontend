import { DashboardLink } from "@/types/dashboard";
import {
    LayoutDashboard,
    Building2,
    FileText,
    CreditCard,
    Users,
    Tags,
    User,
} from "lucide-react";

export const tenantLinks: DashboardLink[] = [
    {
        label: "Dashboard",
        href: "/dashboard/tenant",
        icon: LayoutDashboard,
    },
    {
        label: "My Requests",
        href: "/dashboard/tenant/my-requests",
        icon: FileText,
    },
    {
        label: "Payments",
        href: "/dashboard/tenant/payments",
        icon: CreditCard,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
];

export const landlordLinks: DashboardLink[] = [
    {
        label: "Dashboard",
        href: "/dashboard/landlord",
        icon: LayoutDashboard,
    },
    {
        label: "Properties",
        href: "/dashboard/landlord/properties",
        icon: Building2,
    },
    {
        label: "Rental Requests",
        href: "/dashboard/landlord/requests",
        icon: FileText,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
];

export const adminLinks: DashboardLink[] = [
    {
        label: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
    },
    {
        label: "Categories",
        href: "/dashboard/admin/categories",
        icon: Tags,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
];