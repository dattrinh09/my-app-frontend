import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminNavigator from '../AdminNavigator/AdminNavigator'
import { Content, LayoutContainer } from './layout-styles'

const AdminLayout = ({ children }) => {
    return (
        <LayoutContainer>
            <AdminHeader />
            <AdminNavigator />
            <Content>
                {children}
            </Content>
        </LayoutContainer>
    )
}

export default AdminLayout