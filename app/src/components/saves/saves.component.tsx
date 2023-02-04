import { DateTime } from "luxon"
import { useCallback, useMemo, useState } from "react"
import { Save } from "../../interfaces/game.interfaces"
// import { updateThing } from "../../services/crud.service"

interface SavesComponentProperties {
  setSelectedSave: any
  setView: any
  addNewSave: any
  saves: Save[]
}

const SavesComponent = (props: SavesComponentProperties) => {
  const [newSaveName, setNewSaveName]: [any, any] = useState(undefined)
  // const [selectedFile, setSelectedFile] = useState(undefined)
  // const [importText, setImportText] = useState('')

  const newSaveChanged = useCallback((e: any) => {
    setNewSaveName(e.target.value)
    props.setSelectedSave(newSaveName)
    props.setView('nav_characters')
  }, [props, newSaveName])

  const newSaveButtonClicked = useCallback((e: any) => {
    if(typeof newSaveName === 'undefined') return

    const saveNames = props.saves?.map(save => save.saveName) ?? []
    if(!saveNames.includes(newSaveName.toLowerCase())){
      const save: Save = {
        id: `${newSaveName.replace(' ', '_').toLowerCase()}_${DateTime.utc().toMillis()}`,
        saveName: newSaveName.toLowerCase(),
        lastSave: DateTime.utc().toISO()
      }
      props.addNewSave(save)
      props.setSelectedSave(newSaveName)
      setNewSaveName(undefined)
      props.setView('nav_characters')
    }
  }, [newSaveName, props])

  const saveButtonClicked = useCallback((e: any) => {
    props.setSelectedSave(e.target.id)
    props.setView('nav_characters')
  }, [props])

  // const fileSelected = useCallback((e: any) => {
  //   setSelectedFile(e.target.files[0])
  // }, [])

  // const importFile = useCallback((e: any) => {
  //   if(typeof selectedFile === 'undefined') return

  //   var reader = new FileReader();
  //   reader.readAsText(selectedFile, "UTF-8");
  //   reader.onload = (evt) => {
  //     const data = JSON.parse(evt.target?.result as string)
  //     const save = data.save
  //     const toons = data.characters
  //     updateThing('saves', save)
  //     updateThing(`${save.saveName}_characters`, toons)
  //     setImportText('Save successfully imported!')
  //   }
  // }, [selectedFile])

  const renderSaveList = useMemo(() => {
    return (
      <>
      {props.saves?.map(save => {
        return (
          <>
            &nbsp;&nbsp;<button key={`${save.id}_save_btn`} id={save.saveName} onClick={saveButtonClicked}>
              {save.saveName}<hr/>{DateTime.fromISO(save.lastSave).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone).toFormat('MM/dd/yyyy t')}
            </button>
          </>
        )
      })}
      <hr></hr>
      <div>
        New Save
        <div>
          <input type='text' id='newSaveInput' placeholder="Enter save name..." onChange={newSaveChanged}></input>
        </div>
        <hr></hr>
        <div>
          
          <button onClick={newSaveButtonClicked}>Create New Save</button>
        </div>
        {/* <hr/>
        Import Save<br/><br/>
        <input type="file" onChange={fileSelected}/><br/><br/>
        <button onClick={importFile}>Import</button><br></br>
        {importText} */}
      </div>
      </>
    )
  }, [props.saves, newSaveButtonClicked, newSaveChanged, saveButtonClicked])

  return (
    <>
      <div className="card">
        {renderSaveList}
      </div>
    </>
  )
}

export default SavesComponent