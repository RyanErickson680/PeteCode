import React, { useEffect, useState } from 'react';
import RandomProblemsList from '../randomProblem'
import GetData from "../board.js"
import getFinalTime from "./competitions.js";

function BtnComponent(props) {

  const [randomLink, setRandomLink] = useState('');

  useEffect(() => {
    async function fetchRandomLink() {
      const links = await RandomProblemsList(1, "", 1);
      if (links && links.length > 0) {
        setRandomLink(links);
      }
    }

    fetchRandomLink();
  }, []);
  return (
    <div>
        <a id = "random-link" href={randomLink} target="_blank">
          <button className="stopwatch-btn stopwatch-btn-gre" onClick={props.start}>Start</button> 
        </a>
      
      {/* {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red"
                  onClick={() => {
                    props.stop();
                    checkSolved(randomLink, GetData().recentSubmissionList);}}>Stop</button>
        </div> : ""
      } */}

     
     
    </div>
  );
}

// function checkSolved(randomLink, recentSubmissionList) {
//   if (recentSubmissionList.includes(randomLink)) {
//       const finalTime = getFinalTime()
//   } else {
//     const finalTime = ""
//   }

//   return (
//     <h1>finalTime</h1>
//   );
// }

export default BtnComponent;