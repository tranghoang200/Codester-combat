import React, { useState, useEffect } from 'react';
import './MatchingScreen.css';
import { LobbyClient } from 'boardgame.io/client';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import * as pool from '../../Constant/graphql/pool';
import { useGlobal } from '../../globalContext';

let i = 0;

function MatchingScreen() {
  const { state, dispatch } = useGlobal();
  const [poolId, setPoolId] = useState('');
  console.log(state);

  const history = useHistory();
  const [pools, setPools] = useState([]);
  const [createPool, { loading: loadingUpdate, error: errorUpdate, data: dataUpdate}] = useMutation(
    pool.UPDATE_POOL, {
      onCompleted(data) {
        console.log(data)
        setPoolId(data);
      }
    }
  );

  const { loading, error, data } = useQuery(pool.GET_POOL);

  // if(data) {
  //   const { loadingUpdate, errorUpdate, dataUpdate } = useQuery(pool.UPDATE_POOL);
  // }

  useEffect(() => {
      if (loading) console.log('Loading ...');
      else if (error) console.log(error);
      else {
        setPools(data.poolOne);
      }
  }, [pools]);

  console.log(state)

  useEffect(() => {
    if(i > 0) {
      createPool({
        variables: {
          id: '616d579f86239778e0c69e3b',
          record: {},
          user: state.userId,
        },
      })
      i -= 1
    }
    
  }, []);

  const createRoom = async () => {
    const users = pools.users;
    console.log(users);
    if (users && users.length == 2) {
      dispatch({ type: 'updateUserId', payload:  users[0]});
      dispatch({ type: 'updateUser2Id', payload:  users[1]});
    }

    const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' });
    const games = await lobbyClient.listGames();
    // console.log(games);
    const { matchID } = await lobbyClient.createMatch(games[0], {
      numPlayers: 2,
    });
    localStorage.setItem('matchID', matchID);
    setTimeout(() => {
      history.push(`/player/${matchID}`);
    }, 5000);
  };

  createRoom();

  return (
    <div className='matchingScreen'>
      <div className='night'>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
      </div>
      <div className='matchingText'>
        <div>M</div>
        <div>a</div>
        <div>t</div>
        <div>c</div>
        <div>h</div>
        <div>i</div>
        <div>n</div>
        <div>g</div>
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </div>
    </div>
  );
}

export default MatchingScreen;
