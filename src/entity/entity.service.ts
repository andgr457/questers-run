import { MOBS } from './Constants'
import { BaseEntity } from './base.entity';
import { Character } from './character';
import { Mob } from './mob';
import { Player } from './player';
import { RECOMMEND_NAMES } from './stock';

export function camelToReadable(camelCaseStr: string): string {
  // Step 1: Insert a space before each uppercase letter
  let readableStr = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Step 2: Capitalize the first letter
  readableStr = readableStr.charAt(0).toUpperCase() + readableStr.slice(1);
  
  return readableStr;
}

export function getRandomName(): string {
  const randomIndex = Math.floor(Math.random() * RECOMMEND_NAMES.length)
  return RECOMMEND_NAMES[randomIndex]
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

export function doCharacterExperience(player: Player, character: Character, amount: number): boolean {
  setPlayerExperience(player, amount)
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
  character.exp = 0
  character.level += 1
  character.nextLevelExp = determineCharacterNextLevelExp(character.level)
  character.maxBuffs = character.level
  character.maxHealth = determineCharacterHealth(character)
  character.health = character.maxHealth
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

export function getCharacterDefense(character: Character): number {
  return character.defense + character.buffDefense
}

export function getDamageAfterDefense(character: Character, mobDamage: number): number {
  let result = mobDamage - getCharacterDefense(character)
  if(result <= 0){
    result = 1
  }
  return result
}

export function getEnemyDamage(character: Character, entity: BaseEntity): number {
  return getDamageAfterDefense(character, entity.attack)
}

export function getCharacterDamage(character: Character): number {
  return character.attack + character.buffAttack
}

export function getCharacterCritDamage(character: Character): number {
  return getCharacterDamage(character) * character.buffCrit
}

export function setPlayerGold(player:Player, amount: number): void {
  player.gold += amount
}

export function setPlayerExperience(player:Player, amount: number): void {
  player.exp += amount
  if(player.exp >= player.nextLevelExp){
    const leftOverExp = Math.max(player.exp - player.nextLevelExp, 0)
    doPlayerLevelUp(player)
    player.exp += leftOverExp
  }
}

export function doPlayerLevelUp(player: Player): void {
  player.exp = 0
  player.level += 1
  player.nextLevelExp = getPlayerNextLevelExp(player)
}

export function getPlayerNextLevelExp(player: Player): number {
  return (player?.level ?? 1 + .5) * 300
}
