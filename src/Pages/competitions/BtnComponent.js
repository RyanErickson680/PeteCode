import React from 'react';

function getRandomLeetCodeProblemLink() {
  // Define the range of problem IDs on LeetCode (adjust this as needed)
  const minProblemID = 1;  // Minimum problem ID
  const maxProblemID = 3000;  // Maximum problem ID (you can increase this if more problems are available)

  // Generate a random problem ID within the defined range
  const randomProblemID = Math.floor(Math.random() * (maxProblemID - minProblemID + 1)) + minProblemID;

  // Construct the URL for the random problem
  const leetCodeURL = `https://leetcode.com/problems/problem-name/`.replace("problem-name", `problem-${randomProblemID}`);

  return leetCodeURL;
}

const randomLeetCodeProblemLink = getRandomLeetCodeProblemLink();

function BtnComponent(props) {
  return (
    <div>
        
        <a href = "" target="_blank">
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