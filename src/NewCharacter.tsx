import { Button, Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'
import { useCallback, useMemo, useState } from 'react'
import { CLASSES } from './entity/Constants'
import { Character, CharacterClass } from './entity/entity.interface'
import { determineCharacterNextLevelExp, getRandomClass, getRandomName } from './entity/entity.service'

interface NewCharacterProps {
    addCharacter: (character: Character) => void
    showNewCharacter: boolean
    setShowNewCharacter: (value: boolean) => void
    characterNames: string[]
}
export default function NewCharacter(props: NewCharacterProps) {
    const [name, setName] = useState('')
    const [classs, setClasss] = useState(undefined)
    const [hideError, setHideError] = useState(true)

    const handleNameChanged = useCallback((e: any) => {
        const input = e.target.value
        if(props.characterNames.includes(input.toLowerCase())){
            setHideError(false)
            return
        } else {
            setHideError(true)
        }
        setName(input)
    }, [props])

    const handleClassChanged = useCallback((e: any) => {
        setClasss(e.target.value)
    }, [])

    const handleSaveClick = useCallback(() => {
        if(name.trim() === '' || !hideError) return
        const foundClass: CharacterClass = CLASSES.find(c => c.name === classs) as any
        
        const character: Character = {
            name,
            class: classs as any,
            attack: foundClass.startAttack,
            maxHealth: foundClass.startHealth,
            health: foundClass.startHealth,
            maxBuffs: 1,
            exp: 0,
            nextLevelExp: determineCharacterNextLevelExp(1),
            level: 1,
            buffAttack: 0,
            buffDefense: 0,
            buffCrit: foundClass.startCrit,
            buffCount: 0,
            bags: [],
            defense: 1,
            equipment: [],
            hitChance: foundClass.startHitChance,
            critChance: foundClass.startCritChance
        }
        setName('')
        setClasss(undefined)
        props.addCharacter(character)
    }, [name, hideError, classs, props])

    const view = useMemo(() => {
        if(name === ''){
            setName(getRandomName())
            setClasss(getRandomClass() as any)
            return
        }
        const selectedClass = CLASSES.find(c => c.name === classs)
        return (
          <Dialog open={props.showNewCharacter} handler={function (): void {
            } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                New Character
            </DialogHeader>
            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      
            <div>
            <p>
                Breathe new life into your realm!
                </p>
                <input defaultValue={name} onChange={handleNameChanged} placeholder="Enter Character Name"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                <p hidden={hideError} className='text-red-700'>You cannot create new characters with the same name.</p>
                <br/><br/>
                <select onChange={handleClassChanged} defaultValue={classs}
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    {CLASSES.map(c => (
                        <option selected={classs === c.name} value={c.name}>{c.name}</option>
                    ))}
                    
                </select>
                <br/><br/>
                <Button
                        color="green"
                        onClick={handleSaveClick}
                        className="mr-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                Save
              </Button>
              <Button
                        color="blue"
                        onClick={() => props.setShowNewCharacter(false)}
                        className="mr-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                Close
              </Button>
              <div>
              <br/>
              <p 
                className="block mb-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {selectedClass.name}
              </p>
                <p>{selectedClass.description}</p>
                <hr/>
                <p>Health: <strong>{selectedClass.startHealth}</strong></p>
                <p>Attack: <strong>{selectedClass.startAttack}</strong> Defense: <strong>{selectedClass.startDefense}</strong></p>
                <p>Crit Damage: <strong>{selectedClass.startCrit}</strong> Crit Chance: <strong>{selectedClass.startCritChance}</strong></p>
                <p>Hit Chance: <strong>{selectedClass.startHitChance}</strong></p>
              </div>

            </div>
            </DialogBody>
          </Dialog>
        )
      }, [name, props, handleNameChanged, hideError, handleClassChanged, classs, handleSaveClick])
    
      return view
}