import UsersTable from "@/components/dashboard/admin/users/UsersTable";
import DashboardHeading from "@/components/dashboard/shared/DashboardHeading";
import { getAllUsers } from "@/services/admin/admin";

export default async function AdminUsersPage() {
    // const user = await getMe()
    const result = await getAllUsers();
    const users = result.data;
    // const meta = result.meta;
    return (
        <div className="space-y-6">
            <DashboardHeading
                title="Users"
                description="Manage all registered users."
            />
            <UsersTable users={users}></UsersTable>
        </div>
    );
}