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

const fetch = require('node-fetch'); // Make sure to install the 'node-fetch' package if you haven't already

// Define the GraphQL query
const query = `
  query questionOfToday {
    activeDailyCodingChallengeQuestion {
      date
      userStatus
      link
      question {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        hasVideoSolution
        hasSolution
        topicTags {
          name
          id
          slug
        }
      }
    }
  }
`;



// Define the GraphQL endpoint URL
const graphqlEndpoint = '/graphql'; // Replace with your GraphQL endpoint URL

// Set up the request headers
const headers = {
  'Content-Type': 'application/json',
};

// Create a JSON payload with the query
const data = {
  query,
};

// Send the GraphQL request
fetch(graphqlEndpoint, {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.error(`GraphQL request failed with status code ${response.status}`);
      return response.text();
    }
  })
  .then((result) => {
    // Extract and work with the data you need from the result
    const questionData = result.data.activeDailyCodingChallengeQuestion;
    // Now you can access specific fields like date, title, etc.
    console.log(questionData);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
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