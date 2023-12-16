import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { MarvelContext } from "../context/MarvelContext";
import loadingImg from "./../assets/loading.gif";
import ErrorComponent from "../components/ErrorComponent";

const CharacterDetail = () => {
  const {
    details,
    loading,
    getCharacterDetails,
    getCharacterComics,
    comics,
    error,
  } = useContext(MarvelContext);

  const { id } = useParams();
  const { name, description, thumbnail } = details;

  useEffect(() => {
    getCharacterDetails(id);
    getCharacterComics(id);
  }, []);

  if (error) {
    return (
      <Container className="py-5 text-center">
        <ErrorComponent />
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: "768px" }} className="py-5">
      <Container className="px-10">
        <Card>
          {loading ? (
            <div className="mx-auto my-auto " role="status">
              <img src={loadingImg} alt="loading" />
            </div>
          ) : (
            <Card.Img
              variant="top"
              className="p-5 rounded"
              src={
                thumbnail?.path
                  ? thumbnail.path + "/landscape_incredible.jpg"
                  : ""
              }
              alt="poster"
            />
          )}
          <Card.Body>
            <div>
              <Card.Title className="display-1 p-2 fw-bold">{name}</Card.Title>
              <Card.Text className="h4 p-4">{description}</Card.Text>
            </div>
            <ListGroup>
              <ListGroup.Item>
                <Link data-test="goBack" to={"/"}>Go Back</Link>
              </ListGroup.Item>
            </ListGroup>
            <div className="text-center">
              <h2 className="mt-5">Character's Comics</h2>
              <ListGroup className="mt-5">
                {comics.map((comic) => (
                  <ListGroup.Item
                    className="d-flex flex-row align-items-center"
                    key={comic.id}
                  >
                    <img
                      className="rounded"
                      src={comic?.thumbnail.path + "/portrait_medium.jpg"}
                      alt={comic?.title}
                    />
                    <h4 className="ps-4">{comic?.title}</h4>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default CharacterDetail;
