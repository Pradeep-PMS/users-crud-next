
"use client"
import { Button, Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import React from 'react'

const Addpage = () => {
  const router = useRouter()

  const onFinish = async (values: any) => {
    const data = { ...values, mobileno: Number(values.mobileno), }
    try {
      console.log(values);
      const url = "http://localhost:8080/users"
      const api = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const response = await api.json()
      console.log(response);
      if (response._id) {
        router.back()
      }

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div>
      <Form onFinish={onFinish}>
        <h1 className="text-3xl m-3">Add Details</h1>
        <Row gutter={16} justify={'center'}>
          <Col xs={24} sm={24} md={11}>
            <h1 className="font-medium text-lg mt-5">First Name</h1>

            <Form.Item name={"first_name"} rules={[{ required: true, message: 'Please Enter the first name!' }]}>
              <Input placeholder="First Name" name='first_name' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={11}>
            <h1 className="font-medium text-lg mt-5">Last Name</h1>
            <Form.Item name={"last_name"} rules={[{ required: true, message: 'Please Enter the last name!' }]}>
              <Input size="large" placeholder="Enter last name" name='last_name' />
            </Form.Item>

          </Col>
        </Row>

        <Row gutter={16} justify={'center'}>
          <Col xs={24} sm={24} md={11}>
            <h1 className="font-medium text-lg mt-5" >Email</h1>
            <Form.Item name={"email"} rules={[{ required: true, message: 'Please Enter the email!' }]}>
              <Input size="large" placeholder="Enter email" type="email" name='email' />
            </Form.Item>

          </Col>
          <Col xs={24} sm={24} md={11}>
            <h1 className="font-medium text-lg mt-5">Contact</h1>
            <Form.Item name={"mobileno"} rules={[{ required: true, message: 'Please Enter the first name!' }]}>
              <Input size="large" placeholder="Enter the Phone No " type="number" name='mobileno' />
            </Form.Item>


          </Col>
        </Row>

        <Row justify={'center'}>
          <Col span={22}>
            <h1 className="font-medium text-lg mt-5">Address</h1>
            <Form.Item name={"address"} rules={[{ required: true, message: 'Please Enter the first name!' }]}>
              <TextArea rows={4} name='address' />
            </Form.Item>

          </Col>

        </Row>
        <Button htmlType='submit' type="primary" block>Signup </Button>

      </Form>
    </div>
  )
}

export default Addpage;
