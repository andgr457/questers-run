import React from 'react';
import './css/home.css'; // Import the CSS file for styling
import { MOBS } from './entity/Constants';
import { Card, Typography } from '@material-tailwind/react';

const Mobs: React.FC = () => {
  return (
    
        <div>
          <div className='text-xl'><strong>Mobs</strong></div>
          {MOBS.map((m) => (
            <div key={m.name}>
              <div className="flex justify-center">
              <img src={`img/mobs/${m.imageName}`} alt={`${m.name?.toUpperCase()}`} />
              </div>
              <div className="flex justify-center">
                <div> 
                  <a target="_blank" href={m.imageName} rel="noreferrer">
                    {m.name}
                  </a>{' '}
                  icon by{' '}
                  <a target="_blank" href="https://icons8.com" rel="noreferrer">
                    Icons8
                  </a>
                </div>


              </div>
              <div className="flex flex-wrap">
              <Card className="h-full w-full overflow-scroll" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
          {Object.getOwnPropertyNames(m).map((propertyName) => (
                     <th
                     key={propertyName}
                     className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                   >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                   {propertyName}
                </Typography>
                </th>
                  ))}
          </tr>
        </thead>
        <tbody>
        <tr>

        {Object.getOwnPropertyNames(m).map((propertyName) => (
            <td className={'p-4'}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                {m[propertyName]}
              </Typography>
            </td>
        ))}
        </tr>
        </tbody>
      </table>
    </Card>

                  </div>
            </div>
          ))}
          
        </div>
  )
}

export default Mobs
