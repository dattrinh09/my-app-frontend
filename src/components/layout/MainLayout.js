import React from 'react'
import Header from '../Header/Header'
import Navigator from '../Navigator/Navigator'

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Navigator />
            {children}
        </>
    )
}

export default MainLayout