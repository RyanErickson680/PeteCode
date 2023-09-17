import React, {useState} from 'react';
import DisplayComponent from './DisplayComponent';
import BtnComponent from './BtnComponent';
import './competitions.css';
import HackTimer from "./HackTimer";
import { addTime } from '../../auth/firebase';


function Competitions() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    if(updatedH == 0 && updatedM == 0){
      addTime(updatedS + " seconds ")
    }
    else if(updatedH == 0){
      addTime(updatedM + " minutes " + updatedS + " seconds ")
    }
    else{
      addTime(updatedH + " hours " + updatedM + " minutes " + updatedS + " seconds ")
    }
    

    clearInterval(interv);
    setStatus(2);
    
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  async function getFinalTime () {
    return (
        "0" + updatedH + ":0" + updatedM + ":0" + updatedS + ":0" + updatedMs
    );
  }

  const resume = () => start();
  
  return (
    <body class="competition">
    <div className="main-section">
     <div className="clock-holder">
          <div className="stopwatch">
               <h1>Daily Competition!</h1>
               <h4>Click start to begin the timer and stop once it's solved</h4>
               <DisplayComponent time={time}/>
               <BtnComponent status={status} stop={stop} start={start}/>
          </div>
     </div>
    </div>
    </body>
  );
}

export default Competitions;