import { DateTime } from "luxon"
import { useCallback, useMemo, useState } from "react"
import { Character } from "../../interfaces/character.interfaces"
import { addThing } from "../../services/crud.service"

interface CharactersProperties {
  characters: Character[]
  selectedSave: string
  setCharacters: any
}

export const Classes: {[property: string]: {id: string, name: string, img: string, startingStats: {health: number, mana: number, stamina: number}}} = {
  Warrior: {id: 'warrior', name: 'Warrior', img: 'img/classes/icons8-warrior-62.png', startingStats: {health: 10, mana: 5, stamina: 15}},
  Mage: {id: 'mage', name: 'Mage', img: 'img/classes/icons8-mage-64.png', startingStats: {health: 7, mana: 10, stamina: 10 }},
  Rogue: {id: 'rogue', name: 'Rogue', img: 'img/classes/icons8-rogue-48.png', startingStats: {health: 7, mana: 5, stamina: 10 }},
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
      money: 0,
      name: characterName,
      skills: [],
      stats: {
        health: Classes[characterClass].startingStats.health,
        mana: Classes[characterClass].startingStats.mana,
        stamina: Classes[characterClass].startingStats.stamina
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
    const headerRow: any = (
      <thead>
        <tr>
          <td></td>
          <td>Name</td>
          <td>Class</td>
          <td>Level</td>
          <td>Health/Mana/Stamina</td>
          <td>Status</td>
        </tr>
      </thead>
    )
    const characterRows: any[] = []
    for(const character of props.characters){
      characterRows.push((
        <tr key={`${character.id}_tr`}>
          <td key={`${character.id}_img`}><img src={`${Classes[character.classType].img}`} alt="Class"></img></td>
          <td key={`${character.id}_name`}>{character.name}</td>
          <td key={`${character.id}_class`}>{character.classType}</td>
          <td key={`${character.id}_level`}>{character.level} - {character.experience}/{character.experienceToNextLevel}</td>
          <td key={`${character.id}_stats`}>{character.stats.health}/{character.stats.mana}/{character.stats.stamina}</td>
          <td key={`${character.id}_status`}>{character.status}</td>
        </tr>
      ))
    }
    const tableBody = (
      <tbody>
        {characterRows}
      </tbody>
    )
    const characterTable = (
      <table>
        {headerRow}
        {tableBody}
      </table>
    )
    return characterTable
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
        <input id='newCharacterNameTxt' placeholder="Enter name..." onChange={newCharacterNameChanged} value={characterName}></input><br/>
        Select a Class<br/><select value={characterClass} className="dropdown" id='newCharacterClassSelect' placeholder="Select class" onChange={newCharacterClassChanged}>
          {classOptions}
        </select><hr/>
        <button id='newCharacterSaveBtn' onClick={newCharacterButtonClicked}>Save</button>
      </div>
    )
  }, [newCharacterNameChanged, newCharacterClassChanged, newCharacterButtonClicked, characterClass, characterName])

  return (
    <>
    <div className="card">
      {characterList}
      <hr/>
      New Character
      {newCharacterSection}
    </div>
    </>
  )
}

export default CharactersComponent
