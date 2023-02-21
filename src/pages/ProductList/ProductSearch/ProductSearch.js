import { Button, Card, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import MainLayout from '../../../components/layout/MainLayout'
import Loader from '../../../components/Loader/Loader'
import { getSearchProducts } from '../../../store/reducers/productsSlice'
import { productsSelector } from '../../../store/selectors'
import { getProducRoute } from '../../../ultis/route'
import { formatPrice } from '../../../ultis/ulti'
import { Container, Price, Sec, Section, SubSec, Title } from './product-search-styles'

const ProductSearch = () => {
    const params = useParams()
    const { filterProducts, total } = useSelector(productsSelector)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setPage(1)
        setIsLoading(true)
    }, [params])

    useEffect(() => {
        if (params.keyword) {
            dispatch(getSearchProducts({
                page: page,
                perPage: 12,
                keyword: params.keyword.replaceAll("-", " ")
            }))
            setIsLoading(false)
        }
    }, [dispatch, params, page])

    return (
        <MainLayout>
            <Container>
                {isLoading ? (
                    <Loader />
                ) : (
                    <Section>
                        <h2>Có {total} kết quả tìm kiếm cho từ khóa: "{params.keyword}"</h2>
                        <List
                            grid={{ column: 4 }}
                            dataSource={filterProducts}
                            renderItem={item => (
                                <List.Item>
                                    <Link key={item.id} to={getProducRoute(item.product_name)}>
                                        <Card
                                            hoverable
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '300px' }}
                                            cover={<img alt='phone' src={item.url} style={{ width: '120px', height: '120px', paddingTop: '20px' }} />}
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
                        <SubSec>
                            {filterProducts.length < total && <Button size="large" onClick={() => setPage(page + 1)}>Xem thêm</Button>}
                        </SubSec>
                    </Section>
                )}
            </Container>
        </MainLayout>
    )
}

export default ProductSearch