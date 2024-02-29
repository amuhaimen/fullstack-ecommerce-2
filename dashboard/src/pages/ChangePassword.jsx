import React from "react";
import { Card, Space, Button, Checkbox, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  let navigate = useNavigate();
  let { email } = useParams();

  const onFinish = async (values) => {
    // console.log("token", email);

    let data = {
      token: email,
      password: values.password,
    };
    console.log(data);

    let changePasswordData = await axios.post(
      "http://localhost:8000/api/v1/auth/changepassword",
      data
    );

    console.log(changePasswordData);
    // navigate("/login");

    // console.log(otpData)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Space direction="vertical" size={16}>
      <Card
        title="Change Your Password"
        style={{
          width: 300,
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
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* <Form.Item
            label="New"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="New"
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
  );
};

export default ChangePassword;
