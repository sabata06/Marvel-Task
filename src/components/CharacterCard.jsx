import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const CharacterCard = (character) => {
  let navigate = useNavigate();
  const id = character.id

  return (
    <Col>
      <Card
        onClick={() => navigate("/details/" + id)}
        className="character-card"
        role="button"
      >
        <Card.Img
          variant="top"
          src={character.thumbnail.path + "/portrait_xlarge.jpg"}
          height="350px"
          alt={character.name}
        />
        <Card.Footer className="bg-white">
          <Card.Title>{character.name}</Card.Title>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CharacterCard;
