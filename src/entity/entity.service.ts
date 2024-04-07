import { STOCK_NAMES } from './Constants'
import { BaseEntity, Character } from './entity.interface'

export function getRandomName(): string {
  const randomIndex = Math.floor(Math.random() * STOCK_NAMES.length)
  return STOCK_NAMES[randomIndex]
}

export function getRandomClass(): string {
  const randomIndex = Math.floor(Math.random() * 3)
  console.log(randomIndex)
  //TODO: MAGE is always being selected
  return ['Warrior', 'Mage', 'Rogue'][randomIndex] 
}

/**
 * Adds experience points to a character and levels them up if they reach the next level experience points required.
 * @param {Character} Character to apply experience points to.
 * @param {number} amount Experience points to allocate.
 * @returns {boolean} [true] if the character leveled up, otherwise [false], or [false] if the character is max level.
 */
const MAX_LEVEL = 50
export function doCharacterExperience(character: Character, amount: number): boolean {
  if(character.level >= MAX_LEVEL) return false

  character.exp += amount
  if(character.exp >= character.nextLevelExp){
    doCharacterLevelUp(character)
    return true
  }
  return false
}

function doCharacterLevelUp(character: Character): void {
  character.exp = 0 //reset the current experience points
  character.level += 1
  character.nextLevelExp = determineNextLevelExp(character.level)
  character.maxBuffs = character.level
}

export function determineNextLevelExp(level: number): number {
  return (level + .5) * 1000
}

/**
 * Calculates the attack damage of an entity.
 * @param {BaseEntity} entity The entity attacking.
 * @returns {number} Damage of the attack.
 */
export function doEntityAttack(entity: BaseEntity, buffAttack?: number): number {
  const buff = buffAttack ?? 0
  return (entity.attack + buff) * entity.level
}

export function doEntityDamage(): void {
  
}