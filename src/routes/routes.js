import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConstanthPaths } from '../constanth/constanth.path'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import HomePage from '../pages/HomePage/HomePage'

const routes = () => {
  return (
    <Routes>
        <Route path={ConstanthPaths.HOME_PAGE} element={<HomePage />} index />
        <Route path={ConstanthPaths.SIGN_IN} element={<SignIn />} />
        <Route path={ConstanthPaths.SIGN_UP} element={<SignUp />} />
    </Routes>
  )
}

export default routes