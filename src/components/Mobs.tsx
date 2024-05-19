import React from 'react';
import '../css/home.css'; // Import the CSS file for styling
import { MOBS } from '../entity/Constants';
import TableList from './TableList';

const Mobs: React.FC = () => {
  return (
    
        <TableList imgPath='img/mobs/' objects={MOBS} title='Mobs'></TableList>
  )
}

export default Mobs
