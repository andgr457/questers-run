
export function updateThing<T>(storage: string, thing: any): T[] {
  const thingData = localStorage.getItem('saves')
  const things: any[] = JSON.parse(thingData ?? '[]')
  if(things.length === 0){
    things.push(thing)
  } else {
    for(let s of things){
      if(s.id === thing.id){
        s = thing
        break
      }
    }
  }
  localStorage.setItem(storage, JSON.stringify(things))
  return things
}

export function addThing<T>(storage: string, thing: any): T[] {
  const thingData = localStorage.getItem(storage)
  const things: any[] = JSON.parse(thingData ?? '[]')
  if(things.length === 0){
    things.push(thing)
  } else {
    const existingThing = things.find(t => t.id === thing.id)
    if(typeof existingThing === 'undefined'){
      things.push(thing)
    }
  }
  localStorage.setItem(storage, JSON.stringify(things))
  return things
}

export function getThings<T>(storage: string): T[] | undefined {
  const things = localStorage.getItem(storage)
  if(things === null){
    return undefined
  }
  return JSON.parse(things)
}

export function deleteThing<T>(storage: string, thing: any): T[] {
  /** Not implemented yet */
  throw new Error('Not Implemented')
}
