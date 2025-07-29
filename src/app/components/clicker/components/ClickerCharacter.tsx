import { Button } from '@material-tailwind/react'
import { useState, useEffect } from 'react'

export default function ClickerCharacter({ characterData, questService, onQuest, onAddXp }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const c = characterData

  return (
    <div>
      {c.character.name}
      <div>Level: {c.character.level}</div>
      <div>Experience: {c.character.experience} / {c.character.experienceNextLevel}</div>
      <div>Status: {c.character.status}</div>
      <div>Health: {c.character.health}/{c.character.maxHealth} Mana: {c.character.mana}/{c.character.maxMana} Stamina: {c.character.stamina}/{c.character.maxStamina}</div>
      <div>Strength: {c.character.strength} Agility: {c.character.agility} Willpower: {c.character.willpower}</div>
      <div>Quest: {c.quest && questService?.quest?.title} {c.quest && questService?.getQuestTimeLeft()}</div>
      <div>
        <Button disabled={typeof c.quest !== 'undefined'} onClick={() => onQuest(c.character.level, c.character.id)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>QUESTS</Button>
        <Button onClick={() => onAddXp(c.character.id, 5)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>ADD XP</Button>
      </div>
    </div>
  )
}