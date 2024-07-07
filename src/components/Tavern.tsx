import React, { useCallback, useMemo, useState } from 'react';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import CharacterComponent from './CharacterComponent';
import { randomize } from './clicker/Clicker';
import './Tavern.css'
import { Character } from '../entity/character';

interface TavernProps {
  showTavern: boolean
  setShowTavern: React.Dispatch<React.SetStateAction<boolean>>
  character: Character
  handleTavernBuff: (toon: Character) => void
  handleTavernSleep: (toon: Character) => void
}

const attackBuffMessages: string[] = [
  "Your strength is unmatched! Feel the power surge through you.",
  "Take this elixir and unleash your fury upon your foes.",
  "Let your weapon strike true and with great force!",
  "A mighty warrior like you deserves an extra edge in battle.",
  "With this potion, your enemies will tremble before your might.",
  "Feel the might of a hundred warriors flow into your veins.",
  "With this brew, your attacks will be swift and deadly.",
  "Embrace the strength within and let your enemies fall before you.",
  "This drink will make your blows hit with the force of a hammer.",
  "Prepare yourself, for your strikes will now be legendary."
]

const defenseBuffMessages: string[] = [
  "This shield will make you as sturdy as a mountain.",
  "Fortify yourself with this potion, and no harm shall come to you.",
  "With this elixir, your defenses are impenetrable.",
  "Take this draught and feel invincible against any attack.",
  "Let this brew harden your resolve and body alike.",
  "You'll be as unyielding as steel after drinking this.",
  "This potion will make you a bastion on the battlefield.",
  "Strengthen your defenses and become an immovable object.",
  "With this drink, even the fiercest blows will feel like a breeze.",
  "Feel the protective power flow through you, making you invincible."
]

const critBuffMessages: string[] = [
  "Your strikes will find the weakest points with this elixir.",
  "Feel the precision and strike where it hurts the most.",
  "This potion will guide your hand to the enemy's vital spots.",
  "Sharpen your senses and let your attacks be deadly accurate.",
  "With this draught, your blows will cut through armor like butter.",
  "Take this, and your enemies' vulnerabilities will be laid bare.",
  "This brew will turn your strikes into devastating critical hits.",
  "Aim true, and let each strike be a crippling blow to your foes.",
  "Your attacks will now strike with the precision of a master assassin.",
  "Enhance your focus and let each hit be a critical success."
]

const buffLimitReachedMessages: string[] = [
  "You've reached your limit for enhancements. Choose your actions wisely.",
  "No more enhancements can be applied. You're at full capacity!",
  "You're already at your maximum enhancement capacity.",
  "No more improvements can be added. You're fully powered!",
  "You've reached the pinnacle of your abilities with current enhancements.",
  "Your body can't handle any more enhancements at the moment.",
  "You've maxed out your slots. Use them to your advantage!",
  "Limit reached. Time to put those enhancements to use.",
  "No more room for improvements. You're as strong as you can be right now.",
  "You've got all the enhancements you can handle. Make them count!"
]

const noBuffMessages: string[] = [
  "You focused deeply but felt no change.",
  "Despite your efforts, no new power flows within you.",
  "You took a moment to center yourself, but nothing happened.",
  "You feel calm, but no new energy comes to you.",
  "You sought strength, but none was granted this time.",
  "Your spirit remains steady, yet unchanged.",
  "You feel at peace, but no new abilities awaken.",
  "Your mind is clear, but no new powers arise.",
  "You rested briefly, but no enhancement was bestowed.",
  "You took a breath, but no new strength emerged."
]

const restMessages: string[] = [
  "You rest for a while, feeling your strength slowly return.",
  "You take a moment to relax, and your energy is restored.",
  "A short rest rejuvenates your spirit and body.",
  "You find a quiet corner to rest, regaining some of your vigor.",
  "You sit down and rest, feeling more refreshed.",
  "A brief rest leaves you feeling more resilient.",
  "You close your eyes for a moment, and your energy is renewed.",
  "Taking a break, you feel your stamina improve.",
  "You relax for a bit, recovering some of your strength.",
  "You rest quietly, and your endurance is restored."
]

const Tavern: React.FC<TavernProps> = ({
  showTavern,
  setShowTavern,
  character,
  handleTavernBuff,
  handleTavernSleep
}) => {
  const [tavernMessage, setTavernMessage] = useState('Greetings traveller, rest a while!')

  const buffClicked = useCallback(() => {
    if(character.buffCount >= character.maxBuffs){
      setTavernMessage(buffLimitReachedMessages[Math.floor(Math.random() * buffLimitReachedMessages.length)])
    }
    if(randomize(50)){
      character.buffAttack += 1
      character.buffCount += 1
      setTavernMessage(`${attackBuffMessages[Math.floor(Math.random() * attackBuffMessages.length)]} +1 Attack!`)
    } else if(randomize(50)) {
      character.buffDefense += 1
      character.buffCount += 1
      setTavernMessage(`${defenseBuffMessages[Math.floor(Math.random() * defenseBuffMessages.length)]} +1 Defense!`)
    } else if(randomize(50)){
      character.buffCrit += .1
      character.buffCount += 1
      setTavernMessage(`${critBuffMessages[Math.floor(Math.random() * critBuffMessages.length)]} +1 Crit!`)
    } else {
      setTavernMessage(noBuffMessages[Math.floor(Math.random() * noBuffMessages.length)])
    }
    handleTavernBuff(character)
  }, [character, handleTavernBuff])

  const sleepClicked = useCallback(() => {
    let hp = 0
    let mana = 0
    if(character.health < character.maxHealth){
      hp = .2 * character.maxHealth
      character.health += hp
    }
    if(character.mana < character.maxMana){
      mana = .2 * character.maxMana
      character.mana += mana
    }
    if(character.health > character.maxHealth){
      character.health = character.maxHealth
    }
    if(character.mana > character.maxMana){
      character.mana = character.maxMana
    }
    handleTavernSleep(character)
    setTavernMessage(`${restMessages[Math.floor(Math.random() * restMessages.length)]} +${hp.toFixed(2)} HP and +${mana.toFixed(2)} Mana!`)
  }, [character, handleTavernSleep])
  
  const view = useMemo(() => {
    if(!character) return
    return (
    <Dialog  open={showTavern} handler={() => {setShowTavern(false)}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <div
      className="text-center font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
      Tavern
    </div>
      <p className="text-center text-xs font-sans text-1xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-400">{tavernMessage}</p>
      <div>
        <CharacterComponent character={character}></CharacterComponent>
      </div>
      <Button
          disabled={character.health >= character.maxHealth && character.mana >= character.maxMana }
          variant="gradient"
          onClick={() => sleepClicked()}
          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
          Rest +{(.2 * character.maxHealth ?? 0).toFixed(2)} HP +{(.2 * character.maxMana ?? 0).toFixed(2)} Mana
        </Button>
  
        <Button
          disabled={character?.buffCount >= character?.maxBuffs}
          variant="gradient"
          onClick={() => buffClicked()}
          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
          Meditate +1 Attack +1 Defense +0.1 Crit
        </Button>

    </DialogBody>
    <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <Button onClick={() => setShowTavern(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Leave
      </Button>
    </DialogFooter>
  </Dialog>)
  }, [showTavern, character, setShowTavern, tavernMessage, buffClicked, sleepClicked])

  return view
};

export default Tavern;
