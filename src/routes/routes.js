import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConstanthPaths } from '../constants/constants'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import HomePage from '../pages/HomePage/HomePage'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import ProductList from '../pages/ProductList/ProductList'
import Products from '../pages/Admin/Products/Products'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import Brands from '../pages/Admin/Brands/Brands'
import ProductSearch from '../pages/ProductList/ProductSearch/ProductSearch'
import Order from '../pages/Order/Order'

const routes = () => {
  return (
    <Routes>
      <Route path={ConstanthPaths.HOME_PAGE} element={<HomePage />} index />
      <Route path={ConstanthPaths.SIGN_IN} element={<SignIn />} />
      <Route path={ConstanthPaths.SIGN_UP} element={<SignUp />} />
      <Route path={ConstanthPaths.PRODUCT_LIST} element={<ProductList />} />
      <Route path={ConstanthPaths.PRODUCT_BRAND} element={<ProductList />} />
      <Route path={ConstanthPaths.PRODUCT_PRICE} element={<ProductList />} />
      <Route path={ConstanthPaths.PRODUCT_BRAND_PRICE} element={<ProductList />} />
      <Route path={ConstanthPaths.PRODUCT_SEARCH} element={<ProductSearch />} />
      <Route path={ConstanthPaths.PRODUCT_DETAIL} element={<ProductDetail />} />
      <Route path={ConstanthPaths.ORDER} element={<Order />} />
      <Route path={ConstanthPaths.ADMIN_SIGN_IN} element={<SignIn />} />
      <Route element={<PrivateRoute />}>
        <Route path={ConstanthPaths.ADMIN_PRODUCT} element={<Products />} />
        <Route path={ConstanthPaths.ADMIN_BRAND} element={<Brands />} />
      </Route>      
    </Routes>
  )
}

export default routes