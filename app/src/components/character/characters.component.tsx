import { DateTime } from "luxon"
import { useCallback, useMemo, useState } from "react"
import { Character } from "../../interfaces/character.interfaces"

interface CharactersProperties {
  characters: Character[]
  addCharacter: any
}

const CharactersComponent = (props: CharactersProperties) => {
  const [newCharacter, setNewCharacter]: [any, any] = useState(undefined)

  const newCharacterNameChanged = useCallback((e: any) => {
    console.log(e.target.value)
    const name = e.target.value
    let character: Character = undefined as any
    if(typeof newCharacter === 'undefined'){
      character = {
        id: `${name}_${DateTime.utc().toMillis()}`,
        classType: 'warrior',
        experience: 0,
        experienceToNextLevel: 0,
        image: 'warrior.jpeg',
        level: 1,
        money: 0,
        name: name,
        skills: [],
        stats: {
          health: 10,
          mana: 10,
          stamina: 10
        }
      }
    } else {
      character = {
        ...newCharacter,
        id: `${name}_${DateTime.utc().toMillis()}`,
        name: name
      }
    }
    setNewCharacter(character)
  }, [newCharacter])

  const newCharacterClassChanged = useCallback((e: any) => {
    console.log(e.target.value)
    const clazz = e.target.value
    let character: Character = undefined as any
    if(typeof newCharacter === 'undefined'){
      character = {
        id: `${clazz}_${DateTime.utc().toMillis()}`,
        classType: clazz,
        experience: 0,
        experienceToNextLevel: 0,
        image: 'warrior.jpeg',
        level: 1,
        money: 0,
        name: '',
        skills: [],
        stats: {
          health: 10,
          mana: 10,
          stamina: 10
        }
      }
    } else {
      character = {
        ...newCharacter,
        class: clazz
      }
    }
    setNewCharacter(character)
  }, [newCharacter])

  const newCharacterButtonClicked = useCallback((e: any) => {
    if(typeof newCharacter === 'undefined') return
    if(typeof newCharacter.name === 'undefined' || typeof newCharacter.class === 'undefined') return
    console.log(newCharacter)
    props.addCharacter(newCharacter)
    setNewCharacter(undefined)
  }, [newCharacter])

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
          <td>{character.image}</td>
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
    return (
      <div>
        <input id='newCharacterNameTxt' type='' placeholder="Enter character name..." onChange={newCharacterNameChanged}></input><hr/>
        <select id='newCharacterClassSelect' placeholder="Select class" onChange={newCharacterClassChanged}>
          <option id='warrior'>Warrior</option>
          <option id='mage'>Mage</option>
          <option id='rogue'>Rogue</option>
        </select><hr/>
        <button id='newCharacterSaveBtn' onClick={newCharacterButtonClicked}>Save</button>
      </div>
    )
  }, [newCharacterNameChanged, newCharacterClassChanged, newCharacterButtonClicked])

  return (
    <>
    {characterList}
    <hr/>
    {newCharacterSection}
    </>
  )
}

export default CharactersComponent
