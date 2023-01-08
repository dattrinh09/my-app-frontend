import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import styles from './Form.module.css'
import { ConstanthPaths } from '../../constanth/constanth.path'
import axiosInstance from '../../requests/axiosInstance'

const formItemLayout = {
  labelCol: {
      xs: {
          span: 24,
      },
      sm: {
          span: 8,
      },
  },
  wrapperCol: {
      xs: {
          span: 24,
      },
      sm: {
          span: 16,
      },
  },
}

const SignUp = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleFinish = async values => {
    console.log('Received values of form: ', values)
    try{
      const body = {
          name: values.name,
          email: values.email,
          password: values.password
      }
      await axiosInstance.post('auth/signUp', body)
      navigate(ConstanthPaths.SIGN_IN)
  }catch (e) {
      console.log(e.response.status)
      setError('E-mail đã được sử dụng!')
      throw new Error(e)
  }
  }

  return (
    <div className={styles.form}>
      <h4 className={styles.heading}>
        Đăng ký
      </h4>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Tên"
          rules={[
            {
              required: true,
              message: 'Hãy điền tên của bạn!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-Mail"
          rules={[
            {
              type: 'email',
              message: 'E-mail không hợp lệ!',
            },
            {
              required: true,
              message: 'Hãy điền vào e-mail của bạn!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật Khẩu"
          rules={[
            {
              required: true,
              message: 'Hãy điền vào mật khẩu của bạn!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Hãy điền lại mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <br />
        <span>Nếu bạn đã có tài khoản hãy nhấn vào
          <NavLink
            style={{ color: "blue" }}
            to={ConstanthPaths.SIGN_IN}
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
            Đăng ký
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SignUp