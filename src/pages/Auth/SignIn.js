import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
      localStorage.setItem("userName", res.data.user_info.username)
      localStorage.setItem("userEmail", res.data.user_info.email)
      if (res.data.user_info.is_admin) {
        localStorage.setItem("isAdmin", "1")
        navigate(ConstanthPaths.ADMIN_PRODUCT)
      }
      else {
        localStorage.setItem("isAdmin", "2")
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
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFinish}
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
            prefix={<MailOutlined className="site-form-item-icon" />}
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <br />
        <span>
          Nếu bạn chưa có tài khoản hãy nhấn vào
          <NavLink
            style={{ color: "blue" }}
            to={ConstanthPaths.SIGN_UP}
          > đây.
          </NavLink>
        </span>
        <div>
          <Button
            className="form-btn"
            type='primary'
            htmlType="submit"
            style={{ margin: "20px 0" }}
          >
            Đăng nhập
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default SignIn