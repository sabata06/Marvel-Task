import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const CharacterCard = (character) => {
  let navigate = useNavigate();

  return (
    <Col>
      <Card
        onClick={() => navigate("/details/" + character.id)}
        className="player-card"
        role="button"
      >
        <Card.Img
          variant="top"
          src={character.thumbnail.path + "/portrait_xlarge.jpg"}
          height="350px"
          alt={character.name}
        />
        <Card.Footer>
          <Card.Title>{character.name}</Card.Title>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CharacterCard;
