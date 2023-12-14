// import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { MarvelContext } from "../context/MarvelContext";
import loadingImg from "./../assets/loading.gif";

const CardDetail = () => {
  const { details, loading, getCharacterDetails, getCharacterComics, comics } =
    useContext(MarvelContext);
  console.log(details);
  const { id } = useParams();

  const { name, description, thumbnail } = details;

  useEffect(() => {
    getCharacterDetails(id);
    getCharacterComics(id);
  }, []);

  return (
    <Container className="py-5">
      {/* <h1 className="text-center text-black text-3xl ">{name}</h1> */}
      <Container className="px-10">
        <Card>
          {loading ? (
            <div className="mx-auto my-auto" role="status">
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
                <Link to={-1}>Go Back</Link>
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
                      src={comic.thumbnail.path + "/portrait_medium.jpg"}
                      alt={comic.title}
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

export default CardDetail;
