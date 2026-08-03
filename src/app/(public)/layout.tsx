export const dynamic = "force-dynamic"; // deployment issue solution by ai.

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
    return (
        <div>
            <Navbar user={user} />
            {children}
        </div>
    )
}

export default PublicGroupLayout