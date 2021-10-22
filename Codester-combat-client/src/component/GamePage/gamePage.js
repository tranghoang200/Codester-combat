import React, { useState, useEffect } from 'react';
import GameScreen from './gameScreen';
import {
  Row,
  Col,
  Container,
  Button,
  Image,
  Tabs,
  Tab,
  Form,
  Spinner
} from 'react-bootstrap';
import ProblemCodingSection from './problemCodingSection';
import './game.css';
// import skill1Icon from '../../img/skill1.png';
import healIcon from '../../img/HealSkill.png';
import shieldIcon from '../../img/ShieldSKill.png';
import shurikenIcon from '../../img/ShurikenSkill.png';
import skill2Icon from '../../img/Skill2Naruto.png';
import { useQuery } from '@apollo/client';
import * as champ from '../../Constant/graphql/champ';
import * as problem from '../../Constant/graphql/problem';

const GamePage = (props) => {
  const [key, setKey] = useState('input');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [champion, setChampion] = useState({});
  const [activeSkill, setActiveSkill] = useState('skill1');
  localStorage.setItem('problemID', '616e016a4a42314a260fd886');

  const { loading, error, data } = useQuery(champ.GET_CHAMP_BY_ID, {
    variables: { id: localStorage.getItem('champID') },
  });
  const [problemContent, setProblemContent] = useState({});

  const dataProblem = useQuery(problem.GET_PROBLEM_ID, {
    variables: { id: localStorage.getItem('problemID') },
  });

  console.log(props);
  useEffect(() => {
    if (loading) console.log('Loading ...');
    else if (error) console.log(error);
    else {
      console.log(data);
      setChampion(data.champById);
      if (dataProblem.loading) console.log('loading');
      else setProblemContent(dataProblem.data.problemById);
    }
  }, [dataProblem]);
  const problemID = [
    '616e016a4a42314a260fd886',
    '616e02064a42314a260fd88a',
    '616e02974a42314a260fd88e',
    '616e033e4a42314a260fd892',
  ];

  const handleClickSkill = (skill) => {
    document.getElementById(activeSkill).classList.remove('skillButtonClicked');
    document.getElementById(activeSkill).classList.add('skillButton');
    document.getElementById(skill).classList.remove('skillButton');
    document.getElementById(skill).classList.add('skillButtonClicked');
    localStorage.setItem('skill', skill + ' ' + champion[skill]);
    setActiveSkill(skill);
    const index = Math.floor(Math.random() * problemID.length);
    if (problemID.length > 0) {
      localStorage.setItem('problemID', problemID[index]);
      problemID.splice(index, 1);
    }
  };

  if (dataProblem.data == undefined || problemContent == {}) {
    return <div>loading</div>;
  }
  console.log(problemContent);

  return (
    <div>
      {dataProblem.data && <GameScreen />}
      <Row style={{ height: '55vh' }}>
        <Col md={8}>
          <ProblemCodingSection
            input={input}
            setOutput={setOutput}
            problemContent={problemContent}
          />
        </Col>
        <Col md={4}>
          <div>
            <Container className='section' style={{ paddingTop: '5%' }}>
              <Row>
                <Col className='centerItem'>
                  <Button
                    variant='dark'
                    bsPrefix='btn skillButtonClicked'
                    id='skill1'
                    onClick={() => handleClickSkill('skill1')}
                  >
                    <Image src={shurikenIcon} className='iconSpacing' />
                    Skill 1
                  </Button>
                  <p>Dam: {champion.skill1}</p>
                </Col>
                <Col className='centerItem'>
                  <Button
                    variant='dark'
                    bsPrefix='btn skillButton'
                    id='skill2'
                    onClick={() => handleClickSkill('skill2')}
                  >
                    <Image src={skill2Icon} className='iconSpacing' />
                    Skill 2
                  </Button>
                  <p>Dam: {champion.skill2}</p>
                </Col>
              </Row>
              <Row>
                <Col className='centerItem'>
                  <Button
                    variant='dark'
                    bsPrefix='btn skillButton'
                    id='heal'
                    onClick={() => handleClickSkill('heal')}
                  >
                    <Image src={healIcon} className='iconSpacing' />
                    Heal
                  </Button>
                  <p>+{champion.heal} HP</p>
                </Col>
                <Col className='centerItem'>
                  <Button
                    variant='dark'
                    bsPrefix='btn skillButton'
                    id='shield'
                    onClick={() => handleClickSkill('shield')}
                  >
                    <Image src={shieldIcon} className='iconSpacing' />
                    Shield
                  </Button>
                  <p>-{champion.shield} Dam</p>
                </Col>
              </Row>
            </Container>
          </div>
          <div className='section' style={{ height: '10%' }}>
            <Tabs
              id='controlled-tab-example'
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className='mb-3'
            >
              <Tab eventKey='input' title='Input'>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Tab>
              <Tab eventKey='output' title='Output'>
                {/* {output} */}
                <div style={{backgroundColor: '#1E1E1E', height: '25vh'}}>
                  {/* <Spinner as='span' animation='border' size='sm' role='status' />  */}
                  All test cases passed
                </div>
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GamePage;
