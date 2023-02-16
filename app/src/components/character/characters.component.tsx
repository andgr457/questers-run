import { DateTime } from "luxon"
import { useCallback, useMemo, useState } from "react"
import { Character, CharacterStats } from "../../interfaces/character.interfaces"
import { addThing } from "../../services/crud.service"

interface CharactersProperties {
  characters: Character[]
  selectedSave: string
  setCharacters: any
}

export const Classes: {[property: string]: {id: string, name: string, img: string, startingStats: CharacterStats}} = {
  Warrior: {id: 'warrior', name: 'Warrior', img: 'img/classes/icons8-warrior-62.png', startingStats: {health: 10, mana: 5, stamina: 15, dexterity: 6}},
  Mage: {id: 'mage', name: 'Mage', img: 'img/classes/icons8-mage-64.png', startingStats: {health: 7, mana: 10, stamina: 10, dexterity: 3 }},
  Rogue: {id: 'rogue', name: 'Rogue', img: 'img/classes/icons8-rogue-48.png', startingStats: {health: 7, mana: 5, stamina: 10, dexterity: 10 }},
}

const CharactersComponent = (props: CharactersProperties) => {
  const [characterName, setCharacterName] = useState('')
  const [characterClass, setCharacterClass] = useState('Warrior')

  const newCharacterNameChanged = useCallback((e: any) => {
    setCharacterName(e.target.value)
  }, [])

  const newCharacterClassChanged = useCallback((e: any) => {
    setCharacterClass(e.target.value)
  }, [])

  const addCharacter = useCallback((e: Character) => {
    const loadedCharacters = addThing<Character>(`${props.selectedSave}_characters`, e)
    props.setCharacters(loadedCharacters)
  }, [props])

  const newCharacterButtonClicked = useCallback((e: any) => {
    if(characterName.trim() === '' || typeof characterClass === 'undefined') return
    const character: Character = {
      id: `${characterName}_${DateTime.utc().toMillis()}`,
      classType: characterClass as any,
      experience: 0,
      experienceToNextLevel: 0,
      level: 0,
      money: 100,
      name: characterName,
      skills: [],
      stats: {
        health: Classes[characterClass].startingStats.health,
        mana: Classes[characterClass].startingStats.mana,
        stamina: Classes[characterClass].startingStats.stamina,
        dexterity: Classes[characterClass].startingStats.dexterity
      },
      status: 'Idle'
    }
    
    setCharacterName('')
    setCharacterClass('Warrior')
    addCharacter(character)
  }, [characterClass, characterName, addCharacter])

  const characterList = useMemo(() => {
    if(typeof props.characters === 'undefined' || props.characters.length === 0) {
      return (
        <div>
          You have no characters!
        </div>
      )
    }

    const cards: any[] = []
    for(const character of props.characters){
      cards.push(<>
        <div className='card'>
          <img src={`${Classes[character.classType].img}`} alt="Class"></img><br></br>
          <strong>{character.name}</strong> <i>{character.classType}</i> Lvl <strong>{character.level}</strong><br></br>
          HP: <strong>{character.stats.health}</strong> MP: <strong>{character.stats.mana}</strong> STAM: <strong>{character.stats.stamina}</strong> DEX: <strong>{character.stats.dexterity}</strong><br></br><br></br>
          <button>Send {character.name} on a Quest</button><br></br><br></br>
          <button>Send {character.name} to the Tavern</button>
        </div>
      </>)
    }

    return cards
  }, [props.characters])

  const newCharacterSection = useMemo(() => {
    const classOptions = []
    for(const property of Object.getOwnPropertyNames(Classes)){
      classOptions.push(<option id={Classes[property].id} key={Classes[property].id}>{Classes[property].name}</option>)
    }
    return (
      <div>
        <img src={Classes[characterClass].img} alt='Class'></img><br/>
        Character Name<br/>
        <input id='newCharacterNameTxt' placeholder="Enter name..." onChange={newCharacterNameChanged} value={characterName}></input><br/><br></br>
        Select a Class<br/><select value={characterClass} className="dropdown" id='newCharacterClassSelect' placeholder="Select class" onChange={newCharacterClassChanged}>
          {classOptions}
        </select><br></br><br></br>
        Starting Stats <br></br> HP: <strong>{Classes[characterClass].startingStats.health}</strong> MP: <strong>{Classes[characterClass].startingStats.mana}</strong> STAM: <strong>{Classes[characterClass].startingStats.stamina}</strong> DEX: <strong>{Classes[characterClass].startingStats.dexterity}</strong> <br></br><br></br>
        <button id='newCharacterSaveBtn' onClick={newCharacterButtonClicked}>Save</button>
      </div>
    )
  }, [newCharacterNameChanged, newCharacterClassChanged, newCharacterButtonClicked, characterClass, characterName])

  return (
    <>
    <div className="card">
      <strong>New Character</strong>
      {newCharacterSection}
      <hr/>
      <strong>Characters</strong>
      {characterList}
    </div>
    </>
  )
}

export default CharactersComponent
