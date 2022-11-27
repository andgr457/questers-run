import { Save } from "../../interfaces/game.interfaces"

/**
 * This function adds a save to the save list.
 * @param save The save to add to the list of saves
 * @returns The new list of saves
 */
export function addSave(save: Save): Save[] {
  const savesFile = localStorage.getItem('saves')
  const saves: Save[] = []
  if(savesFile === null){
    saves.push(save)
  } else {
    const saves: Save[] = JSON.parse(savesFile)
    saves.push(save)
  }
  localStorage.setItem('saves', JSON.stringify(saves))
  return saves
}

/**
 * This function gets save files so that the user can select a save from local storage.
 * @returns A list of saves, or undefined if none
 */
export function getSaves(): Save[] | undefined {
  const savesFile = localStorage.getItem('saves')
  if(savesFile === null){
    return undefined
  }
  return JSON.parse(savesFile)
}
