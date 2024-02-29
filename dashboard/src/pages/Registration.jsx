import React from "react";
import { Card, Space, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    let data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    // console.log(data);
    let userData = await axios.post(
      "http://localhost:8000/api/v1/auth/registration",
      data
    );
    navigate(`/otp/${userData.data.email}`);
    // console.log(userData.data.email);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Space direction="vertical" size={16}>
        <Card
          title="Registration"
          style={{
            width: 350, //300 default
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </>
  );
};

export default Registration;
