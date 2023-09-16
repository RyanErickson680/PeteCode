import React, { useEffect, useState } from 'react';
import RandomProblemsList from '../randomProblem'





function BtnComponent(props) {

  const [randomLink, setRandomLink] = useState('');

  useEffect(() => {
    console.log("getting link");
    async function fetchRandomLink() {
      const links = await RandomProblemsList(1, "Array", 1);
      if (links && links.length > 0) {
        setRandomLink(links[0]);
      }
    }

    fetchRandomLink();
  }, []);
  return (
    <div>
        <a id = "random-link" href={randomLink} target="_blank">
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