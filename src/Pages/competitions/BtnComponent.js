import React from 'react';
import RandomProblemsList from '../randomProblem'

let links = RandomProblemsList(-1, "Array", 1)

// Get the random LeetCode problem link
const randomLink = links[0];
const linkElement = document.getElementById("random-link");
linkElement.href = randomLink;

function BtnComponent(props) {
  return (
    <div>
        <a id = "random-link" href = "" target="_blank">
          <button className="stopwatch-btn stopwatch-btn-gre" onClick={props.start}>Start</button> 
        </a>
      
      

      {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red"
                  onClick={props.stop}>Stop</button>
        </div> : ""
      }

     
     
    </div>
  );
}

export default BtnComponent;