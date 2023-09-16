import React from 'react';
import './styles.css'

export default function Profiles({ Ordered }) {
    return (
    <div id="profile">
      {Ordered.map((user, index) => (
        <div className="flex" key={index}>
          <div className="item">
            <h3 className="text-dark">{user.name}</h3>
          </div>
          <div className="item">
            <span className='item1'>{user.solved}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

  
  
  
