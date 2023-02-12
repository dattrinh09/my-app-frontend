import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminNavigator from '../AdminNavigator/AdminNavigator'

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminHeader />
            <AdminNavigator />
            {children}
        </>
    )
}

export default AdminLayout