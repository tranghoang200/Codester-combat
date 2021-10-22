import { ActivePlayers } from 'boardgame.io/core';
import { useQuery, useMutation } from '@apollo/client';
import * as game from '../../Constant/graphql/game';
import * as problem from '../../Constant/graphql/problem';

const setup = {};

const GetGameSetUp = async () => {
  const { loading, error, data } = await useQuery(problem.GET_All_PROBLEMS_ID);

  const { loadingUpdate, errorUpdate, dataUpdate } = await useMutation(
    game.CREATE_GAME,
    {
      variables: {
        record: {
          player1: localStorage.getItem('player1ID'),
          player2: localStorage.getItem('player2ID'),
          rank: '616d0a49b799fe8d11303450',
          problems: data.problemMany.map((item) => item['_id']),
        },
      },
    }
  );

  const { loadingGame, errorGame, dataGame } = await useQuery(game.GET_GAME);

  if (loadingGame) console.log('Loading ...');
  else if (errorGame) console.log(errorGame);
  else {
    setup = dataGame.gameOne;
  }

  console.log(setup);
  // return <div></div>;

  //   console.log(setup);
  // return setup;

  // if (loading) console.log('Loading ...');
  //   else if (error) console.log(error);
  //   else {
  //     console.log(data);
  //     setChampion(data.champById);
  //   }
};

export const CodesterCombat = {
  // G: () => {<GetGameSetUp />; return setup},
  setup: () => ({
    player1: '616d75c43bdf7fee0e2715f4',
    player2: '616d75ea3bdf7fee0e2715f9',
    rank: '616d0a49b799fe8d11303450',
    problems: [
      '616d6e0b0ffcbe53972b5365',
      '616d6ff077641366d53fe05c',
      '616d73083fc0c875597eb866',
    ],
  }),

  G: {
    player1: '616d75c43bdf7fee0e2715f4',
    player2: '616d75ea3bdf7fee0e2715f9',
    rank: '616d0a49b799fe8d11303450',
    problems: [
      '616e016a4a42314a260fd886',
      '616e02064a42314a260fd88a',
      '616e02974a42314a260fd88e',
      '616e033e4a42314a260fd892',
    ],
  },

  ctx: {
    turn: 0,
    currentPlayer: "0",
    numPlayers: 2,
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
    activePlayers: ActivePlayers.ALL,
  },

  moves: {
    skill1: (G, ctx) => {
      document.getElementById("shuriken").classList.add("skill1-player1");
      document.getElementById("player2").classList.add("wobble_effect");
      setTimeout(() => {
        document.getElementById("shuriken").classList.remove("skill1-player1");
      }, 2000);
      setTimeout(() => {
        document.getElementById("player2").classList.remove("wobble_effect");
      }, 5000);
    },
    heal: (G, ctx, id) => {
      document.getElementById("heal1").classList.add("heal-player1");
      document.getElementById("heal2").classList.add("heal-player1");
      document.getElementById("heal3").classList.add("heal-player1");
      document.getElementById("heal4").classList.add("heal-player1");
      setTimeout(() => {
        document.getElementById("heal1").classList.remove("heal-player1");
        document.getElementById("heal2").classList.remove("heal-player1");
        document.getElementById("heal3").classList.remove("heal-player1");
        document.getElementById("heal4").classList.remove("heal-player1");
      }, 1500);
    },
    shield: (G, ctx, id) => {
      document.getElementById("shield").classList.add("shield-player1");
      setTimeout(() => {
        document.getElementById("shield").classList.remove("shield-player1");
      }, 1500);
    },
    skill2naruto: (G, ctx, id) => {
      document
        .getElementById("skill2naruto")
        .classList.add("skill2naruto-player1");
      document.getElementById("player2").classList.add("wobble_effect");

      setTimeout(() => {
        document
          .getElementById("skill2naruto")
          .classList.remove("skill2naruto-player1");
      }, 1200);
      setTimeout(() => {
        document.getElementById("player2").classList.remove("wobble_effect");
      }, 2700);
    },
    skill2lee: (G, ctx, id) => {
      if (
        document.getElementById("player1").classList !== "skill2lee-player1"
      ) {
        document.getElementById("player1").classList.add("skill2lee-player1");
        document.getElementById("player2").classList.add("wobble_effect");
      }
      setTimeout(() => {
        document
          .getElementById("player1")
          .classList.remove("skill2lee-player1");
      }, 2500);
      setTimeout(() => {
        document.getElementById("player2").classList.remove("wobble_effect");
      }, 5000);
    },
  },

  endIf: (G, ctx) => {
    // if (IsVictory(G.cells)) {
    //   return {winner: ctx.currentPlayer};
    // }
  },
};
