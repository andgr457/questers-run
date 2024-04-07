import { Character } from './entity.interface'

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

function determineNextLevelExp(level: number): number {
  return (level + .5) * 1000
}

export function doEntityAttack(): void {

}

export function doEntityDamage(): void {
  
}