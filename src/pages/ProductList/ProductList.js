import { List, Card, Radio, Pagination } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navigator from '../../components/navigator/Navigator'
import { getBrands } from '../../store/reducers/brandsSlice'
import { getProducts } from '../../store/reducers/productsSlice'
import { brandsSelector, productsSelector } from '../../store/selectors'
import { getProductRoute } from '../../ultis/route'
import { formatPrice } from '../../ultis/ulti'
import { Container, Content, Heading, Pagin, Price, Sec, Section, SideBar, SideBarItem } from './product-list-styles'

const ProductList = () => {
  const products = useSelector(productsSelector).products
  const brands = useSelector(brandsSelector).brands
  const dispath = useDispatch()

  useEffect(() => {
    dispath(getProducts())
    dispath(getBrands())
  }, [dispath])

  const [brand, setBrand] = useState("ALL")
  const [price, setPrice] = useState("ALL")
  const [page, setPage] = useState(1)

  const listProducts = useMemo(() => {
    const num = (page - 1) * 15
    return products.slice(num, num + 15)
  }, [page, products])

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
                  onChange={e => setBrand(e.target.value)}
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
                  onChange={e => setPrice(e.target.value)}
                  style={{ display: "grid", gridTemplateColumns: "1fr" }}
                >
                  <Radio value="ALL">Tất cả</Radio>
                  <Radio value="L_2">Dưới 2 triệu</Radio>
                  <Radio value="2_to_4">Từ 2 - 4 triệu</Radio>
                  <Radio value="4_to_7">Từ 4 - 7 triệu</Radio>
                  <Radio value="7_to_14">Từ 7 - 14 triệu</Radio>
                  <Radio value="G_14">Hơn 14 triệu</Radio>
                </Radio.Group>
              </div>
            </SideBarItem>
          </SideBar>
          <Section>
            <Heading><h2>Điện thoại: {products.length} sản phẩm</h2></Heading>
            <Sec>
              <List
                grid={{ column: 3 }}
                dataSource={listProducts}
                renderItem={item => (
                  <List.Item>
                    <Link key={item.id} to={getProductRoute(item.product_name)}>
                      <Card
                        hoverable
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '300px' }}
                        cover={<img alt='photo' src={item.url} style={{ height: '120px', paddingTop: '20px' }} />}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4>{item.product_name}</h4>
                          <Price>{formatPrice(item.price)}</Price>
                        </div>
                      </Card>
                    </Link>
                  </List.Item>
                )}
              />
              <Pagin>
                <Pagination
                  total={products.length}
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