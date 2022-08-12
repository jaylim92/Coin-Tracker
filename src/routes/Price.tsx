import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import { PriceData } from "./Coin";

interface PriceProps {
  infoData: PriceData;
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ContainerBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  width: 45%;
  height: 110px;
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span:first-child {
    color: ${(props) => props.theme.accentColor};
    font-weight: 700;
    margin-bottom: 10px;
  }
  :last-child {
    font-weight: 600;
  }
`;

function Price() {
  const { infoData } = useOutletContext<PriceProps>();
  return (
    <Container>
      <ContainerBox>
        <span>Before 12H</span>
        <span>{infoData.quotes.USD.percent_change_12h}%</span>
      </ContainerBox>
      <ContainerBox>
        <span>Before 1H</span>
        <span>{infoData.quotes.USD.percent_change_1h}%</span>
      </ContainerBox>
      <ContainerBox>
        <span>Before 24H</span>
        <span>{infoData.quotes.USD.percent_change_24h}%</span>
      </ContainerBox>
      <ContainerBox>
        <span>Before 6H</span>
        <span>{infoData.quotes.USD.percent_change_6h}%</span>
      </ContainerBox>
      <ContainerBox>
        <span>Before 7Days</span>
        <span>{infoData.quotes.USD.percent_change_7d}%</span>
      </ContainerBox>
      <ContainerBox>
        <span>Before 1Month</span>
        <span>{infoData.quotes.USD.percent_change_30d}%</span>
      </ContainerBox>
    </Container>
  );
}

export default Price;
