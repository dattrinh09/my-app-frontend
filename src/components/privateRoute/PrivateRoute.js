import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ConstanthPaths } from '../../constants/constants'

const PrivateRoute = () => {
    return localStorage.getItem("is_admin") === "true" ? <Outlet /> : <Navigate to={ConstanthPaths.HOME_PAGE} />
}

export default PrivateRoute