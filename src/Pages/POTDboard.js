import React, { useEffect, useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';
import { getAllTimes, getUserUsername } from '../auth/firebase';
import { getAllUserUsername } from '../auth/firebase'
import './leaderboard.css';
import { problemIncomplete } from '../auth/firebase';
import { async } from '@firebase/util';

export default function POTDBoard() {
  const [usernames, setUsernames] = useState([]);
  const [userData, setUserData] = useState([]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fecthData() {
    const usernames = await getAllTimes();
    for (let i = 0; i < 2; i++) {
      await sleep(i * 1000);
    }
    setUsernames(usernames)
    return usernames;

  }



  async function logData() {

    const array = await fecthData();
    const userArray = array.map((username) => ({
      name: username.key,
      solved: username.val,
    }));

    console.log(userArray)

    setUserData(userArray);
    console.log(userData)
    return userArray
  }
  useEffect(() => {
    logData();
  }, [])
  /*
    useEffect(() => {
      // Fetch data for each user in the leaderboard
      async function fetchData() {
        const usernames = await getAllTimes();
        
        const userArray = await Promise.all(
          usernames.map(async(usernames,index) => {
  
            return {
              name: usernames[index].key,
              time: usernames[index].value,
            };
          })
        );
        setUserData(userArray);
      }
    
      fetchData();
    }, []);*/
  return (
    <div className="board">
      <h1 className='leaderboard'>Leaderboard</h1>

      <div className="duration">
        All-Time
      </div>
      <div class='label'>
        <div>
          Username
        </div>
        <div>
          Time
        </div>
      </div>

      <Profiles Ordered={between(userData)}></Profiles>
      <button id="tryAgain" onClick={() => problemIncomplete()}>
        Try Again
      </button>

    </div>
  )
}



function between(data) {
  // sort with asending order
  return data.sort((a, b) => {
    if (a.time === b.time) {
      return b.time - a.time;
    } else {
      return b.time - a.time;
    }
  })

}

