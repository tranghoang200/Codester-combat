import React, {useState, useEffect} from 'react';
import backgroundGame from '../../img/backgroundImage.png';
import { Image, ProgressBar, Button } from 'react-bootstrap';
import naruto from '../../img/naruto.png';
import sakura from '../../img/sakura.png';
import shuriken from '../../img/Shuriken.png';
import heal from '../../img/Heal.png';
import shield from '../../img/Shield.png';
import skill2naruto from '../../img/Skill2_naruto.png';
import 'animate.css';
// import skill2sakura from '../../img/Skill2_sakura.png';

const Board = (props) => {
  // onClick(id) {
  //   props.moves.clickCell(id);
  // }
  const [hp1, sethp1] = useState(100);
  const [hp2, sethp2] = useState(100);
  const [test, settest] = useState(localStorage.getItem("activeSkill"))

  useEffect(() => {
    if(localStorage.getItem("activeSkill")) {
          props.moves.skill1()
          setTimeout( () => {
            const dam = parseInt(localStorage.getItem("affect"));
          sethp2(hp1 - dam)
          }, 7000) 
        } 
        localStorage.setItem("activeSkill", '');

    // function checkUserData() {
    //   console.log(localStorage.getItem("activeSkill"))
    //   if(localStorage.getItem("activeSkill") === "skill1") {
    //     props.moves.skill1()
    //     setTimeout( () => {
    //       const dam = parseInt(localStorage.getItem("affect"));
    //     sethp2(hp1 - dam)
    //     }, 7000) 
    //   } else if (localStorage.getItem("activeSkill") === "skill2") {
    //       props.moves.skill2naruto()
    //       setTimeout( () => {
    //         const dam = parseInt(localStorage.getItem("affect"));
    //       sethp2(hp1 - dam)
    //       }, 7000) 
    //   } else {
    //     console.log("else")
    //   }
    // }
    //   localStorage.setItem("activeSkill", '');
    // settest("Default Value");

    // checkUserData();

    // window.addEventListener("storage", () => {
    //   console.log(localStorage.getItem("activeSkill"))
    //   if(localStorage.getItem("activeSkill") === "skill1") {
    //     props.moves.skill1()
    //     setTimeout( () => {
    //       const dam = parseInt(localStorage.getItem("affect"));
    //     sethp2(hp1 - dam)
    //     }, 7000) 
    //   } else if (localStorage.getItem("activeSkill") === "skill2") {
    //       props.moves.skill2naruto()
    //       setTimeout( () => {
    //         const dam = parseInt(localStorage.getItem("affect"));
    //       sethp2(hp1 - dam)
    //       }, 7000) 
    //   } else {
    //     console.log("else")
    //   }

    // });
    
  }, []);

  useEffect(() => {
    localStorage.setItem("activeSkill", '');
  }, []);

    // let winner = '';
    // if (props.ctx.gameover) {
    //   winner =
    //     props.ctx.gameover.winner !== undefined ? (
    //       <div id="winner">Winner: {props.ctx.gameover.winner}</div>
    //     ) : (
    //       <div id="winner">Draw!</div>
    //     );
    // }

    const time = '21:45'
    // const problem = props.G
    console.log(props)
    const problem = [
      '616e016a4a42314a260fd886',
      '616e02064a42314a260fd88a',
      '616e02974a42314a260fd88e',
      '616e033e4a42314a260fd892',
    ]
    const index = Math.floor(Math.random() * problem.length)
    if(problem.length > 0) {
      localStorage.setItem("problemID", problem[index])
      problem.splice(index, 1);
    }

    return (
      <div
        style={{
          backgroundImage: `url(${backgroundGame})`,
        }}
        className='gameBoard'
      >
        <div className='topButtonContainer'>
          <Button bsPrefix='btn timeButton' variant='primary'>
            {time}
          </Button>
          <Button bsPrefix='btn surrenderButton' variant='primary'>
            Surrender
          </Button>
        </div>
        <div className="progressContainer">
          <ProgressBar  variant ="success" className="progressPlayer1" now={hp1} label={`${hp1}/100`}/>
          <ProgressBar  className="progressPlayer2"  now={hp2} label={`${hp2}/100`}/>
        </div>

        <Image src={skill2naruto} className='skill2naruto' id='skill2naruto' />
        <Image src={shield} className='shield' id='shield' />
        <div className='healContainer'>
          <Image src={heal} className='heal' id='heal1' />
          <Image src={heal} className='heal' id='heal2' />
          <Image src={heal} className='heal' id='heal3' />
          <Image src={heal} className='heal' id='heal4' />
        </div>
        <Image src={naruto} className='player1' id='player1' />
        <Image src={shuriken} className='shuriken' id='shuriken' />
        <Image src={sakura} className='player2' id='player2' />
      </div>
    );
}

export default Board;
