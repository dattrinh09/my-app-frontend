import { List, Card, Radio, Pagination } from 'antd'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navigator from '../../components/navigator/Navigator'
import { getProductRoute } from '../../ultis/route'
import { Container, Content, Heading, Pagin, Price, Sec, Section, SideBar, SideBarItem } from './product-list-styles'

const brands = [
  {
    id: "1",
    name: "Apple",
    url: "a",
  },
  {
    id: "2",
    name: "Samsung",
    url: "a",
  },
  {
    id: "3",
    name: "Nokia",
    url: "a",
  },
  {
    id: "4",
    name: "Oppo",
    url: "a",
  },
  {
    id: "5",
    name: "Xiaomi",
    url: "a",
  },
  {
    id: "6",
    name: "Assus",
    url: "a",
  },
  {
    id: "7",
    name: "Vivo",
    url: "a",
  },
  {
    id: "8",
    name: "Realme",
    url: "a",
  },
  {
    id: "9",
    name: "Masstel",
    url: "a",
  },
  {
    id: "10",
    name: "Tecno",
    url: "a",
  },
]

const products = []

for (var i = 0; i < 150; i++) {
  const product = {
    id: `${i + 1}`,
    name: "iphone 14 pro max " + `${i + 1}`,
    price: 24000000,
    description: "6GB - 256GB",
    brand: "apple",
    url: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/08/1111.png"
  }
  products.push(product);
}

const ProductList = () => {
  const [brand, setBrand] = useState("ALL")
  const [price, setPrice] = useState("ALL")
  const [page, setPage] = useState(1)

  const listProducts = useMemo(() => {
    const num = (page - 1) * 15
    return products.slice(num, num + 15)
  }, [page])

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
                    <Radio key={item.id} value={item.name}>{item.name}</Radio>
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
                    <Link key={item.id} to={getProductRoute(item.id)}>
                      <Card
                        hoverable
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        cover={<img alt='photo' src={item.url} style={{ width: '120px', paddingTop: '20px' }} />}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4>{item.name}</h4>
                          <Price>{item.price} đ</Price>
                        </div>
                      </Card>
                    </Link>
                  </List.Item>
                )}
              />
              <Pagin>
                <Pagination
                  total={150}
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