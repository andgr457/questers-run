import { DateTime } from "luxon"
import { useCallback, useMemo, useState } from "react"
import { Character } from "../../interfaces/character.interfaces"

interface CharactersProperties {
  characters: Character[]
  addCharacter: any
}

export const Classes: {[property: string]: {id: string, name: string, img: string}} = {
  Warrior: {id: 'warrior', name: 'Warrior', img: 'img/classes/icons8-warrior-62.png'},
  Mage: {id: 'mage', name: 'Mage', img: 'img/classes/icons8-mage-64.png'},
  Rogue: {id: 'rogue', name: 'Rogue', img: 'img/classes/icons8-rogue-48.png'},
}

const CharactersComponent = (props: CharactersProperties) => {
  const [characterName, setCharacterName] = useState(undefined)
  const [characterClass, setCharacterClass] = useState('Warrior')

  const newCharacterNameChanged = useCallback((e: any) => {
    setCharacterName(e.target.value)
  }, [])

  const newCharacterClassChanged = useCallback((e: any) => {
    setCharacterClass(e.target.value)
  }, [])

  const newCharacterButtonClicked = useCallback((e: any) => {
    if(typeof characterName === 'undefined' || typeof characterClass === 'undefined') return
    const character: Character = {
      id: `${characterName}_${DateTime.utc().toMillis()}`,
      classType: characterClass as any,
      experience: 0,
      experienceToNextLevel: 0,
      level: 1,
      money: 0,
      name: characterName,
      skills: [],
      stats: {
        health: 10,
        mana: 10,
        stamina: 10
      }
    }
    setCharacterName(undefined)
    setCharacterClass('Warrior')
    props.addCharacter(character)
  }, [characterClass, characterName])

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
        </tr>
      </thead>
    )
    const characterRows: any[] = []
    for(const character of props.characters){
      characterRows.push((
        <tr>
          <td><img src={`${Classes[character.classType].img}`} alt="Character Image"></img></td>
          <td>{character.name}</td>
          <td>{character.classType}</td>
          <td>{character.level} - {character.experience}/{character.experienceToNextLevel}</td>
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
        <img src={Classes[characterClass].img} alt='Character Class Image'></img><br/>
        <input id='newCharacterNameTxt' placeholder="Enter character name..." onChange={newCharacterNameChanged} value={characterName}></input><br/>
        <select id='newCharacterClassSelect' placeholder="Select class" onChange={newCharacterClassChanged}>
          {classOptions}
        </select><hr/>
        <button id='newCharacterSaveBtn' onClick={newCharacterButtonClicked}>Save</button>
      </div>
    )
  }, [newCharacterNameChanged, newCharacterClassChanged, newCharacterButtonClicked, characterClass, characterName])

  return (
    <>
    {characterList}
    <hr/>
    {newCharacterSection}
    </>
  )
}

export default CharactersComponent
