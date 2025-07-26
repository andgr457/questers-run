export interface ICharacter {
  id: string
}

export interface ICharacterCreate {
  name: string
  classId: string
}

export interface ICharacterUpdate extends ICharacter {}