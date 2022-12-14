import { useMemo } from "react"
import { Character } from "../../interfaces/character.interfaces"
import { DashboardStatistics } from "../../interfaces/dashboard.interfaces"
import { addThing, getThings } from "../../services/crud.service"

interface DashboardProperties {
  saveName: string
}

const DashboardComponent = (props: DashboardProperties) => {

  return (
    <>
    <div className="card">
      Nothing here yet...
    </div>
    </>
  )
}

export default DashboardComponent
