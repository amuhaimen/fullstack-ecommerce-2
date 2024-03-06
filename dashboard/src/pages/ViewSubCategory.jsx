import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Space, Table, Tag, Modal, Form, Input } from "antd";

const ViewSubCategory = () => {
  let [data, setData] = useState([]);
  let [loadData, setLoadData] = useState(false);
  let [loading, setLoading] = useState("");
  let [msg, setMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(false);

  const showModal = (id) => {
    console.log("edit Id:", id);
    setEditId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //delete category
  let handleDelete = async (id) => {
    setLoading(id);
    let data = await axios.post(
      "http://localhost:8000/api/v1/product/deletesubcategory",
      {
        id: id,
      }
    );
    console.log(data.data.success);
    setMsg(data.data.success);
    setLoadData(!loadData);
    setLoading("");
  };

  //edit category
  const onFinishModal = async (values) => {
    console.log("Success Modal:", values, data.editId);
    let response = await axios.post(
      "http://localhost:8000/api/v1/product/editsubcategory",
      {
        name: values.categoryname,
        id: editId,
      }
    );
    console.log(response.data.success);
    setMsg(response.data.success);
    setLoadData(!loadData);
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record.key)}>
            Edit{" "}
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record.key)}
            loading={loading == record.key ? true : false}
          >
            Delete{" "}
          </Button>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",

  //     active: "New York No. 1 Lake Park",
  //   },
  // ];

  useEffect(() => {
    let arr = [];
    async function viewcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/allsubcategory"
      );
      // console.log(data.data[0].categoryId.name);
      data.data.map((item) => {
        arr.push({
          key: item._id,
          name: item.name,
          category: data.data[0].categoryId.name,
          active: item.isActive ? "Approved" : "Pending",
        });
      });
      setData(arr);
    }
    viewcategory();
  }, [loadData]);

  return (
    <>
      <h1>Sub Categories{data.length}</h1>
      <p>{msg}</p>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
          onFinish={onFinishModal}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="categoryname"
            rules={[
              {
                required: true,
                message: "Please input your category name!",
              },
            ]}
          >
            <Input />
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
      </Modal>
    </>
  );
};

export default ViewSubCategory;
