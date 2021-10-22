import React, {useEffect, useState} from 'react';
import PlayerCard from './PlayerCard';
import background from '../../img/background_pick_char.png';
import {Row} from 'react-bootstrap';
import './SelectionScreen.css';
import * as champ from '../../Constant/graphql/champ';
import {useQuery} from '@apollo/client';
import characterStyle from './CharacterList';

function SelectionScreen() {
  const [characterList, setCharacterList] = useState([]);
  const {loading, error, data} = useQuery(champ.GET_CHAMPS);

  useEffect(() => {
    if (loading) console.log('Loading ...');
    else if (error) console.log(error);
    else {
      setCharacterList(data.champMany);
      console.log(data);
    }
  }, [data]);

  return (
    <div className="cardBox" style={{backgroundImage: `url(${background})`}}>
      <Row>
        <h1 className="chooseCharText">CHOOSE YOUR CHARACTER</h1>
      </Row>
      <Row>
        {characterList.map((character, index) => {
          return (
            <PlayerCard
              src={characterStyle[index].imgSrc}
              name={character.name}
              id={character._id}
              skill1={character.skill1}
              skill2={character.skill2}
              heal={character.heal}
              shield={character.shield}
              backgroundColor={characterStyle[index].backgroundColor}
              border={characterStyle[index].border}
              boxShadow={characterStyle[index].boxShadow}
              opacity={characterStyle[index].opacity}
            />
          );
        })}
      </Row>
    </div>
  );
}

export default SelectionScreen;
