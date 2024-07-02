import { Button, Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CLASSES } from '../entity/Constants'
import { determineCharacterNextLevelExp, getRandomName, getRandomClass } from '../entity/entity.service'
import CharacterComponent from './CharacterComponent'
import { Character } from '../entity/character'
import { CharacterClass } from '../entity/classes'

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
    const [previewCharacter, setPreviewCharacter] = useState(undefined)
    const [initialLoad, setInitialLoad] = useState(true)

    const handleNameChanged = useCallback((e: any) => {
        const input = e.target.value
        if(input === '' || props.characterNames.includes(input.toLowerCase())){
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

    useEffect(() => {
        const foundClass: CharacterClass = CLASSES.find(c => c.name === classs) as any
        
        const character: Character = {
            name,
            gold: 0,
            class: classs as any,
            attack: foundClass.startAttack,
            maxHealth: foundClass.startHealth,
            health: foundClass.startHealth,
            mana: foundClass.startMana,
            maxMana: foundClass.startMana,
            maxBuffs: 1,
            exp: 0,
            nextLevelExp: determineCharacterNextLevelExp(1),
            level: 1,
            buffAttack: foundClass.startAttack,
            buffDefense: foundClass.startDefense,
            buffCrit: foundClass.startCrit,
            buffCount: 0,
            inventory: {
               title: 'Inventory',
               maxTabs: 1,
               tabs: [{
                title: 'Pillow Case',
                items: [{name: 'Healing Potion', quantity: 5}],
                maxItems: 10
               }] 
            },
            defense: 1,
            equipment: [],
            hitChance: foundClass.startHitChance,
            critChance: foundClass.startCritChance
        }
        setPreviewCharacter(character)
    }, [name, classs])

    const handleSaveClick = useCallback(() => {
        if(name.trim() === '' || !hideError) return
        const foundClass: CharacterClass = CLASSES.find(c => c.name === classs) as any
        
        const character: Character = {
            name,
            gold: 0,
            class: classs as any,
            attack: foundClass.startAttack,
            maxHealth: foundClass.startHealth,
            health: foundClass.startHealth,
            mana: foundClass.startMana,
            maxMana: foundClass.startMana,
            maxBuffs: 1,
            exp: 0,
            nextLevelExp: determineCharacterNextLevelExp(1),
            level: 1,
            buffAttack: foundClass.startAttack,
            buffDefense: foundClass.startDefense,
            buffCrit: foundClass.startCrit,
            buffCount: 0,
            inventory: {
              title: 'Inventory',
              maxTabs: 1,
              tabs: [{
                  title: 'Pillow Case',
                  items: [{name: 'Lesser Healing Potion', quantity: 5}],
                  maxItems: 10
              }] 
             },
            defense: 1,
            equipment: [],
            hitChance: foundClass.startHitChance,
            critChance: foundClass.startCritChance
        }
        setName('')
        setClasss(undefined)
        setInitialLoad(true)
        setHideError(true)
        props.addCharacter(character)
    }, [name, hideError, classs, props])

    const handleCloseClicked = useCallback(() => {
        setName('')
        setClasss(undefined)
        setInitialLoad(true)
        setHideError(true)
        props.setShowNewCharacter(false)
    }, [props])

    const view = useMemo(() => {
        if(name === '' && initialLoad === true){
            setInitialLoad(false)
            setName(getRandomName())
            setClasss(getRandomClass() as any)
            return
        }
        const selectedClass = CLASSES.find(c => c.name === classs)
        return (
          <Dialog size='xxl' open={props.showNewCharacter} handler={function (): void {
            } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                New Character
            </DialogHeader>
            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      
            <div >
            <p>
                Breathe new life into your realm!
                </p>
                <input defaultValue={name} onChange={handleNameChanged} placeholder="Enter Character Name"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                <p hidden={hideError} className='text-red-700'>You provide a name and it must not match other characters with the same name.</p>
                <br/><br/>
                <select onChange={handleClassChanged} defaultValue={classs}
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    {CLASSES.map(c => (
                        <option selected={classs === c.name} value={c.name}>{c.name}</option>
                    ))}
                    
                </select>
                <br/><br/>
                <Button disabled={!hideError}
                        color="green"
                        onClick={handleSaveClick}
                        className="mr-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                Save
              </Button>
              <Button
                        variant='gradient'
                        onClick={handleCloseClicked}
                        className="mr-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                Close
              </Button>
              <div>
              <br/>
              <p 
                className="block mb-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {selectedClass.name}
              </p>
                <p className='text-xs'>{selectedClass.description}</p>
              </div>
              <CharacterComponent character={previewCharacter}></CharacterComponent>

            </div>
            </DialogBody>
          </Dialog>
        )
      }, [initialLoad, name, props, handleNameChanged, hideError, handleClassChanged, classs, handleSaveClick, previewCharacter, handleCloseClicked])
    
      return view
}