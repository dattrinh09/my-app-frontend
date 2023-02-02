import { Card, List } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import MyLink from '../../components/Link/Link';
import Navigator from '../../components/navigator/Navigator';
import { ConstanthPaths } from '../../constanth/constanth.path';
import { getProductRoute } from '../../ultis/route';
import { Container, Price, Sec, Section, SubSec } from './home-page-styles'

const products = []

for (var i = 0; i < 20; i++) {
  const product = {
    id: `${i + 1}`,
    name: "iphone 14 pro max",
    price: 24000000,
    description: "6GB - 256GB",
    brand: "apple",
    url: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/08/1111.png"
  }
  products.push(product);
}

const HomePage = () => {
  return (
    <>
      <Header />
      <Navigator />
      <Container>
        <Section>
          <h2>Sản phẩm</h2>
          <SubSec>
            <MyLink name="Xem tất cả sản phẩm." path={ConstanthPaths.PRODUCT_LIST} color="#333" size="16px" />
          </SubSec>
          <List
            grid={{ column: 4 }}
            dataSource={products}
            renderItem={item => (
              <List.Item>
                <Link key={item.id} to={getProductRoute(item.id)}>
                  <Card
                    hoverable
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    cover={<img alt='photo' src={item.url} style={{ width: '120px', paddingTop: '20px' }} />}
                  >
                    <Sec>
                      <h4>{item.name}</h4>
                      <Price>{item.price} đ</Price>
                    </Sec>
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        </Section>
      </Container>
    </>
  )
}

export default HomePage