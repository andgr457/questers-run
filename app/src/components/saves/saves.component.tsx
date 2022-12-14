import { createHash } from "crypto"
import { DateTime } from "luxon"
import { useCallback, useMemo, useState } from "react"
import { Save } from "../../interfaces/game.interfaces"

interface SavesComponentProperties {
  setSelectedSave: any
  setView: any
  addNewSave: any
  saves: Save[]
}

const SavesComponent = (props: SavesComponentProperties) => {
  const [newSaveName, setNewSaveName]: [any, any] = useState(undefined)

  const newSaveChanged = useCallback((e: any) => {
    setNewSaveName(e.target.value)
  }, [props])

  const newSaveButtonClicked = useCallback((e: any) => {
    if(typeof newSaveName === 'undefined') return

    const saveNames = props.saves?.map(save => save.saveName) ?? []
    if(!saveNames.includes(newSaveName.toLowerCase())){
      const save: Save = {
        id: `${newSaveName.replace(' ', '_').toLowerCase()}_${DateTime.utc().toMillis()}`,
        saveName: newSaveName.toLowerCase(),
        mobs: '',
        characters: '',
        lastSave: DateTime.utc().toISO(),
        questLinesFile: '',
        skills: '',
        zones: ''
      }
      props.addNewSave(save)
      props.setSelectedSave(newSaveName)
      setNewSaveName(undefined)
      props.setView('nav_dashboard')
    }
  }, [newSaveName, props])

  const saveButtonClicked = useCallback((e: any) => {
    console.log(e.target.id)
    props.setSelectedSave(e.target.id)
    props.setView('nav_dashboard')
  }, [props])

  const renderSaveList = useMemo(() => {
    const newSaveButton = (
      <button onClick={newSaveButtonClicked}>New Save</button>
    )
    return (
      <>
      {props.saves?.map(save => {
        return (
          <button key={save.saveName} id={save.saveName} onClick={saveButtonClicked}>
            {save.saveName} - {DateTime.fromISO(save.lastSave).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone).toFormat('MM/dd/yyyy t')}
          </button>
        )
      })}
      <div>
        New Game:
        <div>
          <input type='text' id='newSaveInput' placeholder="Enter save name..." onChange={newSaveChanged}></input>
        </div>
        <div>
          {newSaveButton}
        </div>
      </div>
      </>
    )
  }, [props.saves, newSaveButtonClicked, newSaveChanged, saveButtonClicked])

  return (
    <>
      {renderSaveList}
    </>
  )
}

export default SavesComponent