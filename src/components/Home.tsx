import React from 'react';
import '../css/home.css'; // Import the CSS file for styling

const Home: React.FC = () => {
  return (
    <div className="scroll-container">
      <div className="scroll">
        <div className="center-container">
          <h1>Welcome to the <strong>Quester's Run</strong> guild hall!</h1>
          <img src='img/mobs/dragon.png' alt='icons8' className="center-image" />
          <em>
            RPG clicker where you create the world.
          </em>
          
        </div>
      </div>
    </div>
  )
}

export default Home
