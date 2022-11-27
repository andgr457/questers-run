import { useMemo, useState } from "react"
import { Save } from "../../interfaces/game.interfaces"

interface SavesComponentProperties {
  setSelectedSave: any
  saves: Save[]
}

const SavesComponent = (props: SavesComponentProperties) => {

  const renderSaveList = useMemo(() => {
    const newSaveButton = (
      <button>New Save</button>
    )
    return (
      <>
      {props.saves.map(save => {
        return (
          <>
            <div>
              {save.saveName}
            </div>
            <hr></hr>
          </>
        )
      })}
      <div>
        New Game:
        <div>
          <input type='text' id='newSaveInput' placeholder="Enter save name..."></input>
        </div>
        <div>
          {newSaveButton}
        </div>
      </div>
      </>
    )
  }, [props.saves])

  return (
    <>
      {renderSaveList}
    </>
  )
}

export default SavesComponent