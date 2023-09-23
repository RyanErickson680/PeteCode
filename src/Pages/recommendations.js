// recommendations.js

import React, { useState, useEffect } from 'react';
import './recommendations.css';
import axios from 'axios';
import { getUserUsername } from '../auth/firebase';
import { getAllUserUsername } from '../auth/firebase';
import RandomProblemsList from './randomProblem';




export default function Recommendations() {
    const [difficulty, setDifficulty] = useState(''); // set difficulty of problem
    const [topic, setTopic] = useState(''); // set topic of problem
    const [recommendations, setRecommendations] = useState([]); // recommendations based on difficulty and topic
    const [problems, setProblems] = useState([]); // array of all problems
    const [name, setName] = useState('');
    const [currentUser, setCurrentUser] = useState();

    const [randomLink, setRandomLink] = useState('');

    const url = 'https://leetcode.com/problems/';


    const handleSubmission = () => {
        if (difficulty && topic) {
                        const newRecommendation = { difficulty, topic, randomLink };
            setRecommendations([...recommendations, newRecommendation]);
        fetchRandomLink();
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


    async function fetchRandomLink() {
        var difNum;
        switch (difficulty) {
            case 'easy':
                difNum = 1;
                break;
            case 'medium':
                difNum = 2;
                break;
            case 'hard':
                difNum = 3;
                break;
            default:
                difNum = 1;
        }
        var links = await RandomProblemsList(difNum, topic, 1);
        if (links) {
            setRandomLink(links);
        }
    }


    return (
        <div className="recommendations-container">
            <div className="problem-stats">
                <div className="problem-count">Problems Solved <br></br><span id="solved">{solved[3]}</span></div>
                <div className="difficulty-count">
                    <p id="easy">Easy<br></br><span className="solved">{solved[0]}</span>  <span className="outOf"> / {solved[3]}</span></p>
                    <p id="medium">Medium<br></br><span className="solved">{solved[1]}</span> <span className="outOf"> / {solved[3]}</span></p>
                    <p id="hard">Hard<br></br><span className="solved">{solved[2]}</span> <span className="outOf"> / {solved[3]}</span></p>
                </div>
            </div>
            <div className="select-difficulty">
                <div className="section-header">1. Select the Difficulty</div>
                <div className="radio-buttons">
                    <li>

                        <input
                            type="radio"
                            value="easy"
                            checked={difficulty === 'easy'}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <label>
                            Easy
                        </label>
                    </li>
                    <li>

                        <input
                            type="radio"
                            value="medium"
                            checked={difficulty === 'medium'}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <label>
                            Medium
                        </label>
                    </li>
                    <li>

                        <input
                            type="radio"
                            value="hard"
                            checked={difficulty === 'hard'}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <label>
                            Hard
                        </label>
                    </li>
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
                        <option value="Hash">Hash Table</option>
                        <option value="Recursion">Recursion</option>
                        <option value="Linked">Linked Lists</option>
                        <option value="Tree">Binary Trees</option>

                    </select>
                    <button id="button" onClick={handleSubmission}>Submit</button>
                </div>
            </div>
            <div className="recommendation-list">
                {recommendations.map((rec, index) => (
                    <div key={index} className="recommendation">
                        <p>Difficulty: {rec.difficulty}</p>
                        <a href={url + rec.randomLink}>{rec.randomLink}: </a>
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
        "Content-Type": "application/json"//,
        //"User-Agent": "Mozilla/5.0",
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
        const response = await axios.post(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });
       // const response = await fetch(url, {
       //    method: "POST",
       //     headers: headers,
       //     body: JSON.stringify(data),
       // });

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

