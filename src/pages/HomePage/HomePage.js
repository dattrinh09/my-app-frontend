import { Card, List } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import MyLink from '../../components/Link/Link';
import Navigator from '../../components/navigator/Navigator';
import { ConstanthPaths } from '../../constants/constants';
import { getProducts } from '../../store/reducers/productsSlice';
import { productsSelector } from '../../store/selectors';
import { getProductRoute } from '../../ultis/route';
import { formatPrice } from '../../ultis/ulti';
import { Container, Price, Sec, Section, SubSec } from './home-page-styles'

const HomePage = () => {
  const products = useSelector(productsSelector).products
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <>
      <Header />
      <Navigator />
      <Container>
        <Section>
          <h2>Sản phẩm</h2>
          <SubSec>
            <MyLink name="Xem tất cả sản phẩm..." path={ConstanthPaths.PRODUCT_LIST} color="#333" size="16px" />
          </SubSec>
          <List
            grid={{ column: 4 }}
            dataSource={products.slice(0, 20)}
            renderItem={item => (
              <List.Item>
                <Link key={item.id} to={getProductRoute(item.product_name)}>
                  <Card
                    hoverable
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '300px' }}
                    cover={<img alt='photo' src={item.url} style={{ width: '120px', height: '120px', paddingTop: '20px' }} />}
                  >
                    <Sec>
                      <h4>{item.product_name}</h4>
                      <Price>{formatPrice(item.price)}</Price>
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