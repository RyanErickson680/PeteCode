import React, { useEffect, useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';
import getFinalTime from "./competitions/competitions";
import { getUserUsername } from '../auth/firebase';
import {getAllUserUsername} from '../auth/firebase'

export default function Board() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      // Fetch data for each user in the leaderboard
      async function fetchData() {
        const usernames = await getAllUserUsername();
        const userArray = await Promise.all(
          usernames.map(async (username) => {
            const data = await GetData(username);
            return {
              name: username,
              solved: data,
            };
          })
        );
        setUserData(userArray);
      }
    
      fetchData();
    }, []);
  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <div className="duration">
            All-Time
        </div>

        <Profiles Ordered={between(userData)}></Profiles>

    </div>
  )
}



function between(data){
    // sort with asending order
    return data.sort((a, b) => {
        if ( a.solved === b.solved){
            return b.solved - a.solved;
        } else{
            return b.solved - a.solved;
        }
    })

}
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
        console.log(name_solved);
        // Format and print output
        return (totalSolved);
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
  


  