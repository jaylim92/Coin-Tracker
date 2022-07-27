import React, { useState } from "react";
import { Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  state: {
    name: string;
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = (useParams() as unknown) as RouteParams;
  const { state } = useLocation() as RouteState;
  return (
    <Container>
      <Header>
        <Title>{state.name || "Loading.."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
