import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, FormControl } from "react-bootstrap";
import "./lobby.css";
import { useHistory } from "react-router-dom";
import * as user from "../../Constant/graphql/user";
import { useMutation } from "@apollo/client";
import { useGlobal } from '../../globalContext';

const LobbyPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const { state, dispatch } = useGlobal();

  const [clickHandler, { loading, error, data }] = useMutation(
    user.CREATE_USER, { async onCompleted(data) {
      console.log(data)
      await dispatch({ type: 'updateUserId', payload: data.userCreateOne.record["_id"] });
    }}
  );

  return (
    <div className="lobby-container">
      <h1 style={{ fontSize: "6rem" }}>CODESTER COMBAT</h1>
      <FormControl
        style={{ width: "40%" }}
        placeholder="Player's username"
        aria-label="Player's username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <ButtonGroup bsPrefix="btn-group button-group-lobby">
        {username !== "" && (
          <Button
            bsPrefix="btn button-lobby mt-5"
            onClick={() => {
              clickHandler({
                variables: { name: username, rank: "Beginner" },
              });
              setTimeout(() => {
                history.push(`/matching`);
              }, 2000)
              
            }}
          >
            Play
          </Button>
        )}

        {username === "" && (
          <Button bsPrefix="btn button-lobby mt-5" disabled>
            Play
          </Button>
        )}
        <Button bsPrefix="btn button-lobby mt-5">Leaderboard</Button>
      </ButtonGroup>
    </div>
  );
};

export default LobbyPage;
