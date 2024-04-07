import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react'
import { useCallback, useMemo, useState } from 'react'
import { CLASSES } from './Constants'
import { Character, CharacterClass } from './entity/entity.interface'

interface NewCharacterProps {
    addCharacter: (character: Character) => void
    showNewCharacter: boolean
    setShowNewCharacter: (value: boolean) => void
    characterNames: string[]
}
export default function NewCharacter(props: NewCharacterProps) {
    const [name, setName] = useState('')
    const [classs, setClasss] = useState('Warrior')
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
    }, [props])

    const handleSaveClick = useCallback((e: any) => {
        if(name.trim() === '' || !hideError) return
        const foundClass: CharacterClass = CLASSES.find(c => c.name === classs) as any
        
        const character: Character = {
            name,
            class: classs,
            attack: foundClass.startAttack,
            maxHealth: foundClass.startHealth,
            health: foundClass.startHealth,
            maxBuffs: 1,
            exp: 0,
            nextLevelExp: 1500,
            level: 1,
            buffAttack: 1,
            buffDefense: 1,
            buffCount: 0,
            bags: [],
            defense: 1
        }
        console.log(character)
        props.addCharacter(character)
    }, [name, classs, hideError])

    const view = useMemo(() => {
        return (
          <Dialog open={props.showNewCharacter} handler={function (value: any): void {
            props.setShowNewCharacter(false)
            } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
                New Character
            </div>
            <div>
            <p className="block mb-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Breathe new life into your realm!
                </p>
                <h6>Name</h6>   
                <input onChange={handleNameChanged} placeholder="Enter Character Name"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                <p hidden={hideError} className='text-red-700'>You cannot create new characters with the same name.</p>
                <br/><br/>
                <h6>Class</h6>   
                <select onChange={handleClassChanged}
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    {CLASSES.map(c => (
                        <option value={c.name}>{c.name}</option>
                    ))}
                    
                </select>
                <br/><br/>
                {CLASSES.map(c => (
                        <>
                            <br/><p className="block mb-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">{c.name}</p>
                            <p>{c.description}</p>
                            <p className="block mb-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">Starts with {c.startHealth} health, {c.startAttack} attack, and {c.startDefense} defense.</p>

                        </>

                    ))}
            </div>
            </DialogBody>
            <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
            </DialogFooter>
          </Dialog>
        )
      }, [props, handleNameChanged, hideError, setHideError, handleSaveClick])
    
      return view
}