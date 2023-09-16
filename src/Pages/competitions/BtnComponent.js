import React from 'react';

function BtnComponent(props) {
  return (
    <div>
        
        <a href="https://leetcode.com/problems/two-sum/description/" target="_blank">
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