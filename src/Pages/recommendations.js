// recommendations.js

import React, { useState, useEffect } from 'react';
import './recommendations.css';
import axios from 'axios';
import { getUserUsername } from '../auth/firebase';
import {getAllUserUsername} from '../auth/firebase';



export default function Recommendations() {
    const [difficulty, setDifficulty] = useState(''); // set difficulty of problem
    const [topic, setTopic] = useState(''); // set topic of problem
    const [recommendations, setRecommendations] = useState([]); // recommendations based on difficulty and topic
    const [problems, setProblems] = useState([]); // array of all problems
    const [name, setName] = useState('');
    const [currentUser, setCurrentUser] = useState();


    const handleSubmission = () => {
        if (difficulty && topic) {
            const newRecommendation = { difficulty, topic };
            setRecommendations([...recommendations, newRecommendation]);
        }
    };
    const [solved, setSolved] = useState([]);


    useEffect(() => {

        const getData = async () => {
            const username = await getUserUsername()
            const data = await GetData(username);
            setSolved(data);
        };
        getData();
    }, []);

    // Fetch data for user based on who is signed in



    return (
        <div className="recommendations-container">
            <div className="problem-stats">
                <div className="problem-count">Problems Solved <br></br><span id="solved">{solved[3]}</span></div>
                <div className="difficulty-count">
                    <p>Easy: {solved[0]}</p>
                    <p>Medium: {solved[1]}</p>
                    <p>Hard: {solved[2]}</p>
                </div>
            </div>
            <div className="select-difficulty">
                <div className="section-header">1. Select the Difficulty</div>
                <div className="radio-buttons">
                    <label>
                        <input
                            type="radio"
                            value="easy"
                            checked={difficulty === 'easy'}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        Easy
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="medium"
                            checked={difficulty === 'medium'}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        Medium
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="hard"
                            checked={difficulty === 'hard'}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        Hard
                    </label>
                </div>
            </div>
            <div className="select-topic">
                <div className="section-header">2. Select the Topic</div>
                <div className="topic-dropdown">
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    >
                        <option value="">Select a topic...</option>
                        <option value="Array">Array</option>
                        <option value="String">String</option>
                        <option value="Hash Table">Hash Table</option>
                        <option value="Math">Math</option>
                        <option value="Dynamic Programming">Dynamic Programming</option>
                    </select>
                    <button onClick={handleSubmission}>Submit</button>
                </div>
            </div>
            <div className="recommendation-list">
                {recommendations.map((rec, index) => (
                    <div key={index} className="recommendation">
                        <p>Difficulty: {rec.difficulty}</p>
                        <p>Topic: {rec.topic}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

async function GetData(name) {

    // Define the endpoint and headers
    const url = "/graphql";
    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
    };

    // Define the query and variables
    const username = name;
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

            return ([easySolved, mediumSolved, hardSolved, totalSolved]);
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}

// Call the function to make the GraphQL request
GetData();

