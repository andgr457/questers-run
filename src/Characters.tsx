import React from 'react';
import { Button, Progress } from "@material-tailwind/react";

interface Character {
  name: string;
  level: number;
  exp: number;
  nextLevelExp: number;
  class: string;
  health: number
  maxHealth: number
}

const charactersList: Character[] = [
  {
    name: 'Hayz', level: 3, exp: 32, nextLevelExp: 333, class: 'warrior', health: 130, maxHealth: 130
  },
  {
    name: 'Lithos', level: 1, exp: 1, nextLevelExp: 100, class: 'mage', health: 69, maxHealth: 100
  },
  {
    name: 'Sothil', level: 1, exp: 1, nextLevelExp: 100, class: 'rogue', health: 25, maxHealth: 100
  }
]

function buildCharacter(character: Character) {
  return (
    <li key={character.name} className="py-4">
      <div className="ml-3">
        <img className="h-12 w-15 rounded-full" src={`img/classes/${character.class}.png`} alt="" />
        <p className="text-lg font-lg text-gray-900">{character.name} - {character.level}</p>
        <p className="text-sm font-sm">{character.class.toLocaleUpperCase()}</p>
        <Progress 
          value={+((character.health / character.maxHealth) * 100).toFixed(2)} 

          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined} 
          variant="gradient"
          color={((character.health / character.maxHealth) * 100) <= 50 ? 'red' : 'teal'}
        />
        <p className="text-sm font-sm">Health: {((character.health / character.maxHealth) * 100).toFixed(2)}% [{character.health}/{character.maxHealth}]</p>
        <Progress 
          value={+((character.exp / character.nextLevelExp) * 100).toFixed(2)} 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined} 
          variant="gradient"
          color='purple'
        />
        <p className="text-sm font-sm">Experience: {((character.exp / character.nextLevelExp) * 100).toFixed(2)}% [{character.exp}/{character.nextLevelExp}]</p>
        <Button color='blue' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Quest</Button>
        <Button color='teal' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Tavern</Button>
        <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Bags</Button>
        <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Equipment</Button>
      </div>
    </li>
  );
}

export default function Characters() {
  return (
    <ul className="divide-y divide-gray-200">
      {charactersList.map((c) => (
        buildCharacter(c)
      ))}
    </ul>
  );
}
