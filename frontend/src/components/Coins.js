import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Table, Tag, Space, Input } from "antd";
import { Context } from "../store";

function Coins() {
  const [state, dispatch] = useContext(Context);
  const [coinNames, setCoinNames] = useState([]);
  const [coins, getCoins] = useState([]);
  const [coinData, getCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    getAllCoins();
  }, []);

  const setAllcoinNames = async () => {
    await axios.get("http://localhost:8081/api/coin/").then((res) => {
      const _coinNames = [];
      const coinDisplay = [];
      let counter = 1;
      res.data.map((x) => {
        _coinNames.push(x.coinName);
        coinDisplay.push({
          key: counter,
          coin: x.coinName,
          price: x.coinPrice + " $",
          _24h: x.coin24h + "%",
          _7d: x.coin7d + "%",
          _30d: x.coin30d + "%",
        });
        counter++;
      });

      getCoinData(coinDisplay);
      setCoinNames(_coinNames);
    });
  };
  const getAllCoins = async () => {
    setAllcoinNames();
    const coinList = [];

    for (let i = 0; i < coinNames.length; i++) {
      let counter = 1;
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/" +
            coinNames[i] +
            "?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true"
        )
        .then((res) => {
          const asd = {
            coin: coinNames[i],
            price: res.data.market_data.current_price.usd,
            _24h: Math.round(
              res.data.market_data.price_change_percentage_24h_in_currency.usd
            ).toFixed(1),
            _7d: Math.round(
              res.data.market_data.price_change_percentage_7d_in_currency.usd
            ).toFixed(1),
            _30d: Math.round(
              res.data.market_data.price_change_percentage_30d_in_currency.usd
            ).toFixed(1),
          };

          coinList.push(asd);
        })
        .catch((err) => console.log(err));

      await axios
        .put("http://localhost:8081/api/coin/update", coinList[i])
        .then((res) => {
          console.log("updated");
        });
    }
    setLoading(false);

    getCoins(coinList);
  };

  const handleSubmit = async (value) => {
    const coin = {
      coinOwnerId: state.auth.user.id,
      coinName: value.coin,
      coinAmount: amount,
    };
    console.log(value);
    await axios({
      method: "post",
      url: "http://localhost:8081/api/portfolio/create",
      data: coin,
      headers: {
        "Content-Type": "application/json",
        authorization: state.auth.user.token,
      },
    }).then((res) => {
      console.log(res);
    });
  };
  function determineColumn(){
    if(!state.auth.user){
      return anonColumns
    } else {
      return columns
    }
  }
  const anonColumns = [
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
      title: "24h",
      dataIndex: "_24h",
      key: "_24h",
    },
    {
      title: "7d",
      dataIndex: "_7d",
      key: "_7d",
    },
    {
      title: "30d",
      dataIndex: "_30d",
      key: "_30d",
    },
  ];

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
      title: "24h",
      dataIndex: "_24h",
      key: "_24h",
    },
    {
      title: "7d",
      dataIndex: "_7d",
      key: "_7d",
    },
    {
      title: "30d",
      dataIndex: "_30d",
      key: "_30d",
    },
    {
      title: "Action",
      key: "action",
      render: (coin) => (
        <Space size="middle">
          <Input
            type="float"
            placeholder="0"
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: 100 }}
          />
          <a onClick={() => handleSubmit(coin)}>Add</a>
        </Space>
      ),
    },
  ];
  
  return (
    <div>

      {loading ? "Loading" : <Table dataSource={coinData} columns={determineColumn()} />}
    </div>
  );
}

export default Coins;
