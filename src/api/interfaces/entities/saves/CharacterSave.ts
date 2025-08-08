import { ICharacter } from '../character/ICharacter'
import { ICharacterBuff } from '../character/ICharacterBuff'
import { ICharacterClass } from '../character/ICharacterClass'
import { IQuest } from '../IQuest'

export interface CharacterSave {
  character: ICharacter
  characterClass: ICharacterClass
  buffs?: ICharacterBuff[]
  quest?: IQuest
  lootIds?: string[]
  armorIds?: string[]
  weaponIds?: string[]
}