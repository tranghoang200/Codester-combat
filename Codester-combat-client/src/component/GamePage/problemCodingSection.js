import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import axios from 'axios';
import { isOutputType } from 'graphql';

const ProblemCodingSection = (props) => {
  const [code, setCode] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [tokenOutput, setTokenOutput] = useState('');
  const [isRunCoding, setIsRunCoding] = useState(false);

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = () => {
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/languages',
      headers: {
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': 'b8d921310dmsh06f2a740c489d7bp1d2436jsnda03abdd7f4c',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setLanguages(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const renderLanguageList = () => {
    console.log(selectedLanguage);
    return languages.map((item) => {
      const value = item.id + ' ' + item.name.toLowerCase();
      return <option value={value}>{item.name}</option>;
    });
  };

  const submitCodeHandler = (encodedInput) => {
    const encodedSourceCode = Buffer.from(code).toString('base64');
    // setIsRunCoding(true);
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': 'b8d921310dmsh06f2a740c489d7bp1d2436jsnda03abdd7f4c',
      },
      data: {
        source_code: encodedSourceCode,
        stdin: encodedInput,
        language_id: selectedLanguage.split(' ')[0],
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.token);
        setTokenOutput(response.data.token);
        getOutput();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getOutput = () => {
    console.log(tokenOutput);
    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${tokenOutput}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': 'b8d921310dmsh06f2a740c489d7bp1d2436jsnda03abdd7f4c',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        const base64ToString = JSON.parse(
          Buffer.from(response.data.stdout, 'base64').toString()
        );

        props.setOutput(base64ToString);
      })
      .catch(function (error) {
        console.error(error);
      });
    // setIsRunCoding(false);
  };

  const runCodeHandler = () => {
    const encodedInput = Buffer.from(props.input).toString('base64');
    submitCodeHandler(encodedInput);
  };

  const submitAllHandler = () => {
    const skillData = localStorage.getItem('skill').split(' ');
    console.log(skillData)
    localStorage.setItem("activeSkill", skillData[0]);
    localStorage.setItem("affect", skillData[1])
    const encodedInput = Buffer.from(
      props.problemContent.testCase.input
    ).toString('base64');
    submitCodeHandler(encodedInput);

    return props.output === props.problemContent.testCase.output;
  };

  console.log(props.problemContent);
  if (props.problemContent == null) {
    return <div>Loading ... </div>;
  }

  return (
    <Split className='split'>
      <div className='section'>{props.problemContent.content}</div>
      <div className='section' style={{ marginLeft: '10px' }}>
        <Row>
          <Col>Language</Col>
          <Col>
            <Form.Select onChange={(e) => setSelectedLanguage(e.target.value)}>
              {renderLanguageList()}
            </Form.Select>
          </Col>
        </Row>
        <Editor
          height='44vh'
          style={{ overflow: 'auto' }}
          theme='vs-dark'
          defaultLanguage={selectedLanguage.split(' ')[1]}
          onChange={(value, event) => setCode(value)}
        />
        <div style={{ float: 'right' }}>
          {!isRunCoding && (
            <Button
              variant='dark'
              bsPrefix='btn runCodeBtn'
              onClick={submitCodeHandler}
            >
              Run Code
            </Button>
          )}
          {isRunCoding && (
            <Button
              variant='dark'
              bsPrefix='btn runCodeBtn'
              onClick={submitCodeHandler}
              disabled
            >
              <Spinner as='span' animation='border' size='sm' role='status' />
              Run Code
            </Button>
          )}
          {isRunCoding && (
            <Button variant='success' disabled>
              Submit Code
            </Button>
          )}
          {!isRunCoding && (
            <Button variant='success' onClick={submitAllHandler}>
              Submit Code
            </Button>
          )}
        </div>
      </div>
    </Split>
  );
};

export default ProblemCodingSection;
