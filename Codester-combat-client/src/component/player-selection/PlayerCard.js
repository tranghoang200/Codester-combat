import React from 'react';
import {Card, Col, Button} from 'react-bootstrap';
import './PlayerCard.css';
import {useHistory} from 'react-router-dom';

function PlayerCard(props) {
  const history = useHistory();
  const chooseHandler = (id) => {
    localStorage.setItem('champID', id);
    history.push(`/game/${localStorage.getItem('matchID')}`);
  };

  return (
    <Col className="cardContainer">
      <Card className="playerCard">
        <div
          className="imgContainer"
          style={{
            backgroundColor: `${props.backgroundColor}`,
            border: `${props.border}`,
            boxShadow: `${props.boxShadow}`,
          }}
        >
          <Card.Img className="cardImg" variant="top" src={props.src} />
        </div>
        <Card.Body className="cardBody">
          <Card.Title>{props.name}</Card.Title>
          <Card.Text style={{textAlign: 'left'}}>
            <p className="skill">Dmg Skill 1: {props.skill1}</p>
            <p className="skill">Dmg Skill 2: {props.skill2}</p>
            <p className="skill">Heal: {props.heal}</p>
            <p className="skill">Shield: {props.shield}</p>
          </Card.Text>
          <Button
            bsPrefix="btn chooseButton"
            variant="primary"
            onClick={() => chooseHandler(props.id)}
          >
            Choose
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PlayerCard;
