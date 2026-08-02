import Navbar from "@/components/shared/Navbar"
import { getMe } from "@/services/auth"

const authGroupLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    const user = await getMe()
    return (
        <div className="space-y-6">
            <Navbar user={user} />
            <div>
                {children}
            </div>
        </div>
    )
}

export default authGroupLayout