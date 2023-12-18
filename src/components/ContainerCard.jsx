import React, { useContext, useState, useEffect, useRef } from "react";
import { Container, Row, Form } from "react-bootstrap";
import { MarvelContext } from "../context/MarvelContext";
import CharacterCard from "./CharacterCard";
import ErrorComponent from "./ErrorComponent";
import loadingImg  from "../assets/loading.gif"
const ContainerCard = () => {

  const { characters, getCharacters, loading, error, lastCharacterRef } = useContext(MarvelContext);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollPosition = useRef(window.scrollY);

  const onSearch = (text) => {
    setSearchTerm(text);
    getCharacters(searchTerm);
  };

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, scrollPosition.current);
    }
  }, [loading]);

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
      {error && <ErrorComponent />}
      <Container className="p-3 rounded-4 card-container my-3">
          <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center g-3">
            {characters.map((character, i) => {
              if (characters.length === i + 1) {
                return <CharacterCard ref={lastCharacterRef} key={i} {...character} />;
              } else {
                return <CharacterCard key={i} {...character} />;
              }
            })}

            {loading && <img src={loadingImg} alt="loading" />}
          </Row>
      </Container>
    </>
  );
};

export default ContainerCard;
