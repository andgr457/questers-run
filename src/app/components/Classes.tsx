import React from 'react';
import '../css/home.css'; // Import the CSS file for styling
import { CLASSES } from '../entity/Constants';
import TableList from './TableList';

const Classes: React.FC = () => {
  return (
    <TableList imgPath='img/classes/' objects={CLASSES} title='Classes'></TableList>
  )
}

export default Classes
