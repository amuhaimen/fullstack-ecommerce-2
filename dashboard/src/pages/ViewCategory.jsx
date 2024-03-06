//============================= import item start=================================
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Space, Table, Tag, Modal, Form, Input } from "antd";
import { useSelector } from "react-redux";
//============================= import item end =================================

const ViewCategory = () => {
  //============================= all variable item start ==========================
  let [data, setData] = useState([]);
  let [loadData, setLoadData] = useState(false);
  let [loading, setLoading] = useState("");
  let [msg, setMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(false);
  const userData = useSelector((state) => state.activeUser.value);
  //============================= all variable item end ==========================

  // ============================== action by clicking start ===========================
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
      "http://localhost:8000/api/v1/product/deletecategory",
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
    // console.log("Success Modal:", values, editId);
    let response = await axios.post(
      "http://localhost:8000/api/v1/product/editcategory",
      {
        name: values.categoryname,
        id: editId,
      }
    );

    console.log(response);
    setLoadData(!loadData);
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //=============================== handleApprove start ========================
  let handleApprove = async (item) => {
    setLoading(item.key);
    let response = await axios.post(
      "http://localhost:8000/api/v1/product/approvecategory",
      {
        isActive: item.active == "Approved" ? false : true,
        id: item.key,
      }
    );
    console.log(response);
    setLoadData(!loadData);
    setLoading("");
  };
  //=============================== handleApprove end ===========================

  // ============================== action by clicking end ====================

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {userData.role == "Merchant" && (
            <Button type="primary" onClick={() => showModal(record.key)}>
              Edit{" "}
            </Button>
          )}
          <Button
            onClick={() => handleDelete(record.key)}
            loading={loading == record.key ? true : false}
          >
            Delete
          </Button>
          {userData.role == "Admin" && (
            <Button
              onClick={() => handleApprove(record)}
              loading={loading == record.key ? true : false}
            >
              {" "}
              {record.active == "Approved" ? "Hold" : "Approve"}{" "}
            </Button>
          )}
        </Space>
      ),
    },
  ];
  //  const data = [
  //    {
  //      key: '1',
  //      name: 'John Brown',
  //      active: 'New York No. 1 Lake Park',

  //    },

  //  ];
  //========================= load data by useEffect start ===========================

  useEffect(() => {
    let arr = [];
    async function viewcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/allcategory"
      );
      data.data.map((item) => {
        arr.push({
          key: item._id,
          name: item.name,
          active: item.isActive ? "Approved" : "Pending",
        });
      });
      setData(arr);
    }
    viewcategory();
  }, [loadData]);
  //========================= load data by useEffect end =====================
  return (
    <>
      <h1>Categories {data.length}</h1>
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

export default ViewCategory;
