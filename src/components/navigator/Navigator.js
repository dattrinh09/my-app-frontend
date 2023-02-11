import { Popover } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConstanthPaths, FilterPrice } from '../../constants/constants'
import { getBrands } from '../../store/reducers/brandsSlice'
import { brandsSelector } from '../../store/selectors'
import { getProductByBrandRoute, getProductByPriceRoute } from '../../ultis/route'
import MyLink from '../Link/Link'
import { BrandMenu, Container, Item, NavContainer, PriceMenu } from './naviagtor-styles'

const Navigator = () => {
  const { brands } = useSelector(brandsSelector)
  const dispath = useDispatch()

  useEffect(() => {
    dispath(getBrands())
  }, [dispath])

  const brandItem = (
    <BrandMenu>
      {brands.map(item => (
        <Link key={item.id} to={getProductByBrandRoute(item.brand_name)} style={{ color: "#333" }}>
          {item.brand_name}
        </Link>
      ))}
    </BrandMenu>
  )

  const priceItem = (
    <PriceMenu>
      {FilterPrice.map(item => (
        <Link key={item.key} to={getProductByPriceRoute(item.value)} style={{ color: "#333" }}>
          {item.label}
        </Link>
      ))}
    </PriceMenu>
  )

  return (
    <NavContainer>
      <Container>
        <MyLink name="Trang chủ" path={ConstanthPaths.HOME_PAGE} color="#fff" size="20px" />
        <Popover
          placement="bottom"
          trigger="hover"
          showArrow={false}
          content={brandItem}
        >
          <Item>Hãng sản xuất</Item>
        </Popover>
        <Popover
          placement="bottomRight"
          trigger="hover"
          showArrow={false}
          content={priceItem}
        >
          <Item>Giá tiền</Item>
        </Popover>
      </Container>
    </NavContainer>
  )
}

export default Navigator