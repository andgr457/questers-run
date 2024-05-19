import React from 'react'
import { Progress } from '@material-tailwind/react'
import { MOBS } from '../entity/Constants';
import { Mob } from '../entity/entity.interface';
import { doEntityAttack } from '../entity/entity.service';

interface MobProps {
  mob: Mob;
}

const MobComponent: React.FC<MobProps> = ({ mob }) => {
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-full sm:w-96">
      <div className="p-4 sm:p-6">
        <img 
          className="h-20 w-20 mx-auto mb-4" 
          src={`img/mobs/${MOBS?.find(m => m.name === mob.name)?.imageName}`} 
          alt="" 
        />
        <h5 className="text-center mb-2 font-sans text-xl font-semibold leading-snug text-blue-gray-900">
        {mob.type} {mob.name} - Level {mob.level}
        </h5>
        <p className="text-center font-sans text-base font-light leading-relaxed text-inherit">
          [{doEntityAttack(mob)} Damage]
        </p>
        
        <div className="mt-4">
          <Progress 
            value={+((mob.health / mob.maxHealth) * 100).toFixed(2)}
            variant="gradient"
            color={((mob.health / mob.maxHealth) * 100) <= 50 ? 'red' : 'teal'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-sm font-sm">
            Health: {((mob.health / mob.maxHealth) * 100).toFixed(2)}% [{mob.health.toFixed(2)}/{mob.maxHealth}]
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default MobComponent;
