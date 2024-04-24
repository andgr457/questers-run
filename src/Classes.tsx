import React from 'react';
import './css/home.css'; // Import the CSS file for styling
import { CLASSES } from './entity/Constants';

const Classes: React.FC = () => {
  return (
    
        <div>
          <h1><strong>Classes</strong></h1>
          {CLASSES.map((c) => (
            <div key={c.name}>
              <img src={`img/classes/${c.imageName}`} alt={`${c.name?.toUpperCase()}`} />
              <a target="_blank" href={c.credit} rel="noreferrer">
                {c.name}
              </a>{' '}
              icon by{' '}
              <a target="_blank" href="https://icons8.com" rel="noreferrer">
                Icons8
              </a>
              {Object.getOwnPropertyNames(c).map((propertyName) => (
                <div key={propertyName}>
                  {propertyName}: {c[propertyName]}
                </div>
              ))}
            </div>
          ))}
          
        </div>
  )
}

export default Classes
