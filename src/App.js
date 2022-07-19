import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const [selected, setSelected] = useState(1);
  const [dollor, setDollor] = useState(1);

  const onChange = (event) => {
    setSelected(event.target.value);
  };
  const amount = (event) => {
    setDollor(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoin(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Coin Tracker!</h1>
      {loading ? (
        <h1>"Loading"</h1>
      ) : (
        <select onChange={onChange}>
          {coin.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
      <hr />
      <label htmlFor="buy">Want buy</label>
      <input id="buy" type="placeholder" onChange={amount}></input>
      <hr />
      {<h3>You can buy {dollor / selected}</h3>}
    </div>
  );
}

export default App;
