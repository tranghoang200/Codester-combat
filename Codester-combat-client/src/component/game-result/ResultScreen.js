import React from "react";
import {useState} from 'react';
import './ResultScreen.css';

let resultText = '';
let theColor = '';
const result = "WIN";
if (result === "WIN") {
    theColor = "cyan";
    resultText = "Victory";
}
else {
    resultText = "Defeat";
    theColor = 'red';
}

function ResultScreen(props) {

    return <div className="resultScreen">
        <h1 className="resultText"
            style = {{color: `${theColor}`}}>{resultText}
        </h1>
    </div>
}

export default ResultScreen;