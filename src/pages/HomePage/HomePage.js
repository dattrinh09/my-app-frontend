import { Card, List } from 'antd';
import React from 'react'
import MyLink from '../../components/Link/Link';
import { ConstanthPaths } from '../../constanth/constanth.path';
import { Container, Price, Sec, Section, SubSec } from './home-page-styles'

const products = []

for(var i = 0; i < 25; i++) {
  const product = {
    id: "1",
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
    <Container>
      <Section>
        <h2>Sản phẩm</h2>
        <List
          grid={{ column: 5 }}
          dataSource={products}
          renderItem={item => (
            <List.Item>
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
            </List.Item>
          )}
        />
        <SubSec>
          <MyLink name="Xem thêm ..." path={ConstanthPaths.PRODUCT_LIST} color="#333" size="16px" />
        </SubSec>
      </Section>
    </Container>
  )
}

export default HomePage