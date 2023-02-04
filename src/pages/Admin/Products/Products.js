import { Button, Space, Table, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader'
import AdminNavigator from '../../../components/adminNavigator/AdminNavigator'
import { AddButton, Container, Content, ProductImg } from './products-styles'

const brands = [
  {
    id: "1",
    name: "Apple",
  },
  {
    id: "2",
    name: "Samsung",
  },
  {
    id: "3",
    name: "Nokia",
  },
  {
    id: "4",
    name: "Oppo",
  },
  {
    id: "5",
    name: "Xiaomi",
  },
  {
    id: "6",
    name: "Assus",
  },
  {
    id: "7",
    name: "Vivo",
  },
  {
    id: "8",
    name: "Realme",
  },
  {
    id: "9",
    name: "Masstel",
  },
  {
    id: "10",
    name: "Tecno",
  },
]

const products = []

for (var i = 0; i < 153; i++) {
  const product = {
    id: i + 1,
    produc_name: "iphone 14 pro max " + `${i + 1}`,
    price: 24000000,
    description: "6GB - 256GB",
    in_stock: 5,
    brand: {
      id: 1,
      brand_name: "Apple",
    },
    url: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/08/1111.png",

  }
  products.push(product);
}

const Products = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Ảnh',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <ProductImg src={url} />
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hãng sản xuất',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand) => <Tag color="blue">{brand}</Tag>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'in_stock',
      key: 'in_stock',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />}>Sửa</Button>
          <Button icon={<DeleteOutlined />}>Xóa</Button>
        </Space>
      )
    }
  ]

  const data = products.map(value => ({
    key: value.id,
    id: value.id,
    product_name: value.produc_name,
    price: value.price,
    in_stock: value.in_stock,
    brand: value.brand.brand_name,
    description: value.description,
    url: value.url
  }))

  return (
    <>
      <AdminHeader />
      <AdminNavigator />
      <Container>
        <Content>
          <h2>Sản phẩm</h2>
          <AddButton>
            <Button type="primary" size="large" icon={<PlusCircleOutlined />}>Thêm sản phẩm</Button>
          </AddButton>
          <Table columns={columns} dataSource={data} />
        </Content>
      </Container>
    </>
  )
}

export default Products