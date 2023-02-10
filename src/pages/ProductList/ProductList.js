import { List, Card, Radio, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navigator from '../../components/navigator/Navigator'
import { ConstanthPaths, FilterPrice } from '../../constants/constants'
import { getBrands } from '../../store/reducers/brandsSlice'
import { getFilterProducts } from '../../store/reducers/productsSlice'
import { brandsSelector, productsSelector } from '../../store/selectors'
import { getProducRoute, getProductByBrandAndPriceRoute, getProductByBrandRoute, getProductByPriceRoute } from '../../ultis/route'
import { formatPrice } from '../../ultis/ulti'
import { Container, Content, Heading, Pagin, Price, Sec, Section, SideBar, SideBarItem, Title } from './product-list-styles'

const ProductList = () => {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const { filterProducts, totals } = useSelector(productsSelector)
  const [page, setPage] = useState(1)
  const { brands } = useSelector(brandsSelector)
  const dispath = useDispatch()

  const [brand, setBrand] = useState(() => {
    return params.brand_name ? params.brand_name : "ALL"
  })
  const [price, setPrice] = useState(() => {
    var p
    if (params.price) p = params.price
    else if (searchParams.get("gia-tien")) p = searchParams.get("gia-tien")
    else p = "ALL"
    return p 
  })

  useEffect(() => {
    dispath(getBrands())
    dispath(getFilterProducts({
      page: page,
      perPage: 15,
      brandName: brand,
      price: price
    }))
  }, [dispath, page, brand, price])


  const handleChangeBrand = e => {
    const value = e.target.value
    if(value !== "ALL") {
      setBrand(value)
      if(price !== "ALL") navigate(getProductByBrandAndPriceRoute(value, price))
      else navigate(getProductByBrandRoute(value))
    } else {
      setBrand("ALL")
      if(price !== "ALL") navigate(getProductByPriceRoute(price))
      else navigate(ConstanthPaths.PRODUCT_LIST)
    }
  }

  const handleChangePrice = e => {
    const value = e.target.value
    if(value !== "ALL") {
      setPrice(value)
      if(!params.brand_name) navigate(getProductByPriceRoute(value))
      else setSearchParams({"gia-tien": value})
    } else {
      setPrice("ALL")
      if(!params.brand_name) navigate(ConstanthPaths.PRODUCT_LIST)
      else setSearchParams({})
    }
  }

  return (
    <>
      <Header />
      <Navigator />
      <Container>
        <Content>
          <SideBar>
            <SideBarItem>
              <h3>Hãng sản xuất</h3>
              <div>
                <Radio.Group
                  buttonStyle='solid'
                  value={brand}
                  onChange={handleChangeBrand}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  <Radio value="ALL">Tất cả</Radio>
                  {brands.map(item => (
                    <Radio key={item.id} value={item.brand_name}>{item.brand_name}</Radio>
                  ))}
                </Radio.Group>
              </div>
            </SideBarItem>
            <SideBarItem>
              <h3>Mức giá</h3>
              <div>
                <Radio.Group
                  buttonStyle='solid'
                  value={price}
                  onChange={handleChangePrice}
                  style={{ display: "grid", gridTemplateColumns: "1fr" }}
                >
                  <Radio value="ALL">Tất cả</Radio>
                  {FilterPrice.map(item => (
                    <Radio key={item.key} value={item.value}>{item.label}</Radio>
                  ))}
                </Radio.Group>
              </div>
            </SideBarItem>
          </SideBar>
          <Section>
            <Heading><h2>Điện thoại: {totals} sản phẩm</h2></Heading>
            <Sec>
              <List
                grid={{ column: 3 }}
                dataSource={filterProducts}
                renderItem={item => (
                  <List.Item>
                    <Link key={item.id} to={getProducRoute(item.product_name)}>
                      <Card
                        hoverable
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '300px' }}
                        cover={<img alt='photo' src={item.url} style={{ height: '120px', paddingTop: '20px' }} />}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Title>{item.product_name}</Title>
                          <Price>{formatPrice(item.price)}</Price>
                        </div>
                      </Card>
                    </Link>
                  </List.Item>
                )}
              />
              <Pagin>
                <Pagination
                  total={totals}
                  pageSize={15}
                  defaultCurrent={page}
                  showSizeChanger={false}
                  onChange={p => setPage(p)}
                />
              </Pagin>
            </Sec>
          </Section>
        </Content>
      </Container>
    </>
  )
}

export default ProductList