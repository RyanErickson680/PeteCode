import React from 'react';
import './styles.css';
import crown from '../img/crown.png';

export default function Profiles({ Ordered }) {
  return (
    <div id="profile">
      {Ordered.map((user, index) => (
        <><div className="flex" key={index}>
          {index === 0 && (
            <div className="item">
              
              <h3 className="text-dark">{user.name}</h3>
              <img src={crown} class="crown"></img>
            </div>
          )}
          {index != 0 && (
            <div className="item">
            <h3 className="text-dark">{user.name}</h3>
          </div>
          )}
          
          <div className="item">
            <span className='item1'>{user.solved}</span>
          </div>
        </div><hr class="line" /></>
      ))}
    </div>
  );
}
  
