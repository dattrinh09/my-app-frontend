import React from 'react'
import Header from '../Header/Header'
import Navigator from '../Navigator/Navigator'
import { Content, LayoutContainer } from './layout-styles'

const MainLayout = ({ children }) => {
    return (
        <LayoutContainer>
            <Header />
            <Navigator />
            <Content>
                {children}
            </Content>
        </LayoutContainer>
    )
}

export default MainLayout