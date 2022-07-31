import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 120px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 480px;
  height: 9vh;
  background-color: #222020;
  border-radius: 15px;
`;
const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    &:first-child {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    &:last-child {
      font-size: 25px;
    }
  }
`;

const Description = styled.div`
  text-align: center;
  margin: 50px 0px;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  state: {
    name: string;
  };
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams() as unknown as RouteParams;
  const { state } = useLocation() as RouteState;
  const [coinInfo, setCoinInfo] = useState<CoinData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      setCoinInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : coinInfo?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <ContentBox>
            <Contents>
              <span>Rank:</span>
              <span>{priceInfo?.rank}</span>
            </Contents>
            <Contents>
              <span>SYMBOL:</span>
              <span>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coinInfo?.symbol.toLowerCase()}`}
                />
                {priceInfo?.symbol}
              </span>
            </Contents>
            <Contents>
              <span>Open Source:</span>
              <span>{coinInfo?.open_source ? "Yes" : "No"}</span>
            </Contents>
          </ContentBox>
          <Description>{coinInfo?.description}</Description>
          <ContentBox>
            <Contents>
              <span>Total Supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </Contents>
            <Contents>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </Contents>
          </ContentBox>
          <Routes>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
