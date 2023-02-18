import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConstanthPaths } from '../../constants/constants'
import axiosInstance from '../../requests/axiosInstance'
import { FormContainer, FormHeading } from './form-styles'

const SignIn = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleFinish = async values => {
    try {
      const body = {
        email: values.email,
        password: values.password
      }
      const res = await axiosInstance.post("api/auth/signin", body)
      localStorage.setItem("token", res.data.access_token)
      localStorage.setItem("user_id", res.data.user_info.id)
      localStorage.setItem("username", res.data.user_info.username)
      localStorage.setItem("email", res.data.user_info.email)
      localStorage.setItem("is_admin", res.data.user_info.is_admin)
      if (res.data.user_info.is_admin) {
        navigate(ConstanthPaths.ADMIN_PRODUCT)
      }
      else {
        navigate(ConstanthPaths.HOME_PAGE)
      }
    } catch (e) {
      setError('E-mail hoặc Mật khẩu không chính xác!')
      throw new Error(e)
    }
  }

  return (
    <FormContainer>
      <FormHeading>Đăng nhập</FormHeading>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFinish}
        onFocus={() => setError("")}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Hãy điền e-mail của bạn!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            type="email"
            placeholder="E-Mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Hãy điền mật khẩu của bạn!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <Form.Item>Nếu bạn chưa có tài khoản. Nhấn vào <Link to={ConstanthPaths.SIGN_UP}>đây.</Link></Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType="submit"
            style={{ width: "100px" }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  )
}

export default SignIn