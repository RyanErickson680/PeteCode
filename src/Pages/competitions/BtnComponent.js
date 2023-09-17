import React from 'react';
import { Board } from "../board.js"
import getFinalTime from "./competitions.js";
import { stop, Competitions } from "./competitions.js";
import { getUserUsername } from '../../auth/firebase';
import { addTime } from '../../auth/firebase';


let potd_link = "https://leetcode.com/problems/shortest-path-visiting-all-nodes/?envType=daily-question&envId=2023-09-17"
let problemOfTheDay = "Shortest Path Visiting All Nodes"
function BtnComponent(props) {
  return (
    <div>
      <a id="random-link" href={potd_link} target="_blank" rel="noreferrer">
        <button className="stopwatch-btn stopwatch-btn-gre" onClick={props.start}>
          Start
        </button>
      </a>

      {props.status === 1 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={async () => {
              props.stop();
              const result = await checkSolved(problemOfTheDay);
              console.log(result);
            }}
          >
            Stop
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
const checkSolved = async (problemOfTheDay) => {
  try {
    const temp_username = await getUserUsername();
    const response = await GetData(temp_username);
    if (response) {
      const recentSubmissionList = response.recentSubmissionList;
      const titles = recentSubmissionList.title;
      console.log(titles);
      if (titles.includes(problemOfTheDay)) {
        const finalTime = getFinalTime()
        console.log(finalTime)
        await addTime(finalTime)
        return "Solved";
      } else {
        return "Not Solved";
      }
    } else {
      return "Data not available"; // Handle the case where data is not available
    }
  } catch (error) {
    console.error(error);
    return "Error"; // Handle the error gracefully
  }}
  async function GetData(currname) {
    
    // Define the endpoint and headers
    const url = "/graphql";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
    };
  
    // Define the query and variables
    const username = currname;
    const data = {
      query: `
        query userProblemsSolved($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            problemsSolvedBeatsStats {
              difficulty
              percentage
            }
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
          recentSubmissionList(username: $username) {
            title
          }
        }
      `,
      variables: {
        username: username,
      },
    };
  
    try {
      // Make the POST request
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Extract necessary details
        const totalSolved = responseData.data.matchedUser.submitStatsGlobal.acSubmissionNum.find(
          (item) => item.difficulty === "All"
        ).count;
        const easySolved = responseData.data.matchedUser.submitStatsGlobal.acSubmissionNum.find(
          (item) => item.difficulty === "Easy"
        ).count;
        const mediumSolved = responseData.data.matchedUser.submitStatsGlobal.acSubmissionNum.find(
          (item) => item.difficulty === "Medium"
        ).count;
        const hardSolved = responseData.data.matchedUser.submitStatsGlobal.acSubmissionNum.find(
          (item) => item.difficulty === "Hard"
        ).count;
        const recentSubmissionList = responseData.data.recentSubmissionList;
        const name_solved = recentSubmissionList.map(item => item.title);

        // Format and print output
        return (name_solved);
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      // Make the POST request
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Return the entire response object
        return responseData;
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

export default BtnComponent;
