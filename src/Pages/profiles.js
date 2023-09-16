import React, { useEffect, useState } from 'react';
import './styles.css'

export default function Profiles({ Leaderboard }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data for each user in the leaderboard
    Promise.all(
      Leaderboard.map(async (value) => {
        const data = await GetData(value.name);
        return {
          name: value.name,
          solved: data,
        };
      })
    ).then((userArray) => {
      setUserData(userArray);
    });
  }, [Leaderboard]);

  return (
    <div id="profile">
      {userData.map((user, index) => (
        <div className="flex" key={index}>
          <div className="item">
            <h3 className="text-dark">{user.name}</h3>
          </div>
          <div className="item">
            <span>{user.solved}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

async function GetData() {
    
    // Define the endpoint and headers
    const url = "/graphql";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
    };
  
    // Define the query and variables
    const username = "okm30";
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
  
        // Format and print output
        const output = `
          The User: ${username}
          solved ${totalSolved} problems. The category count is:
          Easy: ${easySolved}
          Medium: ${mediumSolved}
          Hard: ${hardSolved}
        `;
  
        return (totalSolved);
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the function to make the GraphQL request
  GetData();
  
  
