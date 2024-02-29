import React from "react";
import { Card, Space, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    // console.log(data);
    let logData = await axios.post(
      "http://localhost:8000/api/v1/auth/login",
      data
    );
    // navigate(`/otp/${userData.data.email}`);
    console.log(logData);
    if (logData.data.role == "User") {
      console.log("you do not have permission");
    } else {
      console.log("done");
      navigate("/home");
      localStorage.setItem("user", JSON.stringify(logData.data));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Space direction="vertical" size={16}>
        <Card
          title="Login"
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
            <Form.Item
              label="Email"
              name="email"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your email!",
              //   },
              // ]}
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
                Log In
              </Button>
              <br />
              <br />
              <Link to="/forgotpassword">Forgot Password</Link>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </>
  );
};

export default Login;
