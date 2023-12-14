import React from "react";
import { Container } from "react-bootstrap";
import ContainerCard from "../components/ContainerCard";
import Header from "./../components/Header";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <Header />
      <ContainerCard />
    </Container>
  );
};

export default Home;
