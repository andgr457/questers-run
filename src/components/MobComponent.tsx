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
    <div>
      <div>
      <p style={{textAlign: 'center'}}><strong>{mob.name}</strong><br/>{mob.type} </p>
      <img 
          className="h-16 w-16 mx-auto mb-4" 
          src={`img/mobs/${MOBS?.find(m => m.name === mob.name)?.imageName}`} 
          alt="" 
        />
            <p style={{textAlign: 'center'}}>Level {mob.level}</p>
      
        <p className="text-center text-xs font-sans text-base font-light leading-relaxed text-inherit">
          Stats [{doEntityAttack(mob)} Damage] [{mob.defense} Defense] [{mob.hitChance}% Hit Chance] [{mob.expGiven} Exp Given]
        </p>
        
        <div className="mt-4">
          <Progress 
            value={+((mob.health / mob.maxHealth) * 100).toFixed(2)}
            variant="gradient"
            color={((mob.health / mob.maxHealth) * 100) <= 50 ? 'red' : 'teal'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-xs">
            Health: {((mob.health / mob.maxHealth) * 100).toFixed(2)}% [{mob.health.toFixed(2)}/{mob.maxHealth}]
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default MobComponent;
