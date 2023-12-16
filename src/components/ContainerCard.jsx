import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CharacterCard from "./CharacterCard";
import { MarvelContext } from "../context/MarvelContext";
import loadingImg from "./../assets/loading.gif";
import ErrorComponent from "./ErrorComponent";


const ContainerCard = () => {
  const { characters, getCharacters, loading, error } = useContext(MarvelContext);
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (text) => {
    setSearchTerm(text);
    getCharacters(searchTerm);
    // console.log(characters);
  };
  
  if (error) {
    return (
      <Container className="py-5 text-center">
        <ErrorComponent />
      </Container>
    );
  }

  return (
    <>
      <Form.Control
        type="search"
        placeholder="Search characters..."
        onChange={(e) => onSearch(e.target.value)}
        value={searchTerm}
        autoFocus
      />
      {error && <ErrorComponent/>}
      <Container className="p-3 rounded-4 card-container my-3">
        {loading ? (
          <div className="mt-5" role="status">
            <img src={loadingImg} alt="loading" />
          </div>
        ) : (
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            className="justify-content-center g-3"
          >
            {characters.map((character, i) => (
              <CharacterCard key={i} {...character} />
            ))}
          </Row>
        )}
   
      </Container>
    </>
  );
};

export default ContainerCard;
