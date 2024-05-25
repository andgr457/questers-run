import { MOBS, STOCK_NAMES } from './Constants'
import { BaseEntity, Character, Mob, Player } from './entity.interface'

export function camelToReadable(camelCaseStr: string): string {
  // Step 1: Insert a space before each uppercase letter
  let readableStr = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Step 2: Capitalize the first letter
  readableStr = readableStr.charAt(0).toUpperCase() + readableStr.slice(1);
  
  return readableStr;
}

export function getRandomName(): string {
  const randomIndex = Math.floor(Math.random() * STOCK_NAMES.length)
  return STOCK_NAMES[randomIndex]
}

export function getRandomClass(): string {
  const randomIndex = Math.floor(Math.random() * 3)
  return ['Warrior', 'Mage', 'Rogue'][randomIndex] 
}

export function getRandomMob(location: string, characterLevel: number): Mob {
  const locationMobs = MOBS.filter(m => m.foundIn.includes(location))
  const randomIndex = Math.floor(Math.random() * locationMobs.length)
  const mob = {...locationMobs[randomIndex]}
  const randomLevel = Math.floor(Math.random() * 3)
  const levels = [characterLevel - 1 === 0 ? 1 : characterLevel - 1, characterLevel, characterLevel + 1]
  mob.level = levels[randomLevel]
  mob.attack = mob.attack * mob.level
  mob.health = mob.health * mob.level
  mob.maxHealth = mob.health
  mob.expGiven = mob.expGiven * mob.level
  mob.defense = mob.defense * mob.level
  mob.mana = mob.mana * mob.level
  return mob
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
  doPlayerExperience(player, amount)
  if(character.level >= MAX_CHARACTER_LEVEL) return false

  character.exp += amount
  if(character.exp >= character.nextLevelExp){
    const leftOverExp = Math.max(character.exp - character.nextLevelExp, 0)
    doCharacterLevelUp(character)
    character.exp += leftOverExp
    return true
  }
  return false
}

function doCharacterLevelUp(character: Character): void {
  character.exp = 0 //reset the current experience points
  character.level += 1
  character.nextLevelExp = determineCharacterNextLevelExp(character.level)
  character.maxBuffs = character.level
  character.maxHealth = determineCharacterHealth(character)
  character.health = character.maxHealth
}

export function doPlayerExperience(player: Player, amount: number): void {
  if(player.level >= MAX_PLAYER_LEVEL) return

  player.exp += amount
  if(player.exp >= player.nextLevelExp){
    const leftOverExp = Math.max(player.exp - player.nextLevelExp, 0)
    doPlayerLevelUp(player)
    player.exp += leftOverExp
  }
}

function doPlayerLevelUp(player: Player): void {
  player.exp = 0 //reset the current experience points
  player.level += 1
  player.nextLevelExp = determinePlayerNextLevelExp(player.level)
}

export function determineCharacterHealth(character: Character): number {
  let modifier = 1
  switch(character.class) {
    case 'Warrior': modifier = .2
      break;
    case 'Mage': modifier = .1
      break;
    case 'Rogue': modifier = .15
      break;
  }
  const amount = character.maxHealth * modifier
  return character.maxHealth + amount
}
export function determineCharacterNextLevelExp(level: number): number {
  return (level + .5) * 50
}

export function determinePlayerNextLevelExp(level: number): number {
  return (level + .5) * 150
}

/**
 * Calculates the attack damage of an entity.
 * @param {BaseEntity} entity The entity attacking.
 * @returns {number} Damage of the attack.
 */
export function doEntityAttack(entity: BaseEntity, buffAttack?: number): number {
  const buff = buffAttack ?? 0
  return entity.attack + buff
}

export function doEntityDamage(): void {
  
}