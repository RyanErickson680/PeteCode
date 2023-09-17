import React, { useEffect, useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';
import getFinalTime from "./competitions/competitions";
import { getUserUsername } from '../auth/firebase';
import {getAllUserUsername} from '../auth/firebase'
import './leaderboard.css';

export default function POTDBoard() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      // Fetch data for each user in the leaderboard
      async function fetchData() {
        const usernames = await getAllUserUsername();
        const userArray = await Promise.all(
          usernames.map(async (username) => {
            return {
              name: username,
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
        <div class='label'>
          <div>
            Username
          </div>
          <div>
            Time
          </div>
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

