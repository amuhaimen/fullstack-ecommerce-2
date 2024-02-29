import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const AddSubCategory = () => {
  let [data, setData] = useState([]);
  // const data = useSelector((state) => state.activeUser.value);
  const onFinish = async (values) => {
    console.log("Success:", values, data.id);
    let response = await axios.post(
      "http://localhost:8000/api/v1/product/createsubcategory",
      {
        name: values.subcategoryname,
        // categoryId: data.id,
      }
    );
    console.log(response);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    let arr = [];
    async function viewcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/allcategory"
      );

      data.data.map((item) => {
        arr.push({
          value: item._id,
          label: item.name,
          // active: item.isActive ? "Approved" : "Pending",
        });
      });
      setData(arr);
    }
    viewcategory();
  }, []);

  return (
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
        label="Sub Category Name"
        name="subcategoryname"
        rules={[
          {
            required: true,
            message: "Please input your category name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Select
        defaultValue="Select category"
        style={{
          width: 180,
        }}
        onChange={handleChange}
        options={data}
      />
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
  );
};

export default AddSubCategory;