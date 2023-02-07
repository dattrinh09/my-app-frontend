import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ConstanthPaths } from '../../constants/constants'

const PrivateRoute = () => {
    const isAdmin = localStorage.getItem("isAdmin")

    return isAdmin === "1" ? <Outlet /> : <Navigate to={ConstanthPaths.HOME_PAGE} />
}

export default PrivateRoute