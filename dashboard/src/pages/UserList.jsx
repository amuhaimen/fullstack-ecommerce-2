import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const UserList = () => {
  let [userList, setUserList] = useState([]);
  let [userName, setUserName] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: userName,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
  ];

  useEffect(() => {
    let username = [];
    let userlist = [];
    async function user() {
      let userData = await axios.get(
        "http://localhost:8000/api/v1/auth/alluser"
      );
      userData.data.map((item) => {
        if (item.role == "User") {
          userlist.push({
            ...item,
          });
        }
      });
      setUserList(userlist);
      userData.data.map((item) => {
        username.push({
          text: item.name,
          value: item.name,
        });
      });
      setUserName(username);
    }
    user();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      {/* {userList.map((item, index) => (
        <h1 key={index}>{item.name}</h1>
      ))} */}

      <Table columns={columns} dataSource={userList} onChange={onChange} />
    </>
  );
};

export default UserList;
