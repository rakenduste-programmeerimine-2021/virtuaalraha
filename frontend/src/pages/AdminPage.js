import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store";

function AdminPage() {
  const [state, dispatch] = useContext(Context);
  const [addCoin, setAddCoin] = useState("");

  const handleSubmit = async (coin) => {
    let newCoin = {
      coinName: coin,
    };
    await axios({
      method: "post",
      url: "http://localhost:8081/api/coin/create",
      data: newCoin,
      headers: {
        "Content-Type": "application/json",
        authorization: state.auth.user.token,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 9 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Coin name"
        name="coinName"
        rules={[{ required: true, message: "Please input your coin name!" }]}
        onChange={(e) => setAddCoin(e.target.value)}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => handleSubmit(addCoin)}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminPage;
