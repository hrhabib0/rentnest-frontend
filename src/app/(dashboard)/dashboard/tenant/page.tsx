import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { getMe } from '@/services/auth'
import React from 'react'

const page = async () => {
    const user = await getMe()
    return (
        <DashboardSidebar user={user.data}></DashboardSidebar>
    )
}

export default page