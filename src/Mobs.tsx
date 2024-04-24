import React from 'react';
import './css/home.css'; // Import the CSS file for styling
import { MOBS } from './entity/Constants';

const Mobs: React.FC = () => {
  return (
    
        <div>
          <h1><strong>Mobs</strong></h1>
          {MOBS.map((m) => (
            <div key={m.name}>
              <img src={`img/mobs/${m.imageName}`} alt={`${m.name?.toUpperCase()}`} />
              <a target="_blank" href={m.imageName} rel="noreferrer">
                {m.name}
              </a>{' '}
              icon by{' '}
              <a target="_blank" href="https://icons8.com" rel="noreferrer">
                Icons8
              </a>
              {Object.getOwnPropertyNames(m).map((propertyName) => (
                <div key={propertyName}>
                  {propertyName}: {m[propertyName]}
                </div>
              ))}
            </div>
          ))}
          
        </div>
  )
}

export default Mobs
