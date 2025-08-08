import { Service } from './Service'
import { LoggerService } from './LoggerService'
import { ICharacter } from '../interfaces/entities/character/ICharacter'
import { ICharacterClass } from '../interfaces/entities/character/ICharacterClass'
import { ICharacterBuff } from '../interfaces/entities/character/ICharacterBuff'
import { IQuest } from '../interfaces/entities/IQuest'
import { CharacterSave } from '../interfaces/entities/saves/CharacterSave'

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

  getDps(): number {
      const baseDamage = this.character.strength * (1 + this.character.level * 0.1);
      const willpowerBonus = this.character.willpower * 0.5;

      // Higher base scaling for starting advantage
      const attackSpeed = 1 + (this.character.agility * 0.355);

      const weaponDps = this.character.equippedWeapons.reduce(
          (total, weapon) => total + weapon.dps, 
          0
      );

      return Math.max(0, (baseDamage + willpowerBonus) * attackSpeed + weaponDps);
  }

  getDefense(): number {
    const baseDefense = this.character.agility * 0.5 + this.character.level * 2;

    const armorDefense = this.character.equippedArmor.reduce((total, armor) => total + armor.defense, 0);

    return baseDefense + armorDefense;
  }

  takeDamage(damage: number): number {
    this.character.health -= damage
    if(this.character.health < 0){
      this.character.health = 0
    }
    return this.character.health
  }

  addXp(xp: number): void {
    this.character.experience += xp
    this.levelUp()
  }

  modifyHp(hp: number): void {
    this.character.health += hp
  }

  levelUp(): void {
    // Level up loop to handle multiple levels if XP is enough
    while (this.character.experience >= this.character.experienceNextLevel) {
      this.character.experience -= this.character.experienceNextLevel
      this.character.level += 1
      this.character.experienceNextLevel = this.calculateNextLevelXP()

      const levelFactor = 0.02 * this.character.level // 2% per level multiplier (adjust as needed)

      // Helper to apply base + % increase
      const enhanceStat = (base: number, modifier: number) =>
        base + modifier + base * levelFactor

      // Upgrade stats with base modifier + percentage boost
      this.character.strength = enhanceStat(this.character.strength, this.characterClass.statModifiersPerLevel.strength)
      this.character.willpower = enhanceStat(this.character.willpower, this.characterClass.statModifiersPerLevel.willpower)
      this.character.agility = enhanceStat(this.character.agility, this.characterClass.statModifiersPerLevel.agility)
      
      this.character.maxHealth = enhanceStat(this.character.maxHealth, this.characterClass.statModifiersPerLevel.health)
      this.character.maxMana = enhanceStat(this.character.maxMana, this.characterClass.statModifiersPerLevel.mana)
      this.character.maxStamina = enhanceStat(this.character.maxStamina, this.characterClass.statModifiersPerLevel.stamina)

      // Reset current stats to max after level up
      this.character.health = this.character.maxHealth
      this.character.mana = this.character.maxMana
      this.character.stamina = this.character.maxStamina
    }
  }

  calculateNextLevelXP(): number {
    return Math.floor(50 * this.character.level * this.character.level + 75 * Math.pow(1.2, this.character.level));
  }

  json(): CharacterSave {
    return {
      character: this.character,
      characterClass: this.characterClass,
      buffs: this.buffs,
      quest: this.quest,

    }
  }
}
