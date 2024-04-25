import React from 'react';
import './css/home.css'; // Import the CSS file for styling
import { CLASSES } from './entity/Constants';

const Classes: React.FC = () => {
  return (
    
        <div className='pad-10'>
          <div className='text-xl text-center'><strong>Classes</strong></div>
          {CLASSES.map((c) => (
            <div key={c.name} className='pad-10 text-center align-middle'>
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
                  {propertyName.toUpperCase()}: <br/><strong>{c[propertyName]}</strong>
                  <br/>
                  <br/>
                </div>
              ))}
              <hr/>
            </div>
          ))}
          
        </div>
  )
}

export default Classes
