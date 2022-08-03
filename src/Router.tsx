import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

interface IthemeChange {
  toggleTheme: () => void;
  changeTheme: boolean;
}

function Router({ toggleTheme, changeTheme }: IthemeChange) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins toggleTheme={toggleTheme} />}></Route>
        <Route path="/:coinId" element={<Coin />}>
          <Route path={`price`} element={<Price />}></Route>
          <Route
            path={`chart`}
            element={<Chart changeTheme={changeTheme} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
