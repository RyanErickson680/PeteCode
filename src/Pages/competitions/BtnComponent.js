import RandomProblemsList from '../randomProblem';
import React from 'react';

function BtnComponent(props) {
  return (
    <div>
        <a id="random-link" href={"https://leetcode.com/problems/shortest-path-visiting-all-nodes/?envType=daily-question&envId=2023-09-17"} target="_blank">
          <button className="stopwatch-btn stopwatch-btn-gre" onClick={props.start}>
            Start
          </button>
        </a>

      {props.status === 1 ? (
        <div>
          <button className="stopwatch-btn stopwatch-btn-red" onClick={props.stop}>
            Stop
          </button>
        </div>
      ) : null}
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
