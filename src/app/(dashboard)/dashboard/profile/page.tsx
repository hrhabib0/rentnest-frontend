import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import DashboardHeading from "@/components/dashboard/shared/DashboardHeading";
// import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import { getMe } from "@/services/auth";


export default async function ProfilePage() {
    const user = await getMe();

    return (
        <div className="space-y-6">
            <DashboardHeading
                title="My Profile"
                description="Manage your personal information."
            />

            <ProfileCard user={user.data} />
        </div>
    );
}