import { Card, List } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import MyLink from '../../components/Link/Link';
import { ConstanthPaths } from '../../constants/constants';
import { getFilterProducts } from '../../store/reducers/productsSlice';
import { productsSelector } from '../../store/selectors';
import { getProducRoute } from '../../ultis/route';
import { formatPrice } from '../../ultis/ulti';
import { Container, Price, Sec, Section, SubSec, Title } from './home-page-styles'

const HomePage = () => {
  const { filterProducts } = useSelector(productsSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFilterProducts({
      page: 1,
      perPage: 12,
      brandName: "ALL",
      price: "ALL"
    }))
  }, [dispatch])

  return (
    <MainLayout>
      <Container>
        <Section>
          <h2>Sản phẩm</h2>
          <SubSec>
            <MyLink name="Xem tất cả sản phẩm..." path={ConstanthPaths.PRODUCT_LIST} color="#333" size="16px" />
          </SubSec>
          <List
            grid={{ column: 4 }}
            dataSource={filterProducts}
            renderItem={item => (
              <List.Item>
                <Link key={item.id} to={getProducRoute(item.product_name)}>
                  <Card
                    hoverable
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '300px' }}
                    cover={<img alt='phone' src={item.url} style={{ width: '120px', paddingTop: '20px' }} />}
                  >
                    <Sec>
                      <Title>{item.product_name}</Title>
                      <Price>{formatPrice(item.price)}</Price>
                    </Sec>
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        </Section>
      </Container>
    </MainLayout>
  )
}

export default HomePage