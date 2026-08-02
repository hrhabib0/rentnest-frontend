import UsersTable from "@/components/dashboard/admin/users/UsersTable";
import { getAllUsers } from "@/services/admin/admin";

export default async function AdminUsersPage() {
    // const user = await getMe()
    const result = await getAllUsers();
    const users = result.data;
    // const meta = result.meta;
    return (
        <div className="space-y-6">
            {/* <DashboardHeader user={user.data} /> */}
            Admin dash board
            <UsersTable users={users}></UsersTable>
        </div>
    );
}