import React, {useState, useEffect} from 'react';
import background from '../../img/background_pick_char.png';
import {
  Image, Row, Col, ButtonGroup, Button
} from 'react-bootstrap';

import headerImageDefeat from '../../img/Defeat.png';
import headerImageVictory from '../../img/Victory.png';
import './gameResult.css';
import { useQuery } from '@apollo/client';
import * as user from '../../Constant/graphql/user';

const headerImage = headerImageVictory;
const result = "LOSE";
let borderColor = '';
if (result === "LOSE") {
  borderColor = "3px solid violet";
}
else {
  borderColor = "3px solid yellow";
}

const GameResult = (props) => { 
  const { loading, error, data } = useQuery(user.GET_ALL_USERS);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (loading) console.log('Loading ...');
    else if (error) console.log(error);
    else {
      console.log(data);
      setUserList(data.userMany);
    }
  }, [data])
  const renderUser = () => {
    return userList.map((item, index) => {
      return <Row className="leaderboard-row">
      <Col>{index+1}</Col>
      <Col>{item.name}</Col>
      <Col>{item.rank.name}</Col>
      <Col>{item.points}</Col>
    </Row>
    })
  }


  return (<div className="cardBox" style={{backgroundImage: `url(${background})`}}>
    <Image className="victoryImg" src={headerImage} />
    <div className="leaderboard-container" style={{border: `${borderColor}`}}>
      <Row className="leaderboard-row">
        <Col>Rank</Col>
        <Col>Name</Col>
        <Col>Tier</Col>
        <Col>Point</Col>
      </Row>
      {renderUser()}
    </div>
    <ButtonGroup className="buttonContainer">
      <Button className="playAgain">Play Again</Button>
      <Button className="exit">Exit</Button>
    </ButtonGroup>
  </div>)
}

export default GameResult;