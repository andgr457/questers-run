import { useEffect } from 'react';
import { CLASSES, MOBS } from './entity/Constants';

export default function Credits() {
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      window.scrollBy(0, -10); // Adjust scroll speed as needed
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      }
    }, 50); // Adjust scroll interval as needed

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, []);

  return (
    <>
      <h1>Credits</h1>
      <h1>Classes</h1>
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
      <hr />
      <h1>Mobs</h1>
      {MOBS.map((m) => (
        <div key={m.name}>
          <p>{m.name}</p>
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
      <h1>Items</h1>
    </>
  );
}
