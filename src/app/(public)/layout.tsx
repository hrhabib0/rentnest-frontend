import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/auth";

const PublicGroupLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    const user = await getMe();
    console.log(user, 'user nav')
    return (
        <div>
            <Navbar user={user} />
            {children}
        </div>
    )
}

export default PublicGroupLayout