import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import { Table, Tag, Space } from "antd";
import { Context } from "../store";

async function getPortfolio(token) {
  const portfolio = [];

  await axios
    .get("http://localhost:8081/api/portfolio/portfolios", {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      let counter = 0;
      res.data.forEach((x) => {
        const list = {
          key: counter + 1,
          coin: x.coinName,
          price: null,
          amount: x.coinAmount,
          total: null,
        };
        counter++;
        portfolio.push(list);
      });
    })
    .catch((err) => console.log(err));

  console.log("portfolio");
  console.log(portfolio);

  return portfolio;
}

async function getCoin(portfolio) {
  let coins = [];

  await axios.get("http://localhost:8081/api/coin").then((res) => {
    coins = portfolio.map((x) => {
      const coin = res.data.find((d) => d.coinName === x.coin);
      console.log(coin);

      if (coin) {
        x.price = coin.coinPrice + " $";
        x.total = coin.coinPrice * x.amount + " $";
      }

      return x;
    });
  });

  console.log("coins");
  console.log(coins);

  return coins;
}

function updatePortfolio(token, setLoading, setPortfolio) {
  setLoading(true);

  const portfolioCB = async () => {
    return await getCoin(await getPortfolio(token));
  };

  portfolioCB().then((finalList) => {
    setPortfolio(finalList);
    setLoading(false);

    console.log(finalList);
  });
}

function UserPage() {
  const [state, dispatch] = useContext(Context);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const portfolioCB = async () => {
      return await getCoin(await getPortfolio(state.auth.user.token));
    };

    portfolioCB().then((finalList) => {
      setPortfolio(finalList);
      setLoading(false);

      console.log(finalList);
    });
  }, []);

  const handleDelete = async (value) => {
    const coin = {
      ownerId: state.auth.user.id,
      name: value.coin,
    };

    console.log(value);

    await axios({
      method: "delete",
      url: "http://localhost:8081/api/portfolio/delete",
      data: coin,
      headers: {
        "Content-Type": "application/json",
        authorization: state.auth.user.token,
      },
    }).then((res) => {
      updatePortfolio(state.auth.user.token, setLoading, setPortfolio);
    });
  };

  const columns = [
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      key: "action",
      render: (coin) => (
        <Space size="middle">
          <a onClick={() => handleDelete(coin)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {loading ? "Loading" : <Table dataSource={portfolio} columns={columns} />}
    </div>
  );
}

export default UserPage;
