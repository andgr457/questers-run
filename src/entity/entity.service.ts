import { MOBS, STOCK_NAMES } from './Constants'
import { BaseEntity, Character, ClassName, Mob, Player } from './entity.interface'

export function getRandomName(): string {
  const randomIndex = Math.floor(Math.random() * STOCK_NAMES.length)
  return STOCK_NAMES[randomIndex]
}

export function getRandomClass(): string {
  const randomIndex = Math.floor(Math.random() * 3)
  return ['Warrior', 'Mage', 'Rogue'][randomIndex] 
}

export function getRandomMob(location: string): Mob {
  const locationMobs = MOBS.filter(m => m.foundIn.includes(location))
  const randomIndex = Math.floor(Math.random() * locationMobs.length)
  return {...locationMobs[randomIndex]}
}

const MAX_CHARACTER_LEVEL = 50
const MAX_PLAYER_LEVEL = 10
/**
 * Adds experience points to a character and levels them up if they reach the next level experience points required.
 * @param {Character} Character to apply experience points to.
 * @param {number} amount Experience points to allocate.
 * @returns {boolean} [true] if the character leveled up, otherwise [false], or [false] if the character is max level.
 */
export function doCharacterExperience(player: Player, character: Character, amount: number): boolean {
  if(character.level >= MAX_CHARACTER_LEVEL) return false
  doPlayerExperience(player, amount)

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
  character.nextLevelExp = determineCharacterNextLevelExp(character.level)
  character.maxBuffs = character.level
  character.maxHealth = determineCharacterHealth(character.class)
  character.health = character.maxHealth
}

export function doPlayerExperience(player: Player, amount: number): void {
  if(player.level >= MAX_PLAYER_LEVEL) return

  player.exp += amount
  if(player.exp >= player.nextLevelExp){
    doPlayerLevelUp(player)
  }
}

function doPlayerLevelUp(player: Player): void {
  player.exp = 0 //reset the current experience points
  player.level += 1
  player.nextLevelExp = determinePlayerNextLevelExp(player.level)
}

export function determineCharacterHealth(className: ClassName): number {
  let modifier = 1
  const baseHealth = 15
  switch(className) {
    case 'Warrior': modifier = 2
      break;
    case 'Mage': modifier = 1.2
      break;
    case 'Rogue': modifier = 1.5
      break;
  }
  return baseHealth * modifier
}
export function determineCharacterNextLevelExp(level: number): number {
  return (level + .5) * 500
}

export function determinePlayerNextLevelExp(level: number): number {
  return (level + .5) * 1500
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