import React, { useEffect, useState } from 'react';
import RandomProblemsList from '../randomProblem'
import GetData from "../board.js"
import getFinalTime from "./competitions.js";
import { stop, Competitions } from "./competitions.js";

let problemOfTheDay = "https://leetcode.com/problems/shortest-path-visiting-all-nodes/?envType=daily-question&envId=2023-09-17"

function BtnComponent(props) {
    return (
    <div>
        <a id = "random-link" href = {problemOfTheDay} target="_blank" rel="noreferrer">
          <button className="stopwatch-btn stopwatch-btn-gre" onClick={props.start}>Start</button> 
        </a>

      {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red"
                  onClick={() => {
                    props.stop();
                    
                    checkSolved(problemOfTheDay, GetData().recentSubmissionList);}}>Stop</button>
        </div> : ""
      } */
    </div>
  );
}

function checkSolved(randomLink, recentSubmissionList) {
  if (recentSubmissionList.includes(randomLink)) {
      const finalTime = this.getFinalTime()
  } else {
    const finalTime = ""
  }
  return (
    <h1>finalTime</h1>
  );
}

export default BtnComponent;
