import { Service } from './Service'
import { LoggerService } from './LoggerService'
import { ICharacter } from '../interfaces/entities/character/ICharacter'
import { ICharacterClass } from '../interfaces/entities/character/ICharacterClass'
import { ICharacterBuff } from '../interfaces/entities/character/ICharacterBuff'
import { IQuest } from '../interfaces/entities/IQuest'
import { DateTime } from 'luxon'
import { ILoot } from '../interfaces/entities/ILoot'
import { QuestService } from './QuestService'

interface CharacterSave {
  character: ICharacter
  characterClass: ICharacterClass
  buffs?: ICharacterBuff[]
  quest?: IQuest
}

export class CharacterService extends Service {
  character: ICharacter
  characterClass: ICharacterClass
  buffs: ICharacterBuff[]
  quest: IQuest

  constructor(loggerService: LoggerService, save: CharacterSave) {
    super(loggerService)
    this.character = save.character
    this.characterClass = save.characterClass
    this.buffs = save.buffs ?? []
    this.quest = save.quest
  }

  addXp(xp: number): void {
    this.character.experience += xp
    this.levelUp()
  }

  modifyHp(hp: number): void {
    this.character.health += hp
  }

  levelUp(): void {
    if(this.character.experience > this.character.experienceNextLevel){
      this.character.experience -= this.character.experienceNextLevel
      this.character.level += 1
      this.character.experienceNextLevel = this.calculateNextLevelXP()
      this.character.strength += this.characterClass.statModifiersPerLevel.strength
      this.character.willpower += this.characterClass.statModifiersPerLevel.willpower
      this.character.agility += this.characterClass.statModifiersPerLevel.agility
      this.character.maxHealth += this.characterClass.statModifiersPerLevel.health
      this.character.maxMana += this.characterClass.statModifiersPerLevel.mana
      this.character.maxStamina += this.characterClass.statModifiersPerLevel.stamina
      this.character.health = this.character.maxHealth
      this.character.mana = this.character.maxMana
      this.character.stamina = this.character.maxStamina
    }
  }

  calculateNextLevelXP(): number {
    return Math.floor(100 * Math.pow(1.25, this.character.level - 1))
  }

  json(): CharacterSave {
    return {
      character: this.character,
      characterClass: this.characterClass,
      buffs: this.buffs,
      quest: this.quest
    }
  }
}
